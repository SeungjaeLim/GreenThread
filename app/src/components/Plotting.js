import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl, Alert, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';  // Import green color palette
import { generateCharacter } from '../api/api';
import runningImage from '../assets/images/running.png';
import standingImage from '../assets/images/standing.png';
import logo from '../assets/images/logo.png';

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

const Plotting = ({ userId, onViewMyCharacters }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [color, setColor] = useState('');
  const [animal, setAnimal] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startPlotting = () => {
    setIsRunning(true);
    setTime(0);
  };

  const stopPlotting = () => {
    setIsRunning(false);
    setOpen(true);
  };

  const validateForm = () => {
    if (!name || !theme || !color || !animal) {
      setError('All fields are required!');
      return false;
    }
    setError('');
    return true;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await generateCharacter(userId, name, theme, color, animal);
      
      // Simulate a loading delay of 30 seconds
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        onViewMyCharacters();  // Switch to the My Characters view
      }, 30000);

    } catch (error) {
      console.error('Error generating character', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',  // Adjust height to center vertically
        textAlign: 'center',
      }}>
        <img src={isRunning ? runningImage : standingImage} alt="Character" style={{ width: '150px', height: 'auto', marginBottom: '20px' }} />
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>{formatTime(time)}</Typography>
        <Button variant="contained" sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }} onClick={isRunning ? stopPlotting : startPlotting}>
          {isRunning ? 'End Plotting' : 'Start Plotting'}
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, bgcolor: 'background.paper', p: 4, m: 'auto', mt: 5 }}>
          <Typography variant="h6" gutterBottom>Choose Your Character</Typography>
          
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              '& label.Mui-focused': {
                color: green[700],
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: green[700],
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: green[500],
                },
                '&:hover fieldset': {
                  borderColor: green[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: green[700],
                },
              },
            }}
          />

          {/* Theme Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: green[500] }}>Theme</InputLabel>
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              label="Theme"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: green[500],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: green[700],
                },
                '& .MuiSelect-icon': {
                  color: green[500],
                },
              }}
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
            <InputLabel sx={{ color: green[500] }}>Color</InputLabel>
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
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: green[500],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: green[700],
                },
                '& .MuiSelect-icon': {
                  color: green[500],
                },
              }}
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
            sx={{
              '& label.Mui-focused': {
                color: green[700],
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: green[700],
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: green[500],
                },
                '&:hover fieldset': {
                  borderColor: green[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: green[700],
                },
              },
            }}
          />

          <Button variant="contained" sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }} onClick={handleGenerate} fullWidth disabled={loading}>
            Generate Character
          </Button>

          {loading && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <CircularProgress sx={{ color: green[500] }} />
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Loading... Please do not close this window. Closing may cause errors.
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Plotting;
