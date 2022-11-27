import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        localStorage.setItem('id', result.data.id);
        localStorage.setItem('email', result.data.email);
        localStorage.setItem('token', result.data.token);
        window.location.href = '/';
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });

    e.preventDefault();

    setEmail('');
    setPassword('');
  };
  return (
    <div id="login-form">
      <h2 className="mt-5">Login</h2>
      <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        {error && (
          <Alert className="mt-3" key={'danger'} variant={'danger'}>
            Invalid credentials or Blocked user
          </Alert>
        )}
        <Button
          className="mt-2"
          variant="primary"
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
