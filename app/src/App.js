import React, { useState } from 'react';
import { ThemeProvider, Box } from '@mui/material';
import AuthForm from './components/Auth/AuthForm';
import Plotting from './components/Plotting';
import CharacterList from './components/CharacterList';
import Fab from '@mui/material/Fab';
import theme from './theme';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import './index.css';
function App() {
  const [userId, setUserId] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [view, setView] = useState('plotting'); // 'plotting', 'myCharacters', 'allCharacters'

  const handleAuthSuccess = (id) => {
    setUserId(id);
    setView('plotting');
  };

  const handleViewMyCharacters = () => setView('myCharacters');
  const handleViewAllCharacters = () => setView('allCharacters');

  if (!userId) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <AuthForm
            isRegistering={isRegistering}
            onAuthSuccess={handleAuthSuccess}
            onSwitchMode={() => setIsRegistering(!isRegistering)}
          />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {view === 'plotting' && <Plotting userId={userId} onViewMyCharacters={handleViewMyCharacters} />}
      {view === 'myCharacters' && <CharacterList userId={userId} />}
      {view === 'allCharacters' && <CharacterList viewAll />}

      {/* Floating Buttons */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}
      >
        <Fab 
            sx={{ 
              bgcolor: '#388E3C', // Darker green
              '&:hover': { bgcolor: '#2E7D32' } // Even darker on hover
            }} 
            onClick={() => setView('plotting')} 
            aria-label="plotting"
          >
            <DirectionsRunIcon sx={{ color: '#FFFFFF' }}/>
          </Fab>
          <Fab 
            sx={{ 
              bgcolor: '#2E7D32', // Even darker green
              '&:hover': { bgcolor: '#1B5E20' } // Even darker on hover
            }} 
            onClick={handleViewMyCharacters} 
            aria-label="my characters"
          >
            <HomeIcon sx={{ color: '#FFFFFF' }}/>
          </Fab>
          <Fab 
            sx={{ 
              bgcolor: '#1B5E20', // Darkest green
              '&:hover': { bgcolor: '#004d40' } // Even darker on hover
            }} 
            onClick={handleViewAllCharacters} 
            aria-label="all characters"
          >
            <PublicIcon sx={{ color: '#FFFFFF' }}/>
          </Fab>
      </Box>
    </div>
  );
}

export default App;