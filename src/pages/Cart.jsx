import { useContext, useState } from 'react'
import Button from '../Components/Button'
import { CartContext } from '../Contexts/CartContext'
import axios from 'axios'
import { UserContext } from '../Contexts/UserContext'

const Cart = () => {
  console.log('Componente Cart renderizado.')
  const { cart, calcularTotal, aumentar, disminuir, limpiarCarrito } = useContext(CartContext)
  const { token } = useContext(UserContext)
  const [mensajeExito, setMensajeExito] = useState(null)
  const [errorEnvio, setErrorEnvio] = useState(null)

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

  const checkout = async () => {
    console.log('Función checkout llamada.')
    try {
      const res = await axios.post('http://localhost:3000/api/checkouts', { cart }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      )

      console.log('Respuesta del servidor:', res.data)
      setMensajeExito('Compra realizada con éxito.')
      // console.log('Estado mensajeExito actualizado:', 'Compra realizada con éxito.')
      limpiarCarrito()
      setErrorEnvio(null)
    } catch (error) {
      console.error('Error al realizar el checkout:', error)
      setErrorEnvio('Hubo un error al realizar la compra. Inténtalo de nuevo.')
      setMensajeExito(null)
    }
  }

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='col-md-8'>
        <h2 className='text-center mb-4'>Carrito de Compras</h2>

        {console.log('Valor de mensajeExito:', mensajeExito)}

        {mensajeExito && <div key='mensajeExito' className='alert alert-success'>{mensajeExito}</div>}
        {errorEnvio && <div className='alert alert-danger'>{errorEnvio}</div>}

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

          <Button
            text='Pagar'
            className='btn btn-dark'
            onClick={checkout}
            disabled={!token}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
