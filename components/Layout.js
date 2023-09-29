import styles from './Layout.module.css';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Star Wars<span>Universe</span>
        </Link>
      </header>
      {children}
    </div>
  );
}
