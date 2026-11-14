// src/pages/TambahPeserta.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

const inputCls =
  "w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700";

const buatUsername = (nama) =>
  (nama.trim().split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const buatPassword = (nama) => {
  const dasar = buatUsername(nama);
  return dasar ? `${dasar}123` : "";
};

export default function TambahPeserta() {
  const { tambahPeserta } = useAssessment();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameManual, setUsernameManual] = useState(false);
  const [passwordManual, setPasswordManual] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [berhasil, setBerhasil] = useState(null);
  const [tersalin, setTersalin] = useState(false);

  const ubahNama = (e) => {
    const value = e.target.value;
    setNama(value);
    if (!usernameManual) setUsername(buatUsername(value));
    if (!passwordManual) setPassword(buatPassword(value));
    setError("");
  };

  const ubahUsername = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s/g, "");
    setUsername(value);
    setUsernameManual(value !== "");
    setError("");
  };

  const ubahPassword = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setPassword(value);
    setPasswordManual(value !== "");
    setError("");
  };

  const simpan = async (e) => {
    e.preventDefault();
    const namaBersih = nama.trim();

    if (namaBersih.length < 2) return setError("Nama peserta wajib diisi.");
    if (username.length < 3) return setError("Username minimal 3 karakter.");
    if (password.length < 6) return setError("Password minimal 6 karakter.");

    setLoading(true);
    try {
      await tambahPeserta(namaBersih, "", username, password);
      setBerhasil({ nama: namaBersih, username, password });
    } catch (err) {
      const pesan = err?.message || "Terjadi kesalahan.";
      setError(
        /^(Gagal|Username)/.test(pesan)
          ? pesan
          : "Gagal menambah peserta: " + pesan
      );
    } finally {
      setLoading(false);
    }
  };

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(
        `Username: ${berhasil.username}\nPassword: ${berhasil.password}`
      );
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      alert("Gagal menyalin, silakan salin manual dari kotak yang tampil.");
    }
  };

  const tambahLagi = () => {
    setNama("");
    setUsername("");
    setPassword("");
    setUsernameManual(false);
    setPasswordManual(false);
    setError("");
    setBerhasil(null);
  };

  // ===== Tampilan setelah berhasil: tampilkan username & password =====
  if (berhasil) {
    return (
      <div className="max-w-xl">
        <h1 className="text-xl font-semibold text-sky-900 mb-1">
          Peserta Berhasil Ditambahkan
        </h1>
        <p className="text-neutral-500 text-sm mb-6">
          Berikan username dan password di bawah ini kepada peserta magang.
        </p>

        <div className="bg-white rounded-xl border p-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-5 text-sm text-emerald-700">
            Akun untuk <strong>{berhasil.nama}</strong> sudah dibuat.
          </div>

          <div className="border rounded-lg divide-y mb-4 text-sm">
            <div className="flex justify-between px-4 py-3">
              <span className="text-neutral-500">Username</span>
              <span className="font-mono font-semibold text-neutral-800">
                {berhasil.username}
              </span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-neutral-500">Password</span>
              <span className="font-mono font-semibold text-neutral-800">
                {berhasil.password}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mb-5">
            Setelah login, peserta mengisi biodata sendiri di menu Biodata
            Saya, termasuk asal sekolah / instansi.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={salin}
              className="px-4 py-2.5 rounded-lg border text-sm font-medium"
            >
              {tersalin ? "Tersalin ✓" : "Salin Username & Password"}
            </button>
            <button
              onClick={tambahLagi}
              className="px-4 py-2.5 rounded-lg border text-sm font-medium"
            >
              Tambah Peserta Lagi
            </button>
            <button
              onClick={() => navigate("/peserta")}
              className="px-4 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
            >
              Ke Daftar Peserta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== Tampilan form =====
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Tambah Peserta Magang
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Peserta baru akan otomatis mendapat akun untuk login dan melihat hasil
        penilaiannya sendiri.
      </p>

      <form onSubmit={simpan} className="bg-white rounded-xl border p-6">
        <label className="text-sm text-neutral-600">Nama Peserta Magang</label>
        <input
          value={nama}
          onChange={ubahNama}
          placeholder="Contoh: Hanna Nazhifa"
          className={`${inputCls} mt-1 mb-4`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-600">Username Login</label>
            <input
              value={username}
              onChange={ubahUsername}
              className={`${inputCls} mt-1`}
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600">Password Login</label>
            <input
              value={password}
              onChange={ubahPassword}
              className={`${inputCls} mt-1`}
            />
          </div>
        </div>

        <p className="text-xs text-neutral-400 mt-2">
          Username & password otomatis terisi dari nama depan, tapi boleh
          diubah manual kalau perlu. Asal sekolah / instansi nanti diisi sendiri
          oleh peserta saat melengkapi biodata.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={() => navigate("/peserta")}
            className="px-5 py-2.5 rounded-lg border text-sm font-medium"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Tambah Peserta"}
          </button>
        </div>
      </form>
    </div>
  );
}