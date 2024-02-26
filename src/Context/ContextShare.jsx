import React, { createContext, useState } from 'react'

export const tokenContext = createContext()


function ContextShare({ children }) {

  const [isAuthToken, setIsAuthToken] = useState(true)

  return (
    <>
      <tokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
        {children}
      </tokenContext.Provider>
    </>
  )
}

export default ContextShare