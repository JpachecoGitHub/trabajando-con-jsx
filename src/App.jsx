import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Cart, Footer, Navegador, RegisterPage, LoginPage, NotFound, Profile, Pizza } from './components/index'
import CartProvider from './Contexts/CartContext'
import UserProvider, { UserContext } from './Contexts/userContext'
import { useContext } from 'react'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <UserProvider>
            <Navegador />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/api/pizzas/:id' element={<Pizza />} />
              <Route path='/Register' element={<ProtectedRoute redirectTo='/'> <RegisterPage /> </ProtectedRoute>} />
              <Route path='/Login' element={<ProtectedRoute redirectTo='/'> <LoginPage /> </ProtectedRoute>} />
              <Route path='/Profile' element={<ProtectedRoute redirectTo='/login' isAuth> <Profile /> </ProtectedRoute>} />
              <Route path='/Cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </UserProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

const ProtectedRoute = ({ children, redirectTo, isAuth }) => {
  const { token } = useContext(UserContext)
  const isAuthenticated = isAuth ? token : !token

  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
