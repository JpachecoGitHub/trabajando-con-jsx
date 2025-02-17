import Header from './Header'
import CardPizza from './CardPizza/CardPizza'
import { pizzas } from './pizzas'

const Home = () => {
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
              className='card h-100 shadow-sm'
            />
          ))}
          <home />
        </div>
      </main>
      {/* <main className="Card-pizzas">
        <CardPizza
          imagen="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c"
          name="Pizza Napolitana"
          price={5950}
          ingredients={["🍕mozzarella ", "tomates ", "jamón ", "orégano"]}/>
        <CardPizza
          imagen="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab"
          name="Pizza Pepperoni"
          price={6500}
          ingredients={["🍕mozzarella ", "pepperoni ", "tomates"]}/>
        <CardPizza
          imagen="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3"
          name="Pizza Vegetariana"
          price={5500}
          ingredients={["🍕mozzarella ", "tomates ", "pimientos ", "cebolla"]}/>
      </main> */}
    </>
  )
}

export default Home
