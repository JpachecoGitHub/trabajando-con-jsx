import { useEffect, useState } from 'react'
import Header from '../components/Header'
import CardPizza from '../components/CardPizza/CardPizza'
// import { pizzas } from './Pizza'

const URL = 'http://localhost:5000/api/pizzas'

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getPizzas = async () => {
    setLoading(true)
    setError(null)
    try {
      const resp = await fetch(URL)
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json()
      setPizzas(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPizzas()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Header />

      <main className='container my-2 py-2'>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              img={pizza.img}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              desc={pizza.desc}
              id={pizza.id}
              className='card h-100 shadow-sm'
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Home
