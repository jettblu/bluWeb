import { createContext, useContext} from 'react'
import { useBluTheme } from '../src/bluThemeHelper';



const kryptikThemeContext = createContext({
    isDark:true,
    themeLoading:true,
    updateIsDark: (newIsDark:boolean)=>{}
  });

export function BluThemeProvider(props:any) {
  const {value, children} = props
  const theme = useBluTheme();
  return <kryptikThemeContext.Provider value={theme}>{children}</kryptikThemeContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useKryptikThemeContext = () => useContext(kryptikThemeContext);
