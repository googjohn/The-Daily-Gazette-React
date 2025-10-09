import { useState, useContext, createContext } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [previousPath, setPreviousPath] = useState('');
  const savePrevPath = (path) => setPreviousPath(path)
  return (
    <AppContext.Provider value={{ previousPath, savePrevPath }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppContextProvider')
  return context
}