import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { formatCurrency, formatDate } from "@/lib/transaction-utils";

interface SalesChartProps {
  transactions: Transaction[];
}

declare global {
  interface Window {
    Chart: any;
  }
}

export function SalesChart({ transactions }: SalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
      script.onload = () => initChart();
      document.head.appendChild(script);
    } else {
      initChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      updateChart();
    }
  }, [transactions]);

  const initChart = () => {
    if (!chartRef.current || !window.Chart) return;

    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Penjualan',
          data: [],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4
        }, {
          label: 'Pembelian',
          data: [],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              }
            }
          }
        }
      }
    });

    updateChart();
  };

  const updateChart = () => {
    if (!chartInstance.current) return;

    const dailyData: { [key: string]: { sales: number; purchases: number } } = {};
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!dailyData[date]) {
        dailyData[date] = { sales: 0, purchases: 0 };
      }
      
      if (transaction.type === 'Penjualan') {
        dailyData[date].sales += transaction.total;
      } else {
        dailyData[date].purchases += transaction.total;
      }
    });
    
    const sortedDates = Object.keys(dailyData).sort();
    const salesData = sortedDates.map(date => dailyData[date].sales);
    const purchasesData = sortedDates.map(date => dailyData[date].purchases);
    
    chartInstance.current.data.labels = sortedDates.map(date => formatDate(date));
    chartInstance.current.data.datasets[0].data = salesData;
    chartInstance.current.data.datasets[1].data = purchasesData;
    
    chartInstance.current.update();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Penjualan & Pembelian</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
