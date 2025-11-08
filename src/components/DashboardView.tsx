import React, { useEffect } from 'react';
import { MetricsRow } from './MetricsRow';
import { ChartView } from './ChartView';
import { TransactionTable } from './TransactionTable';
import { ActionsBar } from './ActionsBar';
import { ResourceLinksPanel } from './ResourceLinksPanel';
import { LiveFXBadge } from './LiveFXBadge';
import { CurrencySelector } from './CurrencySelector';
import { useAppStore } from '../stores/appStore';

export function DashboardView() {
  const { fetchExchangeRate } = useAppStore();

  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(() => {
      fetchExchangeRate();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchExchangeRate]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground">Cash Flow Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and visualize your financial performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CurrencySelector />
          <LiveFXBadge />
        </div>
      </div>

      <MetricsRow />

      <ChartView />

      <ActionsBar />

      <TransactionTable />

      <ResourceLinksPanel />
    </div>
  );
}
