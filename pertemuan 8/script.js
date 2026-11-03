// ================================================================
// REVISI SCRIPT.JS - PERTEMUAN 8
// ================================================================
// Poin Perbaikan:
// 1. Mengganti penggunaan alert() popup yang memblokir tampilan
//    dengan feedback langsung pada elemen DOM (resultBox).
// 2. Mencegah celah XSS (Cross-Site Scripting) dengan melakukan
//    sanitasi karakter HTML sebelum dimasukkan ke innerHTML.
// 3. Menambahkan validasi format email dasar menggunakan regex.
// 4. Menghilangkan alert ganda yang berlebihan saat data berhasil dikirim.
// 5. Menambahkan event listener 'input' untuk menyembunyikan pesan
//    error otomatis saat pengguna mulai mengisi ulang form.
// ================================================================

// 1. Mengambil referensi elemen DOM
const myForm = document.getElementById("myForm");
const resultBox = document.getElementById("result");

// Fungsi pembantu untuk sanitasi teks agar aman dari script injection (XSS)
function bersihkanInput(teks) {
  const wadah = document.createElement("div");
  wadah.textContent = teks;
  return wadah.innerHTML;
}

// 2. Event listener ketika form dikirim (submit)
myForm.addEventListener("submit", function (event) {
  // Mencegah reload halaman secara default
  event.preventDefault();

  // Mengambil dan memangkas spasi berlebih pada nilai input
  const namaInput = document.getElementById("nama");
  const emailInput = document.getElementById("email");
  const pesanInput = document.getElementById("pesan");

  const nama = namaInput.value.trim();
  const email = emailInput.value.trim();
  const pesan = pesanInput.value.trim();

  // 3. Validasi kelengkapan data (tanpa alert popup)
  if (!nama || !email || !pesan) {
    resultBox.className = "result-box error";
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <p>⚠️ <strong>Peringatan:</strong> Mohon lengkapi semua data sebelum mengirim formulir.</p>
    `;
    return;
  }

  // 4. Validasi format email sederhana menggunakan RegExp
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    resultBox.className = "result-box error";
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <p>⚠️ <strong>Peringatan:</strong> Format email tidak valid, contoh: <em>nama@email.com</em>.</p>
    `;
    emailInput.focus();
    return;
  }

  // 5. Sanitasi input sebelum ditampilkan
  const safeNama = bersihkanInput(nama);
  const safeEmail = bersihkanInput(email);
  const safePesan = bersihkanInput(pesan);

  // 6. Menampilkan pesan sukses langsung ke result-box
  resultBox.className = "result-box";
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <div class="success-card">
      <h3>✅ Data Berhasil Dikirim!</h3>
      <p><strong>Nama Lengkap:</strong> ${safeNama}</p>
      <p><strong>Alamat Email:</strong> ${safeEmail}</p>
      <p><strong>Pesan:</strong> ${safePesan}</p>
    </div>
  `;

  // 7. Reset formulir setelah data berhasil diproses
  myForm.reset();
});

// 8. Event listener untuk menghilangkan pesan error ketika pengguna mengetik kembali
myForm.addEventListener("input", function () {
  if (resultBox.classList.contains("error")) {
    resultBox.style.display = "none";
  }
});
