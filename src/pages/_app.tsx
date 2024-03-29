import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { Header } from '../Components/Header'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
