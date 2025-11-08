import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAppStore } from '../stores/appStore';
import { format, subDays, isAfter } from 'date-fns';

type TimeRange = '30' | '90' | '365';

export function ChartView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30');
  const { transactions } = useAppStore();

  const getFilteredData = () => {
    const days = parseInt(timeRange);
    const cutoffDate = subDays(new Date(), days);

    const filteredTransactions = transactions.filter((t) =>
      isAfter(new Date(t.date), cutoffDate)
    );

    const dataMap = new Map<string, { inflows: number; outflows: number }>();

    filteredTransactions.forEach((t) => {
      const dateKey = format(new Date(t.date), 'MMM dd');
      const existing = dataMap.get(dateKey) || { inflows: 0, outflows: 0 };

      if (t.type === 'inflow') {
        existing.inflows += t.amount;
      } else {
        existing.outflows += t.amount;
      }

      dataMap.set(dateKey, existing);
    });

    return Array.from(dataMap.entries())
      .map(([date, values]) => ({
        date,
        inflows: values.inflows,
        outflows: values.outflows,
      }))
      .slice(-20);
  };

  const chartData = getFilteredData();

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-card-foreground">Cash Flow Trends</CardTitle>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList className="bg-muted text-muted-foreground">
            <TabsTrigger value="30" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Last 30 Days
            </TabsTrigger>
            <TabsTrigger value="90" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Quarter
            </TabsTrigger>
            <TabsTrigger value="365" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorInflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145, 55%, 45%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(145, 55%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 16%, 90%)" />
            <XAxis dataKey="date" stroke="hsl(220, 9%, 46%)" style={{ fontSize: '12px' }} />
            <YAxis stroke="hsl(220, 9%, 46%)" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 16%, 90%)',
                borderRadius: '8px',
                color: 'hsl(222, 15%, 15%)',
              }}
            />
            <Legend wrapperStyle={{ color: 'hsl(222, 15%, 15%)' }} />
            <Area
              type="monotone"
              dataKey="inflows"
              stroke="hsl(145, 55%, 45%)"
              fillOpacity={1}
              fill="url(#colorInflows)"
              name="Inflows"
            />
            <Area
              type="monotone"
              dataKey="outflows"
              stroke="hsl(35, 90%, 55%)"
              fillOpacity={1}
              fill="url(#colorOutflows)"
              name="Outflows"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
