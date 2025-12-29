
import React from 'react';
import { Transaction, TransactionStatus, PaymentMethodType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getStatusStyle = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.SUCCESS: return 'bg-green-100 text-green-700';
      case TransactionStatus.FAILED: return 'bg-red-100 text-red-700';
      case TransactionStatus.PENDING: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getMethodBadge = (method: PaymentMethodType) => {
    switch (method) {
      case PaymentMethodType.ORANGE_MONEY: 
        return <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Orange</span>;
      case PaymentMethodType.AFRI_MONEY: 
        return <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Afri</span>;
      case PaymentMethodType.CARD: 
        return <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Card</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Method</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No transactions recorded yet.</td>
              </tr>
            ) : (
              [...transactions].reverse().map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono text-sm text-indigo-600">{tx.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{tx.customerName}</div>
                    <div className="text-xs text-slate-500">{tx.customerPhone || tx.cardNumber}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">{getMethodBadge(tx.method)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
