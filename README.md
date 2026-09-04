# CBA Making Bed

Digital Competency-Based Assessment untuk penilaian kompetensi Housekeeping (Making Bed).
Stack: **React + Vite + Tailwind CSS + React Router**.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Struktur folder

```
cba-making-bed/
├── public/                         # aset statis (favicon, dll)
├── src/
│   ├── assets/images/              # gambar (hero kamar, foto peserta, ikon)
│   ├── components/
│   │   ├── common/                 # Sidebar, Navbar — dipakai di semua halaman
│   │   └── ui/                     # Button, Card, Badge, ProgressBar, dll (reusable)
│   ├── context/
│   │   └── AuthContext.jsx         # sesi login supervisor
│   ├── hooks/
│   │   └── useFetch.js
│   ├── layouts/
│   │   └── MainLayout.jsx          # sidebar + navbar + <Outlet/> untuk semua halaman internal
│   ├── pages/
│   │   ├── Login/                  # 1. Halaman Login
│   │   ├── Dashboard/              # 2. Dashboard
│   │   ├── DataPeserta/            # 3. Data Peserta (form identitas penilaian)
│   │   ├── PetunjukPenilaian/      # 4. Petunjuk Penilaian
│   │   ├── Assessment/             # 5. Halaman Assessment (per aspek, skor 1–4)
│   │   ├── KategoriTechnicalSkill/ # 6. Kategori Technical Skill (checklist aspek)
│   │   ├── ReviewAssessment/       # 7. Review Assessment sebelum submit
│   │   ├── HasilAssessment/        # 8. Hasil Assessment (skor akhir, rekomendasi)
│   │   ├── RiwayatPenilaian/       # 9. Riwayat Penilaian (tabel + filter)
│   │   ├── PesertaMagang/          # daftar peserta magang (menu sidebar)
│   │   ├── RekapNilai/             # rekap nilai (menu sidebar)
│   │   └── Profil/                 # profil supervisor (menu sidebar)
│   ├── routes/                     # (opsional) definisi route terpisah jika App.jsx membesar
│   ├── services/
│   │   ├── api.js                  # wrapper fetch dasar
│   │   ├── pesertaService.js
│   │   └── assessmentService.js
│   ├── styles/
│   │   └── index.css               # Tailwind directives + base styles
│   ├── utils/
│   │   └── constants.js            # skor 1–4, kategori aspek, status kompetensi
│   ├── App.jsx                     # definisi seluruh <Routes>
│   └── main.jsx                    # entry point React
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Alur halaman (sesuai desain)

1. **Login** → 2. **Dashboard** → 3. **Data Peserta** (isi identitas penilaian) →
2. **Petunjuk Penilaian** → 5. **Assessment** (isi skor tiap aspek: Hard Skill, Soft Skill,
   Technical Skill) → 6. **Kategori Technical Skill** (checklist progres aspek) →
3. **Review Assessment** → 8. **Hasil Assessment** (skor akhir & rekomendasi tindak lanjut) →
4. **Riwayat Penilaian** (lihat semua histori penilaian).

## Langkah selanjutnya

- Pindahkan komponen berulang (kartu statistik, badge status, progress bar skor) ke `src/components/ui/`.
- Sambungkan `services/*.js` ke backend/API sungguhan (ganti `VITE_API_BASE_URL` di `.env`).
- Isi konten tiap halaman di `src/pages/**` sesuai mockup masing-masing.
- Tambahkan proteksi route (redirect ke `/login` jika belum autentikasi) memakai `AuthContext`.
