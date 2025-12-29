
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'checkout' | 'history';
  setActiveTab: (tab: 'dashboard' | 'checkout' | 'history') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
          <h1 className="text-xl font-bold tracking-tight">NexusPay</h1>
        </div>
        
        <div className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('checkout')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'checkout' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            Checkout Demo
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'history' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Transactions
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg">
            <img src="https://picsum.photos/seed/merchant/40/40" className="w-8 h-8 rounded-full" alt="Merchant" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Acme Corp Ltd</p>
              <p className="text-xs text-slate-400">Live Mode</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
            <p className="text-slate-500">Manage your payments and global settlements.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg bg-white hover:bg-slate-50 text-sm font-medium">Documentation</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-sm">Get API Key</button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
