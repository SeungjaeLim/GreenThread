import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { registerUser } from '../../api/api';

const Register = ({ onRegister }) => {
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(id, phoneNumber);
      onRegister(id);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
