import { useState } from 'react'
import { pizzaCart } from '../components/pizzas'
import Button from './Button'

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart)
  console.log('Estado inicial de cart:', cart)

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0)
  }

  const aumentarCantidad = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    ))
    console.log('Cart después de aumentar:', cart)
  }

  const disminuirCantidad = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
    ))
    console.log('Cart después de disminuir:', cart)
  }

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='col-md-8'>
        <h2 className='text-center mb-4'> Carrito de Compras</h2>

        {cart.map((item) => (
          <div className='card mb-3 border-0' key={item.id}>
            <div className='row g-0 align-items-center'>
              <div className='col-md-4 d-flex justify-content-center'>
                <img
                  src={item.img}
                  className='img-fluid rounded-start'
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body d-flex justify-content-around align-items-center'>
                  <h5 className='card-title text-capitalize'> {item.name} </h5>
                  <p className='card-text'> Precio: {item.price}</p>

                  <div className='d-flex align-items-center gap-2'>
                    <button type='button' className='btn btn-outline-danger' onClick={() => disminuirCantidad(item.id)} disabled={item.count <= 1}> - </button>

                    <span> {item.count} </span>

                    <button type='button' className='btn btn-outline-success' onClick={() => aumentarCantidad(item.id)}> + </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='text-center mt-4'>
          <h3> Total: $ {calcularTotal()} </h3>
        </div>
        <div className='d-flex justify-content-center mb-3'>
          <Button
            text='Pagar'
            className='btn btn-dark'
            onClick={() => console.log('Pagar')}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
