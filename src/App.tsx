import React from 'react';
import { AppShell } from './components/AppShell';
import { DashboardView } from './components/DashboardView';

function App() {
  return (
    <AppShell>
      <DashboardView />
    </AppShell>
  );
}

export default App;
