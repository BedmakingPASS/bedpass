// src/pages/RekapNilai.jsx
import { useAssessment } from "../context/AssessmentContext";

export default function RekapNilai() {
  const { riwayatPenilaian } = useAssessment();

  const totalPenilaian = riwayatPenilaian.length;
  const jumlahKompeten = riwayatPenilaian.filter(
    (i) => i.hasil.status === "Kompeten"
  ).length;
  const jumlahBelumKompeten = riwayatPenilaian.filter(
    (i) => i.hasil.status === "Belum Kompeten"
  ).length;
  const jumlahTidakKompeten = riwayatPenilaian.filter(
    (i) => i.hasil.status === "Tidak Kompeten"
  ).length;

  const rataRata =
    totalPenilaian === 0
      ? 0
      : (
          riwayatPenilaian.reduce((sum, i) => sum + i.hasil.persentase, 0) /
          totalPenilaian
        ).toFixed(1);

  // Rekap per peserta (kalau 1 peserta dinilai beberapa kali, ambil rata-ratanya)
  const rekapPerPeserta = {};
  riwayatPenilaian.forEach((item) => {
    const nama = item.peserta.nama;
    if (!rekapPerPeserta[nama]) {
      rekapPerPeserta[nama] = { nilai: [], instansi: item.peserta.instansi };
    }
    rekapPerPeserta[nama].nilai.push(item.hasil.persentase);
  });

  const daftarRekap = Object.entries(rekapPerPeserta).map(([nama, data]) => ({
    nama,
    instansi: data.instansi,
    rataRata: (
      data.nilai.reduce((a, b) => a + b, 0) / data.nilai.length
    ).toFixed(1),
    jumlahPenilaian: data.nilai.length,
  }));

  return (
    <div>
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        Rekap Nilai
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        Ringkasan statistik seluruh hasil penilaian.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-5">
          <p className="text-2xl font-bold text-sky-800">
            {totalPenilaian}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Total Penilaian</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-2xl font-bold text-sky-700">
            {jumlahKompeten}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Kompeten</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-2xl font-bold text-yellow-600">
            {jumlahBelumKompeten}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Belum Kompeten</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-2xl font-bold text-red-600">
            {jumlahTidakKompeten}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Tidak Kompeten</p>
        </div>
      </div>

      <div className="bg-sky-900 rounded-xl p-5 text-white mb-6 flex items-center justify-between">
        <span className="text-sm">Rata-rata Nilai Keseluruhan</span>
        <span className="text-2xl font-bold">{rataRata}</span>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h3 className="font-semibold text-neutral-800">Rekap per Peserta</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-400 border-b">
              <th className="px-5 py-3 font-medium">Nama Peserta</th>
              <th className="px-5 py-3 font-medium">Instansi</th>
              <th className="px-5 py-3 font-medium">Rata-rata Nilai</th>
              <th className="px-5 py-3 font-medium">Jumlah Penilaian</th>
            </tr>
          </thead>
          <tbody>
            {daftarRekap.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-neutral-400"
                >
                  Belum ada data.
                </td>
              </tr>
            ) : (
              daftarRekap.map((item) => (
                <tr key={item.nama} className="border-b last:border-0">
                  <td className="px-5 py-3 font-medium text-neutral-700">
                    {item.nama}
                  </td>
                  <td className="px-5 py-3 text-neutral-500">
                    {item.instansi}
                  </td>
                  <td className="px-5 py-3 text-neutral-700">
                    {item.rataRata}
                  </td>
                  <td className="px-5 py-3 text-neutral-500">
                    {item.jumlahPenilaian}x
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}