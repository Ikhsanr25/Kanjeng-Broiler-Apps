import { TransactionForm } from "@/components/transaction-form";
import { TransactionTable } from "@/components/transaction-table";
import { Filters } from "@/components/filters";
import { useTransactions } from "@/hooks/use-transactions";

export default function Transactions() {
  const {
    transactions,
    filteredTransactions,
    addTransaction,
    deleteTransaction,
    applyFilters,
    clearFilters
  } = useTransactions();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Transaksi</h2>
        <p className="text-slate-600">Kelola semua transaksi penjualan dan pembelian</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm 
            transactions={transactions}
            onSubmit={addTransaction}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Filters 
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />

          <TransactionTable 
            transactions={filteredTransactions}
            onDeleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}