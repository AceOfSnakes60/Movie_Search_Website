import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    const storedData = localStorage.getItem('userInfo');
    const userData = JSON.parse(storedData);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>Movie Paradise</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            {userData && <Nav.Link as={Link} to={'/findMovieAI'}>AI Movie Finder</Nav.Link>}
                            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                            {!userData && <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>}
                            {!userData && <Nav.Link as={Link} to={'/register'}>Register</Nav.Link>}
                            {userData && <NavDropdown title="My Profile" id="basic-nav-dropdown" >
                                <NavDropdown.Item as={Link} to={'/myAccount'}>My account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    localStorage.removeItem('userInfo')
                                    navigate('/')
                                }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header;