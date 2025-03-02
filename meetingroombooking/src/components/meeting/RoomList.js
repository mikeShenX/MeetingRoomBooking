import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const RoomList = ({ rooms, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>名称</TableCell>
            <TableCell>容量</TableCell>
            <TableCell>设施</TableCell>
            <TableCell>状态</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.id}</TableCell>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity} 人</TableCell>
              <TableCell>
                {room.facilities && room.facilities.map((facility, index) => (
                  <Chip 
                    key={index} 
                    label={facility} 
                    size="small" 
                    sx={{ mr: 0.5, mb: 0.5 }} 
                  />
                ))}
              </TableCell>
              <TableCell>
                <Chip 
                  label={room.status === 'available' ? '空闲' : '使用中'} 
                  color={room.status === 'available' ? 'success' : 'error'}
                  size="small" 
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="编辑">
                  <IconButton onClick={() => onEdit(room)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除">
                  <IconButton onClick={() => onDelete(room.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomList;