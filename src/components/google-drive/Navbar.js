import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm" style={{padding: "0px"}}>
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} alt="logo" style={{width: "80px"}} />
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
