import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useParams } from 'react-router-dom'

const Pizza = () => {
  const { id } = useParams()

  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/pizzas/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No se encontró ningúna pizza con este ID')
          } else {
            throw new Error('Error al cargar los datos de la pizza')
          }
        }
        const data = await response.json()
        setPizza(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPizza()
  }, [id])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  if (!pizza) return <div>Pizza no encontrada</div>

  const { img, name, price, ingredients, desc } = pizza

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
                    style={{ height: '40px' }}
                    text='Añadir 🛒'
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
