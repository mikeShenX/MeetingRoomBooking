import './App.css';
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MeetingRoom from './components/meeting/MeetingRoom';
import RoomManagement from './components/meeting/RoomManagement';
import Booking from './components/Booking';
import UserManagement from './components/users/UserManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { isAuthenticated, logout, isAdmin } from './services/authService';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ bgcolor: 'purple' }}>
          <Toolbar>
            {isAuthenticated() && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
              会议室预约系统
            </Typography>
            {!isAuthenticated() ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  登录
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  注册
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                退出登录
              </Button>
            )}
          </Toolbar>
        </AppBar>
        
        {/* 侧边可折叠菜单 */}
        {isAuthenticated() && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer}
            >
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="首页" />
                </ListItem>
                <ListItem button component={Link} to="/meeting-rooms">
                  <ListItemIcon>
                    <MeetingRoomIcon />
                  </ListItemIcon>
                  <ListItemText primary="会议室" />
                </ListItem>
                {isAdmin() && (
                  <ListItem button component={Link} to="/room-management">
                    <ListItemIcon>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="会议室管理" />
                  </ListItem>
                )}
                <ListItem button component={Link} to="/booking">
                  <ListItemIcon>
                    <BookOnlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="我的预约" />
                </ListItem>
                {isAdmin() && (
                  <>
                    <Divider />
                    <ListItem button component={Link} to="/users">
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="用户管理" />
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meeting-rooms" element={
            <ProtectedRoute>
              <MeetingRoom />
            </ProtectedRoute>
          } />
          <Route path="/booking" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/room-management" element={
            <ProtectedRoute>
              <RoomManagement />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            isAuthenticated() ? (
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  欢迎使用会议室预约系统
                </Typography>
              </Container>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
