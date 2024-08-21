import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { loginUser } from '../../api/api';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser(id, phoneNumber);
      onLogin(id);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={id}
          onChange={(e) => setId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
