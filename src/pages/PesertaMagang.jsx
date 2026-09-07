// src/pages/PesertaMagang.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { statusColor } from "../data/mockAssessments";

export default function PesertaMagang() {
  const { daftarPeserta, riwayatPenilaian } = useAssessment();
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");

  // Cari penilaian TERBARU untuk setiap peserta (riwayatPenilaian sudah terurut dari yang terbaru)
  const getPenilaianTerakhir = (namaPeserta) => {
    return riwayatPenilaian.find((item) => item.peserta.nama === namaPeserta);
  };

  const hasilFilter = daftarPeserta.filter((p) =>
    p.nama.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Peserta Magang
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Daftar seluruh peserta magang yang terdaftar dalam sistem.
      </p>

      <input
        type="text"
        value={pencarian}
        onChange={(e) => setPencarian(e.target.value)}
        placeholder="Cari nama peserta..."
        className="w-full max-w-sm rounded-lg border border-neutral-300 px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-sky-700"
      />

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-400 border-b">
              <th className="px-5 py-3 font-medium">Nama Peserta</th>
              <th className="px-5 py-3 font-medium">Instansi</th>
              <th className="px-5 py-3 font-medium">Penilaian Terakhir</th>
              <th className="px-5 py-3 font-medium">Nilai</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {hasilFilter.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-neutral-400">
                  Tidak ada peserta ditemukan.
                </td>
              </tr>
            ) : (
              hasilFilter.map((peserta) => {
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
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
