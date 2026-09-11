// src/components/PanduanPopup.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const RINGKASAN_PER_ROLE = {
  general_manager: {
    judul: "Selamat datang, General Manager!",
    isi: "Kamu bertugas meninjau dan menyetujui hasil penilaian yang diajukan Supervisor. Cek menu 'Persetujuan Penilaian' untuk mulai.",
  },
  supervisor: {
    judul: "Selamat datang, Supervisor!",
    isi: "Kamu bertugas menambah peserta magang dan melakukan penilaian kompetensi mereka. Cek menu 'Peserta Magang' untuk mulai.",
  },
  trainee: {
    judul: "Selamat datang!",
    isi: "Di sini kamu bisa melihat hasil penilaian kompetensi kamu dan memberikan feedback untuk hotel. Cek menu 'Hasil Penilaian Saya' untuk mulai.",
  },
};

export default function PanduanPopup() {
  const { user, role } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    const storageKey = `panduan_shown_${user.username}`;
    const sudahLihat = localStorage.getItem(storageKey);
    if (!sudahLihat) {
      setShow(true);
    }
  }, [user]);

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`panduan_shown_${user.username}`, "true");
    }
    setShow(false);
  };

    if (!show || !role) return null;
  const data = RINGKASAN_PER_ROLE[role];
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
        <p className="text-base font-semibold text-sky-900 mb-3">{data.judul}</p>
        <p className="text-sm text-neutral-600 mb-5">{data.isi}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-sm bg-sky-800 hover:bg-sky-900 text-white px-5 py-2 rounded-lg font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
