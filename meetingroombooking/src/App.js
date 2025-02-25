import './App.css';
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MeetingRoom from './components/meeting/MeetingRoom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
              会议室预约系统
            </Typography>
            <Button color="inherit" component={Link} to="/login">
              登录
            </Button>
            <Button color="inherit" component={Link} to="/register">
              注册
            </Button>
            <Button color="inherit" component={Link} to="/meeting-rooms">
              会议室
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meeting-rooms" element={<MeetingRoom />} />
          <Route path="/" element={
            <Container maxWidth="lg" sx={{ mt: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                欢迎使用会议室预约系统
              </Typography>
              
            </Container>
          } />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
