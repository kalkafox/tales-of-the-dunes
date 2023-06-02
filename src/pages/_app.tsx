import Main from '@/components/Main'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <title>Tales of the Dunes</title>
      </Head>
      <Main />
      <Component {...pageProps} />
    </Provider>
  )
}
