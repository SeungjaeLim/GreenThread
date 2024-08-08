import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

const BadgeView = () => {
  const badges = [
    { id: 1, name: 'Badge 1', image: '/assets/Badge1.png' },
    { id: 2, name: 'Badge 2', image: '/assets/Badge2.png' },
    { id: 3, name: 'Badge 3', image: '/assets/Badge3.png' },
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
                  height="280"
                  image={badge.image}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BadgeView;
