import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { zhCN } from 'date-fns/locale';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    room: '',
    startTime: null,
    endTime: null,
    title: '',
    attendees: '',
  });

  const [bookings, setBookings] = useState([]);
  const [rooms] = useState([
    { id: 1, name: '会议室A' },
    { id: 2, name: '会议室B' },
    { id: 3, name: '会议室C' },
  ]);

  const handleInputChange = (field) => (event) => {
    setBookingData({
      ...bookingData,
      [field]: event.target.value,
    });
  };

  const handleDateChange = (field) => (newValue) => {
    setBookingData({
      ...bookingData,
      [field]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: 实现预约提交逻辑
    const newBooking = {
      id: Date.now(),
      ...bookingData,
    };
    setBookings([...bookings, newBooking]);
    setBookingData({
      room: '',
      startTime: null,
      endTime: null,
      title: '',
      attendees: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              预约会议室
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>选择会议室</InputLabel>
                <Select
                  value={bookingData.room}
                  label="选择会议室"
                  onChange={handleInputChange('room')}
                  required
                >
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="开始时间"
                      value={bookingData.startTime}
                      onChange={handleDateChange('startTime')}
                      renderInput={(params) => <TextField {...params} fullWidth required />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="结束时间"
                      value={bookingData.endTime}
                      onChange={handleDateChange('endTime')}
                      renderInput={(params) => <TextField {...params} fullWidth required />}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>

              <TextField
                fullWidth
                label="会议主题"
                value={bookingData.title}
                onChange={handleInputChange('title')}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="参会人员"
                value={bookingData.attendees}
                onChange={handleInputChange('attendees')}
                margin="normal"
                helperText="多个参会人员请用逗号分隔"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                提交预约
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              我的预约
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>会议室</TableCell>
                    <TableCell>开始时间</TableCell>
                    <TableCell>结束时间</TableCell>
                    <TableCell>会议主题</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        {rooms.find((room) => room.id === booking.room)?.name}
                      </TableCell>
                      <TableCell>
                        {booking.startTime?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {booking.endTime?.toLocaleString()}
                      </TableCell>
                      <TableCell>{booking.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Booking;