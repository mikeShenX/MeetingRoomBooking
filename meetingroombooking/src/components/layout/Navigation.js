import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { isAuthenticated, logout, isAdmin } from '../../services/authService';

const Navigation = ({ drawerOpen, toggleDrawer }) => {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
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
    </>
  );
};

export default Navigation;