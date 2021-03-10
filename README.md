<h1 align="center">
    Next Theme Mode
</h1>

<p align="center">
  <a aria-label="Join the community on GitHub" href="https://github.com/vercel/next.js">
    <img alt="" src="https://img.shields.io/badge/Next.js-333333?style=for-the-badge&logo=next.js&color=000000&logoColor=fff">
  </a>
  <a aria-label="" href="https://www.typescriptlang.org">
    <img alt="" src="https://img.shields.io/badge/Typescript-333333?style=for-the-badge&logo=typescript&color=000000&logoColor=3A71FF">
  </a>

</p>

## Description

This npm package is for `nextjs` projects. Simply to add **dark-mode** and **light-mode** functionalities with _2 lines of code_.

## Requirements

To use `next-theme-mode`, you must use `react@16.8.0` or greater.

## Installation

```bash
npm install next-theme-mode
# or
yarn add next-theme-mode
```

## Usage

In order to use this package you need just to modify the `_app.js` and `_document.js`.

First of all you need to create a `Theme.jsx`/`Theme.tsx` file and put your theming into it. You can put your colors for the different theme modes into this file.
Make sure to name the **variables identically** for light and dark theme to get full usage of the theme switching.

```js
// theme/Theme.jsx
export const Theme = {
  light: {
    /**
     * Background Color
     */
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#fafafa',
    /**
     * Text Colors
     */
    primaryText: '#192635',
  },
  dark: {
    /**
     * Background Color
     */
    primaryBackground: '#181818',
    secondaryBackground: '#0E141B',
    /**
     * Text Colors
     */
    primaryText: '#fbfbfc',
  },
}
```

You will need to customize the `_app.js` inside the pages directory.

```js
// pages/_app.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

Add the `ThemeModeProvider` to your `_app.js` / `_app.tsx`

```js
// pages/_app.js
import { ThemeModeProvider } from 'next-theme-mode'
import { Theme } from '../theme/Theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeModeProvider customThemes={Theme}>
      <Component {...pageProps} />
    </ThemeModeProvider>
  )
}

export default MyApp
```

Also to prevent any flashing on reloads while using `dark-mode` add this to your `_document.js` / `_document.tsx`

```js
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
          // Add this line to achieve non flashing
          <ScriptHydrationTheme themes={Theme} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

That's all it for the setup. Now you can use the `useTheme()` hook to change the theme modes and also use the colors in your `css` stylings.

### useTheme

To know which theme is currently active you can use the `useTheme()` hook. The `colorMode` Object contains the current theme as a `string`.
With the `setColorMode` function you can change the theme by passing a `string` into it.

```js
const { colorMode, setColorMode } = useTheme()

const isDark = colorMode === 'dark' ? true : false

const changeTheme = () => {
  isDark ? setColorMode('light') : setColorMode('dark')
}
return <button onClick={() => changeTheme()}>Change Mode</button>
```

### Css Variables

You can now use the theme variables in your css styles.
The passed in theme variables have always the prefix `--color- `.

```css
button {
  background-color: var(--color-primaryBackground);
  color: var(--color-primaryText);
}
```
