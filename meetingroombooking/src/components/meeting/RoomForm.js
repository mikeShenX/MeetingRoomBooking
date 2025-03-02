import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText
} from '@mui/material';

const FACILITIES = [
  '投影仪',
  '白板',
  '视频会议系统',
  '音响设备',
  '空调',
  'WiFi'
];

const RoomForm = ({ room, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    facilities: [],
    status: 'available'
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (room && isEditing) {
      setFormData({
        id: room.id,
        name: room.name || '',
        capacity: room.capacity || '',
        facilities: room.facilities || [],
        status: room.status || 'available'
      });
    }
  }, [room, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFacilitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      facilities: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '会议室名称不能为空';
    }
    
    if (!formData.capacity) {
      newErrors.capacity = '容量不能为空';
    } else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      newErrors.capacity = '容量必须是大于0的数字';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const roomData = {
        ...formData,
        capacity: parseInt(formData.capacity)
      };
      
      onSubmit(roomData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="会议室名称"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="capacity"
        label="容纳人数"
        name="capacity"
        type="number"
        value={formData.capacity}
        onChange={handleChange}
        error={!!errors.capacity}
        helperText={errors.capacity}
        inputProps={{ min: 1 }}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="facilities-label">设施</InputLabel>
        <Select
          labelId="facilities-label"
          id="facilities"
          multiple
          value={formData.facilities}
          onChange={handleFacilitiesChange}
          input={<OutlinedInput id="select-multiple-chip" label="设施" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {FACILITIES.map((facility) => (
            <MenuItem key={facility} value={facility}>
              {facility}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>选择会议室配备的设施</FormHelperText>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">状态</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={formData.status}
          label="状态"
          onChange={handleChange}
        >
          <MenuItem value="available">空闲</MenuItem>
          <MenuItem value="occupied">使用中</MenuItem>
        </Select>
        <FormHelperText>设置会议室当前状态</FormHelperText>
      </FormControl>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained">
          {isEditing ? '保存修改' : '添加会议室'}
        </Button>
      </Box>
    </Box>
  );
};

export default RoomForm;