// src/components/Flogging.js
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const Flogging = () => {
  const [flogging, setFlogging] = useState(false);
  const [time, setTime] = useState(0);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    let timer;
    if (flogging) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!flogging && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [flogging]);

  const handleStartStop = () => {
    if (flogging) {
      // Stop flogging and send data to backend
      axios.post('http://localhost:8000/api/flogging', { time })
        .then(response => {
          setBadge(response.data.badge);
        })
        .catch(error => console.error(error));
    }
    setFlogging(!flogging);
    if (!flogging) {
      setTime(0);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>
        {flogging ? `Flogging Time: ${time}s` : 'Start Flogging'}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStartStop}>
        {flogging ? 'Stop Flogging' : 'Start Flogging'}
      </Button>
      {badge && (
        <Box mt={2}>
          <Typography variant="h6">You earned a badge!</Typography>
          <img src={badge} alt="Badge" />
        </Box>
      )}
    </Box>
  );
};

export default Flogging;
