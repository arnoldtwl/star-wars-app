'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './EnrichmentModal.module.css'
import { fetchEnrichment } from '@/app/lib/databank'

/**
 * Modal component for displaying enrichment data from Star Wars Databank
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {string} props.itemName - Name of the item to fetch enrichment for
 * @param {string} props.itemType - SWAPI resource type (people, planets, species, starships, vehicles)
 * @param {React.ReactNode} props.children - SWAPI data to display in modal
 */
export default function EnrichmentModal({ isOpen, onClose, itemName, itemType, children }) {
    const [enrichment, setEnrichment] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageError, setImageError] = useState(false)

    // Fetch enrichment data when modal opens
    useEffect(() => {
        if (!isOpen || !itemName || !itemType) {
            return
        }

        const abortController = new AbortController()
        setIsLoading(true)
        setError(null)
        setEnrichment(null)
        setImageError(false)

        fetchEnrichment(itemType, itemName, abortController.signal)
            .then((data) => {
                setEnrichment(data)
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError('Failed to load enrichment data')
                    console.error('Enrichment fetch error:', err)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })

        return () => {
            abortController.abort()
        }
    }, [isOpen, itemName, itemType])

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Handle backdrop click
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.modal} role="dialog" aria-modal="true">
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    ×
                </button>

                <h2 className={styles.title}>{itemName}</h2>

                {/* SWAPI Data */}
                <div className={styles.swapiData}>
                    {children}
                </div>

                {/* Enrichment Section */}
                <div className={styles.enrichmentSection}>
                    <h3 className={styles.enrichmentTitle}>Databank Information</h3>

                    {isLoading && (
                        <div className={styles.loading}>
                            <div className={styles.skeleton} />
                            <div className={styles.skeleton} style={{ width: '80%' }} />
                            <div className={styles.skeleton} style={{ width: '60%' }} />
                        </div>
                    )}

                    {error && (
                        <p className={styles.error}>{error}</p>
                    )}

                    {!isLoading && !error && enrichment && (
                        <>
                            {enrichment.image && !imageError && (
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={enrichment.image}
                                        alt={itemName}
                                        fill
                                        sizes="300px"
                                        className={styles.image}
                                        onError={() => setImageError(true)}
                                    />
                                </div>
                            )}

                            {enrichment.description ? (
                                <p className={styles.description}>{enrichment.description}</p>
                            ) : (
                                <p className={styles.noData}>No Databank description found for this item.</p>
                            )}
                        </>
                    )}

                    {!isLoading && !error && !enrichment && (
                        <p className={styles.noData}>No Databank description found for this item.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
