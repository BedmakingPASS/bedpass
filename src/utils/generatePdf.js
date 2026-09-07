// src/utils/generatePdf.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { assessmentAspects, skorLabel } from "../data/assessmentAspects";

export function generateHasilPenilaianPdf(data, konversi) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // ===== HEADER =====
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("HASIL PENILAIAN JOBS PERFORMANCE MAKING BED", pageWidth / 2, y, {
    align: "center",
  });
  y += 6;
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text(
    'Berdasarkan SOP Housekeeping "Making The Bed", New Hemangini Hotel',
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 3;
  doc.setLineWidth(0.5);
  doc.line(14, y, pageWidth - 14, y);
  y += 8;

  // ===== IDENTITAS =====
  doc.setFontSize(10);
  const identitas = [
    ["Nama Peserta Magang", data.peserta.nama],
    ["Instansi", data.peserta.instansi],
    ["Nama Penilai", data.peserta.penilai],
    ["Tanggal Penilaian", data.peserta.tanggal],
  ];
  identitas.forEach(([label, value]) => {
    doc.setFont(undefined, "bold");
    doc.text(label, 14, y);
    doc.setFont(undefined, "normal");
    doc.text(`: ${value}`, 65, y);
    y += 6;
  });
  y += 4;

  // ===== RINGKASAN NILAI =====
  doc.setFillColor(230, 244, 254); // sky-50
  doc.rect(14, y, pageWidth - 28, 22, "F");
  doc.setFontSize(20);
  doc.setFont(undefined, "bold");
  doc.setTextColor(12, 74, 110); // sky-900
  doc.text(`${data.hasil.persentase} / 100`, 20, y + 14);

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Kategori: ${konversi.kategori}`, 75, y + 9);
  doc.text(`Status Kompetensi: ${data.hasil.status}`, 75, y + 16);
  y += 30;

  doc.setFontSize(9);
  doc.setFont(undefined, "italic");
  const keteranganLines = doc.splitTextToSize(
    konversi.keterangan,
    pageWidth - 28
  );
  doc.text(keteranganLines, 14, y);
  y += keteranganLines.length * 4 + 6;

  // ===== TABEL SKOR PER ASPEK =====
  const kategoriList = ["Hard Skill", "Soft Skill", "Technical Skill"];
  const rows = [];
  kategoriList.forEach((kategori) => {
    assessmentAspects
      .filter((a) => a.kategori === kategori)
      .forEach((aspek) => {
        const j = data.jawaban[aspek.id];
        rows.push([
          String(aspek.id).padStart(2, "0"),
          kategori,
          aspek.judul,
          j ? j.skor : "-",
          j ? skorLabel[j.skor] : "-",
          j?.catatan || "-",
        ]);
      });
  });

  autoTable(doc, {
    startY: y,
    head: [["No", "Kategori", "Aspek", "Skor", "Label", "Catatan"]],
    body: rows,
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [12, 74, 110] },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 22 },
      2: { cellWidth: 55 },
      3: { cellWidth: 10, halign: "center" },
      4: { cellWidth: 18 },
      5: { cellWidth: "auto" },
    },
  });

  y = doc.lastAutoTable.finalY + 8;

  // Cek apakah butuh halaman baru untuk catatan & tanda tangan
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  // ===== CATATAN UMUM =====
  if (data.catatan_umum) {
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("Catatan & Rekomendasi Tindak Lanjut:", 14, y);
    y += 6;
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);
    const catatanLines = doc.splitTextToSize(
      data.catatan_umum,
      pageWidth - 28
    );
    doc.text(catatanLines, 14, y);
    y += catatanLines.length * 4 + 10;
  }

  // ===== TANDA TANGAN =====
  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y += 10;

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  doc.setFontSize(9);
  doc.text(`Bandung, ${today}`, pageWidth - 70, y);
  doc.text(`Bandung, ${today}`, 14, y);
  y += 6;
  doc.text("Peserta Magang yang Dinilai,", 14, y);
  doc.text("Penilai,", pageWidth - 70, y);
  y += 25;
  doc.text("(....................................................)", 14, y);
  doc.text(
    "(....................................................)",
    pageWidth - 70,
    y
  );

  // ===== SIMPAN =====
  const namaFile = `Hasil_Penilaian_${data.peserta.nama.replace(
    /\s+/g,
    "_"
  )}_${data.peserta.tanggal.replace(/\//g, "-")}.pdf`;
  doc.save(namaFile);
}
