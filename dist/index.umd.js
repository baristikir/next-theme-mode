!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e||self).nextThemeMode={},e.react)}(this,function(e,t){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=o(t),n=t.createContext({});function i(){var e=function(){var e=window.localStorage.getItem("color-mode");if("string"==typeof e)return e;var t=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof t.matches&&t.matches?"dark":"light"}(),t=document.documentElement;t.style.setProperty("--initial-color-mode",e),Object.entries("substitutedForTheme"[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))})}e.ScriptHydrationTheme=function(e){var t=String(i).replace("'substitutedForTheme'",JSON.stringify(e));return r.default.createElement("script",{id:"theme-rehydrate",dangerouslySetInnerHTML:{__html:"("+t+")()"}})},e.ThemeContext=n,e.ThemeProvider=function(e){var o=e.children,i=e.customThemes,c=t.useState(""),u=c[0],d=c[1];return t.useEffect(function(){var e=window.document.documentElement.style.getPropertyValue("--initial-color-mode");d(e)},[]),r.default.createElement(n.Provider,{value:{colorMode:u,setColorMode:function(e){var t=window.document.documentElement;d(e),localStorage.setItem("color-mode",e),Object.entries(i[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))})}}},o)},e.useTheme=function(){var e=t.useContext(n);if(void 0===e)throw new Error("useTheme must  be  used within a ThemeModeContext  Provider");return e}});
