import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { format } from 'date-fns';
import { EditTransactionDialog } from './EditTransactionDialog';

export function TransactionTable() {
  const { transactions, deleteTransaction } = useAppStore();
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Card className="border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-muted">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-border transition-colors duration-150 ease-in hover:bg-accent"
                  >
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.type === 'inflow'
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-card-foreground">
                      {transaction.currency}
                      {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingTransaction(transaction.id)}
                          className="h-8 w-8 bg-transparent text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          <PencilIcon className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="h-8 w-8 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2Icon className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No transactions yet. Add your first transaction to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {editingTransaction && (
        <EditTransactionDialog
          transactionId={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
}
