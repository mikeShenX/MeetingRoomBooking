import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const UserList = ({ users, onDelete, onEdit }) => {
  const handleRoleChange = (userId, newRole) => {
    // TODO
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>用户名</TableCell>
          <TableCell>邮箱</TableCell>
          <TableCell>角色</TableCell>
          <TableCell>操作</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                size="small"
              >
                <MenuItem value="user">普通用户</MenuItem>
                <MenuItem value="admin">管理员</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <IconButton 
                color="primary" 
                onClick={() => onEdit(user)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <Button 
                variant="contained" 
                color="error"
                size="small"
                onClick={() => onDelete(user.id)}
                sx={{ ml: 1 }}
              >
                删除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
