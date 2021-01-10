import React from 'react'

import { ContextProvider } from './context'
import { GlobalStyles } from '../styles/theme'

function App({ children }: { children?: React.ReactNode }) {
  return (
    <ContextProvider>
      <GlobalStyles />
      {children}
    </ContextProvider>
  )
}

export default App
