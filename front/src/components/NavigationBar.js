import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flogging App
        </Typography>
        <Button color="inherit" onClick={() => navigate('/main')}>Flogging</Button>
        <Button color="inherit" onClick={() => navigate('/mybadge')}>My Badge</Button>
        <Button color="inherit" onClick={() => navigate('/badges')}>Badges</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
