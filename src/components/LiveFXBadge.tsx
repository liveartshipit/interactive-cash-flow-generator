import React from 'react';
import { TrendingUpIcon } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export function LiveFXBadge() {
  const { exchangeRate, currency } = useAppStore();

  if (!exchangeRate || currency === 'USD') return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-card-foreground">
      <TrendingUpIcon className="h-4 w-4 text-success" strokeWidth={1.5} />
      <span className="text-sm font-medium text-card-foreground">
        1 USD = {exchangeRate.toFixed(4)} {currency}
      </span>
      <span className="text-xs text-muted-foreground">Live</span>
    </div>
  );
}
