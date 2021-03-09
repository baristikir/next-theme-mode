import React from 'react'
import type { AppProps } from 'next/app'
import { NextPageContext } from 'next'
import { ThemeProvider } from 'next-theme-mode'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (
//   { Component }: AppProps,
//   ctx: NextPageContext
// ) => {
//   try {
//     let pageProps = {}
//     if (Component.getInitialProps) {
//       pageProps = (await Component.getInitialProps(ctx)) || {}
//     }
//     return { pageProps }
//   } catch (err) {
//     console.log(err)
//   }
// }

export default MyApp