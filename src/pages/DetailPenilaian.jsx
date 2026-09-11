// src/pages/DetailPenilaian.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import { useAuth } from "../context/AuthContext";
import { assessmentAspects, skorLabel, konversiNilai } from "../data/assessmentAspects";
import { generateHasilPenilaianPdf } from "../utils/generatePdf";

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
    return { kategori, totalSkor, maksimal };
  });
}

const statusColorMap = {
  Kompeten: "bg-emerald-100 text-emerald-700",
  "Belum Kompeten": "bg-yellow-100 text-yellow-700",
  "Tidak Kompeten": "bg-red-100 text-red-700",
};

const statusApprovalColorMap = {
  "Menunggu Persetujuan": "bg-yellow-100 text-yellow-700",
  Disetujui: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-red-100 text-red-700",
};

export default function DetailPenilaian() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { riwayatPenilaian, updateStatusPenilaian } = useAssessment();

  const data = riwayatPenilaian.find((item) => String(item.id) === String(id));

  if (!data) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">
          Data penilaian tidak ditemukan. Mungkin sudah dihapus atau ID tidak valid.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sky-800 font-medium text-sm hover:underline"
        >
          ← Kembali
        </button>
      </div>
    );
  }

  const konversi = data.hasil.kategori
    ? data.hasil
    : konversiNilai(data.hasil.persentase);

  const perKategori = hitungPerKategori(data.jawaban);
  const statusColor = statusColorMap[data.hasil.status] || "bg-neutral-100 text-neutral-700";

  const bisaMemprosesPersetujuan =
    role === "general_manager" && data.status === "Menunggu Persetujuan";

  const handleApprove = async () => {
    await updateStatusPenilaian(data.id, "Disetujui");
    navigate("/persetujuan");
  };

  const handleReject = async () => {
    await updateStatusPenilaian(data.id, "Ditolak");
    navigate("/persetujuan");
  };

  const handleDownloadPdf = () => {
    generateHasilPenilaianPdf(data, konversi);
  };

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-sky-800 font-medium hover:underline mb-4 inline-block"
      >
        ← Kembali
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-sky-900">
          Detail Hasil Penilaian
        </h1>
        <div className="flex items-center gap-3">
          {data.status === "Disetujui" ? (
            <button
              onClick={handleDownloadPdf}
              className="text-sm px-4 py-2 rounded-lg border border-sky-300 text-sky-800 hover:bg-sky-50 font-medium"
            >
              Download PDF
            </button>
          ) : (
            <span className="text-xs text-neutral-400 italic">
              PDF tersedia setelah disetujui GM
            </span>
          )}
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              statusApprovalColorMap[data.status] || "bg-neutral-100 text-neutral-600"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* Ringkasan skor */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold">
            {data.peserta.nama.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-neutral-800">{data.peserta.nama}</p>
            <p className="text-xs text-neutral-500">
              {data.peserta.instansi} · {data.peserta.tanggal} · Dinilai oleh{" "}
              {data.peserta.penilai}
            </p>
          </div>
        </div>

        <div className="text-center py-6 border-y">
          <p className="text-5xl font-bold text-sky-900">
            {data.hasil.persentase}
            <span className="text-xl text-neutral-400">/100</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-sm font-medium text-neutral-600">
              {konversi.kategori}
            </span>
            <span
              className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full ${statusColor}`}
            >
              {data.hasil.status}
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
          <p className="text-xs font-medium text-sky-800 mb-1">Keterangan</p>
          <p className="text-sm text-neutral-600">{konversi.keterangan}</p>
        </div>

        {data.catatan_umum && (
          <div className="pt-5 mt-5 border-t">
            <p className="text-xs font-medium text-sky-800 mb-1">
              Catatan & Rekomendasi Tindak Lanjut
            </p>
            <p className="text-sm text-neutral-600">{data.catatan_umum}</p>
          </div>
        )}
      </div>

      {/* Detail skor per aspek */}
      <p className="text-sm font-semibold text-sky-800 mb-2">
        Detail Skor per Aspek
      </p>
      <div className="bg-white rounded-xl border divide-y mb-6">
        {assessmentAspects.map((aspek) => {
          const j = data.jawaban[aspek.id];
          return (
            <div key={aspek.id} className="p-4 flex items-start gap-4">
              <span className="text-xs text-neutral-400 w-6 pt-0.5">
                {String(aspek.id).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700">
                  {aspek.judul}
                </p>
                <p className="text-xs text-neutral-400">{aspek.kategori}</p>
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
                    Tidak dinilai
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tombol Setujui/Tolak: hanya muncul untuk GM saat status masih menunggu */}
      {bisaMemprosesPersetujuan && (
        <div className="bg-white rounded-xl border p-5 flex items-center justify-between sticky bottom-4">
          <p className="text-sm text-neutral-600">
            Apakah hasil penilaian ini sudah sesuai dan bisa disetujui?
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50"
            >
              Tolak
            </button>
            <button
              onClick={handleApprove}
              className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium"
            >
              Setujui
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
