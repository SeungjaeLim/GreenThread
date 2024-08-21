import React, { useState } from 'react';
import AuthForm from './components/Auth/AuthForm';
import Plotting from './components/Plotting';
import CharacterList from './components/CharacterList';
import Header from './components/Header';

function App() {
  const [userId, setUserId] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [view, setView] = useState('plotting'); // 'plotting', 'myCharacters', 'allCharacters'

  const handleAuthSuccess = (id) => {
    setUserId(id);
    setView('plotting');
  };

  if (!userId) {
    return (
      <AuthForm
        isRegistering={isRegistering}
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={() => setIsRegistering(!isRegistering)}
      />
    );
  }

  const handleViewMyCharacters = () => setView('myCharacters');
  const handleViewAllCharacters = () => setView('allCharacters');

  return (
    <div>
      <Header onViewMyCharacters={handleViewMyCharacters} onViewAllCharacters={handleViewAllCharacters} />
      {view === 'plotting' && <Plotting userId={userId} />}
      {view === 'myCharacters' && <CharacterList userId={userId} />}
      {view === 'allCharacters' && <CharacterList viewAll />}
    </div>
  );
}

export default App;
