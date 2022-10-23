import { createContext, useContext} from 'react'
import { useBluTheme } from '../src/bluThemeHelper';



const bluThemeContext = createContext({
    isDark:true,
    themeLoading:true,
    updateIsDark: (newIsDark:boolean)=>{}
  });

export function BluThemeProvider(props:any) {
  const {value, children} = props
  const theme = useBluTheme();
  return <bluThemeContext.Provider value={theme}>{children}</bluThemeContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useBluThemeContext = () => useContext(bluThemeContext);
