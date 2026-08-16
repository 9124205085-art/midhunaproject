import api from './api';

export const loginVolunteer = (data) => api.post('/volunteers/login', data);
export const getVolunteerDashboard = () => api.get('/volunteers/dashboard');
export const getStudents = (params) => api.get('/volunteers/students', { params });
export const getStudentDetails = (id) => api.get(`/volunteers/students/${id}`);

export const getVolunteerClasses = () => api.get('/classes');
export const getVolunteerClassById = (id) => api.get(`/classes/${id}`);
export const createClass = (data) => api.post('/classes', data);
export const updateClass = (id, data) => api.put(`/classes/${id}`, data);
export const deleteClass = (id) => api.delete(`/classes/${id}`);
