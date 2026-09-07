// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AssessmentProvider } from "./context/AssessmentContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataPeserta from "./pages/DataPeserta";
import PetunjukPenilaian from "./pages/PetunjukPenilaian";
import Assessment from "./pages/Assessment";
import ReviewAssessment from "./pages/ReviewAssessment";
import Persetujuan from "./pages/Persetujuan";
import HasilAssessment from "./pages/HasilAssessment";
import HasilPenilaianSaya from "./pages/HasilPenilaianSaya";
import RiwayatPenilaian from "./pages/RiwayatPenilaian";
import RekapNilai from "./pages/RekapNilai";
import DetailPenilaian from "./pages/DetailPenilaian";
import PesertaMagang from "./pages/PesertaMagang";
import FeedbackSaya from "./pages/FeedbackSaya";
import FeedbackPeserta from "./pages/FeedbackPeserta";

function Unauthorized() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold text-red-700">Akses Ditolak</h1>
      <p className="text-neutral-500 mt-2">
        Kamu tidak punya izin untuk membuka halaman ini.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profil" element={<div>Halaman Profil (placeholder)</div>} />

              <Route
                path="/peserta"
                element={
                  <ProtectedRoute allowedRoles={["supervisor", "general_manager"]}>
                    <PesertaMagang />
                  </ProtectedRoute>
                }
              />

              {/* Alur penilaian: hanya Supervisor */}
              <Route
                path="/data-peserta-magang"
                element={
                  <ProtectedRoute allowedRoles={["supervisor"]}>
                    <DataPeserta />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/petunjuk-penilaian"
                element={
                  <ProtectedRoute allowedRoles={["supervisor"]}>
                    <PetunjukPenilaian />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/penilaian"
                element={
                  <ProtectedRoute allowedRoles={["supervisor"]}>
                    <Assessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/review-assessment"
                element={
                  <ProtectedRoute allowedRoles={["supervisor"]}>
                    <ReviewAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hasil-assessment"
                element={
                  <ProtectedRoute allowedRoles={["supervisor"]}>
                    <HasilAssessment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/persetujuan"
                element={
                  <ProtectedRoute allowedRoles={["general_manager"]}>
                    <Persetujuan />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hasil-saya"
                element={
                  <ProtectedRoute allowedRoles={["trainee"]}>
                    <HasilPenilaianSaya />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/feedback-saya"
                element={
                  <ProtectedRoute allowedRoles={["trainee"]}>
                    <FeedbackSaya />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback-peserta"
                element={
                  <ProtectedRoute allowedRoles={["supervisor", "general_manager"]}>
                    <FeedbackPeserta />
                  </ProtectedRoute>
                }
              />

              <Route path="/riwayat" element={<RiwayatPenilaian />} />
              <Route path="/detail-penilaian/:id" element={<DetailPenilaian />} />
              <Route path="/rekap" element={<RekapNilai />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  );
}
