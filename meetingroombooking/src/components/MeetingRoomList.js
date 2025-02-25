import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { MeetingRoom as MeetingRoomIcon } from '@mui/icons-material';

const MeetingRoomList = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: '会议室 A',
      capacity: 10,
      equipment: ['投影仪', '白板'],
      status: '空闲'
    },
    {
      id: 2,
      name: '会议室 B',
      capacity: 20,
      equipment: ['投影仪', '视频会议系统'],
      status: '已预约'
    },
  ]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        会议室列表
      </Typography>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MeetingRoomIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    {room.name}
                  </Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  容纳人数: {room.capacity}人
                </Typography>
                <Box sx={{ mb: 1.5 }}>
                  {room.equipment.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Chip
                  label={room.status}
                  color={room.status === '空闲' ? 'success' : 'default'}
                  variant="outlined"
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  disabled={room.status !== '空闲'}
                >
                  预约
                </Button>
                <Button size="small">查看详情</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MeetingRoomList;