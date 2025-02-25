import { getData, saveData, generateId } from './mockData';

export const login = async (username, password) => {
  try {
    const data = getData();
    const user = data.users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw { message: '用户名或密码错误' };
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: `mock-token-${user.id}`
    };

    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    throw error || { message: '登录失败，请稍后重试' };
  }
};

export const register = async (username, email, password) => {
  try {
    const data = getData();
    
    if (data.users.some(u => u.username === username)) {
      throw { message: '用户名已存在' };
    }
    if (data.users.some(u => u.email === email)) {
      throw { message: '邮箱已被使用' };
    }

    const newUser = {
      id: generateId(data.users),
      username,
      email,
      password,
      role: 'user'
    };

    data.users.push(newUser);
    saveData(data);

    return { message: '注册成功' };
  } catch (error) {
    throw error || { message: '注册失败，请稍后重试' };
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};