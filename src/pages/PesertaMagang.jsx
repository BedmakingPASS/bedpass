// src/pages/PesertaMagang.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { useAuth } from "../context/AuthContext";
import { statusColor } from "../data/mockAssessments";

export default function PesertaMagang() {
  const { daftarPeserta, riwayatPenilaian, hapusPeserta } = useAssessment();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");
  const [urutan, setUrutan] = useState("abjad");

  const getPenilaianTerakhir = (namaPeserta) => {
    return riwayatPenilaian.find(
      (item) => item.peserta.nama === namaPeserta && item.status === "Disetujui"
    );
  };

  const hasilFilter = daftarPeserta
    .filter((p) => p.nama.toLowerCase().includes(pencarian.toLowerCase()))
    .sort((a, b) => {
      if (urutan === "abjad") {
        return a.nama.localeCompare(b.nama);
      }
      if (urutan === "terakhir-dinilai") {
        const penilaianA = getPenilaianTerakhir(a.nama);
        const penilaianB = getPenilaianTerakhir(b.nama);
        // Peserta yang belum pernah dinilai ditaruh paling bawah
        if (!penilaianA && !penilaianB) return 0;
        if (!penilaianA) return 1;
        if (!penilaianB) return -1;
        return (
          new Date(penilaianB.peserta.tanggal.split("/").reverse().join("-")) -
          new Date(penilaianA.peserta.tanggal.split("/").reverse().join("-"))
        );
      }
      return 0;
    });

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
        Daftar seluruh peserta magang yang terdaftar dalam sistem.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          placeholder="Cari nama peserta..."
          className="flex-1 min-w-[200px] rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
        <select
          value={urutan}
          onChange={(e) => setUrutan(e.target.value)}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
        >
          <option value="abjad">Urutkan: A-Z</option>
          <option value="terakhir-dinilai">Urutkan: Terakhir Dinilai</option>
        </select>
      </div>

      {hasilFilter.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center text-neutral-400 text-sm">
          Tidak ada peserta ditemukan.
        </div>
      ) : (
        <>
          <div className="md:hidden space-y-3">
            {hasilFilter.map((peserta) => {
              const penilaian = getPenilaianTerakhir(peserta.nama);
              return (
                <div
                  key={peserta.id}
                  onClick={() =>
                    penilaian && navigate(`/detail-penilaian/${penilaian.id}`)
                  }
                  className="bg-white rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-neutral-700">
                      {peserta.nama}
                    </p>
                    {penilaian && (
                      <p className="text-lg font-bold text-sky-800">
                        {penilaian.hasil.persentase}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">
                    {peserta.instansi}
                  </p>
                  {penilaian ? (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                        penilaian.hasil.status
                      )}`}
                    >
                      {penilaian.hasil.status}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">
                      Belum dinilai
                    </span>
                  )}
                  <div className="flex justify-end pt-2 mt-2 border-t">
                    <button
                      onClick={(e) => handleHapus(e, peserta)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-300 text-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-400 border-b">
                  <th className="px-5 py-3 font-medium">Nama Peserta</th>
                  <th className="px-5 py-3 font-medium">Instansi</th>
                  <th className="px-5 py-3 font-medium">Penilaian Terakhir</th>
                  <th className="px-5 py-3 font-medium">Nilai</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {hasilFilter.map((peserta) => {
                  const penilaian = getPenilaianTerakhir(peserta.nama);
                  return (
                    <tr
                      key={peserta.id}
                      onClick={() =>
                        penilaian && navigate(`/detail-penilaian/${penilaian.id}`)
                      }
                      className={`border-b last:border-0 ${
                        penilaian
                          ? "cursor-pointer hover:bg-sky-50 transition-colors"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-neutral-700">
                        {peserta.nama}
                      </td>
                      <td className="px-5 py-3 text-neutral-500">
                        {peserta.instansi}
                      </td>
                      <td className="px-5 py-3 text-neutral-500">
                        {penilaian ? penilaian.peserta.tanggal : "—"}
                      </td>
                      <td className="px-5 py-3 text-neutral-700">
                        {penilaian ? penilaian.hasil.persentase : "—"}
                      </td>
                      <td className="px-5 py-3">
                        {penilaian ? (
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                              penilaian.hasil.status
                            )}`}
                          >
                            {penilaian.hasil.status}
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-400">
                            Belum dinilai
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={(e) => handleHapus(e, peserta)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
