import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertTransactionSchema, InsertTransaction } from "@shared/schema";
import { getCurrentDate, generateTransactionId, getLastCounter, formatCurrency } from "@/lib/transaction-utils";
import { useToast } from "@/hooks/use-toast";

interface TransactionFormProps {
  transactions: any[];
  onSubmit: (transaction: InsertTransaction) => void;
}

export function TransactionForm({ transactions, onSubmit }: TransactionFormProps) {
  const [salesCounter, setSalesCounter] = useState(0);
  const [purchaseCounter, setPurchaseCounter] = useState(0);
  const { toast } = useToast();

  const form = useForm<InsertTransaction>({
    resolver: zodResolver(insertTransactionSchema),
    defaultValues: {
      id: '',
      date: getCurrentDate(),
      group: '',
      buyerName: '',
      productName: '',
      category: '',
      type: 'Penjualan',
      price: 0,
      quantity: 0,
      total: 0,
      notes: ''
    }
  });

  const watchType = form.watch('type');
  const watchPrice = form.watch('price');
  const watchQuantity = form.watch('quantity');

  // Initialize counters
  useEffect(() => {
    setSalesCounter(getLastCounter(transactions, 'TRX-J'));
    setPurchaseCounter(getLastCounter(transactions, 'TRX-B'));
  }, [transactions]);

  // Generate ID when type changes
  useEffect(() => {
    if (watchType) {
      const counter = watchType === 'Penjualan' ? salesCounter + 1 : purchaseCounter + 1;
      const id = generateTransactionId(watchType, counter);
      form.setValue('id', id);
    }
  }, [watchType, salesCounter, purchaseCounter, form]);

  // Calculate total when price or quantity changes
  useEffect(() => {
    const total = (watchPrice || 0) * (watchQuantity || 0);
    form.setValue('total', total);
  }, [watchPrice, watchQuantity, form]);

  const handleSubmit = (data: InsertTransaction) => {
    // Check for duplicate ID
    if (transactions.some(t => t.id === data.id)) {
      toast({
        title: "Error",
        description: "ID Transaksi sudah ada. Silakan refresh halaman.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(data);
    
    // Update counters
    if (data.type === 'Penjualan') {
      setSalesCounter(prev => prev + 1);
    } else {
      setPurchaseCounter(prev => prev + 1);
    }

    // Reset form
    form.reset({
      id: '',
      date: getCurrentDate(),
      group: '',
      buyerName: '',
      productName: '',
      category: '',
      type: 'Penjualan',
      price: 0,
      quantity: 0,
      total: 0,
      notes: ''
    });

    toast({
      title: "Berhasil",
      description: "Transaksi berhasil disimpan!"
    });
  };

  const resetForm = () => {
    form.reset({
      id: '',
      date: getCurrentDate(),
      group: '',
      buyerName: '',
      productName: '',
      category: '',
      type: 'Penjualan',
      price: 0,
      quantity: 0,
      total: 0,
      notes: ''
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Input Transaksi</CardTitle>
        <Button variant="ghost" size="sm" onClick={resetForm}>
          Reset Form
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Transaksi</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-slate-50 text-slate-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pembeli</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Produk</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ayam Hidup">Ayam Hidup</SelectItem>
                      <SelectItem value="Ayam Bersih Utuh">Ayam Bersih Utuh</SelectItem>
                      <SelectItem value="Ayam Marinasi">Ayam Marinasi</SelectItem>
                      <SelectItem value="Dada">Dada</SelectItem>
                      <SelectItem value="Sayap">Sayap</SelectItem>
                      <SelectItem value="Paha">Paha</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Transaksi <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Penjualan">Penjualan</SelectItem>
                      <SelectItem value="Pembelian">Pembelian</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga (per kg/pcs) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (kg/pcs) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label>Total</Label>
              <Input 
                value={formatCurrency(form.watch('total') || 0)} 
                readOnly 
                className="bg-slate-50 text-slate-700 font-medium" 
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Simpan Transaksi
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
