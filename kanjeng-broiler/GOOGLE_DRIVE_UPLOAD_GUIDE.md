# Cara Upload Kanjeng Broiler ke Google Drive

## Metode 1: Upload Manual (Recommended)

### Langkah-langkah:

1. **Buat folder di Google Drive**
   - Buka drive.google.com
   - Klik "New" > "Folder"
   - Nama: "Kanjeng Broiler App"

2. **Buat struktur folder:**
```
Kanjeng Broiler App/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── lib/
├── server/
├── shared/
└── attached_assets/
```

3. **Upload file per kategori:**

**Root Files:**
- package.json
- package-lock.json  
- README.md
- DEPLOYMENT_GUIDE.md
- vite.config.ts
- tsconfig.json
- tailwind.config.ts
- postcss.config.js
- components.json
- drizzle.config.ts

**Client Files:**
- client/index.html
- client/src/main.tsx
- client/src/App.tsx
- client/src/index.css

**Pages:**
- client/src/pages/dashboard.tsx
- client/src/pages/transactions.tsx
- client/src/pages/reports.tsx

**Components:**
- client/src/components/layout.tsx
- client/src/components/transaction-form.tsx
- client/src/components/analytics-cards.tsx
- client/src/components/sales-chart.tsx
- client/src/components/filters.tsx
- client/src/components/transaction-table.tsx
- client/src/components/category-analysis.tsx

**Server Files:**
- server/index.ts
- server/routes.ts
- server/storage.ts
- server/vite.ts

**Shared:**
- shared/schema.ts

**Assets:**
- attached_assets/20250611_104718_0000_1750428216136.png

## Metode 2: Via Google Drive Desktop App

1. Install Google Drive for Desktop
2. Sync folder workspace ke Google Drive
3. Exclude node_modules dan .git

## Metode 3: Via GitHub (Paling Mudah)

1. Push code ke GitHub repository
2. Share GitHub link untuk download
3. Clone langsung dari GitHub

## Metode 4: Compress & Upload

1. Download semua file sebagai ZIP
2. Upload 1 file ZIP ke Google Drive
3. Extract di komputer tujuan

## Tips Upload:

- **Jangan upload:** node_modules, .git, .cache, .local
- **Penting upload:** Semua file .ts, .tsx, .js, .json, .css, .html, .md
- **Struktur folder harus sama** seperti aslinya
- **Logo** harus ada di folder attached_assets

## Setelah Upload:

1. Download file dari Google Drive
2. Run `npm install` untuk install dependencies
3. Run `npm run dev` untuk jalankan aplikasi

---

Total file yang perlu diupload: 88 file
Ukuran total (tanpa node_modules): ~2-5 MB