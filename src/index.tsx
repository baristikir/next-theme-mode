import {
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
  themes: [themeModes]
}
interface Props {
  children: ReactNode
}

export function ThemeProvider(
  { children }: Props,
  { themes }: ITheme
): JSX.Element {
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
    Object.entries(themes[newValue]).forEach(([name, colorByTheme]) => {
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
