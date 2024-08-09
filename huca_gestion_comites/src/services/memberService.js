// src/services/memberService.js
import api from './api';

export const getAllMembers = () => api.get('/members');
export const createMember = (memberData) => api.post('/members', memberData);
export const updateMember = (id, memberData) => api.put(`/members/${id}`, memberData);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// Implementar servicios similares para committees y meetings