import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getData, saveData, generateId } from '../../services/mockData';
import { isAdmin } from '../../services/authService';
import UserList from './UserList';
import UserForm from './UserForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const data = getData();
    setUsers(data.users);
  };

  const handleAddUser = (userData) => {
    const data = getData();
    const newUser = {
      id: generateId(data.users),
      ...userData
    };
    
    const updatedUsers = [...data.users, newUser];
    saveData({...data, users: updatedUsers});
    setUsers(updatedUsers);
    setOpenAddDialog(false);
  };

  const handleEditUser = (userData) => {
    const data = getData();
    const updatedUsers = data.users.map(user => 
      user.id === userData.id ? {...user, ...userData} : user
    );
    
    saveData({...data, users: updatedUsers});
    setUsers(updatedUsers);
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (userId) => {
    const data = getData();
    const updatedUsers = data.users.filter(user => user.id !== userId);
    saveData({...data, users: updatedUsers});
    setUsers(updatedUsers);
  };

  const openEditUserDialog = (user) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  if (!isAdmin()) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error">无权限访问此页面</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>您需要管理员权限才能访问用户管理功能</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          用户管理
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          添加用户
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <UserList 
          users={users} 
          onDelete={handleDeleteUser} 
          onEdit={openEditUserDialog} 
        />
      </Paper>

      {/* 添加用户对话框 */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>添加新用户</DialogTitle>
        <DialogContent>
          <UserForm onSubmit={handleAddUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>取消</Button>
        </DialogActions>
      </Dialog>

      {/* 编辑用户对话框 */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>编辑用户</DialogTitle>
        <DialogContent>
          {currentUser && <UserForm user={currentUser} onSubmit={handleEditUser} isEditing />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;