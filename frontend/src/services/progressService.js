import api from './api';

/** Phase 8 — Learning progress */
export const getAllProgress = () => api.get('/progress');
export const getSkillProgress = (skillId) => api.get(`/progress/${skillId}`);
export const completeModule = (skillId, moduleId) =>
  api.post(`/progress/${skillId}/module/${moduleId}/complete`);
