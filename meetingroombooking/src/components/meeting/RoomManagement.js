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
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../services/roomService';
import { isAdmin } from '../../services/authService';
import RoomList from './RoomList';
import RoomForm from './RoomForm';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    const roomsData = getRooms();
    setRooms(roomsData);
  };

  const handleAddRoom = (roomData) => {
    const newRoom = addRoom(roomData);
    setRooms([...rooms, newRoom]);
    setOpenAddDialog(false);
  };

  const handleEditRoom = (roomData) => {
    const updatedRoom = updateRoom(roomData.id, roomData);
    if (updatedRoom) {
      setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room));
    }
    setOpenEditDialog(false);
    setCurrentRoom(null);
  };

  const handleDeleteRoom = (roomId) => {
    deleteRoom(roomId);
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const openEditRoomDialog = (room) => {
    setCurrentRoom(room);
    setOpenEditDialog(true);
  };

  if (!isAdmin()) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error">无权限访问此页面</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>您需要管理员权限才能访问会议室管理功能</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          会议室管理
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          添加会议室
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <RoomList 
          rooms={rooms} 
          onDelete={handleDeleteRoom} 
          onEdit={openEditRoomDialog} 
        />
      </Paper>

      {/* 添加会议室对话框 */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>添加新会议室</DialogTitle>
        <DialogContent>
          <RoomForm onSubmit={handleAddRoom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>取消</Button>
        </DialogActions>
      </Dialog>

      {/* 编辑会议室对话框 */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>编辑会议室</DialogTitle>
        <DialogContent>
          {currentRoom && <RoomForm room={currentRoom} onSubmit={handleEditRoom} isEditing />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomManagement;