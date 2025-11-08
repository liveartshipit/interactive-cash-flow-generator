import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '../stores/appStore';

interface EditTransactionDialogProps {
  transactionId: string;
  onClose: () => void;
}

export function EditTransactionDialog({ transactionId, onClose }: EditTransactionDialogProps) {
  const { transactions, updateTransaction } = useAppStore();
  const transaction = transactions.find((t) => t.id === transactionId);

  const [formData, setFormData] = useState({
    date: '',
    category: '',
    description: '',
    amount: '',
    type: 'inflow' as 'inflow' | 'outflow',
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
      });
    }
  }, [transaction]);

  const categories = [
    'Sales',
    'Services',
    'Investment',
    'Salary',
    'Rent',
    'Utilities',
    'Marketing',
    'Equipment',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    updateTransaction(transactionId, {
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
    });

    onClose();
  };

  if (!transaction) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-popover-foreground">Edit Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-date" className="text-popover-foreground">Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-type" className="text-popover-foreground">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'inflow' | 'outflow') =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="inflow" className="text-popover-foreground">Inflow</SelectItem>
                <SelectItem value="outflow" className="text-popover-foreground">Outflow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category" className="text-popover-foreground">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-popover-foreground">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-popover-foreground">Description</Label>
            <Input
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount" className="text-popover-foreground">Amount</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="text-foreground"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
