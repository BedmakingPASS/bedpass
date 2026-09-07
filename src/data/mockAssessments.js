// src/data/mockAssessments.js
// NOTE: Data contoh sementara, nanti diganti dari backend

export const mockAssessments = [
  { id: 1, namaPeserta: "Hanna", tanggal: "04 Sep 2026", nilai: 94, status: "Kompeten" },
  { id: 2, namaPeserta: "Aulia", tanggal: "04 Sep 2026", nilai: 86, status: "Kompeten" },
  { id: 3, namaPeserta: "Rina", tanggal: "03 Sep 2026", nilai: 78, status: "Belum Kompeten" },
  { id: 4, namaPeserta: "Dinda", tanggal: "03 Sep 2026", nilai: 71, status: "Tidak Kompeten" },
  { id: 5, namaPeserta: "Bima", tanggal: "02 Sep 2026", nilai: 85, status: "Kompeten" },
  { id: 6, namaPeserta: "Sari", tanggal: "02 Sep 2026", nilai: 90, status: "Kompeten" },
  { id: 7, namaPeserta: "Tono", tanggal: "01 Sep 2026", nilai: 76, status: "Belum Kompeten" },
];

// Menghitung ringkasan statistik dari data di atas
export function getAssessmentStats() {
  const total = mockAssessments.length;
  const sudahDinilai = mockAssessments.length; // di data asli nanti: yang statusnya bukan "belum dinilai"
  const belumDinilai = 3; // contoh angka tetap dulu, nanti dihitung dari data peserta yang belum ada nilainya
  const rataRata = (
    mockAssessments.reduce((sum, a) => sum + a.nilai, 0) / total
  ).toFixed(1);

  return { total: total + belumDinilai, sudahDinilai, belumDinilai, rataRata };
}

export function statusColor(status) {
  if (status === "Kompeten") return "bg-emerald-100 text-emerald-700";
  if (status === "Belum Kompeten") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}