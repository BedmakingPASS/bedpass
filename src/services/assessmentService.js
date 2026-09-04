import { api } from './api.js'

export const assessmentService = {
  getAspekByKategori: (kategori) => api.get(`/assessment/aspek?kategori=${kategori}`),
  submit: (payload) => api.post('/assessment', payload),
  getHasil: (assessmentId) => api.get(`/assessment/${assessmentId}/hasil`),
  getRiwayat: (params) => api.get(`/assessment/riwayat?${new URLSearchParams(params)}`),
}
