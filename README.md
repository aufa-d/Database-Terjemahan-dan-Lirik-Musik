# Database Terjemahan dan Lirik Musik

Aplikasi web sederhana untuk mengelola koleksi lagu, termasuk lirik asli dan terjemahannya, dengan integrasi YouTube untuk pemutaran langsung. Data lagu disimpan dalam format JSON dan dapat ditambah atau diedit melalui antarmuka web.

## Fitur
- Tambah lagu baru dengan judul, terjemahan judul, link YouTube, lirik, dan terjemahan.
- Edit lagu yang sudah ada.
- Tampilkan daftar lagu dan detail per lagu.
- Simpan data ke file JSON lokal (`index.json`).
- Integrasi YouTube: video dapat diputar langsung dari link yang dimasukkan.
- Penanggalan untuk setiap data lagu.

## Instalasi
1. Pastikan sudah memiliki Node.js
2. Clone repository ini atau unduh Zip
3. Masuk ke folder repository dan install framework Express.js:
    ```
    npm install express
    ```
4. Jalankan server.js:
    ```
    node server.js
    ```
5. Buka localhost yang diberikan


## Struktur Proyek
Struktur folder terdiri dari file HTML, CSS, JavaScript, dan JSON. Backend menggunakan Express.js.

- **Root Directory**
    - `index.html` : Halaman utama yang menampilkan daftar lagu.
    - `add.html` : Form untuk menambahkan lagu baru.
    - `edit.html` : Form untuk mengedit lagu yang sudah ada.
    - `song.html` : Halaman detail untuk satu lagu.
    - `server.js` : Backend server menggunakan Express.js.
    - `package.json` : Konfigurasi dependensi dan metadata proyek dari Node.js.
    - `package-lock.json` : Konfigurasi terkunci untuk dependensi dan metadata proyek dari Node.js.

- **/css/**
    - `style.css` : File CSS utama untuk styling tampilan aplikasi.

- **/data/**
    - `index.json` : File penyimpanan data lagu dalam format array JSON.

- **/js/**
    - `add.js` : Logika tambah lagu, termasuk validasi dan penyimpanan ke index.json.
    - `edit.js` : Logika edit lagu, memuat data lama dan menyimpan perubahan.
    - `main.js` : Logika halaman utama, menampilkan daftar lagu.
    - `song.js` : Logika halaman detail lagu, termasuk pemutaran YouTube.
    - `utils.js` : Fungsi bantu umum seperti format tanggal, parsing ID YouTube, dll.


## Lisensi
Proyek ini menggunakan lisensi **GNU General Public License v3.0** dan bebas digunakan serta dimodifikasi sesuai kebutuhan.
