import React, { ReactNode } from 'react';
interface IThemeContext {
    colorMode: string;
    setColorMode: (newValue: string) => void;
}
export declare const ThemeContext: React.Context<IThemeContext>;
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
interface ThemeProviderProps {
    children: ReactNode;
    customThemes: themeModes;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare function ScriptHydrationTheme(Theme: ITheme): JSX.Element;
export {};
