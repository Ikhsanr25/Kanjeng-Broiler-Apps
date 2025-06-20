import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { filterSchema, TransactionFilter } from "@shared/schema";

interface FiltersProps {
  onApplyFilters: (filters: TransactionFilter) => void;
  onClearFilters: () => void;
}

export function Filters({ onApplyFilters, onClearFilters }: FiltersProps) {
  const form = useForm<TransactionFilter>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      transactionType: 'all',
      group: '',
      buyer: '',
      category: 'all'
    }
  });

  const handleApplyFilters = (data: TransactionFilter) => {
    onApplyFilters(data);
  };

  const handleClearFilters = () => {
    form.reset({
      startDate: '',
      endDate: '',
      transactionType: 'all',
      group: '',
      buyer: '',
      category: 'all'
    });
    onClearFilters();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleApplyFilters)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Akhir</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Penjualan">Penjualan</SelectItem>
                        <SelectItem value="Pembelian">Pembelian</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Filter by group" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buyer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pembeli</FormLabel>
                    <FormControl>
                      <Input placeholder="Filter by buyer" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Ayam Hidup">Ayam Hidup</SelectItem>
                        <SelectItem value="Ayam Bersih Utuh">Ayam Bersih Utuh</SelectItem>
                        <SelectItem value="Ayam Marinasi">Ayam Marinasi</SelectItem>
                        <SelectItem value="Dada">Dada</SelectItem>
                        <SelectItem value="Sayap">Sayap</SelectItem>
                        <SelectItem value="Paha">Paha</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit">
                Terapkan Filter
              </Button>
              <Button type="button" variant="secondary" onClick={handleClearFilters}>
                Reset Filter
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
