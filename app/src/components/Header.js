import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onViewMyCharacters, onViewAllCharacters }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Flogging WebApp
      </Typography>
      <Button color="inherit" onClick={onViewMyCharacters}>My Characters</Button>
      <Button color="inherit" onClick={onViewAllCharacters}>All Characters</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
