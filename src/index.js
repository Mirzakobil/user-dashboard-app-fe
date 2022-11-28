import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Main from './main';
import PrivateRoute from './protected';
import RegisterRoute from './registerRoute.js';
import LoginRoute from './loginRoute';
import { Container, Col, Row } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Container>
        <Routes>
          <Route element={<RegisterRoute />}>
            <Route exact path="/register" element={<Register />} />
          </Route>
          <Route element={<LoginRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
