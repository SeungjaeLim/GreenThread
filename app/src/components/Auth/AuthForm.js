import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Link, Alert, Box } from '@mui/material';
import { loginUser, registerUser } from '../../api/api';
import logo from '../../assets/images/logo.png';

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
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <img src={logo} alt="Logo" style={{ width: '500px', marginBottom: '20px' }} />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isRegistering ? '회원가입' : 'Login'}
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop={2}>
        {isRegistering ? (
          <>
            계정이 있으신가요?{' '}
            <Link component="button" variant="body2" onClick={onSwitchMode}>
              로그인
            </Link>
          </>
        ) : (
          <>
            계정이 없으신가요?{' '}
            <Link component="button" variant="body2" onClick={onSwitchMode}>
              회원가입
            </Link>
          </>
        )}
      </Typography>
    </Container>
  );
};

export default AuthForm;
