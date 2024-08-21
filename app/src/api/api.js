import axios from 'axios';

const API_URL = 'https://2d97-182-226-43-93.ngrok-free.app/api/v1';

export const registerUser = (id, phoneNumber) => {
  return axios.post(`${API_URL}/register`, { id, phone_number: phoneNumber });
};

export const loginUser = (id, phoneNumber) => {
  return axios.post(`${API_URL}/login`, { id, phone_number: phoneNumber });
};

export const generateCharacter = (userId, name, theme, color, animal) => {
  return axios.post(`${API_URL}/generate`, { user_id: userId, name, theme, color, animal });
};

export const getMyCharacters = (userId) => {
  return axios.get(`${API_URL}/view_user/${userId}`);
};

export const getAllCharacters = () => {
  return axios.get(`${API_URL}/view_all`);
};

export const likeCharacter = (characterId) => {
  return axios.post(`${API_URL}/like/${characterId}`);
};
