
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CheckoutSimulator from './components/CheckoutSimulator';
import TransactionList from './components/TransactionList';
import { Transaction, PaymentMethodType, TransactionStatus } from './types';
import { getMerchantInsights } from './services/geminiService';

const MOCK_INITIAL_DATA: Transaction[] = [
  { id: 'TX-928374821', amount: 120.50, currency: 'USD', method: PaymentMethodType.CARD, status: TransactionStatus.SUCCESS, customerName: 'Alex Smith', cardNumber: '**** 4421', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'TX-102938475', amount: 45.00, currency: 'USD', method: PaymentMethodType.ORANGE_MONEY, status: TransactionStatus.SUCCESS, customerName: 'Mariama Bangura', customerPhone: '76 543 210', timestamp: new Date(Date.now() - 43200000).toISOString() },
  { id: 'TX-554433221', amount: 300.00, currency: 'USD', method: PaymentMethodType.AFRI_MONEY, status: TransactionStatus.FAILED, customerName: 'Sorie Kanu', customerPhone: '77 123 456', timestamp: new Date(Date.now() - 10000000).toISOString() },
  { id: 'TX-887766554', amount: 15.25, currency: 'USD', method: PaymentMethodType.CARD, status: TransactionStatus.SUCCESS, customerName: 'Fatu Kamara', cardNumber: '**** 8801', timestamp: new Date(Date.now() - 5000000).toISOString() },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checkout' | 'history'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_INITIAL_DATA);
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = useCallback(async (txs: Transaction[]) => {
    setLoadingInsights(true);
    const result = await getMerchantInsights(txs);
    setInsights(result);
    setLoadingInsights(false);
  }, []);

  useEffect(() => {
    fetchInsights(transactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewTransaction = (tx: Transaction) => {
    const updated = [...transactions, tx];
    setTransactions(updated);
    setActiveTab('history');
    // Refresh insights on success
    if (tx.status === TransactionStatus.SUCCESS) {
      fetchInsights(updated);
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          transactions={transactions} 
          insights={insights} 
          loadingInsights={loadingInsights}
        />
      )}
      {activeTab === 'checkout' && (
        <CheckoutSimulator onPaymentComplete={handleNewTransaction} />
      )}
      {activeTab === 'history' && (
        <TransactionList transactions={transactions} />
      )}
    </Layout>
  );
};

export default App;
