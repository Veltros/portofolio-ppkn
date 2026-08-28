import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Saya Berpancasila | Portofolio Tugas PKN',
  description: 'Portofolio dokumentasi kegiatan sehari-hari penerapan nilai-nilai Pancasila oleh Revansyah Putra Wardoyo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
