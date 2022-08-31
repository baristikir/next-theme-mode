var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=t(e),o=e.createContext({});function n(){var e=function(){var e=window.localStorage.getItem("color-mode");if("string"==typeof e)return e;var t=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof t.matches&&t.matches?"dark":"light"}(),t=document.documentElement;t.style.setProperty("--initial-color-mode",e),Object.entries("substitutedForTheme"[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))})}exports.ScriptHydrationTheme=function(e){var t=String(n).replace("'substitutedForTheme'",JSON.stringify(e));return r.default.createElement("script",{id:"theme-rehydrate",dangerouslySetInnerHTML:{__html:"("+t+")()"}})},exports.ThemeContext=o,exports.ThemeProvider=function(t){var n=t.children,i=t.customThemes,c=e.useState(""),u=c[0],a=c[1];e.useEffect(function(){var e=window.document.documentElement.style.getPropertyValue("--initial-color-mode");a(e)},[]);var s=e.useMemo(function(){return{colorMode:u,setColorMode:function(e){var t=window.document.documentElement;localStorage.setItem("color-mode",e),Object.entries(i[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))}),a(e)}}},[u,a]);return r.default.createElement(o.Provider,{value:s},n)},exports.useTheme=function(){var t=e.useContext(o);if(void 0===t)throw new Error("useTheme must  be  used within a ThemeModeContext  Provider");return t};
