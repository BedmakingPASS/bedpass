import { api } from './api.js'

export const pesertaService = {
  getAll: () => api.get('/peserta'),
  getById: (id) => api.get(`/peserta/${id}`),
  create: (data) => api.post('/peserta', data),
}
