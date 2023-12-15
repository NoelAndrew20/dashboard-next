import ChatBtn from '@/components/atoms/ChatBtn'
import Footer from '@/components/atoms/Footer'
import Navigation from '@/components/molecules/Navigation'
import { DarkModeProvider } from '@/context/DarkModeContext'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
      {router.pathname === "/Login" || router.pathname === "/Chat"
      ? ""
      : <ChatBtn/>
      }
      <Footer/>
    </DarkModeProvider>
  )
}
