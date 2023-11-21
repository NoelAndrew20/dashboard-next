import Footer from '@/components/atoms/Footer'
import { DarkModeProvider } from '@/context/DarkModeContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
      <Footer/>
    </DarkModeProvider>
  )
}
