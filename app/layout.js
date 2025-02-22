import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from './layout.module.css'
import './globals.css'

// Initialize the Inter font with subset latin
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Star Wars Universe',
  description: 'A Next.js app showcasing Star Wars films',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>Star Wars</span>
              <span className={styles.logoHighlight}>Universe</span>
            </Link>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
