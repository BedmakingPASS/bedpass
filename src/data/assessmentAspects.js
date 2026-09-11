// src/data/assessmentAspects.js
// Rubrik Penilaian Jobs Performance Making Bed
// Sumber: SOP Housekeeping "Making The Bed", Hemangini Hotel Bandung
// 25 aspek total (5 Hard Skill + 7 Soft Skill + 13 Technical Skill)
// Skor maksimal keseluruhan = 25 x 4 = 100

export const assessmentAspects = [
  // ==================== HARD SKILL ====================
  {
    id: 1,
    kategori: "Hard Skill",
    judul: "Kelengkapan Peralatan Kerja",
    deskripsi:
      "Menilai kelengkapan dan kesiapan perlengkapan, bahan, dan dokumen kerja sebelum memulai tugas.",
    deskriptor: {
      4: "Seluruh perlengkapan, bahan, dan dokumen kerja tersedia lengkap, sesuai kebutuhan tugas, dalam kondisi siap digunakan, dan telah diperiksa sebelum bekerja.",
      3: "Hampir seluruh perlengkapan tersedia dan siap digunakan, namun terdapat sedikit kekurangan yang tidak menghambat pelaksanaan pekerjaan.",
      2: "Beberapa perlengkapan belum tersedia atau belum siap digunakan sehingga memerlukan pengambilan, penggantian, atau arahan sebelum pekerjaan dapat dilaksanakan.",
      1: "Banyak perlengkapan tidak tersedia atau tidak siap digunakan sehingga menghambat pelaksanaan pekerjaan.",
    },
  },
  {
    id: 2,
    kategori: "Hard Skill",
    judul: "Penerapan Keselamatan & Kesehatan Kerja (K3)",
    deskripsi: "Menilai konsistensi penerapan K3 sesuai SOP Hotel selama bekerja.",
    deskriptor: {
      4: "Menerapkan K3 secara konsisten dan tepat sesuai SOP Hotel selama bekerja.",
      3: "Menerapkan K3 dengan baik, tetapi masih terdapat sedikit kesalahan.",
      2: "Menerapkan sebagian K3 dan masih memerlukan arahan.",
      1: "Tidak menerapkan K3 dengan baik dan berpotensi menimbulkan risiko kerja.",
    },
  },
  {
    id: 3,
    kategori: "Hard Skill",
    judul: "Menguasai Bahasa Indonesia dengan Baik",
    deskripsi: "Menilai kemampuan komunikasi lisan dan tulisan dalam Bahasa Indonesia.",
    deskriptor: {
      4: "Mampu menggunakan Bahasa Indonesia dengan jelas, tepat, dan sopan, baik secara lisan maupun tulisan, serta mampu menyesuaikan bahasa dengan situasi kerja.",
      3: "Mampu menggunakan Bahasa Indonesia dengan jelas dan sopan dalam komunikasi kerja, dengan sedikit kesalahan penggunaan kata atau tata bahasa.",
      2: "Mampu berkomunikasi menggunakan Bahasa Indonesia, tetapi masih terdapat beberapa kesalahan dalam penggunaan kata, tata bahasa, atau penyampaian sehingga terkadang memerlukan klarifikasi.",
      1: "Kurang mampu menggunakan Bahasa Indonesia dengan baik sehingga komunikasi sering tidak jelas, terdapat banyak kesalahan, dan memerlukan bantuan atau pengulangan dalam menyampaikan maupun memahami informasi.",
    },
  },
  {
    id: 4,
    kategori: "Hard Skill",
    judul: "Grooming",
    deskripsi: "Menilai penampilan kerja sesuai standar grooming industri perhotelan.",
    deskriptor: {
      4: "Selalu berpenampilan bersih, rapi, lengkap, dan sesuai dengan standar grooming yang ditetapkan industri.",
      3: "Berpenampilan bersih dan rapi serta sesuai standar grooming, namun terdapat sedikit kekurangan yang tidak mengganggu penampilan kerja.",
      2: "Penampilan cukup rapi, tetapi terdapat beberapa aspek grooming yang belum sesuai standar dan masih memerlukan pengingat.",
      1: "Penampilan kurang bersih dan rapi serta tidak memenuhi standar grooming meskipun telah diberikan arahan.",
    },
  },
  {
    id: 5,
    kategori: "Hard Skill",
    judul: "Product Knowledge",
    deskripsi: "Menilai penguasaan informasi hotel dan kemampuan menyampaikannya kepada tamu.",
    deskriptor: {
      4: "Menguasai informasi hotel secara lengkap, mampu menjelaskan karakteristik, fungsi, dan keunggulannya dengan tepat serta dapat memberikan informasi sesuai kebutuhan tamu.",
      3: "Menguasai sebagian besar informasi hotel dan mampu menjelaskannya dengan tepat, dengan sedikit kekurangan informasi.",
      2: "Mengetahui informasi dasar hotel, tetapi masih terdapat beberapa kekeliruan dan memerlukan arahan atau bantuan dalam memberikan informasi kepada tamu.",
      1: "Kurang memahami informasi hotel sehingga tidak mampu memberikan penjelasan yang tepat dan memerlukan pendampingan.",
    },
  },

  // ==================== SOFT SKILL ====================
  {
    id: 6,
    kategori: "Soft Skill",
    judul: "Greeting",
    deskripsi: "Menilai cara menyambut tamu sesuai standar pelayanan.",
    deskriptor: {
      4: "Menyambut tamu dengan hangat dan tulus, mengucapkan salam standar, menawarkan bantuan.",
      3: "Penyambutan sesuai standar, namun sikap kurang hangat/natural.",
      2: "Ada elemen penyambutan standar yang terlewat.",
      1: "Tidak menyambut tamu sesuai standar.",
    },
  },
  {
    id: 7,
    kategori: "Soft Skill",
    judul: "Sikap dan Etika Kerja",
    deskripsi: "Menilai kesopanan, keramahan, profesionalisme, dan kedisiplinan kerja.",
    deskriptor: {
      4: "Selalu menunjukkan sikap sopan, ramah, profesional, disiplin, bertanggung jawab, dan menghargai tamu maupun rekan kerja.",
      3: "Menunjukkan sikap dan etika kerja yang baik, namun sesekali masih memerlukan pengingat.",
      2: "Sikap dan etika kerja cukup, tetapi belum konsisten dan masih memerlukan arahan dari supervisor.",
      1: "Menunjukkan sikap dan etika kerja yang kurang, seperti tidak disiplin, kurang sopan, atau kurang bertanggung jawab dalam melaksanakan tugas.",
    },
  },
  {
    id: 8,
    kategori: "Soft Skill",
    judul: "Problem Solving",
    deskripsi: "Menilai kemampuan mengidentifikasi dan menyelesaikan masalah kerja.",
    deskriptor: {
      4: "Mampu mengidentifikasi masalah, menentukan solusi yang tepat, dan menyelesaikannya secara mandiri dengan cepat dan efektif.",
      3: "Mampu mengidentifikasi dan menyelesaikan masalah dengan tepat, namun masih memerlukan sedikit arahan.",
      2: "Mampu mengenali masalah tetapi masih kesulitan menentukan solusi dan membutuhkan cukup banyak arahan.",
      1: "Kesulitan mengenali maupun menyelesaikan masalah dan selalu membutuhkan bantuan atau arahan dari supervisor.",
    },
  },
  {
    id: 9,
    kategori: "Soft Skill",
    judul: "Inisiatif dan Adaptasi",
    deskripsi: "Menilai keaktifan mengambil inisiatif dan kecepatan beradaptasi dengan situasi kerja.",
    deskriptor: {
      4: "Aktif mengambil inisiatif, mampu menyesuaikan diri dengan cepat terhadap tugas dan situasi kerja, serta dapat bekerja tanpa selalu menunggu arahan.",
      3: "Mampu menyesuaikan diri dengan lingkungan dan tugas kerja serta cukup aktif mengambil inisiatif dengan sedikit arahan.",
      2: "Mampu beradaptasi tetapi membutuhkan waktu dan arahan, serta inisiatif dalam bekerja masih terbatas.",
      1: "Kesulitan beradaptasi terhadap tugas atau situasi kerja dan cenderung pasif serta selalu menunggu arahan.",
    },
  },
  {
    id: 10,
    kategori: "Soft Skill",
    judul: "Green Awareness",
    deskripsi: "Menilai kesadaran dan penerapan prinsip ramah lingkungan dalam bekerja.",
    deskriptor: {
      4: "Memahami dan secara konsisten menerapkan prinsip ramah lingkungan dalam pekerjaan, seperti menghemat energi dan air, mengurangi limbah, serta menggunakan bahan secara bijak.",
      3: "Memahami dan menerapkan sebagian besar prinsip ramah lingkungan dalam pekerjaan dengan sedikit pengingat.",
      2: "Mengetahui prinsip dasar ramah lingkungan tetapi penerapannya belum konsisten dan masih memerlukan arahan.",
      1: "Kurang memahami dan tidak menerapkan prinsip ramah lingkungan dalam pekerjaan meskipun telah diberikan arahan.",
    },
  },
  {
    id: 11,
    kategori: "Soft Skill",
    judul: "Teamwork",
    deskripsi: "Menilai kemampuan bekerja sama dan berkoordinasi dengan rekan kerja.",
    deskriptor: {
      4: "Selalu bekerja sama secara aktif, berkomunikasi dengan baik, membantu rekan kerja, dan mampu berkoordinasi secara efektif dalam menyelesaikan pekerjaan.",
      3: "Mampu bekerja sama dan berkoordinasi dengan baik serta bersedia membantu rekan kerja ketika diperlukan.",
      2: "Mampu bekerja dalam tim tetapi komunikasi dan koordinasi masih perlu ditingkatkan serta memerlukan arahan.",
      1: "Kurang mampu bekerja sama, sulit berkoordinasi, dan cenderung bekerja sendiri tanpa memperhatikan kebutuhan tim.",
    },
  },
  {
    id: 12,
    kategori: "Soft Skill",
    judul: "Ketelitian, Ketepatan, dan Kesungguhan dalam Bekerja",
    deskripsi: "Menilai fokus, ketelitian, dan konsistensi mengikuti prosedur kerja.",
    deskriptor: {
      4: "Sangat teliti, fokus, dan sungguh-sungguh dalam bekerja, mengikuti prosedur dengan tepat, serta selalu menyelesaikan pekerjaan tepat waktu.",
      3: "Cukup teliti dan fokus, mengikuti prosedur kerja dengan baik, menunjukkan kesungguhan, dan umumnya menyelesaikan pekerjaan tepat waktu.",
      2: "Ketelitian dan konsentrasi belum konsisten, masih terdapat beberapa kesalahan dalam mengikuti prosedur, serta terkadang terlambat menyelesaikan pekerjaan.",
      1: "Sering melakukan kesalahan, kurang berkonsentrasi dan bersungguh-sungguh, tidak mengikuti prosedur dengan baik, serta sering terlambat menyelesaikan pekerjaan.",
    },
  },

  // ==================== TECHNICAL SKILL ====================
  {
    id: 13,
    kategori: "Technical Skill",
    judul: "Menyiapkan Linen (bed sheet, pillow case, duvet cover, dan linen parfume)",
    deskripsi: "Menilai kelengkapan dan ketepatan penyiapan linen sebelum making bed.",
    deskriptor: {
      4: "Inisiatif menyiapkan seluruh kebutuhan kerja secara lengkap, benar, sesuai ukuran tempat tidur, dan mandiri.",
      3: "Menyiapkan hampir seluruh kebutuhan kerja dengan benar, terdapat sedikit kekurangan tapi tidak menghambat pekerjaan.",
      2: "Menyiapkan sebagian kebutuhan kerja tetapi masih terdapat beberapa kesalahan dan memerlukan arahan.",
      1: "Tidak mampu menyiapkan kebutuhan kerja secara lengkap dan benar serta memerlukan bantuan penuh dari room attendant.",
    },
  },
  {
    id: 14,
    kategori: "Technical Skill",
    judul: "Penarikan Bed (Move The Bed)",
    deskripsi: "Menilai teknik menarik bed menjauh dari headboard.",
    deskriptor: {
      4: "Menarik bed menjauh dari headboard dengan tepat, posisi sesuai dan aman.",
      3: "Menarik bed dengan tepat tetapi posisi kurang optimal.",
      2: "Menarik bed tetapi masih memerlukan arahan.",
      1: "Tidak melakukan atau salah melakukan tahapan.",
    },
  },
  {
    id: 15,
    kategori: "Technical Skill",
    judul: "Penanganan Barang Tamu (Guest Belongings)",
    deskripsi: "Menilai kehati-hatian dalam memindahkan barang tamu yang ada di atas bed.",
    deskriptor: {
      4: "Memindahkan seluruh barang tamu yang ada di atas bed ke tempat yang aman dengan hati-hati.",
      3: "Memindahkan seluruh barang tamu yang ada di atas bed ke tempat yang kurang aman.",
      2: "Memindahkan sebagian barang tamu yang ada di atas bed dan masih memerlukan arahan.",
      1: "Tidak memindahkan atau tidak memperhatikan barang tamu yang ada di atas bed.",
    },
  },
  {
    id: 16,
    kategori: "Technical Skill",
    judul: "Pelepasan Linen (Strip The Bed)",
    deskripsi: "Menilai ketepatan melepas linen dan memastikan tidak ada barang tamu tertinggal.",
    deskriptor: {
      4: "Melepas linen satu per satu dengan benar dan memastikan tidak ada barang tamu yang tertinggal.",
      3: "Melepas beberapa linen dan masih ada yang tertinggal.",
      2: "Melepas linen apabila diberi arahan.",
      1: "Salah melakukan atau tidak melakukan pelepasan linen terlebih dahulu.",
    },
  },
  {
    id: 17,
    kategori: "Technical Skill",
    judul: "Penyimpanan Inner Duvet dan Pillows",
    deskripsi: "Menilai kerapian dan kebersihan penyimpanan inner duvet dan pillows.",
    deskriptor: {
      4: "Menyimpan inner duvet dan pillows dengan rapi pada tempat yang bersih dan tidak menyentuh area kotor.",
      3: "Menyimpan inner duvet dan pillows pada tempat bersih tetapi kurang rapi.",
      2: "Menyimpan inner duvet dan pillows di tempat bersih jika diberi arahan.",
      1: "Meletakkan inner duvet dan pillows di tempat yang tidak bersih.",
    },
  },
  {
    id: 18,
    kategori: "Technical Skill",
    judul: "Menyimpan Linen Kotor di Linen Hamper (Soiled Linen)",
    deskripsi: "Menilai ketepatan penanganan linen kotor agar tidak menyentuh lantai.",
    deskriptor: {
      4: "Seluruh linen kotor langsung dimasukkan ke hamper dan tidak menyentuh lantai.",
      3: "Linen kotor dimasukkan ke hamper tetapi terkadang masih disimpan di lantai.",
      2: "Linen kotor masih ditangani dengan kurang tepat.",
      1: "Meletakkan linen kotor di lantai atau tempat yang tidak sesuai.",
    },
  },
  {
    id: 19,
    kategori: "Technical Skill",
    judul: "Memeriksa dan Mengganti Mattress Pad Jika Bernoda",
    deskripsi: "Menilai ketelitian memeriksa kondisi mattress pad dan membalik bed sesuai jadwal.",
    deskriptor: {
      4: "Memeriksa kondisi mattress pad, mengganti jika bernoda, dan membalik bed sesuai jadwal.",
      3: "Melakukan pemeriksaan dan penggantian dengan sedikit kekeliruan.",
      2: "Melakukan sebagian tahapan dengan arahan.",
      1: "Tidak memeriksa atau salah melakukan tahapan.",
    },
  },
  {
    id: 20,
    kategori: "Technical Skill",
    judul: "Memasang Sheet dan Mengunci Lipatan Sudut Sheet (Mitered Corner)",
    deskripsi: "Menilai ketepatan dalam memasang bed sheet dan membentuk mitered corner pada sudut kasur.",
    deskriptor: {
      4: "Sheet terpasang tepat, sudut terkunci kuat, dan permukaan terlihat rapi.",
      3: "Sheet terpasang dengan benar tetapi masih terdapat sedikit kerutan.",
      2: "Sheet terpasang tetapi sudut atau kerapian masih kurang.",
      1: "Sheet tidak terpasang sesuai prosedur.",
    },
  },
  {
    id: 21,
    kategori: "Technical Skill",
    judul: "Memasang Duvet Inner ke dalam Duvet Cover",
    deskripsi: "Menilai ketepatan posisi dan kerapian pemasangan duvet inner.",
    deskriptor: {
      4: "Duvet terpasang tepat, tidak terbalik, seluruh sudut rapi, dan posisi sesuai.",
      3: "Duvet terpasang dengan benar tetapi terdapat sedikit ketidakteraturan.",
      2: "Duvet terpasang tetapi masih memerlukan arahan.",
      1: "Duvet tidak terpasang sesuai prosedur.",
    },
  },
  {
    id: 22,
    kategori: "Technical Skill",
    judul: "Memasang Pillowcase",
    deskripsi: "Menilai kebersihan dan kerapian pemasangan pillowcase.",
    deskriptor: {
      4: "Pillowcase bersih, terpasang dengan rapi dan sesuai posisi.",
      3: "Pillowcase terpasang tetapi masih kurang rapi.",
      2: "Pillowcase terpasang hanya jika diberi arahan.",
      1: "Tidak memasang pillowcase sesuai prosedur.",
    },
  },
  {
    id: 23,
    kategori: "Technical Skill",
    judul: "Menyemprot Linen Perfume",
    deskripsi: "Menilai ketepatan waktu dan cara penyemprotan linen perfume di akhir proses.",
    deskriptor: {
      4: "Menyemprotkan linen perfume setelah seluruh proses selesai dengan tepat.",
      3: "Menyemprotkan linen perfume tetapi kurang tepat.",
      2: "Menyemprotkan linen perfume jika diberikan arahan.",
      1: "Tidak menyemprotkan linen perfume sama sekali.",
    },
  },
  {
    id: 24,
    kategori: "Technical Skill",
    judul: "Kecepatan dan Ketepatan",
    deskripsi: "Menilai kecepatan menyelesaikan making bed tanpa mengurangi kerapian dan kualitas.",
    deskriptor: {
      4: "Menyelesaikan seluruh proses making bed dengan cepat dan tepat, sesuai urutan SOP, serta tidak mengurangi kerapian dan kualitas hasil.",
      3: "Menyelesaikan proses making bed dengan cukup cepat dan tepat, tetapi masih terdapat sedikit kekeliruan yang tidak memengaruhi hasil akhir.",
      2: "Menyelesaikan proses making bed dengan waktu yang cukup lama dan terdapat beberapa kekeliruan sehingga masih memerlukan arahan.",
      1: "Tidak mampu menyelesaikan proses making bed dalam waktu yang ditentukan dan banyak melakukan kesalahan dalam tahapan kerja.",
    },
  },
  {
    id: 25,
    kategori: "Technical Skill",
    judul: "Pemeriksaan Akhir",
    deskripsi: "Menilai kelengkapan pemeriksaan akhir sebelum pekerjaan dianggap selesai.",
    deskriptor: {
      4: "Memastikan seluruh bagian bed bersih, rapi, linen terpasang sesuai prosedur, sudut sheet terkunci, duvet dan pillow tersusun rapi, linen perfume telah digunakan, serta tidak terdapat barang tamu yang tertinggal.",
      3: "Memastikan sebagian besar bagian bed telah sesuai, tetapi masih terdapat sedikit kekurangan pada kerapian atau kelengkapan.",
      2: "Melakukan pemeriksaan akhir tetapi masih terdapat beberapa bagian yang terlewat dan memerlukan arahan.",
      1: "Tidak melakukan pemeriksaan akhir atau hasil bed masih tidak sesuai prosedur.",
    },
  },
];

