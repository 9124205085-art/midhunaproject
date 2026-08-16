import api from './api';

/** Phase 3 — Dashboard overview from backend (source of truth) */
export const getDashboard = () => api.get('/students/dashboard');

/** Phase 3 — Authenticated student profile (no password) */
export const getStudentProfile = () => api.get('/students/profile');

/** Alias kept for existing imports */
export const getProfile = () => getStudentProfile();
