# HARI GURU SMK TI GARUDA NUSANTARA

Situs ucapan Hari Guru dari Himpunan CODE/X — dikonversi dari proyek statis
(`index.html` + `style/style.css` + `script/script.js`) ke **Next.js 16**
(App Router + TypeScript).

## Menjalankan

```bash
npm install
npm run dev      # development di http://localhost:3000
npm run build    # build produksi
npm run start    # jalankan build produksi
npm run lint     # ESLint
```

## Struktur

```
app/
  layout.tsx        # root layout: font (next/font), metadata, lang="id"
  page.tsx          # halaman utama (komposisi Navbar/Hero/GuruList)
  globals.css       # CSS asli dari style/style.css
components/
  Navbar.tsx        # baris logo (client, karena ada onError gambar)
  Hero.tsx          # judul "SELAMAT HARI GURU" + tombol
  GuruList.tsx      # daftar guru + pencarian (client)
  GuruDetail.tsx    # dialog detail guru (client, <dialog> showModal)
lib/
  guru.ts           # type Guru, export guruList + initialOf()
data/
  guru.json         # seed data 67 guru (nama, mapel, deskripsi, foto, ucapan)
public/
  img/              # gambar (logos, foto guru)
```

## Menyimpan data guru

Semua data guru ada di **`data/guru.json`** (seed JSON) dan di-import saat
*build*, sehingga menjadi bagian dari HTML statis — **nol query database /
request tambahan ke server** saat halaman diakses. Cukup edit JSON lalu
`npm run build` ulang.

Format per entri:

```json
{
  "nama": "Nama Guru",
  "mapel": "Matematika",
  "deskripsi": "Profil singkat guru",
  "foto": "/img/guru/01.jpg",
  "ucapan": "https://link-ucapan"
}
```

Foto diletakkan sebagai file statis di `public/img/guru/` (bukan di database).

## Catatan

- Foto guru direferensikan sebagai `/img/guru/01.jpg` … `/img/guru/67.jpg`
  (placeholder). Jika file tidak ada, gambar otomatis disembunyikan dan inisial
  nama guru ditampilkan — perilaku sama dengan versi asli.
- Ubah data guru (nama, mapel, deskripsi, link ucapan) di `data/guru.json`,
  lalu jalankan `npm run build` ulang.
