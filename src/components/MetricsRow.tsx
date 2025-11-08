import React from 'react';
import { MetricsCard } from './MetricsCard';
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, PercentIcon } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export function MetricsRow() {
  const { transactions, currency } = useAppStore();

  const totalInflows = transactions
    .filter((t) => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflows = transactions
    .filter((t) => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalInflows - totalOutflows;
  const roi = totalOutflows > 0 ? ((totalInflows - totalOutflows) / totalOutflows) * 100 : 0;

  const metrics = [
    {
      title: 'Net Cash Flow',
      value: `${currency}${netCashFlow.toFixed(2)}`,
      icon: DollarSignIcon,
      trend: netCashFlow >= 0 ? 'up' : 'down',
      description: 'Total inflows minus outflows',
    },
    {
      title: 'ROI',
      value: `${roi.toFixed(2)}%`,
      icon: PercentIcon,
      trend: roi >= 0 ? 'up' : 'down',
      description: 'Return on investment percentage',
    },
    {
      title: 'Total Inflows',
      value: `${currency}${totalInflows.toFixed(2)}`,
      icon: TrendingUpIcon,
      trend: 'up',
      description: 'All incoming cash',
    },
    {
      title: 'Total Outflows',
      value: `${currency}${totalOutflows.toFixed(2)}`,
      icon: TrendingDownIcon,
      trend: 'down',
      description: 'All outgoing cash',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricsCard key={index} {...metric} />
      ))}
    </div>
  );
}
