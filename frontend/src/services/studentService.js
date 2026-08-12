import api from './api';

export const getDashboard = () => api.get('/student/dashboard');
export const getProfile = () => api.get('/student/profile');
export const getProgress = () => api.get('/student/progress');
export const updateLearningProgress = (data) => api.put('/student/learning-progress', data);
