// src/pages/Dashboard.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { statusColor } from "../data/mockAssessments";
import { useAssessment } from "../context/AssessmentContext";

const PANDUAN_PER_ROLE = {
  general_manager: {
    judul: "Panduan untuk General Manager",
    langkah: [
      "Buka menu 'Persetujuan Penilaian' untuk meninjau hasil yang diajukan Supervisor.",
      "Klik nama peserta untuk melihat detail lengkap sebelum menyetujui atau menolak.",
      "Menu 'Peserta Magang' & 'Rekap Nilai' membantu memantau data secara keseluruhan.",
      "Menu 'Feedback Peserta' menampilkan saran dari peserta magang untuk hotel.",
    ],
  },
  supervisor: {
    judul: "Panduan untuk Supervisor",
    langkah: [
      "Buka menu 'Peserta Magang' lalu klik '+ Tambah Peserta' untuk mendaftarkan peserta baru.",
      "Buka menu 'Penilaian', pilih peserta, lalu isi skor 1-4 untuk setiap aspek.",
      "Setelah lengkap, tinjau di halaman Review sebelum submit ke GM.",
      "Jika ditolak GM, buka 'Riwayat Penilaian' dan klik 'Edit & Ajukan Ulang' pada baris yang berstatus Ditolak.",
    ],
  },
  trainee: {
    judul: "Panduan untuk Kamu",
    langkah: [
      "Buka menu 'Hasil Penilaian Saya' untuk melihat semua hasil penilaian kompetensi kamu.",
      "Setelah hasil disetujui GM, kamu bisa unduh PDF resmi untuk dikumpulkan ke sekolah/kampus.",
      "Buka menu 'Feedback untuk Hotel' untuk membagikan saran perbaikan, sifatnya opsional.",
    ],
  },
};

function PanduanBox({ role }) {
  const [terbuka, setTerbuka] = useState(true);
  const data = PANDUAN_PER_ROLE[role];
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border mb-6 overflow-hidden">
      <button
        onClick={() => setTerbuka(!terbuka)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-sky-50 transition-colors"
      >
        <span className="text-sm font-semibold text-sky-800">
          {data.judul}
        </span>
        <span className="text-xs text-sky-700">
          {terbuka ? "Sembunyikan ▲" : "Tampilkan ▼"}
        </span>
      </button>
      {terbuka && (
        <div className="px-5 pb-5 space-y-2 border-t pt-4">
          {data.langkah.map((teks, i) => (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-neutral-600">{teks}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sublabel, color }) {
  return (
    <div className="bg-white rounded-xl border p-5">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-sm font-medium text-neutral-700 mt-1">{label}</p>
      {sublabel && <p className="text-xs text-neutral-400">{sublabel}</p>}
    </div>
  );
}

function RecentAssessmentTable({ data }) {
  return (
    <div className="bg-white rounded-xl border mt-6 overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h3 className="font-semibold text-neutral-800">Penilaian Terbaru</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400 border-b">
            <th className="px-5 py-3 font-medium">Nama Peserta</th>
            <th className="px-5 py-3 font-medium">Tanggal</th>
            <th className="px-5 py-3 font-medium">Nilai</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-neutral-400">
                Belum ada data penilaian.
              </td>
            </tr>
          ) : (
            data.slice(0, 5).map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="px-5 py-3 font-medium text-neutral-700">
                  {item.peserta.nama}
                </td>
                <td className="px-5 py-3 text-neutral-500">
                  {item.peserta.tanggal}
                </td>
                <td className="px-5 py-3 text-neutral-700">
                  {item.hasil.persentase}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(
                      item.hasil.status
                    )}`}
                  >
                    {item.hasil.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function DashboardSupervisor({ user }) {
  const { riwayatPenilaian, daftarPeserta } = useAssessment();

  const sudahDinilai = riwayatPenilaian.length;
  const belumDinilai = Math.max(daftarPeserta.length - sudahDinilai, 0);
  const rataRata =
    sudahDinilai === 0
      ? 0
      : (
          riwayatPenilaian.reduce((sum, i) => sum + i.hasil.persentase, 0) /
          sudahDinilai
        ).toFixed(1);

  return (
    <div>

      <div className="bg-sky-900 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-xl font-semibold">Selamat Datang, {user.name}!</h1>
        <p className="text-sky-100 text-sm mt-1">
          Mari bersama mendukung kompetensi housekeeping yang lebih baik.
        </p>
      </div>
            <PanduanBox role="supervisor" />


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Peserta" value={daftarPeserta.length} color="text-sky-800" />
        <StatCard label="Sudah Dinilai" value={sudahDinilai} color="text-sky-700" />
        <StatCard label="Belum Dinilai" value={belumDinilai} color="text-yellow-600" />
        <StatCard label="Rata-rata Nilai" value={rataRata} color="text-sky-800" />
      </div>

      <RecentAssessmentTable data={riwayatPenilaian} />
    </div>
  );
}

function DashboardGeneralManager({ user }) {
  const { riwayatPenilaian, daftarPeserta } = useAssessment();

  const menunggu = riwayatPenilaian.filter(
    (i) => i.status === "Menunggu Persetujuan"
  ).length;
  const rataRata =
    riwayatPenilaian.length === 0
      ? 0
      : (
          riwayatPenilaian.reduce((sum, i) => sum + i.hasil.persentase, 0) /
          riwayatPenilaian.length
        ).toFixed(1);

  return (
    <div>

      <div className="bg-sky-900 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-xl font-semibold">Selamat Datang, {user.name}!</h1>
        <p className="text-sky-100 text-sm mt-1">
          Tinjau dan setujui hasil penilaian yang diajukan Supervisor.
        </p>
      </div>
    <PanduanBox role="general_manager" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Menunggu Persetujuan" value={menunggu} color="text-yellow-600" />
        <StatCard label="Total Peserta" value={daftarPeserta.length} color="text-sky-800" />
        <StatCard label="Rata-rata Nilai" value={rataRata} color="text-sky-800" />
      </div>

      <RecentAssessmentTable data={riwayatPenilaian} />
    </div>
  );
}

function DashboardTrainee({ user }) {
  return (
    <div>
      <div className="bg-sky-900 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-xl font-semibold">Halo, {user.name}!</h1>
        <p className="text-sky-100 text-sm mt-1">
          Selamat datang! Cek menu "Hasil Penilaian Saya" untuk
          melihat hasil kompetensi kamu.
        </p>
      </div>
          <PanduanBox role="trainee" />
    </div>
  );
}

export default function Dashboard() {
  const { user, role } = useAuth();

  if (role === "general_manager") return <DashboardGeneralManager user={user} />;
  if (role === "supervisor") return <DashboardSupervisor user={user} />;
  if (role === "trainee") return <DashboardTrainee user={user} />;

  return <p>Role tidak dikenali.</p>;
}
