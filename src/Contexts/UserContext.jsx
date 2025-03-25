import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const [token, setToken] = useState(localStorage.getItem('token') || null)

  console.log('UserProvider token:', token)

  const register = async (email, password) => {
    try {
      const URL = '/api/auth/register'
      const res = await axios.post(URL, { email, password })
      console.log(res)
      const { token } = res.data
      setUser({ email })
      setToken(token)
      console.log('Usuario registrado', res.data)
    } catch (error) {
      console.log('Error al registrarse')
    }
  }

  const login = async (email, password) => {
    try {
      const URL = '/api/auth/login'
      const payload = { email, password }
      const user = await axios.post(URL, payload)
      console.log('user', user)
      localStorage.setItem('token', user.data.token)
      console.log('user', user.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  })

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    console.log('Se cerro la sesion')
  }

  const getProfile = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('No se pudo conseguir profile:', error)
      throw error
    }
  }

  const stateGlobal = {
    user,
    logout,
    login,
    register,
    getProfile
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
