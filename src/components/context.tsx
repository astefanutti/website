import React from 'react'

export const Context = React.createContext({ isClient: false })

export const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => setIsClient(true))

  return <Context.Provider value={{ isClient }}>{children}</Context.Provider>
}
