import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from "./components/navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youtube Summarizer',
  description: 'Summarize YouTube videos in seconds',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <div className="mx-auto bg-white h-screen w-full"> */}
        <NavigationBar />
        {children}
      {/* </div> */}
      </body>
    </html>
  )
}
