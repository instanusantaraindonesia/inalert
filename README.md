# INalert MVP v0.2.1

Versi deployment yang disederhanakan untuk Vercel.

## Struktur
- `index.html` — frontend statis
- `api/earthquake.js` — proxy data gempa BMKG
- `api/weather.js` — proxy prakiraan cuaca BMKG
- `api/nowcast.js` — proxy peringatan dini cuaca BMKG
- `package.json` — build minimal, tanpa Next.js
- `vercel.json` — konfigurasi minimal

## Penting saat upload ke GitHub
Semua file di dalam ZIP ini harus berada langsung di root repository:
`index.html`, `package.json`, `vercel.json`, dan folder `api/`.

Jangan upload folder `inalert-mvp-v0.2.1` sebagai satu folder di dalam repo.

## Deploy
Setelah commit ke branch `main`, Vercel akan menjalankan build minimal lalu menyajikan `index.html`.
