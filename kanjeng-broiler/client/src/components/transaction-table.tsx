import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@shared/schema";
import { formatCurrency, formatDate } from "@/lib/transaction-utils";
import { useToast } from "@/hooks/use-toast";

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionTable({ transactions, onDeleteTransaction }: TransactionTableProps) {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      onDeleteTransaction(id);
      toast({
        title: "Berhasil",
        description: "Transaksi berhasil dihapus"
      });
    }
  };

  const handlePrintAnalysis = () => {
    toast({
      title: "Info",
      description: "Fitur cetak analisis akan segera tersedia"
    });
  };

  const handlePrintTransactions = () => {
    toast({
      title: "Info", 
      description: "Fitur cetak transaksi akan segera tersedia"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Transaksi</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrintAnalysis}>
            Cetak Analisis
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintTransactions}>
            Cetak Transaksi
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-sm text-slate-900">{transaction.id}</TableCell>
                  <TableCell className="text-sm text-slate-900">{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.type === 'Penjualan' ? 'default' : 'secondary'}
                      className={transaction.type === 'Penjualan' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-900">{transaction.productName}</TableCell>
                  <TableCell className="text-sm text-slate-900">{transaction.category || '-'}</TableCell>
                  <TableCell className="text-sm text-slate-900">{formatCurrency(transaction.price)}</TableCell>
                  <TableCell className="text-sm text-slate-900">{transaction.quantity}</TableCell>
                  <TableCell className="text-sm font-medium text-slate-900">{formatCurrency(transaction.total)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transactions.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Belum ada data transaksi
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
