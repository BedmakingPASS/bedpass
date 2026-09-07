// src/pages/FeedbackPeserta.jsx
import { useAssessment } from "../context/AssessmentContext";

export default function FeedbackPeserta() {
  const { daftarFeedback } = useAssessment();

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Feedback dari Peserta Magang
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Saran dan rekomendasi dari peserta magang untuk perbaikan hotel ke
        depannya.
      </p>

      {daftarFeedback.length === 0 ? (
        <div className="bg-white rounded-xl border p-6 text-sm text-neutral-500">
          Belum ada feedback yang masuk dari peserta magang.
        </div>
      ) : (
        <div className="space-y-4">
          {daftarFeedback.map((fb) => (
            <div key={fb.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold text-sm">
                  {fb.nama_peserta.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    {fb.nama_peserta}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {new Date(fb.updated_at).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 whitespace-pre-line">
                {fb.isi_feedback}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
