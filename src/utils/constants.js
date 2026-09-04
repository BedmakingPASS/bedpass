export const SKOR_OPTIONS = [
  { value: 4, label: 'Sangat Baik' },
  { value: 3, label: 'Baik' },
  { value: 2, label: 'Cukup' },
  { value: 1, label: 'Kurang' },
]

export const KATEGORI_ASPEK = {
  HARD_SKILL: 'hard_skill',
  SOFT_SKILL: 'soft_skill',
  TECHNICAL_SKILL: 'technical_skill',
}

export const STATUS_KOMPETENSI = {
  KOMPETEN: 'Kompeten',
  BELUM_KOMPETEN: 'Belum Kompeten',
  TIDAK_KOMPETEN: 'Tidak Kompeten',
}

// Contoh ambang nilai akhir — sesuaikan dengan aturan penilaian sebenarnya
export function getStatusFromScore(totalScore) {
  if (totalScore >= 85) return STATUS_KOMPETENSI.KOMPETEN
  if (totalScore >= 70) return STATUS_KOMPETENSI.BELUM_KOMPETEN
  return STATUS_KOMPETENSI.TIDAK_KOMPETEN
}
