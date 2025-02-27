import { getData, saveData, generateId } from './mockData';

export const getAllRooms = async () => {
  try {
    const data = getData();
    return data.rooms;
  } catch (error) {
    throw { message: '获取会议室列表失败' };
  }
};

export const getRoomById = async (roomId) => {
  try {
    const data = getData();
    const room = data.rooms.find(r => r.id === roomId);
    if (!room) {
      throw { message: '会议室不存在' };
    }
    return room;
  } catch (error) {
    throw error || { message: '获取会议室信息失败' };
  }
};

export const addRoom = async (roomData) => {
  try {
    const data = getData();
    const newRoom = {
      id: generateId(data.rooms),
      ...roomData,
      status: 'available'
    };
    data.rooms.push(newRoom);
    saveData(data);
    return newRoom;
  } catch (error) {
    throw { message: '添加会议室失败' };
  }
};

export const updateRoom = async (roomId, roomData) => {
  try {
    const data = getData();
    const index = data.rooms.findIndex(r => r.id === roomId);
    if (index === -1) {
      throw { message: '会议室不存在' };
    }
    data.rooms[index] = { ...data.rooms[index], ...roomData };
    saveData(data);
    return data.rooms[index];
  } catch (error) {
    throw error || { message: '更新会议室信息失败' };
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const data = getData();
    const index = data.rooms.findIndex(r => r.id === roomId);
    if (index === -1) {
      throw { message: '会议室不存在' };
    }
    const hasBookings = data.bookings.some(b => 
      b.roomId === roomId && 
      new Date(b.endTime) > new Date()
    );
    if (hasBookings) {
      throw { message: '该会议室还有未完成的预约，无法删除' };
    }
    data.rooms.splice(index, 1);
    saveData(data);
    return { message: '会议室删除成功' };
  } catch (error) {
    throw error || { message: '删除会议室失败' };
  }
};