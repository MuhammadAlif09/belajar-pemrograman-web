// 1. INTERAKSI TEMA (Menggunakan ID Selector)
const tombolTema = document.getElementById('btn-tema');

tombolTema.addEventListener('click', function () {
    // Toggle class 'mode-gelap' pada elemen <body>
    document.body.classList.toggle('mode-gelap');

    // Ubah teks tombol sesuai kondisi
    if (document.body.classList.contains('mode-gelap')) {
        tombolTema.textContent = 'Ubah ke Mode Terang ☀️';
    } else {
        tombolTema.textContent = 'Ubah ke Mode Gelap 🌙';
    }
});


// 2. INTERAKSI BACA SELENGKAPNYA (Menggunakan Class Selector)
// Ambil semua tombol dengan class 'tombol-baca'
const daftarTombolBaca = document.querySelectorAll('.tombol-baca');

daftarTombolBaca.forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        // Cari teks tambahan yang ada di dalam kartu yang sama
        const kartu = tombol.parentElement;
        const teksTambahan = kartu.querySelector('.teks-tambahan');

        // Toggle class 'tersembunyi'
        teksTambahan.classList.toggle('tersembunyi');

        // Ubah teks tombol
        if (teksTambahan.classList.contains('tersembunyi')) {
            tombol.textContent = 'Baca Selengkapnya';
        } else {
            tombol.textContent = 'Sembunyikan';
        }
    });
});