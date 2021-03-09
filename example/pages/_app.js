import '../styles/globals.css'
import Theme from '../theme/Theme'
import { ThemeProvider } from 'next-theme-mode'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
