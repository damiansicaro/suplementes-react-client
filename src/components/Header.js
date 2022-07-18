import { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import UserContext from "../UserContext";

function notLoggedMenu() {
  return (
    <Nav className="me-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
  )
}

function loggedMenu() {
  return (
    <Nav className="me-auto">
      <Nav.Link href="/logout">Logout</Nav.Link>
      <Nav.Link href="/products/new">Nuevo Producto</Nav.Link>
    </Nav>
  )
}

function Header() {
  const { user } = useContext(UserContext);
  let Menu = notLoggedMenu
  if (user) Menu = loggedMenu

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href="/">Suplementes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Menu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header