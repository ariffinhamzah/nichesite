# Dokumentasi Projek Bacalah (Niche Site)

Projek ini adalah laman web statik yang direka untuk mempromosikan aplikasi "Think Quran" melalui artikel pemasaran (*content marketing*). Ia menggunakan sistem "Flat-File Database" berasaskan JavaScript (`db.js`) untuk memudahkan pengurusan artikel tanpa memerlukan pangkalan data pelayan (MySQL/PHP).

## Struktur Fail

*   **`index.html`**: Halaman utama yang menyenaraikan semua artikel terkini dari `db.js`.
*   **`baca.html`**: Halaman untuk membaca artikel penuh. Ia mengambil kandungan berdasarkan parameter `?slug=...` di URL.
*   **`admin.html`**: Panel admin untuk menulis dan menyunting artikel. Ia menyediakan editor WYSIWYG (Quill.js) dan menjana kod JSON untuk disalin ke `db.js`.
*   **`db.js`**: "Pangkalan Data" projek. Fail ini mengandungi tetapan `SITE_CONFIG` dan senarai artikel dalam bentuk array objek JavaScript.
*   **`img/`**: Folder untuk menyimpan gambar (jika ada yang dihoskan secara tempatan).

## Cara Menambah/Mengedit Artikel

Sistem ini tidak mempunyai *backend* (server-side). Segala data disimpan dalam fail `db.js`.

### Langkah 1: Buka Panel Admin
Buka fail `admin.html` di pelayar web anda (Chrome/Edge/Firefox).

### Langkah 2: Tulis Artikel
1.  Masukkan **Tajuk Artikel**.
2.  **Slug** akan dijana secara automatik (boleh diedit jika perlu).
3.  Masukkan **Tarikh**.
4.  Tulis **Deskripsi Pendek** (untuk paparan di `index.html`).
5.  Tulis isi kandungan di dalam editor. Anda boleh masukkan gambar (URL), *bold*, *italic*, dan *header*.

### Langkah 3: Jana Kod (Generate Code)
1.  Klik butang **⚡ GENERATE CODE**.
2.  Satu blok kod JSON akan muncul di bahagian kanan (atau bawah pada peranti mobile).
3.  Klik **Copy Code**.

### Langkah 4: Kemaskini `db.js`
1.  Buka fail `db.js` menggunakan *text editor* (VS Code / Notepad).
2.  Cari bahagian `const articles = [ ... ];`.
3.  Tampal (*Paste*) kod yang disalin tadi ke dalam array `articles`. 
    *   **Nota PENTING**: Pastikan anda menampal kod tersebut di dalam kurungan siku `[]`. Jika menggabungkan dengan artikel sedia ada, pastikan ada tanda koma (`,`) antara objek artikel.
4.  Simpan fail `db.js`.

### Langkah 5: Semak Website
Buka `index.html` dan *refresh*. Artikel baru sepatutnya muncul di senarai.

## Konfigurasi Affiliate

Untuk menukar pautan *affiliate*, buka fail `db.js` dan sunting bahagian ini:

```javascript
const SITE_CONFIG = {
    name: "Think Quran",
    affiliateLink: "https://app.thinkquran.com/?r=YOUR_CODE", // <--- Tukar link ini
    ctaText: "Cuba Think Quran Percuma"
};
```

## Penyelenggaraan

*   **Backup**: Sentiasa buat salinan *backup* fail `db.js` sebelum membuat perubahan besar.
*   **Cache**: Fail `db.js` dimuatkan dengan parameter versi masa (`?v=...`) dalam `index.html` dan `baca.html` untuk mengelakkan masalah *cache* pelayar apabila anda mengemaskini kandungan.
