import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import CharacterCard from './CharacterCard';
import { getMyCharacters, getAllCharacters } from '../api/api';

const CharacterList = ({ userId, viewAll = false }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = viewAll ? await getAllCharacters() : await getMyCharacters(userId);
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters', error);
      }
    };
    fetchCharacters();
  }, [userId, viewAll]);

  return (
    <Container>
      <Grid container spacing={3}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard character={character} onLike={(id) => console.log(`Liked character ${id}`)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CharacterList;
