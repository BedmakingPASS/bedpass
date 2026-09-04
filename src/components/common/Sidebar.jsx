import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  History,
  BarChart3,
  UserCircle,
  LogOut,
  Leaf,
} from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/penilaian/data-peserta', label: 'Penilaian', icon: ClipboardCheck },
  { to: '/peserta-magang', label: 'Peserta Magang', icon: Users },
  { to: '/riwayat-penilaian', label: 'Riwayat Penilaian', icon: History },
  { to: '/rekap-nilai', label: 'Rekap Nilai', icon: BarChart3 },
  { to: '/profil', label: 'Profil', icon: UserCircle },
]

export default function Sidebar() {
  return (
    <aside className="w-22 shrink-0 bg-cba-dark text-white flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <Leaf className="text-cba-gold" size={22} />
          <div>
            <p className="font-semibold leading-tight">Hobit</p>
            <p className="text-xs text-white/70 leading-tight">Housekeeping Bed Inspection Tools</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-cba text-white font-medium'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-6 py-5 text-sm text-white/70 hover:text-white">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}
