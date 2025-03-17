import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true)

  const logout = () => {
    setToken(false)
  }
  console.log('UserProvider token:', token)

  const stateGlobal = {
    token,
    logout
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
