import { useNavigate } from 'react-router-dom'
import { Leaf, User, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: sambungkan ke src/services/auth.js
    navigate('/dashboard')
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden bg-cba-dark md:block" />
      <div className="flex items-center justify-center px-8 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <Leaf className="text-cba" size={28} />
            <h1 className="text-lg font-semibold text-cba-dark">CBA MAKING BED</h1>
            <p className="text-xs text-slate-500">
              Digital Competency-Based Assessment Jobs Performance Making Bed
            </p>
          </div>

          <label className="mb-3 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm">
            <User size={16} className="text-slate-400" />
            <input className="w-full outline-none" placeholder="Username" />
          </label>

          <label className="mb-6 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm">
            <Lock size={16} className="text-slate-400" />
            <input type="password" className="w-full outline-none" placeholder="Password" />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-cba py-2.5 text-sm font-medium text-white hover:bg-cba-dark"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}
