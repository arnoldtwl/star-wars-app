import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from './layout.module.css'
import Footer from './components/Footer'
import Header from './components/Header'
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
          <Header />
          <main className={styles.content}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
