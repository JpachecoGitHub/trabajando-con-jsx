import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Cart, Footer, Navegador, RegisterPage, LoginPage, NotFound, Profile, Pizza } from './Components/index'
import CartProvider from './Contexts/CartContext'
import UserProvider, { UserContext } from './Contexts/UserContext'
import { useContext } from 'react'

const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <BrowserRouter>
        <CartProvider>
          <UserProvider>
            <Navegador />
            <div className='flex-grow-1'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/pizzas/:id' element={<Pizza />} />
                <Route path='/Register' element={<ProtectedRoute redirectTo='/'> <RegisterPage /> </ProtectedRoute>} />
                <Route path='/Login' element={<ProtectedRoute redirectTo='/'> <LoginPage /> </ProtectedRoute>} />
                <Route path='/Profile' element={<ProtectedRoute redirectTo='/login' isAuth> <Profile /> </ProtectedRoute>} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </UserProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

const ProtectedRoute = ({ children, redirectTo, isAuth }) => {
  const { token } = useContext(UserContext)
  const isAuthenticated = isAuth ? token : !token

  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
