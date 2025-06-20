export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID');
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateTransactionId(type: 'Penjualan' | 'Pembelian', counter: number): string {
  const prefix = type === 'Penjualan' ? 'TRX-J' : 'TRX-B';
  return `${prefix}-${String(counter).padStart(4, '0')}`;
}

export function getLastCounter(transactions: any[], prefix: string): number {
  const filtered = transactions.filter(t => t.id.startsWith(prefix));
  if (filtered.length === 0) return 0;
  
  const numbers = filtered.map(t => parseInt(t.id.split('-')[2]));
  return Math.max(...numbers);
}

export function convertExcelDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // If in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const parts = dateStr.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  // Try to parse as date
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return '';
}
