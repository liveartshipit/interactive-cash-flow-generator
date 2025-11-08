import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLinkIcon, BookOpenIcon } from 'lucide-react';

export function ResourceLinksPanel() {
  const resources = [
    {
      title: 'Understanding Cash Flow',
      url: 'https://www.investopedia.com/terms/c/cashflow.asp',
      source: 'Investopedia',
    },
    {
      title: 'Cash Flow Statement Basics',
      url: 'https://www.accountingcoach.com/cash-flow-statement/explanation',
      source: 'AccountingCoach',
    },
  ];

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <CardTitle className="text-card-foreground">Educational Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Cash flow illustrates liquidity and efficiency — critical for sustaining operations.
          Learn more about managing your finances effectively:
        </p>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-foreground transition-all duration-150 ease-in hover:bg-accent hover:text-accent-foreground"
            >
              <div>
                <div className="font-medium text-foreground">{resource.title}</div>
                <div className="text-xs text-muted-foreground">{resource.source}</div>
              </div>
              <ExternalLinkIcon className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
