// src/pages/PesertaMagang.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { useAuth } from "../context/AuthContext";

export default function PesertaMagang() {
  const { daftarPeserta, hapusPeserta } = useAssessment();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");

  const hasilFilter = daftarPeserta
    .filter((p) => p.nama.toLowerCase().includes(pencarian.toLowerCase()))
    .sort((a, b) => a.nama.localeCompare(b.nama));

  const handleHapus = async (e, peserta) => {
    e.stopPropagation();
    const konfirmasi = window.confirm(
      `Yakin mau hapus peserta "${peserta.nama}"? Semua riwayat penilaian, akun login, dan feedback milik peserta ini akan ikut terhapus permanen.`
    );
    if (konfirmasi) {
      await hapusPeserta(peserta.id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-semibold text-sky-900">Peserta Magang</h1>
        {role === "supervisor" && (
          <button
            onClick={() => navigate("/tambah-peserta")}
            className="px-4 py-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
          >
            + Tambah Peserta
          </button>
        )}
      </div>
      <p className="text-neutral-500 text-sm mb-6">
        Daftar seluruh peserta magang yang terdaftar dalam sistem. Klik nama
        peserta untuk melihat biodata.
      </p>

      <input
        type="text"
        value={pencarian}
        onChange={(e) => setPencarian(e.target.value)}
        placeholder="Cari nama peserta..."
        className="w-full mb-4 rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
      />

      {hasilFilter.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center text-neutral-400 text-sm">
          Tidak ada peserta ditemukan.
        </div>
      ) : (
        <div className="bg-white rounded-xl border divide-y overflow-hidden">
          {hasilFilter.map((peserta) => (
            <div
              key={peserta.id}
              onClick={() => navigate(`/peserta/${peserta.id}`)}
              className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-sky-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-sky-700 text-white flex items-center justify-center text-sm font-semibold">
                  {peserta.nama.charAt(0)}
                </div>
                <span className="text-sm font-medium text-sky-800">
                  {peserta.nama}
                </span>
              </div>
              <button
                onClick={(e) => handleHapus(e, peserta)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}