// src/layouts/MainLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleLabels } from "../data/mockUsers";
import logoBedpass from "../assets/images/logo-bedpass.png";

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-60 shrink-0 bg-sky-900 text-white flex flex-col">
          <div className="px-5 py-6 border-b border-sky-800 flex items-center gap-2">
          <img src={logoBedpass} alt="BedPass Logo" className="h-8 w-auto" />
          <p className="font-bold tracking-wide">BEDPASS</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-end px-6 gap-3">
          <span className="text-sm text-neutral-500">
            {roleLabels[role]}
          </span>
          <div className="h-9 w-9 rounded-full bg-sky-700 text-white flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0)}
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}