import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Typography, Box, Modal, Card, CardMedia, CardContent } from '@mui/material';
import { CntContext } from '../CntContext';

const badgeImages = [
  { id: 1, image: '/assets/badge1.png' },
  { id: 2, image: '/assets/badge2.png' },
  { id: 3, image: '/assets/badge3.png' },
];

const MainScreen = () => {
  const [isFlogging, setIsFlogging] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState(false);
  const { cnt, setCnt } = useContext(CntContext);

  useEffect(() => {
    let timer;
    if (isFlogging) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setDistance((prevDistance) => prevDistance + Math.floor(Math.random() * 10));
      }, 1000);
    } else if (!isFlogging && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isFlogging, time]);

  const handleStart = () => {
    setIsFlogging(true);
  };

  const handleStop = () => {
    setIsFlogging(false);
    setOpen(true);
    setCnt(cnt + 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentBadge = badgeImages[(cnt + 1) % badgeImages.length];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Flogging</Typography>
      <Box display="flex" justifyContent="center" m={1}>
        {!isFlogging ? (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Flogging
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleStop}>
            Stop Flogging
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent="center" m={1}>
        <Typography variant="h6">Time: {time} seconds</Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={1}>
        <Typography variant="h6">Distance: {distance} meters</Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={1}>
        <Typography variant="h6">CNT Badges: {cnt}</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, backgroundColor: 'white', padding: '16px', textAlign: 'center' }}>
          <Typography variant="h6" id="simple-modal-title">Flogging Summary</Typography>
          <Typography variant="subtitle1" id="simple-modal-description">Flogging time: {time} seconds</Typography>
          <Typography variant="subtitle1">Flogging distance: {distance} meters</Typography>
          <Typography variant="h6">You've earned a badge!</Typography>
          {currentBadge && (
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={currentBadge.image}
                alt={`Badge ${cnt + 1}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Badge {cnt + 1}
                </Typography>
              </CardContent>
            </Card>
          )}
          <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default MainScreen;
