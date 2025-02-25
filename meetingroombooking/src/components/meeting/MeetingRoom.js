import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const MeetingRoom = () => {
  // 模拟会议室数据，后续将从API获取
  const meetingRooms = [
    { id: 1, name: '会议室A', capacity: 10, status: '空闲' },
    { id: 2, name: '会议室B', capacity: 20, status: '使用中' },
    { id: 3, name: '会议室C', capacity: 15, status: '空闲' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        会议室列表
      </Typography>
      <Grid container spacing={2}>
        {meetingRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card sx={{ borderRadius: "30px" }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {room.name}
                </Typography>
                <Typography color="textSecondary">
                  容纳人数: {room.capacity}人
                </Typography>
                <Typography color="textSecondary">
                  状态: {room.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  预约
                </Button>
                <Button size="small" color="primary">
                  查看详情
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MeetingRoom;