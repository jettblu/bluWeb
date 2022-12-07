import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { BluThemeProvider } from '../components/ThemeProvider'
import 'highlight.js/styles/github-dark-dimmed.css';

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
