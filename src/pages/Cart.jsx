import { useContext } from 'react'
import Button from '../components/Button'
import { CartContext } from '../Context/CartContext'

const Cart = () => {
  const { cart, calcularTotal, aumentar, disminuir } = useContext(CartContext)

  if (!cart || cart.length === 0) {
    return (
      <div className='container mt-5 d-flex justify-content-center'>
        <div className='col-md-8'>
          <h2 className='text-center mb-4'>Carrito de Compras</h2>
          <p className='text-center'>El carrito está vacío.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='col-md-8'>
        <h2 className='text-center mb-4'>Carrito de Compras</h2>

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
                    <button
                      id='disminuir'
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => disminuir(item.id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      id='aumentar'
                      type='button'
                      className='btn btn-outline-success'
                      onClick={() => aumentar(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='text-center mt-4'>
          <h3> Total: $ {calcularTotal(cart)} </h3>
        </div>
        <div className='d-flex justify-content-center mb-3'>
          <Button text='Pagar' className='btn btn-dark' onClick={() => console.log('Pagar')} />
        </div>
      </div>
    </div>
  )
}

export default Cart
