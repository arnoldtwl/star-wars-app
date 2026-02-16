import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                &copy; {currentYear} <Link href="https://www.arnoldtwl.com" className={styles.authorLink} target="_blank" rel="noopener noreferrer">Arnoldtwl</Link>. All rights reserved.
            </p>

        </footer>
    );
}
