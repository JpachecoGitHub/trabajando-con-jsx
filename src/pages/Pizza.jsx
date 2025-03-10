import React, { useEffect, useState } from 'react'
import Button from '../components/Button'

const URL = 'http://localhost:5000/api/pizzas/p001'

const Pizza = () => {
  const [pizza, setPizza] = useState(null)

  const getPizza = async () => {
    try {
      const resp = await fetch(URL)
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json()
      setPizza(data)
    } catch (error) {
      console.error('Error fetching pizza data:', error)
      setPizza(null)
    }
  }

  useEffect(() => {
    getPizza()
  }, [])

  if (pizza === null) {
    return <div>Cargando...</div>
  }

  const { img, name, price, ingredients, desc, id } = pizza

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='col-md-10'>
        <div className='card mb-5' key={id}>
          <div className='row g-0 align-items-center'>
            <div className='col-md-4 d-flex justify-content-center'>
              <img
                src={img}
                className='img-fluid rounded-start'
                alt={name}
                style={{ height: '400px', width: '550px', objectFit: 'cover' }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title text-capitalize'>{name}</h5>
                <p className='list-group-item'>{desc}</p>

                <ul className='mb-8 mt-3 text-muted'>
                  {ingredients.map((ingredient, index) => (
                    <li className='card-text' key={index}>🍕{ingredient}</li>
                  ))}
                </ul>

                <div className='d-flex justify-content-around mb-3'>
                  <p className='card-text'>Precio: {price}</p>
                  <Button
                    className='btn btn-dark'
                    style={{ height: '40px' }} text='Añadir 🛒'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Pizza
