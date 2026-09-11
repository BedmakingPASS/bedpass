// src/context/AssessmentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { assessmentAspects, konversiNilai } from "../data/assessmentAspects";
import { supabase } from "../services/supabaseClient";

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [pesertaTerpilih, setPesertaTerpilih] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jawaban, setJawaban] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [daftarPeserta, setDaftarPeserta] = useState([]);
  const [riwayatPenilaian, setRiwayatPenilaian] = useState([]);
  const [daftarFeedback, setDaftarFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalAspek = assessmentAspects.length;
  const aspekSaatIni = assessmentAspects[currentIndex];

  const ambilDaftarPeserta = async () => {
    const { data, error } = await supabase.from("peserta").select("*");
    if (error) {
      console.error("Gagal ambil data peserta:", error.message);
      return;
    }
    setDaftarPeserta(data);
  };

  const ambilRiwayatPenilaian = async () => {
    const { data, error } = await supabase
      .from("penilaian")
      .select("*, peserta(nama, instansi)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil riwayat penilaian:", error.message);
      return;
    }

    const formatted = data.map((row) => ({
      id: row.id,
      pesertaId: row.peserta_id,
      peserta: {
        nama: row.peserta?.nama,
        instansi: row.peserta?.instansi,
        penilai: row.nama_penilai,
        tanggal: row.tanggal,
      },
      jawaban: row.jawaban,
      hasil: {
        totalSkor: row.total_skor,
        maksimalSkor: row.maksimal_skor,
        persentase: row.persentase,
        status: row.status_hasil,
      },
      status: row.status_persetujuan,
      catatan_umum: row.catatan_umum,
    }));

    setRiwayatPenilaian(formatted);
  };

  const ambilDaftarFeedback = async () => {
    const { data, error } = await supabase
      .from("feedback_peserta")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil feedback:", error.message);
      return;
    }
    setDaftarFeedback(data);
  };

  useEffect(() => {
    const muatSemuaData = async () => {
      setLoading(true);
      await Promise.all([
        ambilDaftarPeserta(),
        ambilRiwayatPenilaian(),
        ambilDaftarFeedback(),
      ]);
      setLoading(false);
    };
    muatSemuaData();
  }, []);

  const mulaiPenilaianBaru = (peserta) => {
    setPesertaTerpilih(peserta);
    setCurrentIndex(0);
    setJawaban({});
    setEditingId(null);
  };

  const mulaiEditPenilaian = (penilaianId) => {
    const data = riwayatPenilaian.find(
      (item) => String(item.id) === String(penilaianId)
    );
    if (!data) return false;

    setPesertaTerpilih({
      id: data.pesertaId,
      nama: data.peserta.nama,
      instansi: data.peserta.instansi,
      penilai: data.peserta.penilai,
      tanggal: data.peserta.tanggal,
    });
    setJawaban(data.jawaban);
    setCurrentIndex(0);
    setEditingId(data.id);
    return true;
  };

  const simpanJawaban = (aspekId, skor, catatan = "") => {
    setJawaban((prev) => ({ ...prev, [aspekId]: { skor, catatan } }));
  };

  const nextAspek = () => {
    if (currentIndex < totalAspek - 1) setCurrentIndex((i) => i + 1);
  };

  const prevAspek = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const hitungHasil = (jawabanInput = jawaban) => {
    const semuaSkor = Object.values(jawabanInput).map((j) => j.skor);
    const totalSkor = semuaSkor.reduce((sum, s) => sum + s, 0);
    const maksimalSkor = totalAspek * 4;
    const persentase = Math.round((totalSkor / maksimalSkor) * 100);

    const konversi = konversiNilai(persentase);

    return {
      totalSkor,
      maksimalSkor,
      persentase,
      status: konversi.statusKompetensi,
      kategori: konversi.kategori,
      keterangan: konversi.keterangan,
    };
  };

  const submitPenilaian = async (catatanUmum = "") => {
    const hasil = hitungHasil(jawaban);

    const payload = {
      peserta_id: pesertaTerpilih.id,
      nama_penilai: pesertaTerpilih.penilai,
      tanggal: pesertaTerpilih.tanggal,
      jawaban: jawaban,
      total_skor: hasil.totalSkor,
      maksimal_skor: hasil.maksimalSkor,
      persentase: hasil.persentase,
      status_hasil: hasil.status,
      status_persetujuan: "Menunggu Persetujuan",
      catatan_umum: catatanUmum,
    };

    let result;
    if (editingId) {
      result = await supabase
        .from("penilaian")
        .update(payload)
        .eq("id", editingId)
        .select();
    } else {
      result = await supabase.from("penilaian").insert(payload).select();
    }

    const { data, error } = result;

    if (error) {
      console.error("Gagal menyimpan penilaian:", error.message);
      alert("Gagal menyimpan penilaian: " + error.message);
      return null;
    }

    setEditingId(null);
    await ambilRiwayatPenilaian();
    return data[0];
  };

  const updateStatusPenilaian = async (id, statusBaru) => {
    const { error } = await supabase
      .from("penilaian")
      .update({ status_persetujuan: statusBaru })
      .eq("id", id);

    if (error) {
      console.error("Gagal update status:", error.message);
      alert("Gagal update status: " + error.message);
      return;
    }

    await ambilRiwayatPenilaian();
  };
    const hapusPenilaian = async (id) => {
    const { error } = await supabase.from("penilaian").delete().eq("id", id);

    if (error) {
      console.error("Gagal hapus penilaian:", error.message);
      alert("Gagal menghapus data: " + error.message);
      return;
    }

    await ambilRiwayatPenilaian();
  };
    const hapusPeserta = async (pesertaId) => {
    // Hapus berurutan: feedback -> akun login -> semua riwayat penilaian -> peserta itu sendiri
    await supabase.from("feedback_peserta").delete().eq("peserta_id", pesertaId);
    await supabase.from("akun_peserta").delete().eq("peserta_id", pesertaId);
    await supabase.from("penilaian").delete().eq("peserta_id", pesertaId);

    const { error } = await supabase.from("peserta").delete().eq("id", pesertaId);

    if (error) {
      console.error("Gagal hapus peserta:", error.message);
      alert("Gagal menghapus peserta: " + error.message);
      return;
    }

    await Promise.all([
      ambilDaftarPeserta(),
      ambilRiwayatPenilaian(),
      ambilDaftarFeedback(),
    ]);
  };

  const simpanFeedback = async (pesertaId, namaPeserta, isiFeedback) => {
    const existing = daftarFeedback.find(
      (f) => f.nama_peserta === namaPeserta
    );

    let result;
    if (existing) {
      result = await supabase
        .from("feedback_peserta")
        .update({ isi_feedback: isiFeedback, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select();
    } else {
      result = await supabase
        .from("feedback_peserta")
        .insert({
          peserta_id: pesertaId,
          nama_peserta: namaPeserta,
          isi_feedback: isiFeedback,
        })
        .select();
    }

    const { data, error } = result;

    if (error) {
      console.error("Gagal menyimpan feedback:", error.message);
      alert("Gagal menyimpan feedback: " + error.message);
      return null;
    }

    await ambilDaftarFeedback();
    return data[0];
  };

  // BARU: tambah peserta baru sekaligus buat akun login otomatis
  const tambahPeserta = async (nama, instansi, username, password) => {
    // 1. Cek dulu username belum dipakai
    const { data: existingAkun } = await supabase
      .from("akun_peserta")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existingAkun) {
      throw new Error("Username sudah dipakai peserta lain. Gunakan username lain.");
    }

    // 2. Insert peserta baru
    const { data: pesertaBaru, error: errorPeserta } = await supabase
      .from("peserta")
      .insert({ nama, instansi })
      .select()
      .single();

    if (errorPeserta) {
      throw new Error("Gagal menambah peserta: " + errorPeserta.message);
    }

    // 3. Insert akun login untuk peserta itu
    const { error: errorAkun } = await supabase.from("akun_peserta").insert({
      peserta_id: pesertaBaru.id,
      username,
      password,
    });

    if (errorAkun) {
      throw new Error("Gagal membuat akun login: " + errorAkun.message);
    }

    await ambilDaftarPeserta();
    return pesertaBaru;
  };

  const value = {
    pesertaTerpilih,
    currentIndex,
    aspekSaatIni,
    totalAspek,
    jawaban,
    daftarPeserta,
    loading,
    editingId,
    mulaiPenilaianBaru,
    mulaiEditPenilaian,
    simpanJawaban,
    nextAspek,
    prevAspek,
    hitungHasil,
    riwayatPenilaian,
    submitPenilaian,
    updateStatusPenilaian,
    hapusPenilaian,
    hapusPeserta,
    daftarFeedback,
    simpanFeedback,
    tambahPeserta,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error("useAssessment harus dipakai di dalam <AssessmentProvider>");
  }
  return ctx;
}
