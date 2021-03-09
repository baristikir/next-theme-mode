import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { ScriptHydrationTheme } from 'next-theme-mode'
import { Theme } from '../theme/Theme'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <ScriptHydrationTheme themes={Theme} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
