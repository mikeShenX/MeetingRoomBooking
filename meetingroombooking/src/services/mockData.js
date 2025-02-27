// 初始化模拟数据
const initialData = {
  users: [
    {
      id: 1,
      username: 'admin',
      email: 'admin',
      password: 'admin123',
      role: 'admin'
    },
    {
      id: 2,
      username: 'user',
      email: 'user',
      password: 'user123',
      role: 'user'
    }
  ],
  rooms: [
    {
      id: 1,
      name: '会议室A',
      capacity: 10,
      facilities: ['投影仪', '白板'],
      status: 'available'
    },
    {
      id: 2,
      name: '会议室B',
      capacity: 20,
      facilities: ['投影仪', '视频会议系统'],
      status: 'available'
    },
    {
      id: 3,
      name: '会议室C',
      capacity: 5,
      facilities: ['白板'],
      status: 'available'
    }
  ],
  bookings: [
    {
      id: 1,
      roomId: 1,
      userId: 2,
      startTime: '2024-01-20T09:00:00',
      endTime: '2024-01-20T10:00:00',
      title: '项目讨论会',
      description: '讨论新项目进展'
    }
  ]
};

const getData = () => {
  const data = localStorage.getItem('mockData');
  if (!data) {
    localStorage.setItem('mockData', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const saveData = (data) => {
  localStorage.setItem('mockData', JSON.stringify(data));
};

const generateId = (items) => {
  return Math.max(...items.map(item => item.id), 0) + 1;
};

export { getData, saveData, generateId };