function Profile () {
  const userEmail = 'usuario@ejemplo.com'

  const handleLogout = () => {
    console.log('Cerrando sesión...')
  }

  return (
    <div>
      <p>Correo electrónico: {userEmail}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default Profile
