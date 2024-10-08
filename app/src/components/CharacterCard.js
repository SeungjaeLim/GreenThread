import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Modal, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeCharacter, getCharacterImage } from '../api/api';
import axios from 'axios';

const CharacterCard = ({ character, onLike }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(character.like_count);

  useEffect(() => {
    // Fetch the image from the backend API when the component mounts
    const fetchImage = async () => {
      try {
        // Use the getCharacterImage function from api.js
        const imageBlob = await getCharacterImage(character.id);
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [character.id]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent card click event
    try {
      // Use the likeCharacter function from api.js
      await likeCharacter(character.id);
      setLikeCount(likeCount + 1); // Increment like count locally
    } catch (error) {
      console.error('Error liking character:', error);
    }
  };

  return (
    <>
      <Card onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
        <CardMedia
          component="img"
          height="300"
          image={imageSrc}
          alt={character.animal}
        />
        <CardContent>
          <Typography variant="h6">{character.name}</Typography> {/* Display character name */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Box display="flex" alignItems="center">
                <IconButton onClick={handleLike}>
                    <FavoriteIcon sx={{ color: 'red' }} />
                </IconButton>
              <Typography variant="body2">{likeCount}</Typography> {/* Show like count next to the heart */}
            </Box>
            <Typography variant="body2" color="textSecondary">{character.user_id}</Typography> {/* Display username on the right */}
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: '10%', backgroundColor: 'white', padding: 2 }}>
          <img src={imageSrc} alt={character.animal} style={{ width: '100%' }} />
        </Box>
      </Modal>
    </>
  );
};

export default CharacterCard;
