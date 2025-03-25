import React, { useContext } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../Contexts/CartContext'
import { UserContext } from '../../Contexts/userContext'

const Navegador = () => {
  const { cart, calcularTotal } = useContext(CartContext)
  const { token, logout } = useContext(UserContext)
  console.log('Navegador token:', token)

  const Total = calcularTotal(cart)

  const validateRoot = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

  return (
    <Navbar expand='lg' bg='dark' variant='dark' className='shadow-ms'>
      <Container>
        <Navbar.Brand as={NavLink} to='/' className='fw-bold text-primary'>
          Pizzeria Mamma Mia!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/' className={validateRoot}>
              🍕 Home
            </Nav.Link>
            {token
              ? (
                <>
                  <Nav.Link as={NavLink} to='/profile' className={validateRoot}>
                    🔓 Profile
                  </Nav.Link>
                  <Nav.Link onClick={logout} className={validateRoot}>
                    🔒 Logout
                  </Nav.Link>
                </>
                )
              : (
                <>
                  <Nav.Link as={NavLink} to='/login' className={validateRoot}>
                    🔐 Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to='/register' className={validateRoot}>
                    🔐 Register
                  </Nav.Link>
                </>
                )}
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to='/cart' className={validateRoot}>
              <Button
                variant='primary'
                className='ms-3 d-flex align-items-center'
                style={{ borderRadius: '20px', padding: '8px 16px' }}
              >
                <span role='img' aria-label='carrito' style={{ marginRight: '8px' }}>
                  🛒
                </span>
                Total: $
                <span
                  className='badge bg-white text-primary ms-2'
                  style={{ borderRadius: '15px', padding: '6px 10px', fontSize: '14px' }}
                >
                  {Total}
                </span>
              </Button>
            </Nav.Link>
          </Nav>
          {/* <Nav>
            <Nav.Link as={NavLink} to='/cart' className={validateRoot}>
              <Button variant='primary' className='ms-3'>
                🛒 Total: $ <span className='badge bg-primary'>{Total}</span>
              </Button>
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navegador
