// src/pages/FeedbackSaya.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../context/AssessmentContext";

export default function FeedbackSaya() {
  const { user } = useAuth();
  const { daftarPeserta, daftarFeedback, simpanFeedback } = useAssessment();

  const [isEditing, setIsEditing] = useState(false);
  const [teks, setTeks] = useState("");
  const [saving, setSaving] = useState(false);

  const pesertaSaya = daftarPeserta.find((p) => p.nama === user.name);
  const feedbackSaya = daftarFeedback.find((f) => f.nama_peserta === user.name);

  useEffect(() => {
    if (feedbackSaya) {
      setTeks(feedbackSaya.isi_feedback);
    }
  }, [feedbackSaya]);

  const handleSimpan = async () => {
    if (!teks.trim()) {
      alert("Feedback tidak boleh kosong");
      return;
    }
    if (!pesertaSaya) {
      alert("Data peserta kamu tidak ditemukan di sistem.");
      return;
    }
    setSaving(true);
    await simpanFeedback(pesertaSaya.id, user.name, teks);
    setSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Feedback untuk Hotel
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Bagikan saran atau rekomendasi kamu untuk perbaikan hotel ke depannya.
        Feedback ini bersifat opsional dan bisa diubah kapan saja.
      </p>

      <div className="bg-white rounded-xl border p-6">
        {!isEditing ? (
          <>
            {feedbackSaya ? (
              <>
                <p className="text-sm text-neutral-700 whitespace-pre-line mb-4">
                  {feedbackSaya.isi_feedback}
                </p>
                <p className="text-xs text-neutral-400 mb-4">
                  Terakhir diperbarui:{" "}
                  {new Date(feedbackSaya.updated_at).toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
                >
                  Edit Feedback
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-neutral-500 mb-4">
                  Kamu belum memberikan feedback. Yuk, bagikan saran atau
                  rekomendasi kamu untuk hotel!
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
                >
                  Isi Feedback
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <label className="block text-sm text-neutral-600 mb-2">
              Saran & Rekomendasi
            </label>
            <textarea
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
              rows={6}
              placeholder="Contoh: Menurut saya, pelatihan tentang teknik mitered corner bisa ditambah durasinya karena masih banyak peserta yang kesulitan..."
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTeks(feedbackSaya?.isi_feedback || "");
                }}
                className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium disabled:opacity-60"
              >
                {saving ? "Menyimpan..." : "Simpan Feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
