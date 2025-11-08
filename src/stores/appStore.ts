import { create } from 'zustand';

export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  type: 'inflow' | 'outflow';
}

interface AppState {
  currentView: string;
  currency: string;
  exchangeRate: number | null;
  transactions: Transaction[];
  setCurrentView: (view: string) => void;
  setCurrency: (currency: string) => void;
  fetchExchangeRate: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const generateSampleTransactions = (): Transaction[] => {
  const categories = ['Sales', 'Services', 'Rent', 'Utilities', 'Marketing', 'Equipment'];
  const descriptions = [
    'Monthly revenue',
    'Client payment',
    'Office rent',
    'Electricity bill',
    'Ad campaign',
    'New laptop',
  ];
  const transactions: Transaction[] = [];

  for (let i = 0; i < 15; i++) {
    const isInflow = Math.random() > 0.4;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));

    transactions.push({
      id: `txn-${i + 1}`,
      date: date.toISOString().split('T')[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
      currency: 'USD',
      type: isInflow ? 'inflow' : 'outflow',
    });
  }

  return transactions;
};

export const useAppStore = create<AppState>((set, get) => ({
  currentView: 'dashboard',
  currency: 'USD',
  exchangeRate: null,
  transactions: generateSampleTransactions(),

  setCurrentView: (view) => set({ currentView: view }),

  setCurrency: (currency) => {
    set({ currency });
    get().fetchExchangeRate();
  },

  fetchExchangeRate: async () => {
    const { currency } = get();
    if (currency === 'USD') {
      set({ exchangeRate: null });
      return;
    }

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const data = await response.json();
      set({ exchangeRate: data.rates[currency] || null });
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      set({ exchangeRate: null });
    }
  },

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}`,
    };
    set((state) => ({
      transactions: [...state.transactions, newTransaction],
    }));
  },

  updateTransaction: (id, updates) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },
}));
