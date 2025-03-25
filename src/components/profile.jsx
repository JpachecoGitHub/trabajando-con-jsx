import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/userContext'

const Profile = () => {
  const { email, logout } = useContext(UserContext)
  const navigate = useNavigate()

  // const userEmail = 'usuario@ejemplo.com'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <p>Correo electrónico: {email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default Profile
