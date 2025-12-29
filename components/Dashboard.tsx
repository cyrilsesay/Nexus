
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';
import { Transaction, PaymentMethodType } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  insights: string;
  loadingInsights: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, insights, loadingInsights }) => {
  const stats = useMemo(() => {
    const success = transactions.filter(t => t.status === 'SUCCESS');
    const totalVolume = success.reduce((acc, curr) => acc + curr.amount, 0);
    const count = transactions.length;
    const rate = count > 0 ? (success.length / count) * 100 : 0;
    
    return {
      totalVolume,
      count,
      rate,
      avgTicket: success.length > 0 ? totalVolume / success.length : 0
    };
  }, [transactions]);

  const methodData = useMemo(() => {
    const data: Record<string, number> = {
      [PaymentMethodType.ORANGE_MONEY]: 0,
      [PaymentMethodType.AFRI_MONEY]: 0,
      [PaymentMethodType.CARD]: 0
    };
    transactions.filter(t => t.status === 'SUCCESS').forEach(t => {
      data[t.method] += t.amount;
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [transactions]);

  const volumeHistory = useMemo(() => {
    // Group by last 7 transactions for visualization simplicity
    return transactions.slice(-10).map((t, i) => ({
      name: `Tx ${i + 1}`,
      amount: t.status === 'SUCCESS' ? t.amount : 0,
    }));
  }, [transactions]);

  const COLORS = ['#F97316', '#22C55E', '#6366F1'];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: `$${stats.totalVolume.toLocaleString()}`, change: '+12.5%', icon: '💰' },
          { label: 'Transaction Count', value: stats.count, change: '+5.2%', icon: '🔄' },
          { label: 'Success Rate', value: `${stats.rate.toFixed(1)}%`, change: '+1.1%', icon: '✅' },
          { label: 'Avg Ticket Size', value: `$${stats.avgTicket.toFixed(2)}`, change: '-0.4%', icon: '📊' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.change}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Payment Volume Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeHistory}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366F1" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Volume by Method</h3>
          <div className="h-64 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methodData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {methodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Orange</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Afri</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Card</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini Insights */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-indigo-900">Nexus AI Merchant Insights</h3>
        </div>
        
        {loadingInsights ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-200 rounded w-1/2"></div>
            <div className="h-4 bg-indigo-200 rounded w-2/3"></div>
          </div>
        ) : (
          <div className="text-indigo-800 whitespace-pre-wrap leading-relaxed prose prose-indigo">
            {insights}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
