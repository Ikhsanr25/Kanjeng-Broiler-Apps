# Kanjeng Broiler - Transaction Tracker

Aplikasi web untuk tracking transaksi penjualan dan pembelian dengan fitur analisis lengkap.

## Fitur Utama

- **Dashboard**: Analisis ringkasan dengan kartu statistik dan grafik tren
- **Transaksi**: Form input transaksi dengan ID otomatis dan tabel data
- **Laporan**: Ekspor/impor Excel dan statistik data

## Teknologi

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Express.js + TypeScript
- Storage: localStorage (offline)
- Charts: Chart.js
- Excel: SheetJS

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan aplikasi:
```bash
npm run dev
```

3. Buka browser di `http://localhost:5000`

## Struktur File

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Komponen UI
│   │   ├── pages/          # Halaman aplikasi
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
│   └── index.html
├── server/                 # Backend Express
│   ├── index.ts           # Server utama
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
├── shared/                # Schema bersama
│   └── schema.ts          # Zod schemas
└── package.json

```

## Kategori Produk

- Ayam Hidup
- Ayam Bersih Utuh
- Ayam Marinasi
- Dada
- Sayap
- Paha
- Lainnya

## ID Transaksi Otomatis

- Penjualan: TRX-J-0001, TRX-J-0002, ...
- Pembelian: TRX-B-0001, TRX-B-0002, ...

## Ekspor/Impor Data

- Format: Excel (.xlsx)
- Data tersimpan di localStorage browser
- Import otomatis menghindari duplikasi ID

---

Kanjeng Broiler © 2025