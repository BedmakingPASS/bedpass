import { Bell } from 'lucide-react'

export default function Navbar({ title }) {
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-8 py-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="flex items-center gap-4">
        <Bell size={18} className="text-slate-500" />
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-cba text-xs font-semibold text-white">
            S
          </div>
          <span className="text-sm font-medium">Supervisor</span>
        </div>
      </div>
    </header>
  )
}
