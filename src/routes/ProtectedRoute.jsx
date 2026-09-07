import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Bungkus route yang butuh login dengan komponen ini.
 * allowedRoles kosong / tidak diisi = semua role yang sudah login boleh akses.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}