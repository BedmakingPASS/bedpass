// src/pages/HasilPenilaianSaya.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../context/AssessmentContext";
import { statusColor } from "../data/mockAssessments";

const statusApprovalColor = {
  "Menunggu Persetujuan": "bg-yellow-100 text-yellow-700",
  Disetujui: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-red-100 text-red-700",
};

export default function HasilPenilaianSaya() {
  const { user } = useAuth();
  const { riwayatPenilaian } = useAssessment();
  const navigate = useNavigate();

  const hasilSaya = riwayatPenilaian.filter(
    (item) => item.peserta.nama === user.name && item.status === "Disetujui"
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Hasil Penilaian Saya
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Klik salah satu untuk melihat detail lengkap hasil penilaian kamu.
      </p>

      {hasilSaya.length === 0 ? (
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-neutral-500">
            Belum ada hasil penilaian untuk kamu saat ini.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {hasilSaya.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/detail-penilaian/${item.id}`)}
              className="w-full text-left bg-white rounded-xl border p-5 flex items-center justify-between hover:bg-sky-50 hover:border-sky-200 transition-colors"
            >
              <div>
                <p className="text-sm text-neutral-500">
                  Dinilai pada {item.peserta.tanggal} oleh{" "}
                  {item.peserta.penilai}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                      item.hasil.status
                    )}`}
                  >
                    {item.hasil.status}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      statusApprovalColor[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-sky-800">
                  {item.hasil.persentase}
                  <span className="text-sm text-neutral-400">/100</span>
                </p>
                <span className="text-sky-800 text-sm font-medium">
                  Lihat Detail →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
