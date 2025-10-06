import { useState, useContext, createContext } from "react";
import useIpGetter from "./UseIpGetter";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [previousPath, setPreviousPath] = useState('');
  const { ipdata, error } = useIpGetter();
  const savePrevPath = (path) => setPreviousPath(path)
  return (
    <AppContext.Provider value={{ previousPath, savePrevPath, ipdata }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppContextProvider')
  return context
}