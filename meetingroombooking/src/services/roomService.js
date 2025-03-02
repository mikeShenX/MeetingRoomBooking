import { getData, saveData, generateId } from './mockData';

export const getRooms = () => {
  const data = getData();
  return data.rooms;
};

export const getRoomById = (id) => {
  const data = getData();
  return data.rooms.find(room => room.id === id);
};

export const addRoom = (roomData) => {
  const data = getData();
  const newRoom = {
    ...roomData,
    id: generateId(data.rooms),
    status: 'available'
  };
  data.rooms.push(newRoom);
  saveData(data);
  return newRoom;
};

export const updateRoom = (id, roomData) => {
  const data = getData();
  const index = data.rooms.findIndex(room => room.id === id);
  if (index !== -1) {
    data.rooms[index] = { ...data.rooms[index], ...roomData };
    saveData(data);
    return data.rooms[index];
  }
  return null;
};

export const deleteRoom = (id) => {
  const data = getData();
  data.rooms = data.rooms.filter(room => room.id !== id);
  saveData(data);
};
