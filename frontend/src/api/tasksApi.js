import axios from './axiosInstance';

export const getAllTasks = () => axios.get('/api/tasks').then(r => r.data);
export const createTask = (body) => axios.post('/api/tasks', body).then(r => r.data);
export const updateTask = (id, body) => axios.put(`/api/tasks/${id}`, body).then(r => r.data);
export const deleteTask = (id) => axios.delete(`/api/tasks/${id}`).then(r => r.data);
