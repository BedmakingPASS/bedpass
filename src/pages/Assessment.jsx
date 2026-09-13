// src/pages/Assessment.jsx
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { assessmentAspects, skorLabel } from "../data/assessmentAspects";

const kategoriList = ["Hard Skill", "Soft Skill", "Technical Skill"];

export default function Assessment() {
  const { pesertaTerpilih, jawaban, simpanJawaban, hitungHasil } = useAssessment();
  const navigate = useNavigate();

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

  const totalTerisi = Object.keys(jawaban).length;
  const totalAspek = assessmentAspects.length;
  const semuaTerisi = totalTerisi === totalAspek;

  const hasil = hitungHasil();

  const handlePilihSkor = (aspekId, skor) => {
    simpanJawaban(aspekId, skor, "");
  };

  const handleLanjut = () => {
    if (!semuaTerisi) {
      alert(
        `Masih ada ${totalAspek - totalTerisi} aspek yang belum dinilai. Silakan lengkapi dulu.`
      );
      return;
    }
    navigate("/review-assessment");
  };

  return (
    <div className="max-w-3xl pb-36 md:pb-28">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-sky-900">
          Assessment Making Bed
        </h1>
        <p className="text-sm text-neutral-500">
          {pesertaTerpilih.nama} · {pesertaTerpilih.instansi}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-700 transition-all"
            style={{ width: `${(totalTerisi / totalAspek) * 100}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 whitespace-nowrap">
          {totalTerisi} / {totalAspek} Aspek
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6 bg-white rounded-lg border px-4 py-3 flex-wrap">
        <span className="text-xs text-neutral-400 w-full sm:w-auto">
          Keterangan skor:
        </span>
        {[4, 3, 2, 1].map((nilai) => (
          <span
            key={nilai}
            className="flex items-center gap-1.5 text-xs text-neutral-600"
          >
            <span className="h-5 w-5 rounded-md bg-sky-700 text-white flex items-center justify-center font-semibold text-[11px]">
              {nilai}
            </span>
            {skorLabel[nilai]}
          </span>
        ))}
      </div>

      {kategoriList.map((kategori) => (
        <div key={kategori} className="mb-6">
          <p className="text-sm font-semibold text-sky-800 mb-2">
            {kategori}
          </p>
          <div className="bg-white rounded-xl border divide-y">
            {assessmentAspects
              .filter((a) => a.kategori === kategori)
              .map((aspek) => {
                const skorTerpilih = jawaban[aspek.id]?.skor;
                return (
                  <div
                    key={aspek.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-700">
                        {String(aspek.id).padStart(2, "0")}. {aspek.judul}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {aspek.deskripsi}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 sm:flex gap-1.5 shrink-0">
                      {[1, 2, 3, 4].map((nilai) => (
                        <button
                          key={nilai}
                          onClick={() => handlePilihSkor(aspek.id, nilai)}
                          title={skorLabel[nilai]}
                          className={`h-10 sm:h-9 w-full sm:w-9 rounded-lg border-2 text-sm font-semibold transition-colors ${
                            skorTerpilih === nilai
                              ? "border-sky-700 bg-sky-700 text-white"
                              : "border-neutral-200 text-neutral-600 hover:border-sky-300"
                          }`}
                        >
                          {nilai}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      {/* Bar total skor & submit, selalu terlihat di bawah */}
      <div className="fixed bottom-0 left-0 md:left-60 right-0 bg-white border-t shadow-lg px-4 md:px-6 py-3 md:py-4 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto">
            <div className="shrink-0">
              <p className="text-xs text-neutral-400">Total Skor</p>
              <p className="text-base md:text-lg font-bold text-sky-900">
                {hasil.totalSkor} / {hasil.maksimalSkor}
              </p>
            </div>
            <div className="shrink-0">
              <p className="text-xs text-neutral-400">Nilai Akhir</p>
              <p className="text-base md:text-lg font-bold text-sky-900">
                {hasil.persentase}
              </p>
            </div>
            {totalTerisi > 0 && (
              <span
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full ${
                  hasil.status === "Kompeten"
                    ? "bg-emerald-100 text-emerald-700"
                    : hasil.status === "Belum Kompeten"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {hasil.status}
              </span>
            )}
          </div>
          <button
            onClick={handleLanjut}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
          >
            Lanjut ke Review →
          </button>
        </div>
      </div>
    </div>
  );
}
