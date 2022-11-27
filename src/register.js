import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const apiLink1 = 'https://user-dashboard-api.onrender.com';
  const apiLink2 = 'http://localhost:4000';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    // set configurations
    const configuration = {
      method: 'post',
      url: `${apiLink1}/api/register`,
      data: {
        email,
        password,
        name,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
    // prevent the form from refreshing the whole page
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>
        {/* email */}
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

        {/* password */}
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

        {/* submit button */}
        <Button
          className="mt-3"
          variant="primary"
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
