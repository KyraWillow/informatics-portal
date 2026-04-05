import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan Token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// API Endpoints helpers
export const authApi = {
  login: (data: any) => api.post('/user/login', data),
  getCurrentUser: () => api.get('/user/me'),
};

export const achievementApi = {
  getAll: () => api.get('/achievement'),
  create: (data: any) => api.post('/achievement', data),
  update: (id: string, data: any) => api.put(`/achievement/${id}`, data),
  delete: (id: string) => api.delete(`/achievement/${id}`),
};

export const divisionApi = {
  getAll: () => api.get('/division'),
  getById: (id: string) => api.get(`/division/public/${id}`), // Use public endpoint
  create: (data: any) => api.post('/division', data),
  update: (id: string, data: any) => api.put(`/division/${id}`, data),
  delete: (id: string) => api.delete(`/division/${id}`),
};

export const competitionApi = {
  getAll: () => api.get('/competition'),
  create: (data: any) => api.post('/competition', data),
  update: (id: string, data: any) => api.put(`/competition/${id}`, data),
  delete: (id: string) => api.delete(`/competition/${id}`),
};

export const memberApi = {
  getAll: () => api.get('/member'),
  create: (data: any) => api.post('/member', data),
  update: (id: string, data: any) => api.put(`/member/${id}`, data),
  delete: (id: string) => api.delete(`/member/${id}`),
};

export const meetingApi = {
  getAll: () => api.get('/meeting'),
  create: (data: any) => api.post('/meeting', data),
  update: (id: string, data: any) => api.put(`/meeting/${id}`, data),
  delete: (id: string) => api.delete(`/meeting/${id}`),
};

export const attendanceApi = {
  submit: (data: { memberId: string; meetingId: string; status: string }) =>
    api.post('/attendance', data),
  getByMeeting: (meetingId: string) => api.get(`/attendance/meeting/${meetingId}`),
  getAll: () => api.get('/attendance'),
};
