import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <span className={styles.logoText}>Star Wars</span>
                <span className={styles.logoHighlight}>Universe</span>
            </Link>
        </header>
    )
}
