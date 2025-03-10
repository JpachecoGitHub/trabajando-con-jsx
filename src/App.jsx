import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home, Cart, Footer, Navegador, RegisterPage, LoginPage, NotFound, Profile, Pizza } from './components/index'
import CartProvider from './Context/CartContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navegador />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Pizza/:id' element={<Pizza />} />
            <Route path='/Register' element={<RegisterPage />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
