import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl, Alert, CircularProgress } from '@mui/material';
import { green, red } from '@mui/material/colors';  // Import green and red color palettes
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
  
  // States to track errors for each field
  const [nameError, setNameError] = useState(false);
  const [themeError, setThemeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [animalError, setAnimalError] = useState(false);

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
  
  const togglePlotting = () => {
    if (isRunning) {
      stopPlotting();
    } else {
      startPlotting();
    }
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
    let valid = true;
    const missingFields = [];
    if (!name) missingFields.push('플로그 이름');
    if (!theme) missingFields.push('분위기');
    if (!color) missingFields.push('테마 색');
    if (!animal) missingFields.push('동물');
    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!theme) {
      setThemeError(true);
      valid = false;
    } else {
      setThemeError(false);
    }

    if (!color) {
      setColorError(true);
      valid = false;
    } else {
      setColorError(false);
    }

    if (!animal) {
      setAnimalError(true);
      valid = false;
    } else {
      setAnimalError(false);
    }

    if (!valid) {
        setError(`${missingFields.join(', ')}이(가) 결정되지 않았습니다.`);
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
        <img src={logo} alt="Logo" style={{ width: '80%', marginBottom: '20px' }} />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',  // Adjust height to center vertically
        textAlign: 'center',
      }}>
        <img
          src={isRunning ? runningImage : standingImage}
          alt="Character"
          style={{ width: '300px', height: 'auto', marginBottom: '20px', cursor: 'pointer' }}
          onClick={togglePlotting}  // Toggle start/stop on click
        />
        <Typography variant="h5" sx={{ marginBottom: '20px', fontSize: '60px' }}>
          {formatTime(time)}
        </Typography>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, bgcolor: 'background.paper', p: 4, m: 'auto', mt: 5 }}>
          <Typography variant="h6" gutterBottom>당신만의 플로그를 생성하세요</Typography>
          
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="플로그 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              '& label.Mui-focused': {
                color: nameError ? red[700] : green[700],
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: nameError ? red[700] : green[700],
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: nameError ? red[500] : green[500],
                },
                '&:hover fieldset': {
                  borderColor: nameError ? red[700] : green[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: nameError ? red[700] : green[700],
                },
              },
            }}
          />

          {/* Theme Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: themeError ? red[500] : green[500] }}>분위기</InputLabel>
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              label="Theme"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: themeError ? red[500] : green[500],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: themeError ? red[700] : green[700],
                },
                '& .MuiSelect-icon': {
                  color: themeError ? red[500] : green[500],
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
            <InputLabel sx={{ color: colorError ? red[500] : green[500] }}>테마 색</InputLabel>
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
                  borderColor: colorError ? red[500] : green[500],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorError ? red[700] : green[700],
                },
                '& .MuiSelect-icon': {
                  color: colorError ? red[500] : green[500],
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
            label="모티베이션 동물"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              '& label.Mui-focused': {
                color: animalError ? red[700] : green[700],
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: animalError ? red[700] : green[700],
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: animalError ? red[500] : green[500],
                },
                '&:hover fieldset': {
                  borderColor: animalError ? red[700] : green[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: animalError ? red[700] : green[700],
                },
              },
            }}
          />

          <Button variant="contained" sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }} onClick={handleGenerate} fullWidth disabled={loading}>
            플로그 생성하기
          </Button>

          {loading && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <CircularProgress sx={{ color: green[500] }} />
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                생성중입니다. 잠시만 기다려주세요.
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Plotting;
