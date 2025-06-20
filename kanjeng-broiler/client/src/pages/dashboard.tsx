import { AnalyticsCards } from "@/components/analytics-cards";
import { SalesChart } from "@/components/sales-chart";
import { CategoryAnalysis } from "@/components/category-analysis";
import { useTransactions } from "@/hooks/use-transactions";

export default function Dashboard() {
  const { transactions } = useTransactions();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Dashboard</h2>
        <p className="text-slate-600">Ringkasan analisis transaksi Anda</p>
      </div>

      <AnalyticsCards transactions={transactions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart transactions={transactions} />
        <CategoryAnalysis transactions={transactions} />
      </div>
    </div>
  );
}