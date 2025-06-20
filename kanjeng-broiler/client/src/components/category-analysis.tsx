import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { formatCurrency } from "@/lib/transaction-utils";

interface CategoryAnalysisProps {
  transactions: Transaction[];
}

export function CategoryAnalysis({ transactions }: CategoryAnalysisProps) {
  const categoryData: { [key: string]: { quantity: number; total: number } } = {};
  
  transactions.forEach(transaction => {
    if (transaction.category && transaction.type === 'Penjualan') {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = {
          quantity: 0,
          total: 0
        };
      }
      categoryData[transaction.category].quantity += transaction.quantity;
      categoryData[transaction.category].total += transaction.total;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produk Terjual per Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(categoryData).map(([category, data]) => (
            <div key={category} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <span className="font-medium text-slate-900">{category}</span>
                <span className="text-sm text-slate-600 ml-2">{data.quantity} unit</span>
              </div>
              <span className="font-semibold text-slate-900">{formatCurrency(data.total)}</span>
            </div>
          ))}
          {Object.keys(categoryData).length === 0 && (
            <p className="text-slate-500 text-center py-4">Belum ada data kategori</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
