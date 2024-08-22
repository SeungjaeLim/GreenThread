import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Link, Alert, Box } from '@mui/material';
import { loginUser, registerUser } from '../../api/api';
import logo from '../../assets/images/logo.png';

const AuthForm = ({ isRegistering, onAuthSuccess, onSwitchMode }) => {
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState(''); // Added for verification
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering && phoneNumber !== confirmPhoneNumber) {
      setError('전화번호가 일치하지 않습니다.');
      return;
    }

    try {
      if (isRegistering) {
        await registerUser(id, phoneNumber);
        setSuccess('회원가입이 완료되었습니다. 로그인해주세요.');
        setError('');
        setId('');
        setPhoneNumber('');
        setConfirmPhoneNumber(''); // Clear confirmation field
        onSwitchMode(); // Switch back to login mode after registration
      } else {
        await loginUser(id, phoneNumber);
        onAuthSuccess(id);
      }
    } catch (err) {
      setError(isRegistering ? '해당 ID로 회원가입한 기록이 존재합니다.' : 'ID와 전화번호를 다시 확인해주세요.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <img src={logo} alt="Logo" style={{ width: '80%', marginBottom: '20px' }} />
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
          label="전화번호 뒷자리 4자리"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        {isRegistering && (
          <TextField
            label="전화번호 뒷자리 4자리 확인"
            value={confirmPhoneNumber}
            onChange={(e) => setConfirmPhoneNumber(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isRegistering ? '회원가입' : '로그인'}
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop={2}>
      <>
                그린쓰레드는 회원가입 시 비밀번호 대신 전화번호 뒷자리 4자리를 사용합니다.{' '}
            </><div>    </div>
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
