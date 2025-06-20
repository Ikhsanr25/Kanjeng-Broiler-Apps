import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  group: z.string().optional(),
  buyerName: z.string().optional(),
  productName: z.string(),
  category: z.string().optional(),
  type: z.enum(["Penjualan", "Pembelian"]),
  price: z.number().min(0),
  quantity: z.number().min(0),
  total: z.number(),
  notes: z.string().optional(),
  timestamp: z.string()
});

export const insertTransactionSchema = transactionSchema.omit({ timestamp: true });

export type Transaction = z.infer<typeof transactionSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export const filterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  transactionType: z.enum(["Penjualan", "Pembelian", "all"]).optional(),
  group: z.string().optional(),
  buyer: z.string().optional(),
  category: z.enum(["Ayam Hidup", "Ayam Bersih Utuh", "Ayam Marinasi", "Dada", "Sayap", "Paha", "Lainnya", "all"]).optional()
});

export type TransactionFilter = z.infer<typeof filterSchema>;
