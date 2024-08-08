import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MainScreen from './components/MainScreen';
import BadgeView from './components/BadgeView';
import MyBadgeView from './components/MyBadgeView';
import NavigationBar from './components/NavigationBar';
import { CntProvider } from './CntContext';

function App() {
  return (
    <CntProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/badges" element={<BadgeView />} />
        <Route path="/mybadge" element={<MyBadgeView />} />
      </Routes>
    </CntProvider>
  );
}

export default App;
