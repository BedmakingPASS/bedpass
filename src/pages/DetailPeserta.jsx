// src/pages/DetailPeserta.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

function formatTanggal(tgl) {
  if (!tgl) return "";
  const d = new Date(`${tgl}T00:00:00`);
  if (isNaN(d.getTime())) return tgl;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Baris({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 px-5 py-3">
      <span className="sm:w-56 shrink-0 text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-medium text-neutral-800 whitespace-pre-line break-words">
        {children || "—"}
      </span>
    </div>
  );
}

export default function DetailPeserta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { daftarPeserta, loading } = useAssessment();

  const peserta = daftarPeserta.find((p) => String(p.id) === String(id));

  if (loading) {
    return <p className="text-sm text-neutral-500">Memuat data...</p>;
  }

  if (!peserta) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500">Data peserta tidak ditemukan.</p>
        <button
          onClick={() => navigate("/peserta")}
          className="mt-4 text-sky-800 font-medium text-sm hover:underline"
        >
          ← Kembali
        </button>
      </div>
    );
  }

  const sudahIsi = Boolean(peserta.biodata_diisi_pada);
  const ttl = [peserta.tempat_lahir, formatTanggal(peserta.tanggal_lahir)]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/peserta")}
        className="text-sm text-sky-800 font-medium hover:underline mb-4 inline-block"
      >
        ← Kembali
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-sky-900">Biodata Peserta</h1>
        <span
          className={`text-xs font-medium px-3 py-1.5 rounded-full ${
            sudahIsi
              ? "bg-emerald-100 text-emerald-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {sudahIsi ? "Biodata sudah diisi" : "Belum diisi peserta"}
        </span>
      </div>

      {!sudahIsi && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 text-sm text-yellow-800">
          Peserta ini belum mengisi biodata. Pastikan username dan password
          sudah diberikan agar peserta bisa login dan melengkapinya.
        </div>
      )}

      <div className="bg-white rounded-xl border">
        <div className="flex items-center gap-3 px-5 py-4 border-b">
          <div className="h-12 w-12 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold">
            {peserta.nama.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-neutral-800">{peserta.nama}</p>
            <p className="text-xs text-neutral-500">{peserta.instansi}</p>
          </div>
        </div>

        <div className="divide-y">
          <Baris label="Nama Lengkap">{peserta.nama}</Baris>
          <Baris label="NIK">{peserta.nik}</Baris>
          <Baris label="Tempat, Tanggal Lahir">{ttl}</Baris>
          <Baris label="Jenis Kelamin">{peserta.jenis_kelamin}</Baris>
          <Baris label="Agama">{peserta.agama}</Baris>
          <Baris label="Alamat Lengkap">{peserta.alamat}</Baris>
          <Baris label="Asal Sekolah / Instansi">{peserta.instansi}</Baris>
          <Baris label="Nomor Telepon">{peserta.no_telepon}</Baris>
          <Baris label="Email">{peserta.email}</Baris>
        </div>
      </div>
    </div>
  );
}