// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroRoom from "../assets/images/hero-room.jpg";
import logoHemangini from "../assets/images/logo-hemangini.png";
import logoBedpass from "../assets/images/logo-bedpass.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen md:grid md:grid-cols-2">
      {/* Foto: full background di mobile, sisi kiri saja di desktop */}
      <div className="fixed md:relative inset-0 md:inset-auto md:block bg-sky-950">
        <img
          src={heroRoom}
          alt="Hotel room"
          className="absolute inset-0 h-full w-full object-cover opacity-90 animate-zoom-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/60 via-sky-950/30 to-sky-950/70"></div>
        <img
          src={logoHemangini}
          alt="New Hemangini Hotel"
          className="absolute top-14 left-12 h-28 w-auto z-20 drop-shadow-lg hidden md:block"
        />
        <div className="relative z-8 p-10 pt-52 h-full flex-col justify-start text-white hidden md:flex">
          <p
            className="text-2xl font-light leading-snug max-w-xs"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            Assess Skills
            <br />
            Measure Performance
            <br />
            Build Competence
          </p>
        </div>
      </div>

      {/* Form: card mengambang transparan di mobile, panel putih penuh di desktop */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 md:bg-white">
        <div className="w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:bg-transparent md:shadow-none md:backdrop-blur-none md:p-0">
          <div className="text-center mb-8">
            <img
              src={logoBedpass}
              alt="BedPass Logo"
              className="h-16 w-auto mx-auto mb-2"
            />
            <h1 className="text-2xl font-bold text-sky-900 tracking-wide">BEDPASS</h1>
            <p className="text-xs text-neutral-500 mt-3">
              Bedmaking Performance Assessment Scoring System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-800 hover:bg-sky-900 text-white font-medium rounded-lg py-2.5 transition-colors disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-8 italic">
            Digital Competency-Based Assessment Housekeeping Department
          </p>

          <div className="mt-6 text-xs text-neutral-400 border-t pt-4">
            <p className="font-medium mb-1">Akun untuk testing:</p>
            <p>General Manager: gm1 / gm123</p>
            <p>Supervisor: supervisor1 / super123</p>
            <p>Trainee: lihat tabel akun_peserta di Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}
