import api from './api';

export const registerStudent = (data) => api.post('/auth/register', data);
export const loginStudent = (data) => api.post('/auth/login', data);
export const loginVolunteer = (data) => api.post('/auth/volunteer/login', data);
export const getMe = () => api.get('/auth/me');
