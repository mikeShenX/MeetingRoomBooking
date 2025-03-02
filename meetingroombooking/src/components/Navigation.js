import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { getCurrentUser, logout, isAdmin } from '../services/authService';

const Navigation = () => {
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <AppBar position="static" sx={{ bgcolor: 'purple' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          会议室预约系统
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {currentUser && (
            <>
              <Button color="inherit" href="/bookings">我的预约</Button>
              {isAdmin() && (
                <>
                  <Button color="inherit" href="/rooms">会议室管理</Button>
                  <Button color="inherit" href="/users">用户管理</Button>
                </>
              )}
            </>
          )}
        </Box>
        <Box>
          {currentUser ? (
            <div>
              <Typography variant="subtitle1" sx={{ mr: 2, display: 'inline-block' }}>
                欢迎, {currentUser.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                退出
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" href="/login">
                登录
              </Button>
              <Button color="inherit" href="/register">
                注册
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
