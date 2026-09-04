import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Saya Berpancasila | Portofolio Tugas PKN',
  description: 'Portofolio dokumentasi kegiatan sehari-hari penerapan nilai-nilai Pancasila oleh Revansyah Putra Wardoyo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>{children}</body>
    </html>
  )
}
