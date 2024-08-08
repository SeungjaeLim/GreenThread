import React, { useContext } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { CntContext } from '../CntContext';

const badgeImages = [
  { id: 1, image: '/assets/badge1.png' },
  { id: 2, image: '/assets/badge2.png' },
  { id: 3, image: '/assets/badge3.png' },
];

const MyBadgeView = () => {
  const { cnt } = useContext(CntContext);

  const getBadgeImages = () => {
    let badgesToShow = [];
    for (let i = 0; i < cnt; i++) {
      const badge = badgeImages[i % badgeImages.length];
      badgesToShow.push(
        <Grid item xs={4} key={i}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={badge.image}
              alt={`Badge ${i + 1}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Badge {i + 1}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return badgesToShow;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Badges</Typography>
      <Box display="flex" justifyContent="center" m={1}>
        <Typography variant="h6">You have {cnt} badge{cnt !== 1 ? 's' : ''}.</Typography>
      </Box>
      <Grid container spacing={2}>
        {getBadgeImages()}
      </Grid>
    </Container>
  );
};

export default MyBadgeView;
