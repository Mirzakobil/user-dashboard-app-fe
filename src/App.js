import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Container, Col, Row } from 'react-bootstrap';
import Register from './register';
import Login from './login';
import Main from './main';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import PrivateRoute from './protected';

function App() {
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location.href = '/';
  };
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Task4</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {!token && <a href="/login">Login</a>}
              {!token && <a href="/register">Register</a>}
              {token && <p className="mt-2">{email}</p>}
              {token && (
                <Nav.Link href="" onClick={(e) => logoutHandler(e)}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
