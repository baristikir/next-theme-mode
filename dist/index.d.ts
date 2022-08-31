import React, { ReactNode } from 'react';
interface IThemeContext {
    colorMode: string;
    setColorMode: (newValue: keyof ThemeModes) => void;
}
export declare const ThemeContext: React.Context<IThemeContext>;
export declare const useTheme: () => IThemeContext;
declare type ThemeModes = {
    light: {
        [theme: string]: string;
    };
    dark: {
        [theme: string]: string;
    };
};
export interface ITheme {
    themes: ThemeModes;
}
interface ThemeProviderProps {
    children: ReactNode;
    customThemes: ThemeModes;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare function ScriptHydrationTheme({ themes, }: {
    themes: ThemeModes;
}): JSX.Element;
export {};
