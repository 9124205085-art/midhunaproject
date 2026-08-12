import api from './api';

export const getVolunteerDashboard = () => api.get('/volunteer/dashboard');
export const getStudents = () => api.get('/volunteer/students');
