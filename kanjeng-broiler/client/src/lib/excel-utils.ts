declare global {
  interface Window {
    XLSX: any;
  }
}

export async function loadXLSX() {
  if (window.XLSX) return window.XLSX;
  
  // Load XLSX library dynamically
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = () => resolve(window.XLSX);
    document.head.appendChild(script);
  });
}

export async function exportToExcel(transactions: any[]) {
  const XLSX = await loadXLSX();
  
  const wb = XLSX.utils.book_new();
  
  // Prepare data for export
  const data = transactions.map(t => ({
    'ID Transaksi': t.id,
    'Tanggal': new Date(t.date).toLocaleDateString('id-ID'),
    'Group': t.group || '',
    'Nama Pembeli': t.buyerName || '',
    'Nama Produk': t.productName,
    'Kategori': t.category || '',
    'Jenis Transaksi': t.type,
    'Harga': t.price,
    'Jumlah': t.quantity,
    'Total': t.total,
    'Catatan': t.notes || ''
  }));
  
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
  
  // Generate filename with current date
  const now = new Date();
  const filename = `transaction-tracker-${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.xlsx`;
  
  XLSX.writeFile(wb, filename);
}

export async function importFromExcel(file: File): Promise<any[]> {
  const XLSX = await loadXLSX();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process imported data
        const transactions = jsonData.map((row: any) => ({
          id: row['ID Transaksi'] || '',
          date: convertExcelDate(row['Tanggal']),
          group: row['Group'] || '',
          buyerName: row['Nama Pembeli'] || '',
          productName: row['Nama Produk'] || '',
          category: row['Kategori'] || '',
          type: row['Jenis Transaksi'] || '',
          price: parseFloat(row['Harga']) || 0,
          quantity: parseFloat(row['Jumlah']) || 0,
          total: parseFloat(row['Total']) || 0,
          notes: row['Catatan'] || '',
          timestamp: new Date().toISOString()
        }));
        
        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.readAsArrayBuffer(file);
  });
}

function convertExcelDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // If in DD/MM/YYYY or DD-MM-YYYY format
  if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(dateStr)) {
    const parts = dateStr.split(/[\/\-]/);
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  // Try to parse as date
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return '';
}
