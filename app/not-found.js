import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>The force is not strong with this URL...</p>
      <Link href="/" className={styles.homeLink}>
        Return to Home
      </Link>
    </div>
  )
}
