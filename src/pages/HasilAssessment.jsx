// src/pages/HasilAssessment.jsx
import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { assessmentAspects } from "../data/assessmentAspects";

function hitungPerKategori(jawaban) {
  const kategoriList = ["Hard Skill", "Soft Skill", "Technical Skill"];
  return kategoriList.map((kategori) => {
    const aspekKategori = assessmentAspects.filter(
      (a) => a.kategori === kategori
    );
    const totalSkor = aspekKategori.reduce(
      (sum, a) => sum + (jawaban[a.id]?.skor || 0),
      0
    );
    const maksimal = aspekKategori.length * 4;
    return { kategori, totalSkor, maksimal, jumlahAspek: aspekKategori.length };
  });
}

const statusColorMap = {
  Kompeten: "bg-emerald-100 text-emerald-700",
  "Belum Kompeten": "bg-yellow-100 text-yellow-700",
  "Tidak Kompeten": "bg-red-100 text-red-700",
};

export default function HasilAssessment() {
  const { pesertaTerpilih, jawaban, hitungHasil } = useAssessment();
  const navigate = useNavigate();

  if (!pesertaTerpilih) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">Belum ada hasil assessment.</p>
        <button
          onClick={() => navigate("/peserta")}
          className="mt-4 text-sky-800 font-medium text-sm hover:underline"
        >
          ← Kembali ke Data Peserta
        </button>
      </div>
    );
  }

  const hasil = hitungHasil();
  const perKategori = hitungPerKategori(jawaban);
  const statusColor = statusColorMap[hasil.status] || "bg-neutral-100 text-neutral-700";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-sky-900">Hasil Assessment</h1>
        <button
          onClick={() => window.print()}
          className="text-sm px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
        >
          Cetak
        </button>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold">
            {pesertaTerpilih.nama.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-neutral-800">
              {pesertaTerpilih.nama}
            </p>
            <p className="text-xs text-neutral-500">
              {pesertaTerpilih.instansi} · {pesertaTerpilih.tanggal}
            </p>
          </div>
        </div>

        <div className="text-center py-6 border-y">
          <p className="text-5xl font-bold text-sky-900">
            {hasil.persentase}
            <span className="text-xl text-neutral-400">/100</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-sm font-medium text-neutral-600">
              {hasil.kategori}
            </span>
            <span
              className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full ${statusColor}`}
            >
              {hasil.status}
            </span>
          </div>
        </div>

        <div className="py-5 space-y-3 border-b">
          {perKategori.map((k) => {
            const persen = Math.round((k.totalSkor / k.maksimal) * 100);
            return (
              <div key={k.kategori}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{k.kategori}</span>
                  <span className="font-medium text-neutral-700">
                    {k.totalSkor} / {k.maksimal} ({persen}%)
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-700"
                    style={{ width: `${persen}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-5">
          <p className="text-xs font-medium text-sky-800 mb-1">
            Keterangan
          </p>
          <p className="text-sm text-neutral-600">{hasil.keterangan}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-sky-800 hover:bg-sky-900 text-white font-medium rounded-lg py-2.5 transition-colors mt-6"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
}
