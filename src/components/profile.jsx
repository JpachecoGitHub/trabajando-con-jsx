import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'
import Swal from 'sweetalert2'

const Profile = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        navigate('/login')
      }
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      {user
        ? (
          <div className='text-center'>
            <p>Correo electrónico: {user.email}</p>
            <button className='btn btn-danger rounded-circle' onClick={handleLogout}>Cerrar sesión</button>
          </div>
          )
        : (
          <p>Perfil no encontrado.</p>
          )}
    </div>
  )
}

export default Profile
