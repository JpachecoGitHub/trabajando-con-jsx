import { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Cardpizza from '../Components/CardPizza/CardPizza'

const URL = 'http://localhost:3000/api/pizzas'

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getPizzas = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(URL)
      console.log(res)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setPizzas(data)
    } catch (error) {
      setError(error)
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
            <Cardpizza
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
