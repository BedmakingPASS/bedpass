// src/pages/DataPeserta.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../context/AssessmentContext";

export default function DataPeserta() {
  const { user } = useAuth();
    const { mulaiPenilaianBaru, daftarPeserta } = useAssessment();
  const navigate = useNavigate();

  const [pesertaId, setPesertaId] = useState("");
  const [tanggal, setTanggal] = useState(
    new Date().toLocaleDateString("id-ID")
  );

  const handleMulai = () => {
        const peserta = daftarPeserta.find((p) => p.id === Number(pesertaId));
    if (!peserta) {
      alert("Pilih peserta magang terlebih dahulu");
      return;
    }
    mulaiPenilaianBaru({ ...peserta, penilai: user.name, tanggal });
    navigate("/petunjuk-penilaian");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Data Peserta Magang
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Isi identitas peserta sebelum memulai penilaian.
      </p>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Nama Peserta Magang
          </label>
          <select
            value={pesertaId}
            onChange={(e) => setPesertaId(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
          >
            <option value="">Pilih peserta magang</option>
                        {daftarPeserta.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Instansi Peserta Magang
          </label>
          <input
            type="text"
            readOnly
            value={
                            daftarPeserta.find((p) => p.id === Number(pesertaId))?.instansi ||
              ""
            }
            placeholder="Otomatis terisi setelah pilih peserta"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm bg-neutral-50 text-neutral-500"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Nama Penilai
          </label>
          <input
            type="text"
            readOnly
            value={user.name}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm bg-neutral-50 text-neutral-500"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Tanggal Penilaian
          </label>
          <input
            type="text"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
          />
        </div>

        <button
          onClick={handleMulai}
          className="w-full bg-sky-800 hover:bg-sky-900 text-white font-medium rounded-lg py-2.5 transition-colors mt-2"
        >
          Mulai Penilaian →
        </button>
      </div>
    </div>
  );
}