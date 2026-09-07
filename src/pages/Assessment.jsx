// src/pages/Assessment.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { skorLabel } from "../data/assessmentAspects";

export default function Assessment() {
  const {
    pesertaTerpilih,
    currentIndex,
    aspekSaatIni,
    totalAspek,
    jawaban,
    simpanJawaban,
    nextAspek,
    prevAspek,
  } = useAssessment();
  const navigate = useNavigate();

  const [skor, setSkor] = useState(null);
  const [catatan, setCatatan] = useState("");

  // Setiap pindah aspek, ambil ulang jawaban yang sudah pernah diisi (kalau ada)
  useEffect(() => {
    if (aspekSaatIni) {
      const existing = jawaban[aspekSaatIni.id];
      setSkor(existing?.skor ?? null);
      setCatatan(existing?.catatan ?? "");
    }
  }, [aspekSaatIni, jawaban]);

  if (!pesertaTerpilih) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">
          Belum ada peserta yang dipilih. Silakan mulai dari halaman Data
          Peserta.
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

  const handleBerikutnya = () => {
    if (!skor) {
      alert("Pilih skor terlebih dahulu");
      return;
    }
    simpanJawaban(aspekSaatIni.id, skor, catatan);

    if (currentIndex === totalAspek - 1) {
      navigate("/review-assessment");
    } else {
      nextAspek();
    }
  };

  const handleSebelumnya = () => {
    if (skor) simpanJawaban(aspekSaatIni.id, skor, catatan);
    prevAspek();
  };

  const progress = ((currentIndex + 1) / totalAspek) * 100;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-sky-900">
          Assessment Making Bed
        </h1>
        <span className="text-sm font-medium text-sky-800">
          {aspekSaatIni.kategori}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-700 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 whitespace-nowrap">
          {currentIndex + 1} / {totalAspek} Aspek
        </span>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <p className="text-lg font-semibold text-sky-800 mb-1">
          {String(currentIndex + 1).padStart(2, "0")}. {aspekSaatIni.judul}
        </p>
        <p className="text-sm text-neutral-500 mb-5">
          {aspekSaatIni.deskripsi}
        </p>

        <div className="grid grid-cols-4 gap-3 mb-5">
          {[4, 3, 2, 1].map((nilai) => (
            <button
              key={nilai}
              onClick={() => setSkor(nilai)}
              className={`rounded-xl border-2 py-4 text-center transition-colors ${
                skor === nilai
                  ? "border-sky-700 bg-sky-50"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <p className="text-2xl font-bold text-neutral-800">{nilai}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {skorLabel[nilai]}
              </p>
            </button>
          ))}
        </div>

        {skor && (
          <div className="bg-sky-50 rounded-lg p-3 mb-5">
            <p className="text-xs font-medium text-sky-800 mb-1">
              Deskriptor Skor {skor} ({skorLabel[skor]})
            </p>
            <p className="text-xs text-sky-700">
              {aspekSaatIni.deskriptor[skor]}
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Catatan Penilai (Opsional)
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={3}
            placeholder="Tulis catatan di sini..."
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSebelumnya}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 disabled:opacity-40 hover:bg-neutral-50"
        >
          ← Sebelumnya
        </button>
        <button
          onClick={handleBerikutnya}
          className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
        >
          {currentIndex === totalAspek - 1 ? "Selesai →" : "Berikutnya →"}
        </button>
      </div>
    </div>
  );
}
