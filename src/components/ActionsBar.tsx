import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, DownloadIcon } from 'lucide-react';
import { AddTransactionDrawer } from './AddTransactionDrawer';
import { useAppStore } from '../stores/appStore';

export function ActionsBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { transactions, currency } = useAppStore();

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Type', 'Amount', 'Currency'];
    const rows = transactions.map((t) => [
      t.date,
      t.category,
      t.description,
      t.type,
      t.amount.toString(),
      t.currency,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={() => setDrawerOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        >
          <PlusIcon className="mr-2 h-5 w-5" strokeWidth={1.5} />
          Add Transaction
        </Button>
        <Button
          variant="outline"
          onClick={exportToCSV}
          className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <DownloadIcon className="mr-2 h-5 w-5" strokeWidth={1.5} />
          Export CSV
        </Button>
      </div>

      <AddTransactionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
