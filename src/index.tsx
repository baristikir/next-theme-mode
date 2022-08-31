import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface IThemeContext {
  colorMode: string
  setColorMode: (newValue: keyof ThemeModes) => void
}
export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(
      'useTheme must  be  used within a ThemeModeContext  Provider'
    )
  }
  return context
}

type ThemeModes = {
  light: { [theme: string]: string }
  dark: { [theme: string]: string }
}
export interface ITheme {
  themes: ThemeModes
}
interface ThemeModeProviderProps {
  children: ReactNode
  customThemes: ThemeModes
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
  customThemes,
}): JSX.Element => {
  const [colorMode, rawSetColorMode] = useState<string>('')

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    )
    rawSetColorMode(initialColorValue)
  }, [])

  const contextValue = useMemo(() => {
    const setColorMode = (newValue: keyof ThemeModes) => {
      const root = window.document.documentElement

      localStorage.setItem('color-mode', newValue)

      Object.entries(customThemes[newValue]).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`

        root.style.setProperty(cssVarName, String(colorByTheme))
      })

      rawSetColorMode(newValue)
    }

    return {
      colorMode: colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

function injection() {
  const theme = 'substitutedForTheme'
  function getInitialColorMode(): keyof ThemeModes {
    const persistedColorPreference = window.localStorage.getItem('color-mode')
    const hasPersistedPreference = typeof persistedColorPreference === 'string'

    if (hasPersistedPreference) {
      return persistedColorPreference as keyof ThemeModes
    }

    // If they haven't been explicit, let's check the media query
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light'
    }
    // If they are using a browser/OS that doesn't support
    // color themes, default light.
    return 'light'
  }

  const colorMode = getInitialColorMode()
  const root = document.documentElement

  root.style.setProperty('--initial-color-mode', colorMode)

  //@ts-ignore
  Object.entries(theme[colorMode]).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`
    root.style.setProperty(cssVarName, String(colorByTheme))
  })
}

export function ScriptHydrationTheme(Theme: ThemeModes): JSX.Element {
  const functionString = String(injection).replace(
    "'substitutedForTheme'",
    JSON.stringify(Theme)
  )
  const codeToRunOnClient = `(${functionString})()`
  // eslint-disable-next-line react/no-danger
  return (
    <script
      id="theme-rehydrate"
      dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
    />
  )
}
