import { useContext } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

const Navegador = ({ token, onLogout }) => {
  const { cart, calcularTotal } = useContext(CartContext)
  const total = calcularTotal(cart)

  return (
    <Navbar expand='lg' bg='dark' variant='dark' className='shadow-ms'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>Pizzeria Mamma Mia!</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            {token
              ? (
                <>
                  <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                  <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </>
                )
              : (
                <>
                  <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                </>
                )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to='/Cart' className='text-decoration-none'>
              <Button variant='primary' className='ms-3'>
                🛒 Total: $ <span className='btn btn-primary'>{total}</span>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navegador
