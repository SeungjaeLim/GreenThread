import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Link, Alert } from '@mui/material';
import { loginUser, registerUser } from '../../api/api';

const AuthForm = ({ isRegistering, onAuthSuccess, onSwitchMode }) => {
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(id, phoneNumber);
        setSuccess('Registration successful! You can now log in.');
        setError('');
        setId('');
        setPhoneNumber('');
        onSwitchMode(); // Switch back to login mode after registration
      } else {
        await loginUser(id, phoneNumber);
        onAuthSuccess(id);
      }
    } catch (err) {
      setError(isRegistering ? 'Registration failed' : 'Login failed');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
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
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop={2}>
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <Link component="button" variant="body2" onClick={onSwitchMode}>
              Login here
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Link component="button" variant="body2" onClick={onSwitchMode}>
              Register here
            </Link>
          </>
        )}
      </Typography>
    </Container>
  );
};

export default AuthForm;
