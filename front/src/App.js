// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Flogging from './components/Flogging';
import Logs from './components/Logs';
import MyLogs from './components/MyLogs';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flogging App
          </Typography>
          <Button color="inherit" href="/logs">People's Logs</Button>
          <Button color="inherit" href="/my-logs">My Logs</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={2}>
          <Routes>
            <Route path="/" element={<Flogging />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/my-logs" element={<MyLogs />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