export const skorLabel = {
  4: "Sangat Baik",
  3: "Baik",
  2: "Cukup",
  1: "Kurang",
};

// Pedoman konversi nilai & kategori kompetensi (sesuai rubrik resmi)
// Nilai Akhir = (Jumlah Skor Perolehan / Skor Maksimal) x 100
// Skor Maksimal = 25 aspek x 4 = 100
export function konversiNilai(nilaiAkhir) {
  if (nilaiAkhir >= 92) {
    return {
      kategori: "Sangat Baik",
      statusKompetensi: "Kompeten",
      keterangan:
        "Peserta sudah melakukan making bed dengan sangat baik dan dapat bekerja secara mandiri tanpa pengawasan.",
    };
  }
  if (nilaiAkhir >= 83) {
    return {
      kategori: "Baik",
      statusKompetensi: "Kompeten",
      keterangan:
        "Peserta sudah melakukan making bed dengan baik dan dapat bekerja mandiri dengan pengawasan ringan.",
    };
  }
  if (nilaiAkhir >= 74) {
    return {
      kategori: "Cukup Baik",
      statusKompetensi: "Belum Kompeten",
      keterangan:
        "Peserta belum bisa melakukan making bed dengan baik dan mandiri sehingga memerlukan pendampingan ulang pada aspek yang masih lemah.",
    };
  }
  return {
    kategori: "Kurang",
    statusKompetensi: "Tidak Kompeten",
    keterangan:
      "Peserta belum bisa mencapai standar kompetensi yang ditetapkan dan masih memerlukan pendampingan serta pelatihan ulang (retraining) pada aspek yang belum dikuasai.",
  };
}
