import axios from 'axios';

const API_URL = 'https://64db-182-226-43-93.ngrok-free.app/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

export const registerUser = (id, phoneNumber) => {
  return axiosInstance.post('/register', { id, phone_number: phoneNumber });
};

export const loginUser = (id, phoneNumber) => {
  return axiosInstance.post('/login', { id, phone_number: phoneNumber });
};

export const generateCharacter = (userId, name, theme, color, animal) => {
  return axiosInstance.post('/generate', { user_id: userId, name, theme, color, animal });
};

export const getMyCharacters = (userId) => {
  return axiosInstance.get(`/view_user/${userId}`);
};

export const getAllCharacters = () => {
  return axiosInstance.get('/view_all');
};

export const likeCharacter = (characterId) => {
  return axiosInstance.post(`/like/${characterId}`);
};
