import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: StarIcon;
  trend: 'up' | 'down';
  description: string;
}

export function MetricsCard({ title, value, icon: Icon, trend, description }: MetricsCardProps) {
  const trendColor = trend === 'up' ? 'text-success' : 'text-warning';

  return (
    <Card className="border-border bg-card text-card-foreground transition-all duration-150 ease-in hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="cursor-help text-sm font-medium text-card-foreground">
                {title}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Icon className={`h-5 w-5 ${trendColor}`} strokeWidth={1.5} />
      </CardHeader>
      <CardContent>
        <div className="font-mono text-2xl font-bold text-card-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}
