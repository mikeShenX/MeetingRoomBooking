import { getData, saveData, generateId } from './mockData';

export const getBookings = () => {
  const data = getData();
  return data.bookings;
};

export const createBooking = (bookingData) => {
  const data = getData();
  const newBooking = {
    ...bookingData,
    id: generateId(data.bookings)
  };
  data.bookings.push(newBooking);
  saveData(data);
  return newBooking;
};

export const checkAvailability = (roomId, startTime, endTime) => {
  const data = getData();
  return !data.bookings.some(booking => 
    booking.roomId === roomId &&
    new Date(startTime) < new Date(booking.endTime) && 
    new Date(endTime) > new Date(booking.startTime)
  );
};

export const updateBooking = (id, bookingData) => {
  const data = getData();
  const index = data.bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    data.bookings[index] = { ...data.bookings[index], ...bookingData };
    saveData(data);
    return data.bookings[index];
  }
  return null;
};

export const cancelBooking = (id) => {
  const data = getData();
  data.bookings = data.bookings.filter(b => b.id !== id);
  saveData(data);
};
