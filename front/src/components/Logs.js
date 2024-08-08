// src/components/Logs.js
import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/logs')
      .then(response => setLogs(response.data.logs))
      .catch(error => console.error(error));
  }, []);

  return (
    <Grid container spacing={2}>
      {logs.map((log, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={log.image}
              alt={`Log ${index + 1}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {log.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Logs;
