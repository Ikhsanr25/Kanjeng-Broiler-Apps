import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/lib/transaction-utils";
import { Transaction } from "@shared/schema";

interface AnalyticsCardsProps {
  transactions: Transaction[];
}

export function AnalyticsCards({ transactions }: AnalyticsCardsProps) {
  const sales = transactions.filter(t => t.type === 'Penjualan');
  const purchases = transactions.filter(t => t.type === 'Pembelian');
  
  const totalSales = sales.reduce((sum, t) => sum + t.total, 0);
  const totalPurchases = purchases.reduce((sum, t) => sum + t.total, 0);
  const netProfit = totalSales - totalPurchases;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Penjualan</p>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(totalSales)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Pembelian</p>
              <p className="text-lg font-semibold text-red-600">{formatCurrency(totalPurchases)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Laba Bersih</p>
              <p className={`text-lg font-semibold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(netProfit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Transaksi</p>
              <p className="text-lg font-semibold text-slate-900">{transactions.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
