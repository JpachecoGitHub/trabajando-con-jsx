import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/userContext'

const RegisterPage = () => {
  const { register } = useContext(UserContext)
  const navigate = useNavigate()

  const [users, setUsers] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const { email, password, confirmPassword } = users
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Todos los campos deben estar llenos.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener un minimo de 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await register({ email, password })
      navigate('/profile')
    } catch (err) {
      setError('Error en el registro. Inténtalo de nuevo.')
    }

    setUsers({ email: '', password: '', confirmPassword: '' })
  }

  return (
    <main className='container mt-5'>
      <section className='card mx-auto shadow-sm' style={{ maxWidth: '400px' }}>
        <div className='card-body'>
          <h2 className='card-title text-center fw-bold justify-content-center'> Registrate</h2>
          {error && <div className='alert alert-danger'>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={users.email}
                onChange={handleChange}
                className='form-control'
                placeholder='Enter your email'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={users.password}
                onChange={handleChange}
                className='form-control'
                placeholder='Enter your password'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='confirmPassword' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={users.confirmPassword}
                onChange={handleChange}
                className='form-control'
                placeholder='Confirm your password'
              />
            </div>

            <button
              type='submit'
              className='btn btn-success w-100 mt-3 fw-bold fs-5'
              disabled=''
            >
              Crear cuenta
            </button>

          </form>
        </div>
      </section>
    </main>
  )
}

export default RegisterPage
