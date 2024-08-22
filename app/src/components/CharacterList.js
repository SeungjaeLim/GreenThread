import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import CharacterCard from './CharacterCard';
import { getMyCharacters, getAllCharacters, likeCharacter } from '../api/api';

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

  const handleLike = async (characterId) => {
    try {
      await likeCharacter(characterId);
      setCharacters(characters.map(char => 
        char.id === characterId ? { ...char, like_count: char.like_count + 1 } : char
      ));
    } catch (error) {
      console.error('Error liking character', error);
    }
  };

  return (
    <Container>
      {characters.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          style={{ marginTop: '20px', color: '#555' }}
        >
          아직 나만의 플로그가 없습니다. <br />플로깅을 통해 나만의 플로그를 생성해보세요.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {characters.map(character => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <CharacterCard character={character} onLike={handleLike} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CharacterList;
