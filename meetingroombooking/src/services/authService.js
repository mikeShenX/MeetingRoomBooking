import { getData } from './mockData';

const login = (username, password) => {
  const data = getData();
  const user = data.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const { password: _, ...userInfo } = user;
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    return { success: true, user: userInfo };
  }

  return { success: false, message: '用户名或密码错误' };
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export { login, getCurrentUser, logout, isAuthenticated, isAdmin };
