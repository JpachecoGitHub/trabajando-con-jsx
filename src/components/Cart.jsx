import { useState } from 'react'
import { pizzaCart } from './pizzas'
import Button from './Button'

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart)

  const calcularTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
  }

  const aumentarCantidad = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    ))
  }

  const disminuirCantidad = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
    ))
  }

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='container mt-5'>
        <h1 className='text-center mb-4'> Carrito de Compras </h1>

        {cart.map((item) => (
          <div className='card mb-3 border-0' key={item.id}>
            <div className='container-p mt-5 d-flex justify-content-center'>
              <div className='row g-0 align-items-center'>
                <div className='col-md-3 d-flex justify-content-center'>
                  <img
                    src={item.img}
                    className='img-fluid rounded-start'
                    alt={item.name}
                  />
                </div>
                <div className='col-md-5 d-flex align-items-center align-content-center'>
                  <div className='card-body d-flex align-items-center justify-content-around align-content-center'>
                    <h5 className='card-title text-capitalize mb-0'> {item.name} </h5>
                    <p className='card-text mb-0'> Precio: {item.price}</p>

                    <div className='d-flex align-items-center gap-2'>
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => disminuirCantidad(item.id)}
                      >
                        -
                      </button>
                      <span> {item.count} </span>
                      <button
                        className='btn btn-outline-success'
                        onClick={() => aumentarCantidad(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          <div className='text-end mt-4 card-body d-flex justify-content-center'>
            <h3> Total: $ {calcularTotal()} </h3>
          </div>
          <div className='card-body d-flex justify-content-center mb-3'>
            <Button
              text='Pagar'
              className='btn btn-dark'
              onClick={() => console.log('Pagar')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
