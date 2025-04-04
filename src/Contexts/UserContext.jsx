import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  console.log('UserProvider token:', token)

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const profile = await getProfile()
          setUser(profile)
        } catch (error) {
          console.error('Error al cargar el perfil al inicio:', error)
        }
      }
    }
    fetchUser()
  }, [])

  const register = async (email, password, confirmPassword) => {
    try {
      const URL = 'http://localhost:3000/api/auth/register'
      const res = await axios.post(URL, email, password, confirmPassword)
      console.log(res)
      const { token } = res.data
      setUser({ email })
      setToken(token)
      console.log('Usuario registrado', res.data)
      return res.data
    } catch (error) {
      console.log('Error al registrarse', error)
    }
  }

  const login = async (email, password) => {
    try {
      const URL = 'http://localhost:3000/api/auth/login'
      const payload = { email, password }
      const res = await axios.post(URL, payload)
      console.log('user', res.data)

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        setUser({ email: res.data.email })
        return res.data
      } else {
        console.error('Token no recibido en la respuesta del login.')
      }
    } catch (error) {
      console.error('Error en el login', error)
    }
  }

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  }, [token])

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    console.log('Se cerro la sesion')
  }

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error('No se pudo conseguir profile:', error)
    }
  }

  const stateGlobal = {
    user,
    logout,
    login,
    register,
    getProfile,
    token
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
