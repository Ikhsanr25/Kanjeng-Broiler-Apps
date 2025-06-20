import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, FileText, Printer } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { exportToExcel, importFromExcel } from "@/lib/excel-utils";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const {
    transactions,
    importTransactions
  } = useTransactions();

  const handleExport = async () => {
    try {
      await exportToExcel(transactions);
      toast({
        title: "Berhasil",
        description: "Data berhasil diekspor ke Excel"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengekspor data",
        variant: "destructive"
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importFromExcel(file);
      const newTransactionsCount = importTransactions(importedData);
      
      toast({
        title: "Berhasil",
        description: `Berhasil mengimpor ${newTransactionsCount} transaksi baru!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengimpor file: " + (error as Error).message,
        variant: "destructive"
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Laporan</h2>
        <p className="text-slate-600">Ekspor, impor, dan cetak laporan transaksi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-600" />
              Ekspor Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Download semua data transaksi dalam format Excel (.xlsx)
            </p>
            <Button onClick={handleExport} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Ekspor ke Excel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2 text-green-600" />
              Impor Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Upload file Excel untuk menambahkan transaksi baru
            </p>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Pilih File Excel
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              onChange={handleImport}
              className="hidden"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Cetak Analisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Cetak ringkasan analisis penjualan dan pembelian
            </p>
            <Button variant="outline" onClick={handlePrintAnalysis} className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Cetak Analisis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Printer className="w-5 h-5 mr-2 text-orange-600" />
              Cetak Transaksi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Cetak daftar semua transaksi dalam format PDF
            </p>
            <Button variant="outline" onClick={handlePrintTransactions} className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Cetak Transaksi
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistik Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{transactions.length}</div>
              <div className="text-sm text-slate-600">Total Transaksi</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {transactions.filter(t => t.type === 'Penjualan').length}
              </div>
              <div className="text-sm text-slate-600">Penjualan</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {transactions.filter(t => t.type === 'Pembelian').length}
              </div>
              <div className="text-sm text-slate-600">Pembelian</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(transactions.map(t => t.productName)).size}
              </div>
              <div className="text-sm text-slate-600">Produk Unik</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}