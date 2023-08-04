import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navigation from '@/components/molecules/Navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Navigation/>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
      </main>
    </div>

  )
}
