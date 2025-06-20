import { useState, useEffect, useCallback } from "react";
import { Transaction, InsertTransaction, TransactionFilter } from "@shared/schema";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(parsed);
        setFilteredTransactions(parsed);
      } catch (error) {
        console.error('Error parsing stored transactions:', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((transaction: InsertTransaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      timestamp: new Date().toISOString()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    setFilteredTransactions(prev => [...prev, newTransaction]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    setFilteredTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const applyFilters = useCallback((filters: TransactionFilter) => {
    let filtered = [...transactions];

    if (filters.startDate) {
      filtered = filtered.filter(t => t.date >= filters.startDate!);
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => t.date <= filters.endDate!);
    }
    if (filters.transactionType && filters.transactionType !== 'all') {
      filtered = filtered.filter(t => t.type === filters.transactionType);
    }
    if (filters.group) {
      filtered = filtered.filter(t => 
        t.group?.toLowerCase().includes(filters.group!.toLowerCase())
      );
    }
    if (filters.buyer) {
      filtered = filtered.filter(t => 
        t.buyerName?.toLowerCase().includes(filters.buyer!.toLowerCase())
      );
    }
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    setFilteredTransactions(filtered);
  }, [transactions]);

  const clearFilters = useCallback(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const importTransactions = useCallback((importedTransactions: Transaction[]) => {
    const existingIds = new Set(transactions.map(t => t.id));
    const newTransactions = importedTransactions.filter(t => !existingIds.has(t.id));
    
    if (newTransactions.length > 0) {
      setTransactions(prev => [...prev, ...newTransactions]);
      setFilteredTransactions(prev => [...prev, ...newTransactions]);
    }
    
    return newTransactions.length;
  }, [transactions]);

  return {
    transactions,
    filteredTransactions,
    addTransaction,
    deleteTransaction,
    applyFilters,
    clearFilters,
    importTransactions
  };
}
