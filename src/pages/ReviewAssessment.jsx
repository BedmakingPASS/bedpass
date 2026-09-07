// src/pages/ReviewAssessment.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { assessmentAspects, skorLabel } from "../data/assessmentAspects";

export default function ReviewAssessment() {
  const { pesertaTerpilih, jawaban, submitPenilaian } = useAssessment();
  const navigate = useNavigate();
  const [catatanUmum, setCatatanUmum] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!pesertaTerpilih) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">Belum ada data penilaian.</p>
        <button
          onClick={() => navigate("/peserta")}
          className="mt-4 text-sky-800 font-medium text-sm hover:underline"
        >
          ← Kembali ke Data Peserta
        </button>
      </div>
    );
  }

  const belumLengkap = assessmentAspects.some((a) => !jawaban[a.id]);

  const handleSubmit = async () => {
    if (belumLengkap) {
      alert("Masih ada aspek yang belum dinilai. Silakan lengkapi dulu.");
      return;
    }
    setSubmitting(true);
    await submitPenilaian(catatanUmum);
    setSubmitting(false);
    navigate("/hasil-assessment");
  };

  // Kelompokkan aspek per kategori supaya lebih mudah dibaca saat review
  const kategoriList = ["Hard Skill", "Soft Skill", "Technical Skill"];

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Review Assessment
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Pastikan semua penilaian sudah sesuai sebelum dikirim.
      </p>

      <div className="bg-white rounded-xl border p-6 mb-4">
        <p className="font-semibold text-neutral-800">
          {pesertaTerpilih.nama}
        </p>
        <p className="text-sm text-neutral-500">
          Instansi: {pesertaTerpilih.instansi}
        </p>
        <p className="text-sm text-neutral-500">
          Tanggal: {pesertaTerpilih.tanggal}
        </p>
        <p className="text-sm text-neutral-500">
          Penilai: {pesertaTerpilih.penilai}
        </p>
      </div>

      {kategoriList.map((kategori) => {
        const aspekKategori = assessmentAspects.filter(
          (a) => a.kategori === kategori
        );
        return (
          <div key={kategori} className="mb-4">
            <p className="text-sm font-semibold text-sky-800 mb-2">
              {kategori}
            </p>
            <div className="bg-white rounded-xl border divide-y">
              {aspekKategori.map((aspek) => {
                const j = jawaban[aspek.id];
                return (
                  <div key={aspek.id} className="p-4 flex items-start gap-4">
                    <span className="text-xs text-neutral-400 w-6 pt-0.5">
                      {String(aspek.id).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-700">
                        {aspek.judul}
                      </p>
                      {j?.catatan && (
                        <p className="text-xs text-neutral-500 italic mt-1">
                          "{j.catatan}"
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {j ? (
                        <>
                          <p className="font-bold text-sky-800">{j.skor}</p>
                          <p className="text-xs text-neutral-400">
                            {skorLabel[j.skor]}
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-red-500 font-medium">
                          Belum dinilai
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="bg-white rounded-xl border p-6 mt-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Catatan & Rekomendasi Tindak Lanjut
        </label>
        <textarea
          value={catatanUmum}
          onChange={(e) => setCatatanUmum(e.target.value)}
          rows={4}
          placeholder="Tulis catatan keseluruhan dan rekomendasi tindak lanjut untuk peserta ini (opsional)..."
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/penilaian")}
          className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
        >
          ← Kembali Edit
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Submit Assessment →"}
        </button>
      </div>
    </div>
  );
}
