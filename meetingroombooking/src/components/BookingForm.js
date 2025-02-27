import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import zhLocale from 'date-fns/locale/zh-CN';

const BookingForm = ({ roomId, onSubmit, onCancel }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [attendees, setAttendees] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!startTime || !endTime) {
      setError('请选择预约时间');
      return;
    }

    if (startTime >= endTime) {
      setError('结束时间必须晚于开始时间');
      return;
    }

    try {
      await onSubmit({
        roomId,
        startTime,
        endTime,
        attendees: parseInt(attendees),
        purpose
      });
    } catch (err) {
      setError(err.message || '预约失败');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          预约会议室
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhLocale}>
            <DateTimePicker
              label="开始时间"
              value={startTime}
              onChange={setStartTime}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
              )}
            />
            <DateTimePicker
              label="结束时间"
              value={endTime}
              onChange={setEndTime}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
              )}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            id="attendees"
            label="参会人数"
            type="number"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            inputProps={{ min: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="purpose"
            label="会议用途"
            multiline
            rows={4}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="submit" variant="contained">
              提交预约
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingForm;