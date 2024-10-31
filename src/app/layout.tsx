import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from "./components/navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTubeSummary',
  description: 'Summarize YouTube videos in seconds',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="5pK--AWT2sks-sVke8QwYtmnCpg4a-tO0sgjUf2nYs0" />
      <body className={inter.className}>
      {/* <div className="mx-auto bg-white h-screen w-full"> */}
        <NavigationBar />
        {children}
      {/* </div> */}
      </body>
    </html>
  )
}
