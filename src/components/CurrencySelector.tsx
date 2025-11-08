import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '../stores/appStore';

export function CurrencySelector() {
  const { currency, setCurrency } = useAppStore();

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-32 text-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover text-popover-foreground">
        {currencies.map((curr) => (
          <SelectItem key={curr} value={curr} className="text-popover-foreground">
            {curr}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
