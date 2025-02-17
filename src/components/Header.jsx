import './Header.css'

const Header = () => {
  return (
    <header className='header-background text-light d-flex flex-column justify-content-center text-center text-white'>
      <h1> ¡Pizzeria Mamma Mia! </h1>
      <p> ¡Tenemos las mejores pizzas que podras encontrar! </p>
      <hr className='w-75 mx-auto' />
    </header>
  )
}

export default Header
