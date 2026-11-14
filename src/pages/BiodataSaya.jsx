// src/pages/BiodataSaya.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../context/AssessmentContext";

const AGAMA = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];

const FORM_KOSONG = {
    instansi: "",
  nik: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  agama: "",
  alamat: "",
  no_telepon: "",
  email: "",
};

const inputCls =
  "w-full border border-neutral-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700";

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

// Ubah data peserta dari database menjadi isi form
function dariPeserta(peserta) {
  return {
        instansi: peserta.instansi || "",
    nik: peserta.nik || "",
    tempat_lahir: peserta.tempat_lahir || "",
    tanggal_lahir: peserta.tanggal_lahir || "",
    jenis_kelamin: peserta.jenis_kelamin || "",
    agama: peserta.agama || "",
    alamat: peserta.alamat || "",
    no_telepon: peserta.no_telepon || "",
    email: peserta.email || "",
  };
}

export default function BiodataSaya() {
  const { user } = useAuth();
  const { daftarPeserta, simpanBiodata, loading } = useAssessment();

  // Cari data peserta milik akun yang sedang login
  const idAkun = user?.pesertaId ?? user?.peserta_id;
  const peserta =
    daftarPeserta.find((p) => idAkun && String(p.id) === String(idAkun)) ||
    daftarPeserta.find((p) => p.nama === user?.name);

  const [form, setForm] = useState(FORM_KOSONG);
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

  // Isi form dengan data yang sudah tersimpan
  useEffect(() => {
    if (!peserta) return;
    setForm(dariPeserta(peserta));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peserta?.id, peserta?.biodata_diisi_pada]);

  const ubah = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "nik" ? value.replace(/\D/g, "") : value,
    }));
    setError("");
    setSukses(false);
  };

  const mulaiEdit = () => {
    setForm(dariPeserta(peserta));
    setError("");
    setSukses(false);
    setModeEdit(true);
  };

  const batalEdit = () => {
    setForm(dariPeserta(peserta));
    setError("");
    setModeEdit(false);
  };

  const simpan = async (e) => {
    e.preventDefault();
    if (form.instansi.trim().length < 3)
      return setError("Asal sekolah / instansi wajib diisi.");
    if (!/^\d{16}$/.test(form.nik))
      return setError("NIK harus 16 digit angka.");
    if (!form.tempat_lahir.trim() || !form.tanggal_lahir)
      return setError("Tempat dan tanggal lahir wajib diisi.");
    if (!form.jenis_kelamin) return setError("Pilih jenis kelamin.");
    if (!form.agama) return setError("Pilih agama.");
    if (form.alamat.trim().length < 10)
      return setError("Alamat lengkap wajib diisi (minimal 10 karakter).");

    const telp = form.no_telepon.replace(/[\s-]/g, "");
    const email = form.email.trim();
    if (!telp && !email)
      return setError("Isi minimal salah satu: nomor telepon atau email.");
    if (telp && !/^\+?\d{8,15}$/.test(telp))
      return setError("Nomor telepon tidak valid.");
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      return setError("Format email tidak valid.");

    setMenyimpan(true);
    const hasil = await simpanBiodata(peserta.id, {
            instansi: form.instansi.trim(),
      nik: form.nik,
      tempat_lahir: form.tempat_lahir.trim(),
      tanggal_lahir: form.tanggal_lahir,
      jenis_kelamin: form.jenis_kelamin,
      agama: form.agama,
      alamat: form.alamat.trim(),
      no_telepon: telp || null,
      email: email || null,
    });
    setMenyimpan(false);

    if (!hasil.ok) return setError("Gagal menyimpan: " + hasil.pesan);
    setSukses(true);
    setModeEdit(false); // kembali ke tampilan biodata
  };

  if (loading) {
    return <p className="text-sm text-neutral-500">Memuat data...</p>;
  }

  if (!peserta) {
    return (
      <div className="bg-white rounded-xl border p-6 max-w-lg">
        <p className="text-neutral-500 text-sm">
          Data peserta untuk akun ini tidak ditemukan. Hubungi supervisor.
        </p>
      </div>
    );
  }

  const sudahIsi = Boolean(peserta.biodata_diisi_pada);
  const tampilkanForm = !sudahIsi || modeEdit;
  const hariIni = new Date().toISOString().split("T")[0];
  const ttl = [peserta.tempat_lahir, formatTanggal(peserta.tanggal_lahir)]
    .filter(Boolean)
    .join(", ");

  // ===== MODE LIHAT: biodata sudah diisi =====
  if (!tampilkanForm) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-sky-900">Biodata Saya</h1>
          <button
            onClick={mulaiEdit}
            className="text-sm font-medium px-4 py-2 rounded-full bg-sky-800 hover:bg-sky-900 text-white"
          >
            Edit Biodata
          </button>
        </div>

        {sukses && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 text-sm text-emerald-700">
            Biodata berhasil disimpan.
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

  // ===== MODE FORM: belum diisi, atau sedang edit =====
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-sky-900 mb-1">
        {sudahIsi ? "Edit Biodata" : "Biodata Saya"}
      </h1>
      <p className="text-neutral-500 text-sm mb-6">
        {sudahIsi
          ? "Perbaiki data yang kurang tepat, lalu simpan."
          : "Lengkapi biodata kamu. Data ini bisa dilihat oleh supervisor."}
      </p>

      {!sudahIsi && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 text-sm text-yellow-800">
          Biodata kamu belum lengkap. Mohon isi semua kolom di bawah ini.
        </div>
      )}

      <form onSubmit={simpan} className="bg-white rounded-xl border p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-600">Nama Lengkap</label>
            <input
              value={peserta.nama}
              disabled
              className={`${inputCls} mt-1 bg-neutral-100 text-neutral-500`}
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600">
              Asal Sekolah / Instansi <span className="text-red-500">*</span>
            </label>
            <input
              name="instansi"
              value={form.instansi}
              onChange={ubah}
              placeholder="Contoh: SMK Pariwisata Bandung"
              className={`${inputCls} mt-1`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-neutral-600">
              NIK <span className="text-red-500">*</span>
            </label>
            <input
              name="nik"
              value={form.nik}
              onChange={ubah}
              inputMode="numeric"
              maxLength={16}
              placeholder="16 digit angka"
              className={`${inputCls} mt-1`}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">
              Tempat Lahir <span className="text-red-500">*</span>
            </label>
            <input
              name="tempat_lahir"
              value={form.tempat_lahir}
              onChange={ubah}
              className={`${inputCls} mt-1`}
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={form.tanggal_lahir}
              onChange={ubah}
              max={hariIni}
              className={`${inputCls} mt-1`}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={ubah}
              className={`${inputCls} mt-1`}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-neutral-600">
              Agama <span className="text-red-500">*</span>
            </label>
            <select
              name="agama"
              value={form.agama}
              onChange={ubah}
              className={`${inputCls} mt-1`}
            >
              <option value="">Pilih agama</option>
              {AGAMA.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-neutral-600">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alamat"
              rows={3}
              value={form.alamat}
              onChange={ubah}
              placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota"
              className={`${inputCls} mt-1`}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Nomor Telepon</label>
            <input
              name="no_telepon"
              value={form.no_telepon}
              onChange={ubah}
              inputMode="tel"
              placeholder="08xxxxxxxxxx"
              className={`${inputCls} mt-1`}
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={ubah}
              placeholder="nama@email.com"
              className={`${inputCls} mt-1`}
            />
          </div>
        </div>


        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <div className="flex justify-end gap-3 mt-5">
          {sudahIsi && (
            <button
              type="button"
              onClick={batalEdit}
              className="px-5 py-2.5 rounded-lg border text-sm font-medium"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={menyimpan}
            className="px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white text-sm font-medium disabled:opacity-60"
          >
            {menyimpan ? "Menyimpan..." : "Simpan Biodata"}
          </button>
        </div>
      </form>
    </div>
  );
}