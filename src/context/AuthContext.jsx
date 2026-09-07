// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../data/mockUsers";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext(null);

const STORAGE_KEY = "cba_current_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // 1. Cek dulu di mockUsers (untuk GM dan Supervisor)
    const foundStaff = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundStaff) {
      const { password: _pw, ...safeUser } = foundStaff;
      setUser(safeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
      return safeUser;
    }

    // 2. Kalau tidak ketemu, cek di tabel akun_peserta (untuk Trainee)
    const { data: akunPeserta, error } = await supabase
      .from("akun_peserta")
      .select("*, peserta(nama, instansi)")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      console.error("Gagal cek login peserta:", error.message);
      throw new Error("Terjadi kesalahan saat login. Coba lagi.");
    }

    if (!akunPeserta) {
      throw new Error("Username atau password salah");
    }

    const traineeUser = {
      id: akunPeserta.peserta_id,
      username: akunPeserta.username,
      role: "trainee",
      name: akunPeserta.peserta?.nama,
    };

    setUser(traineeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(traineeUser));
    return traineeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    role: user?.role ?? null,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return ctx;
}
