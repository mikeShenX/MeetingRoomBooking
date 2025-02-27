import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';

const RoomList = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // 模拟会议室数据
  const rooms = [
    { id: 1, name: '会议室A', capacity: 10, equipment: '投影仪、白板', location: '1楼' },
    { id: 2, name: '会议室B', capacity: 20, equipment: '视频会议系统、白板', location: '2楼' },
    { id: 3, name: '会议室C', capacity: 30, equipment: '投影仪、音响系统', location: '3楼' },
  ];

  const handleBook = (room) => {
    navigate(`/book/${room.id}`, { state: { room } });
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        会议室列表
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>会议室名称</TableCell>
              <TableCell>容纳人数</TableCell>
              <TableCell>位置</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.capacity}人</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBook(room)}
                    style={{ marginRight: '10px' }}
                  >
                    预约
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewDetails(room)}
                  >
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedRoom && (
          <>
            <DialogTitle>{selectedRoom.name}详情</DialogTitle>
            <DialogContent>
              <Typography><strong>容纳人数：</strong>{selectedRoom.capacity}人</Typography>
              <Typography><strong>位置：</strong>{selectedRoom.location}</Typography>
              <Typography><strong>设备：</strong>{selectedRoom.equipment}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>关闭</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleCloseDialog();
                  handleBook(selectedRoom);
                }}
              >
                预约此会议室
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default RoomList;