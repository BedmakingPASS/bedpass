// src/layouts/MainLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleLabels } from "../data/mockUsers";
import logoBedpass from "../assets/images/logo-bedpass.png";
import PanduanPopup from "../components/PanduanPopup";

const MENU_BY_ROLE = {
  general_manager: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Persetujuan Penilaian", path: "/persetujuan" },
    { label: "Peserta Magang", path: "/peserta" },
    { label: "Riwayat Penilaian", path: "/riwayat" },
    { label: "Rekap Nilai", path: "/rekap" },
    { label: "Feedback Peserta", path: "/feedback-peserta" },
  ],
  supervisor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Penilaian", path: "/data-peserta-magang" },
    { label: "Peserta Magang", path: "/peserta" },
    { label: "Riwayat Penilaian", path: "/riwayat" },
    { label: "Rekap Nilai", path: "/rekap" },
    { label: "Feedback Peserta", path: "/feedback-peserta" },
  ],
  trainee: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Hasil Penilaian Saya", path: "/hasil-saya" },
    { label: "Feedback untuk Hotel", path: "/feedback-saya" },
  ],
};

export default function MainLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const menu = MENU_BY_ROLE[role] || [];
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleKlikMenu = () => {
    // Tutup sidebar otomatis setelah klik menu, khusus tampilan mobile
    setSidebarTerbuka(false);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <PanduanPopup />

      {/* Overlay gelap saat sidebar terbuka di mobile, klik untuk menutup */}
      {sidebarTerbuka && (
        <div
          onClick={() => setSidebarTerbuka(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar: tersembunyi di mobile kecuali sidebarTerbuka true, selalu tampil di layar md ke atas */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-60 shrink-0 bg-sky-900 text-white flex flex-col transition-transform duration-200 ${
          sidebarTerbuka ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-5 py-6 border-b border-sky-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={logoBedpass} alt="BedPass Logo" className="h-8 w-auto" />
            <p className="font-bold tracking-wide">BEDPASS</p>
          </div>
          <button
            onClick={() => setSidebarTerbuka(false)}
            className="md:hidden text-sky-200 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleKlikMenu}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-white text-sky-900 font-medium"
                    : "text-sky-100 hover:bg-sky-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-sky-800">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-sky-100 hover:bg-sky-800 rounded-lg px-3 py-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between md:justify-end px-4 md:px-6 gap-3">
          {/* Tombol hamburger, cuma muncul di mobile */}
          <button
            onClick={() => setSidebarTerbuka(true)}
            className="md:hidden text-sky-900 text-2xl leading-none"
          >
            ☰
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500 hidden sm:inline">
              {roleLabels[role]}
            </span>
            <div className="h-9 w-9 rounded-full bg-sky-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
