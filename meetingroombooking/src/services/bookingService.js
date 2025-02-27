import { getData, saveData, generateId } from './mockData';


export const getAllBookings = async () => {
  try {
    const data = getData();
    return data.bookings;
  } catch (error) {
    throw { message: '获取预约列表失败' };
  }
};

export const getUserBookings = async (userId) => {
  try {
    const data = getData();
    return data.bookings.filter(b => b.userId === userId);
  } catch (error) {
    throw { message: '获取用户预约列表失败' };
  }
};


export const getRoomBookings = async (roomId) => {
  try {
    const data = getData();
    return data.bookings.filter(b => b.roomId === roomId);
  } catch (error) {
    throw { message: '获取会议室预约列表失败' };
  }
};

export const createBooking = async (bookingData) => {
  try {
    const data = getData();
    const { roomId, startTime, endTime } = bookingData;
    
    // 检查时间冲突
    const hasConflict = data.bookings.some(b => 
      b.roomId === roomId &&
      new Date(startTime) < new Date(b.endTime) &&
      new Date(endTime) > new Date(b.startTime)
    );

    if (hasConflict) {
      throw { message: '该时间段已被预约' };
    }

    const newBooking = {
      id: generateId(data.bookings),
      ...bookingData,
      status: 'confirmed'
    };

    data.bookings.push(newBooking);
    saveData(data);
    return newBooking;
  } catch (error) {
    throw error || { message: '创建预约失败' };
  }
};


export const updateBooking = async (bookingId, bookingData) => {
  try {
    const data = getData();
    const index = data.bookings.findIndex(b => b.id === bookingId);
    if (index === -1) {
      throw { message: '预约不存在' };
    }

    if (bookingData.startTime || bookingData.endTime) {
      const { roomId } = data.bookings[index];
      const startTime = bookingData.startTime || data.bookings[index].startTime;
      const endTime = bookingData.endTime || data.bookings[index].endTime;

      const hasConflict = data.bookings.some(b => 
        b.id !== bookingId &&
        b.roomId === roomId &&
        new Date(startTime) < new Date(b.endTime) &&
        new Date(endTime) > new Date(b.startTime)
      );

      if (hasConflict) {
        throw { message: '该时间段已被预约' };
      }
    }

    data.bookings[index] = { ...data.bookings[index], ...bookingData };
    saveData(data);
    return data.bookings[index];
  } catch (error) {
    throw error || { message: '更新预约失败' };
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const data = getData();
    const index = data.bookings.findIndex(b => b.id === bookingId);
    if (index === -1) {
      throw { message: '预约不存在' };
    }

    if (new Date(data.bookings[index].startTime) < new Date()) {
      throw { message: '无法取消已开始的预约' };
    }

    data.bookings.splice(index, 1);
    saveData(data);
    return { message: '预约取消成功' };
  } catch (error) {
    throw error || { message: '取消预约失败' };
  }
};