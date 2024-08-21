import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AuthForm from './components/Auth/AuthForm';
import Plotting from './components/Plotting';
import CharacterList from './components/CharacterList';
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import theme from './theme';
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
      <AuthForm
        isRegistering={isRegistering}
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={() => setIsRegistering(!isRegistering)}
      /></ThemeProvider>
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
        <Fab color="primary" onClick={() => setView('plotting')} aria-label="plotting">
          <AddIcon />
        </Fab>
        <Fab color="secondary" onClick={handleViewMyCharacters} aria-label="my characters">
          <PersonIcon />
        </Fab>
        <Fab color="default" onClick={handleViewAllCharacters} aria-label="all characters">
          <ListIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default App;
