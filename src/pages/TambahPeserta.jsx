// src/pages/TambahPeserta.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

export default function TambahPeserta() {
  const { tambahPeserta } = useAssessment();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [instansi, setInstansi] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(null);

  // Auto-generate username & password sederhana dari nama depan
  const handleNamaChange = (value) => {
    setNama(value);
    const namaDepan = value.trim().split(" ")[0].toLowerCase();
    if (namaDepan) {
      setUsername(namaDepan);
      setPassword(namaDepan + "123");
    } else {
      setUsername("");
      setPassword("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nama.trim() || !instansi.trim() || !username.trim() || !password.trim()) {
      setError("Semua kolom wajib diisi");
      return;
    }

    setLoading(true);
    try {
      await tambahPeserta(nama.trim(), instansi.trim(), username.trim(), password.trim());
      setSukses({ nama, username, password });
      setNama("");
      setInstansi("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Tambah Peserta Magang
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Peserta baru akan otomatis mendapat akun untuk login dan melihat hasil
        penilaiannya sendiri.
      </p>

      {sukses && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-emerald-800 mb-2">
            Peserta "{sukses.nama}" berhasil ditambahkan!
          </p>
          <p className="text-xs text-emerald-700">
            Username: <strong>{sukses.username}</strong> · Password:{" "}
            <strong>{sukses.password}</strong>
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            Catat/screenshot info ini untuk diberikan ke peserta.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Nama Peserta Magang
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => handleNamaChange(e.target.value)}
            placeholder="Contoh: Rafi Pratama"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Instansi
          </label>
          <input
            type="text"
            value={instansi}
            onChange={(e) => setInstansi(e.target.value)}
            placeholder="Contoh: SMK Pariwisata Bandung"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Username Login
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Otomatis terisi"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password Login
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Otomatis terisi"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
            />
          </div>
        </div>
        <p className="text-xs text-neutral-400">
          Username & password otomatis terisi dari nama depan, tapi boleh
          diubah manual kalau perlu.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/peserta")}
            className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-sky-800 hover:bg-sky-900 text-white font-medium rounded-lg py-2.5 transition-colors disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Tambah Peserta"}
          </button>
        </div>
      </form>
    </div>
  );
}
