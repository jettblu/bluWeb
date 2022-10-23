import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { BluThemeProvider } from '../components/ThemeProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return(
     <BluThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </BluThemeProvider> 
  )
}

export default MyApp
