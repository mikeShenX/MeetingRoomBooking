import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { getCurrentUser, logout } from '../services/auth';

const Navigation = () => {
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <AppBar position="static" sx={{ bgcolor: 'red' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          会议室预约系统
        </Typography>
        <Box>
          {currentUser ? (
            <div>
              <Typography variant="subtitle1" style={{ marginRight: '16px', display: 'inline-block' }}>
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
