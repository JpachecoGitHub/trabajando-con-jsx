import { createContext, useState } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const calcularTotal = (cart) => {
    if (!cart || cart.length === 0) {
      return 0
    }

    return cart.reduce((total, item) => {
      const itemPrice = typeof item?.price === 'number' ? item.price : 0
      const itemCount = typeof item?.quantity === 'number' ? item.quantity : 0
      return total + itemPrice * itemCount
    }, 0)
  }

  const agregarAlCarrito = (pizza) => {
    setCart((currItems) => {
      const itemEncontrado = currItems.find((item) => item.id === pizza.id)
      if (itemEncontrado) {
        return currItems.map((item) => {
          if (item.id === pizza.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...currItems, { ...pizza, quantity: 1 }]
      }
    })
  }

  const disminuir = (pizzaId) => {
    setCart((currItems) => {
      const itemEncontrado = currItems.find((item) => item.id === pizzaId)
      if (itemEncontrado) {
        if (itemEncontrado.quantity > 1) {
          return currItems.map((item) => {
            if (item.id === pizzaId) {
              return { ...item, quantity: item.quantity - 1 }
            } else {
              return item
            }
          })
        } else {
          return currItems.filter((item) => item.id !== pizzaId)
        }
      }
      return currItems
    })
  }

  const aumentar = (pizzaId) => {
    const newCart = cart.map((item) => {
      if (item.id === pizzaId) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(newCart)
  }

  const stateGlobal = {
    cart,
    calcularTotal,
    aumentar,
    disminuir,
    agregarAlCarrito
  }

  return (
    <CartContext.Provider value={stateGlobal}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
