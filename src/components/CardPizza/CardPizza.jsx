import React, { useContext } from 'react'
import Button from '../Button'
import { CartContext } from '../../Context/CartContext'

const Cardpizza = ({ img, name, price, ingredients, desc, id }) => {
  const { agregarAlCarrito } = useContext(CartContext)

  const handleAgregarAlCarrito = () => {
    console.log('Agregando al carrito:', { id, name, price, img })
    agregarAlCarrito({ id, name, price, img })
  }

  return (
    <div className='card-container d-flex justify-content-center'>
      <div className='card' style={{ width: '25rem' }}>
        <img src={img} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h2 className='card-title'>{name}</h2>
          <ul className='list-unstyled mb-0 mt-3 text-muted'>
            <h6><strong>Ingredientes:</strong></h6>
            {ingredients.map((item) => (
              <li className='card-text' key={item}>{item}</li>
            ))}
          </ul>
          <p className='list-group-item'><strong>Descripción:</strong> {desc}</p>
          <p className='card-text'><strong>Precio:</strong> ${price}</p>
        </div>
        <div>
          <div className='card-body' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Button
              text='Añadir al Carrito'
              className='btn btn-dark'
              style={{ height: '40px' }}
              onClick={handleAgregarAlCarrito}
            >
              Agregar al Carro
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cardpizza
