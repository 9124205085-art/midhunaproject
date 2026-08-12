import api from './api';

export const getClasses = (params) => api.get('/classes', { params });
export const getClassById = (classId) => api.get(`/classes/${classId}`);
export const registerForClass = (classId) => api.post(`/classes/${classId}/register`);
export const getMyClasses = () => api.get('/classes/my');
export const createClass = (data) => api.post('/classes', data);
export const updateClass = (classId, data) => api.put(`/classes/${classId}`, data);
export const deleteClass = (classId) => api.delete(`/classes/${classId}`);
