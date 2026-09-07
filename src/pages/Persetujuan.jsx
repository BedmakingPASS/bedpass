// src/pages/Persetujuan.jsx
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

function statusColor(status) {
  if (status === "Disetujui") return "bg-emerald-100 text-emerald-700";
  if (status === "Ditolak") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

function hasilColor(statusHasil) {
  if (statusHasil === "Kompeten") return "bg-emerald-100 text-emerald-700";
  if (statusHasil === "Belum Kompeten") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export default function Persetujuan() {
  const { riwayatPenilaian } = useAssessment();
  const navigate = useNavigate();

  const menunggu = riwayatPenilaian.filter(
    (item) => item.status === "Menunggu Persetujuan"
  );
  const sudahDiproses = riwayatPenilaian.filter(
    (item) => item.status !== "Menunggu Persetujuan"
  );

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Persetujuan Penilaian
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Klik nama peserta untuk melihat detail penilaian sebelum menyetujui.
      </p>

      <h2 className="text-sm font-semibold text-neutral-700 mb-3">
        Menunggu Persetujuan ({menunggu.length})
      </h2>

      {menunggu.length === 0 ? (
        <div className="bg-white rounded-xl border p-6 text-sm text-neutral-500 mb-8">
          Tidak ada penilaian yang menunggu persetujuan saat ini.
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {menunggu.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/detail-penilaian/${item.id}`)}
              className="w-full text-left bg-white rounded-xl border p-5 flex items-center justify-between hover:bg-sky-50 hover:border-sky-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold text-sm">
                  {item.peserta.nama.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-neutral-800">
                    {item.peserta.nama}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {item.peserta.instansi} · Dinilai oleh{" "}
                    {item.peserta.penilai} · {item.peserta.tanggal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-sky-800">
                    {item.hasil.persentase}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${hasilColor(
                      item.hasil.status
                    )}`}
                  >
                    {item.hasil.status}
                  </span>
                </div>
                <span className="text-sky-800 text-sm font-medium">
                  Lihat Detail →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <h2 className="text-sm font-semibold text-neutral-700 mb-3">
        Riwayat Diproses ({sudahDiproses.length})
      </h2>

      {sudahDiproses.length === 0 ? (
        <div className="bg-white rounded-xl border p-6 text-sm text-neutral-500">
          Belum ada riwayat.
        </div>
      ) : (
        <div className="bg-white rounded-xl border divide-y">
          {sudahDiproses.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/detail-penilaian/${item.id}`)}
              className="w-full text-left p-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  {item.peserta.nama}
                </p>
                <p className="text-xs text-neutral-400">
                  {item.peserta.tanggal} · Nilai {item.hasil.persentase}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
