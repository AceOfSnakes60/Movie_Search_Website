import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Main from './Main'
import About from './About'
import Login from './Login'
import Register from './Register'

function Header() {

    return (
        <Router>
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to={'/home'}>Movie Paradise</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Nav.Link as={Link} to={'/home'}>Home</Nav.Link>
                                <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                                <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                                <Nav.Link as={Link} to={'/register'}>Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
            <Routes>
                <Route path="/home" Component={Main} />
                <Route path="/about" Component={About} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
            </Routes>
        </Router>
    )
}

export default Header;