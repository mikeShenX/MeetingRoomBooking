import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        欢迎使用会议室预约系统
      </Typography>
    </Container>
  );
};

export default Home;