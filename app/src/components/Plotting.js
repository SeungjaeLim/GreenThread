import React, { useState } from 'react';
import { Button, Container, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { generateCharacter } from '../api/api';
import runningImage from '../assets/images/running.png';
import standingImage from '../assets/images/standing.png';

const themes = [
  '귀여운', 
  '멋있는', 
  '우아한'
];

const colors = [
  { name: 'Red', value: 'red' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Green', value: 'green' },
  { name: 'Blue', value: 'blue' },
  { name: 'Pink', value: 'pink' },
  { name: 'Black', value: 'black' },
  { name: 'White', value: 'white' },
];

const Plotting = ({ userId }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [color, setColor] = useState('');
  const [animal, setAnimal] = useState('');

  const startPlotting = () => {
    setIsRunning(true);
    setTime(0);
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const stopPlotting = () => {
    setIsRunning(false);
    setOpen(true);
  };

  const handleGenerate = async () => {
    try {
      await generateCharacter(userId, name, theme, color, animal);
      setOpen(false);
    } catch (error) {
      console.error('Error generating character', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Time: {time} seconds</Typography>
      <img src={isRunning ? runningImage : standingImage} alt="Character" style={{ width: '100%', height: 'auto' }} />
      <Button variant="contained" color="primary" onClick={isRunning ? stopPlotting : startPlotting}>
        {isRunning ? 'End Plotting' : 'Start Plotting'}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, bgcolor: 'background.paper', p: 4, m: 'auto', mt: 5 }}>
          <Typography variant="h6" gutterBottom>Choose Your Character</Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Theme Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              label="Theme"
            >
              {themes.map((theme) => (
                <MenuItem key={theme} value={theme}>
                  {theme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Color Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="Color"
              renderValue={(selected) => (
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      height: 20,
                      width: 20,
                      backgroundColor: selected,
                      marginRight: 1,
                      borderRadius: '50%',
                    }}
                  />
                  {selected}
                </Box>
              )}
            >
              {colors.map((color) => (
                <MenuItem key={color.value} value={color.value}>
                  <Box
                    sx={{
                      height: 20,
                      width: 20,
                      backgroundColor: color.value,
                      marginRight: 1,
                      borderRadius: '50%',
                    }}
                  />
                  {color.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
            Generate Character
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Plotting;
