import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from './layout.module.css'

// Initialize the Inter font with subset latin
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Star Wars App',
  description: 'A Next.js app showcasing Star Wars films',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <Link href="/" className={styles.logo}>
              Star Wars<span>Universe</span>
            </Link>
          </header>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
