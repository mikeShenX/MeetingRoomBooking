import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText
} from '@mui/material';

const UserForm = ({ user, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        id: user.id,
        username: user.username,
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || 'user'
      });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = '密码不能为空';
      } else if (formData.password.length < 6) {
        newErrors.password = '密码长度不能少于6个字符';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const userData = {
        ...formData
      };
      
      // 如果是编辑模式且没有修改密码，则不提交密码字段
      if (isEditing && !formData.password) {
        delete userData.password;
        delete userData.confirmPassword;
      } else {
        delete userData.confirmPassword;
      }
      
      onSubmit(userData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="用户名"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="邮箱"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label={isEditing ? "新密码（不修改请留空）" : "密码"}
        type="password"
        id="password"
        required={!isEditing}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      
      <TextField
        margin="normal"
        fullWidth
        name="confirmPassword"
        label="确认密码"
        type="password"
        id="confirmPassword"
        required={!isEditing || !!formData.password}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">角色</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={formData.role}
          label="角色"
          onChange={handleChange}
        >
          <MenuItem value="user">普通用户</MenuItem>
          <MenuItem value="admin">管理员</MenuItem>
        </Select>
        <FormHelperText>选择用户角色</FormHelperText>
      </FormControl>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained">
          {isEditing ? '保存修改' : '添加用户'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;