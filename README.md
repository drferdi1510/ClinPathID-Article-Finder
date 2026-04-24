# PK Journal Finder

Aplikasi PWA untuk pencarian jurnal Scopus (Scimago 2025) dan artikel PubMed khusus Patologi Klinik.

**Topik:** Hematologi · Kimia Klinik · Imunologi · Penyakit Infeksi

## Fitur

- Daftar jurnal Scopus Q1–Q4 dengan filter kuartil, Free APC, Open Access
- Pencarian artikel live dari PubMed (NCBI E-utilities)
- Preview halaman pertama paper (judul, authors, abstrak, metadata)
- Simpan preview sebagai gambar PNG
- Bookmark artikel ke penyimpanan lokal
- Export daftar jurnal ke CSV
- Installable PWA (Android, iOS, Desktop)

## Deploy ke GitHub Pages

### Cara 1: Otomatis via GitHub Actions (rekomendasi)

1. Buat repository baru di GitHub (misal: `pk-journal-finder`)
2. Upload semua file ke repository
3. Masuk ke **Settings → Pages → Source → GitHub Actions**
4. Push ke branch `main` → app otomatis ter-deploy

URL app: `https://<username>.github.io/<repo-name>/`

### Cara 2: Manual via branch gh-pages

1. Masuk **Settings → Pages → Source → Deploy from branch**
2. Pilih branch `main`, folder `/ (root)`
3. Klik Save

## Jalankan Lokal

```bash
# Gunakan server HTTP sederhana (diperlukan untuk PWA)
python3 -m http.server 8080
# Buka: http://localhost:8080
```

> Jangan buka langsung sebagai file (`file://`) karena Service Worker memerlukan HTTP.

## Struktur File

```
pk-journal-finder/
├── index.html          # Halaman utama
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── css/
│   └── style.css       # Stylesheet
├── js/
│   ├── app.js          # Logika aplikasi
│   └── journals.js     # Database jurnal
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy GitHub Actions
```

## Catatan Legal

- Data artikel diambil dari **NCBI PubMed E-utilities** (API publik gratis, tidak memerlukan autentikasi)
- Sesuai [NCBI Terms of Service](https://www.ncbi.nlm.nih.gov/home/about/policies/) untuk penggunaan non-komersial
- Data kuartil Scimago bersumber dari domain pengetahuan umum (tidak menyalin database Scimago)
- Tidak ada data pengguna yang dikirim ke server manapun selain NCBI
- Simpan artikel hanya di `localStorage` browser pengguna sendiri

## Data Jurnal

Database ~80 jurnal berdasarkan Scimago Journal Rank 2025, dikompilasi secara manual dari sumber publik. Impact Factor mengacu JCR 2025 (Clarivate).
