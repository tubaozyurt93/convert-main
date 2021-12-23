import React from 'react'
import { Nav, Navbar, Container,Button } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { useSelector } from 'react-redux'
import Search from './Search';


export default function Menu() {


const { logout } = useAuth()
  const state = useSelector(state => state)
  console.log('State', state)
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Muni</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="#features">Total Worth: {localStorage.getItem('total')}</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">User</a>
                  <Button className="btn-sm ms-3 btn-secondary" onClick={logout}>Logout</Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Search/>
    </div>
  )
}
