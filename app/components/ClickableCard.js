'use client'

import { useState } from 'react'
import EnrichmentModal from './EnrichmentModal'
import styles from './ClickableCard.module.css'

/**
 * Wrapper component that makes cards clickable and opens enrichment modal
 * 
 * @param {Object} props
 * @param {string} props.itemName - Name of the item for enrichment lookup
 * @param {string} props.itemType - SWAPI resource type (people, planets, species, starships, vehicles)
 * @param {React.ReactNode} props.children - Card content to render
 * @param {React.ReactNode} props.modalContent - Content to show in modal (SWAPI details)
 * @param {string} props.className - Additional class name for the card
 */
export default function ClickableCard({ itemName, itemType, children, modalContent, className = '' }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <button
                className={`${styles.card} ${className}`}
                onClick={handleClick}
                aria-label={`View details for ${itemName}`}
            >
                {children}
            </button>

            <EnrichmentModal
                isOpen={isModalOpen}
                onClose={handleClose}
                itemName={itemName}
                itemType={itemType}
            >
                {modalContent}
            </EnrichmentModal>
        </>
    )
}
