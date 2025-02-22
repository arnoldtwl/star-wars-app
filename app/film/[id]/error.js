'use client'

import styles from './error.module.css'

export default function FilmError({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.heading}>Something went wrong!</h2>
      <p className={styles.message}>
        {error.message || 'Failed to load film data. Please try again.'}
      </p>
      <button
        className={styles.resetButton}
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  )
}
