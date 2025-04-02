import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'

const Profile = () => {
  const { user, getProfile, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        await getProfile()
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <div>Cargando perfil...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {user
        ? (
          <div>
            <p>Correo electrónico: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
          )
        : (
          <p>Perfil no encontrado.</p>
          )}
    </div>
  )
}

export default Profile
