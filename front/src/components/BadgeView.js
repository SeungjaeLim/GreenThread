import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

const BadgeView = () => {
  const badges = [
    { id: 1, name: 'Badge 1', image: '/assets/badge1.png' },
    { id: 2, name: 'Badge 2', image: '/assets/badge2.png' },
    { id: 3, name: 'Badge 3', image: '/assets/badge3.png' },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Badges</Typography>
      <Box>
        <Grid container spacing={2}>
          {badges.map((badge) => (
            <Grid item xs={4} key={badge.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={badge.image}
                  alt={badge.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {badge.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BadgeView;
