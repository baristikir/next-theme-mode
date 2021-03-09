import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IThemeContext {
  colorMode: string
  setColorMode: (newValue: string) => void
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

type themeModes = {
  light: { [theme: string]: string }
  dark: { [theme: string]: string }
}
export interface ITheme {
  themes: themeModes
}
interface ThemeProviderProps {
  children: ReactNode
  customThemes: themeModes
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
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

  function setColorMode(newValue: string): void {
    // Update React color-mode state
    const root = window.document.documentElement
    rawSetColorMode(newValue)
    // Update localStorage
    localStorage.setItem('color-mode', newValue)
    //Update stored colors
    //@ts-ignore
    Object.entries(customThemes[newValue]).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`

      root.style.setProperty(cssVarName, String(colorByTheme))
    })
  }

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

function injection() {
  const theme = 'substitutedForTheme'
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode')
    const hasPersistedPreference = typeof persistedColorPreference === 'string'
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference
    }
    // If they haven't been explicit, let's check the media
    // query
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light'
    }
    // If they are using a browser/OS that doesn't support
    // color themes, let's default to 'light'.
    return 'light'
  }

  const colorMode: string | null = getInitialColorMode()
  const root = document.documentElement

  root.style.setProperty('--initial-color-mode', colorMode)

  // @ts-ignore
  Object.entries(theme[colorMode]).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`
    root.style.setProperty(cssVarName, String(colorByTheme))
  })
}

export function ScriptHydrationTheme(Theme: ITheme): JSX.Element {
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
