# Panduan Deployment Kanjeng Broiler

## Cara 1: Deploy ke Replit (Termudah)

1. Fork/clone project ini di Replit
2. Klik tombol "Run" untuk menjalankan aplikasi
3. Aplikasi akan berjalan di URL yang diberikan Replit

## Cara 2: Download Manual

Untuk mendapatkan semua file, Anda bisa:

1. **Via Git Clone** (jika ada akses git):
```bash
git clone [repository-url]
cd kanjeng-broiler
npm install
npm run dev
```

2. **Download File per File**:
   - Buka setiap file di editor
   - Copy content dan save ke folder lokal
   - Struktur folder harus sesuai dengan yang ada

## Cara 3: Deploy ke Platform Lain

### Vercel:
1. Connect repository ke Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Netlify:
1. Drag & drop folder project ke Netlify
2. Atau connect via Git repository

### VPS/Server:
1. Upload files ke server
2. Install Node.js
3. Run commands:
```bash
npm install
npm run dev
```

## File Utama yang Dibutuhkan

### Root Files:
- package.json
- package-lock.json
- vite.config.ts
- tsconfig.json
- tailwind.config.ts
- postcss.config.js
- components.json
- drizzle.config.ts

### Client Files:
- client/index.html
- client/src/main.tsx
- client/src/App.tsx
- client/src/index.css
- client/src/pages/dashboard.tsx
- client/src/pages/transactions.tsx
- client/src/pages/reports.tsx
- client/src/components/layout.tsx
- client/src/components/transaction-form.tsx
- client/src/components/analytics-cards.tsx
- client/src/components/sales-chart.tsx
- client/src/components/filters.tsx
- client/src/components/transaction-table.tsx
- client/src/components/category-analysis.tsx
- client/src/hooks/use-transactions.ts
- client/src/lib/queryClient.ts
- client/src/lib/transaction-utils.ts
- client/src/lib/excel-utils.ts
- client/src/lib/utils.ts

### Server Files:
- server/index.ts
- server/routes.ts
- server/storage.ts
- server/vite.ts

### Shared Files:
- shared/schema.ts

### Assets:
- attached_assets/20250611_104718_0000_1750428216136.png (Logo Kanjeng Broiler)

## Environment Setup

Tidak perlu environment variables khusus. Aplikasi menggunakan localStorage untuk penyimpanan data.

## Port Default

Aplikasi berjalan di port 5000. Jika ingin mengubah, edit di `server/index.ts`.