# Dokumentasi Projek Bacalah (Niche Site)

Projek ini adalah laman web statik yang direka untuk mempromosikan aplikasi "Think Quran" melalui artikel pemasaran (*content marketing*). Ia menggunakan sistem "Flat-File Database" berasaskan JavaScript (`db.js`) untuk memudahkan pengurusan artikel tanpa memerlukan pangkalan data pelayan (MySQL/PHP).

## Struktur Fail

*   **`index.html`**: Halaman utama yang menyenaraikan semua artikel terkini dari `db.js`.
*   **`baca.html`**: Halaman untuk membaca artikel penuh. Ia mengambil kandungan berdasarkan parameter `?slug=...` di URL.
*   **`admin.html`**: Panel admin untuk menulis dan menyunting artikel. Dilindungi oleh Cloudflare Access.
*   **`db.js`**: "Pangkalan Data" projek. Mengandungi `SITE_CONFIG` dan array `articles`.
*   **`dist/tailwind.min.css`**: CSS Tailwind prebuilt (auto-generated, jangan edit manual).
*   **`src/input.css`**: Source CSS untuk Tailwind build.
*   **`scripts/build-sitemap.js`**: Generator `sitemap.xml` dari `db.js`.
*   **`_headers`**: HTTP security headers (CSP, HSTS, dll.) untuk Cloudflare Pages.
*   **`sitemap.xml`**: Sitemap XML standard untuk SEO.
*   **`robots.txt`**: Arahan untuk crawler (block `/admin.html`).
*   **`package.json`**: Definisi skrip build (`npm run build`).

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

## Keselamatan Admin Panel (Cloudflare Access)

Panel admin (`admin.html`) dilindungi oleh **Cloudflare Zero Trust Access** supaya hanya anda yang boleh akses. Tiada password disimpan dalam source code — authentication berlaku di level Cloudflare edge.

### Setup Awal (Sekali Sahaja)

1.  **Login Cloudflare Dashboard:** [one.dash.cloudflare.com](https://one.dash.cloudflare.com/)
2.  **Enable Zero Trust:** Pergi ke **Settings** → masukkan nama team (contoh: `bacalah-access`) → plan **Free** sudah cukup.
3.  **Tambah Application:**
    *   **Access** → **Applications** → **Add an application** → **Self-hosted**.
    *   **Name:** `Admin Panel Bacalah`
    *   **Domain:** `<your-site>.pages.dev` (atau custom domain jika ada)
    *   **Path:** `/admin.html`
4.  **Set Policy:**
    *   **Policy name:** `Admin only`
    *   **Action:** `Allow`
    *   **Include → Emails:** masukkan email anda (contoh: `anda@gmail.com`)
    *   **Session duration:** `24 hours` (atau ikut suka)
    *   Klik **Next** → **Save**.

### Tambah Login Method (One-time PIN)

Secara default, Cloudflare hanya menyokong login via SSO provider (Google, GitHub, dll). Untuk kegunaan peribadi, enable **One-time PIN**:

1.  **Zero Trust** → **Settings** → **Authentication**.
2.  Pada bahagian **Login methods**, klik **Add new** → **One-time PIN**.
3.  Save. Email yang didaftarkan dalam policy boleh login dengan kod 6-digit yang dihantar ke email.

### Tambah / Buang Admin

*   **Tambah admin baru:** **Access** → **Applications** → `Admin Panel Bacalah` → **Policies** → edit policy `Admin only` → tambah email baru dalam senarai **Include → Emails**.
*   **Buang admin:** Padam email dari senarai yang sama. Orang tersebut akan hilang akses serta-merta (sesi aktif tamat dalam masa beberapa minit).

### Test

Buka `https://<your-site>.pages.dev/admin.html` di browser (ideally *incognito* untuk simulasi akses baru):
1.  Page login Cloudflare akan muncul.
2.  Masukkan email → terima kod OTP → masukkan kod.
3.  Admin panel akan dipaparkan.

### Nota Penting

*   **Path `/admin.html` sahaja** dilindungi. `index.html` dan `baca.html` kekal awam — visitor biasa boleh baca artikel tanpa login.
*   **Free plan limit:** sehingga **50 users** dan **jumlah session** tanpa had. Cukup untuk kegunaan peribadi / tim kecil.
*   **Cache browser:** Selepas setup, mungkin perlu logout dari Cloudflare Access dulu sebelum test (`https://<your-site>.pages.dev/cdn-cgi/access/logout`).
*   **Backup access:** Jika hilang akses ke email admin, log masuk ke Cloudflare dashboard terus untuk ubah policy.

## Build Process

Tailwind CSS dan sitemap dijana secara automatik dari source files.

### Pertama kali clone:

```bash
npm install
```

### Tambah/Edit artikel:

1. Edit `db.js` (tambah objek dalam array `articles`).
2. Run `npm run build` untuk regenerate `dist/tailwind.min.css` + `sitemap.xml`.
3. Deploy (push ke Cloudflare Pages / GitHub Pages).

### Skrip tersedia:

| Command | Fungsi |
|---|---|
| `npm run build:css` | Compile Tailwind CSS → `dist/tailwind.min.css` |
| `npm run build:sitemap` | Generate `sitemap.xml` dari `db.js` |
| `npm run build` | Run kedua-dua di atas |
| `npm run watch:css` | Auto-rebuild Tailwind bila file berubah |

### Tukar domain:

Set env variable `SITE_DOMAIN` bila run sitemap builder:

```bash
SITE_DOMAIN=https://example.com npm run build:sitemap
```

## Deployment

Projek ini di-deploy di **Cloudflare Pages**. Build command di Cloudflare dashboard:

*   **Build command:** `npm run build`
*   **Output directory:** `/` (root)
*   **Environment variables:** (optional) `SITE_DOMAIN`

`_headers` file akan auto-apply CSP, HSTS, X-Frame-Options, dll.
