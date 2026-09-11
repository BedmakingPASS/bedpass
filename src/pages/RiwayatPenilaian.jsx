// src/pages/RiwayatPenilaian.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { useAuth } from "../context/AuthContext";
import { statusColor } from "../data/mockAssessments";

const statusApprovalColor = {
  "Menunggu Persetujuan": "bg-yellow-100 text-yellow-700",
  Disetujui: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-red-100 text-red-700",
};

export default function RiwayatPenilaian() {
   const { riwayatPenilaian, mulaiEditPenilaian, hapusPenilaian } = useAssessment();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const hasilFilter = riwayatPenilaian.filter((item) => {
    const cocokNama = item.peserta.nama
      .toLowerCase()
      .includes(pencarian.toLowerCase());
    const cocokStatus =
      filterStatus === "Semua" || item.hasil.status === filterStatus;
    return cocokNama && cocokStatus;
  });

  const handleEdit = (e, id) => {
    e.stopPropagation(); // supaya tidak sekalian trigger buka detail
    const berhasil = mulaiEditPenilaian(id);
    if (berhasil) {
      navigate("/penilaian");
    } else {
      alert("Gagal memuat data untuk diedit. Coba refresh halaman.");
    }
  };
    const handleHapus = async (e, id, namaPeserta) => {
    e.stopPropagation();
    const konfirmasi = window.confirm(
      `Yakin mau hapus riwayat penilaian ${namaPeserta}? Data yang sudah dihapus tidak bisa dikembalikan.`
    );
    if (konfirmasi) {
      await hapusPenilaian(id);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Riwayat Penilaian
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Klik nama peserta untuk melihat detail hasil penilaian.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          placeholder="Cari peserta..."
          className="flex-1 min-w-[200px] rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
        >
          <option value="Semua">Semua Status</option>
          <option value="Kompeten">Kompeten</option>
          <option value="Belum Kompeten">Belum Kompeten</option>
          <option value="Tidak Kompeten">Tidak Kompeten</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-400 border-b">
              <th className="px-5 py-3 font-medium">Nama Peserta</th>
              <th className="px-5 py-3 font-medium">Tanggal</th>
              <th className="px-5 py-3 font-medium">Nilai</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Persetujuan</th>
              <th className="px-5 py-3 font-medium"></th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {hasilFilter.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-neutral-400"
                >
                  Belum ada data penilaian.
                </td>
              </tr>
            ) : (
              hasilFilter.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/detail-penilaian/${item.id}`)}
                  className="border-b last:border-0 cursor-pointer hover:bg-sky-50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-sky-800 hover:underline">
                    {item.peserta.nama}
                  </td>
                  <td className="px-5 py-3 text-neutral-500">
                    {item.peserta.tanggal}
                  </td>
                  <td className="px-5 py-3 text-neutral-700">
                    {item.hasil.persentase}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                        item.hasil.status
                      )}`}
                    >
                      {item.hasil.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusApprovalColor[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {role === "supervisor" && item.status === "Ditolak" && (
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white"
                      >
                        Edit & Ajukan Ulang
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {role === "supervisor" && (
                      <button
                        onClick={(e) => handleHapus(e, item.id, item.peserta.nama)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
