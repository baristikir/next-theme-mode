import '../styles/globals.css'
import { ThemeProvider } from 'next-theme-mode'
import Theme from '../theme/Theme'
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider themes={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
