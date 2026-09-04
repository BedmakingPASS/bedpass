import { Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'

import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import DataPeserta from './pages/DataPeserta/DataPeserta.jsx'
import PetunjukPenilaian from './pages/PetunjukPenilaian/PetunjukPenilaian.jsx'
import Assessment from './pages/Assessment/Assessment.jsx'
import KategoriTechnicalSkill from './pages/KategoriTechnicalSkill/KategoriTechnicalSkill.jsx'
import ReviewAssessment from './pages/ReviewAssessment/ReviewAssessment.jsx'
import HasilAssessment from './pages/HasilAssessment/HasilAssessment.jsx'
import RiwayatPenilaian from './pages/RiwayatPenilaian/RiwayatPenilaian.jsx'
import PesertaMagang from './pages/PesertaMagang/PesertaMagang.jsx'
import RekapNilai from './pages/RekapNilai/RekapNilai.jsx'
import Profil from './pages/Profil/Profil.jsx'

export const routes = [
  // 1. Halaman Login — tanpa sidebar/navbar
  { path: '/login', element: <Login /> },

  // Semua halaman lain memakai MainLayout (sidebar + navbar)
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard />, handle: { title: 'Dashboard' } },
      { path: '/penilaian/data-peserta', element: <DataPeserta />, handle: { title: 'Data Peserta' } },
      { path: '/penilaian/petunjuk', element: <PetunjukPenilaian />, handle: { title: 'Petunjuk Penilaian' } },
      { path: '/penilaian/assessment', element: <Assessment />, handle: { title: 'Assessment' } },
      { path: '/penilaian/technical-skill', element: <KategoriTechnicalSkill />, handle: { title: 'Technical Skill' } },
      { path: '/penilaian/review', element: <ReviewAssessment />, handle: { title: 'Review Assessment' } },
      { path: '/penilaian/hasil/:pesertaId', element: <HasilAssessment />, handle: { title: 'Hasil Assessment' } },
      { path: '/riwayat-penilaian', element: <RiwayatPenilaian />, handle: { title: 'Riwayat Penilaian' } },
      { path: '/peserta-magang', element: <PesertaMagang />, handle: { title: 'Peserta Magang' } },
      { path: '/rekap-nilai', element: <RekapNilai />, handle: { title: 'Rekap Nilai' } },
      { path: '/profil', element: <Profil />, handle: { title: 'Profil' } },
    ],
  },

  { path: '*', element: <Navigate to="/dashboard" replace /> },
]