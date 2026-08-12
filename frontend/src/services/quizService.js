import api from './api';

export const getQuiz = (courseId) => api.get(`/quiz/${courseId}`);
export const submitQuiz = (courseId, answers) => api.post(`/quiz/${courseId}/submit`, { answers });
export const getQuizResult = (resultId) => api.get(`/quiz/result/${resultId}`);
