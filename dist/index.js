var e=require("react"),t=e.createContext({});function r(){var e=function(){var e=window.localStorage.getItem("color-mode");if("string"==typeof e)return e;var t=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof t.matches&&t.matches?"dark":"light"}(),t=document.documentElement;t.style.setProperty("--initial-color-mode",e),Object.entries("substitutedForTheme"[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))})}exports.ScriptHydrationTheme=function(e){var t=String(r).replace("'substitutedForTheme'",JSON.stringify(e));return React.createElement("script",{id:"theme-rehydrate",dangerouslySetInnerHTML:{__html:"("+t+")()"}})},exports.ThemeContext=t,exports.ThemeProvider=function(r,o){var n=r.children,c=e.useState(""),i=c[0],a=c[1];return e.useEffect(function(){var e=window.document.documentElement.style.getPropertyValue("--initial-color-mode");a(e)},[]),React.createElement(t.Provider,{value:{customThemes:o,colorMode:i,setColorMode:function(e){var t=window.document.documentElement;a(e),localStorage.setItem("color-mode",e),Object.entries(o[e]).forEach(function(e){t.style.setProperty("--color-"+e[0],String(e[1]))})}}},n)},exports.useTheme=function(){var r=e.useContext(t);if(void 0===r)throw new Error("useTheme must  be  used within a ThemeModeContext  Provider");return r};
