import { ReactNode } from 'react';
interface IThemeContext {
    customThemes: ITheme;
    colorMode: string;
    setColorMode: (newValue: string) => void;
}
export declare const ThemeContext: import("react").Context<IThemeContext>;
export declare const useTheme: () => IThemeContext;
declare type themeModes = {
    light: {
        [theme: string]: string;
    };
    dark: {
        [theme: string]: string;
    };
};
export interface ITheme {
    themes: themeModes;
}
interface Props {
    children: ReactNode;
}
export declare function ThemeProvider({ children }: Props, themes: ITheme): JSX.Element;
export declare function ScriptHydrationTheme(Theme: ITheme): JSX.Element;
export {};
