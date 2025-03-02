import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import MeetingRoom from '../pages/meeting/MeetingRoom';
import RoomManagement from '../pages/meeting/RoomManagement';
import Booking from '../pages/booking/Booking';
import UserManagement from '../pages/users/UserManagement';
import Home from '../pages/home/Home';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { isAuthenticated } from '../services/authService';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/meeting-rooms" element={
        <ProtectedRoute>
          <MeetingRoom />
        </ProtectedRoute>
      } />
      <Route path="/booking" element={
        <ProtectedRoute>
          <Booking />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      } />
      <Route path="/room-management" element={
        <ProtectedRoute>
          <RoomManagement />
        </ProtectedRoute>
      } />
      <Route path="/" element={
        isAuthenticated() ? (
          <Home />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  );
};

export default AppRoutes;