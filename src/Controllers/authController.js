// src/controllers/authController.js

import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data.message : 'Login failed';
  }
};
