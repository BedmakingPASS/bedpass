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
          <p className="text-2xl font-bold text-sky-800">{totalPenilaian}</p>
          <p className="text-sm text-neutral-600 mt-1">Total Penilaian</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-2xl font-bold text-sky-700">{jumlahKompeten}</p>
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

      <p className="text-sm font-semibold text-sky-800 mb-2">
        Rekap per Peserta
      </p>

      {daftarRekap.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center text-neutral-400 text-sm">
          Belum ada data.
        </div>
      ) : (
        <>
          <div className="md:hidden space-y-3">
            {daftarRekap.map((item) => (
              <div key={item.nama} className="bg-white rounded-xl border p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-neutral-700">
                    {item.nama}
                  </p>
                  <p className="text-lg font-bold text-sky-800">
                    {item.rataRata}
                  </p>
                </div>
                <p className="text-xs text-neutral-500 mb-1">
                  {item.instansi}
                </p>
                <p className="text-xs text-neutral-400">
                  Dinilai {item.jumlahPenilaian}x
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
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
                {daftarRekap.map((item) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
