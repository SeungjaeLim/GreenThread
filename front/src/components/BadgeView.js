import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

const BadgeView = () => {
  const badges = [
    { id: 1, image: `${process.env.PUBLIC_URL}/assets/Badge1.png` },
    { id: 2, image: `${process.env.PUBLIC_URL}/assets/Badge2.png` },
    { id: 3, image: `${process.env.PUBLIC_URL}/assets/Badge3.png` },
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
