import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-theme-mode'
import { Theme } from '../theme/Theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider customThemes={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
