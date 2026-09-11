// src/pages/PetunjukPenilaian.jsx
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

const petunjuk = [
  "Amati langsung kinerja peserta saat melakukan making bed.",
  "Berikan skor 1 sampai 4 sesuai dengan deskriptor kinerja.",
  "Nilai berdasarkan bukti yang teramati, bukan asumsi.",
  "Isi catatan penilai jika diperlukan.",
  "Pastikan seluruh aspek sudah dinilai sebelum menyimpan penilaian.",
];

export default function PetunjukPenilaian() {
  const { pesertaTerpilih } = useAssessment();
  const navigate = useNavigate();

  if (!pesertaTerpilih) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">
          Belum ada peserta yang dipilih. Silakan pilih peserta terlebih
          dahulu di halaman Data Peserta.
        </p>
        <button
          onClick={() => navigate("/peserta")}
          className="mt-4 text-sky-800 font-medium text-sm hover:underline"
        >
          ← Kembali ke Data Peserta
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Petunjuk Penilaian
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Sebelum memulai assessment, mohon baca petunjuk berikut:
      </p>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        {petunjuk.map((item, i) => (
          <div key={i} className="flex gap-3">
            <span className="flex-shrink-0 h-7 w-7 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-sm text-neutral-700 pt-0.5">{item}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/penilaian")}
        className="w-full bg-sky-800 hover:bg-sky-900 text-white font-medium rounded-lg py-2.5 transition-colors mt-6"
      >
        Mulai Assessment →
      </button>
    </div>
  );
}