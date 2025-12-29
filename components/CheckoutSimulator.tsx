
import React, { useState } from 'react';
import { PaymentMethodType, Transaction, TransactionStatus } from '../types';

interface CheckoutSimulatorProps {
  onPaymentComplete: (transaction: Transaction) => void;
}

const CheckoutSimulator: React.FC<CheckoutSimulatorProps> = ({ onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(PaymentMethodType.CARD);
  const [amount, setAmount] = useState<number>(45.00);
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Network latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTx: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount,
      currency: 'USD',
      method: selectedMethod,
      status: Math.random() > 0.1 ? TransactionStatus.SUCCESS : TransactionStatus.FAILED,
      customerName: form.name || 'Guest User',
      customerPhone: selectedMethod !== PaymentMethodType.CARD ? form.phone : undefined,
      cardNumber: selectedMethod === PaymentMethodType.CARD ? `**** **** **** ${form.cardNumber.slice(-4)}` : undefined,
      timestamp: new Date().toISOString()
    };

    setIsProcessing(false);
    onPaymentComplete(newTx);
    setForm({ name: '', phone: '', cardNumber: '', expiry: '', cvv: '' });
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Checkout Sidebar - Summary */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-600">
              <span>Premium SaaS Subscription</span>
              <span>$40.00</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Setup Fee</span>
              <span>$5.00</span>
            </div>
            <div className="pt-4 border-t flex justify-between items-center font-bold text-xl text-slate-900">
              <span>Total</span>
              <span>${amount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Secure 256-bit SSL encrypted connection
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 border-dashed text-center">
          <p className="text-sm text-slate-500 italic">"This is a simulated gateway. No actual funds will be moved."</p>
        </div>
      </div>

      {/* Payment Form */}
      <div className="w-full lg:w-[480px] bg-white p-8 rounded-xl border border-slate-200 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>
        
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button 
            type="button"
            onClick={() => setSelectedMethod(PaymentMethodType.CARD)}
            className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${selectedMethod === PaymentMethodType.CARD ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <span className="text-xl">💳</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Card</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedMethod(PaymentMethodType.ORANGE_MONEY)}
            className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${selectedMethod === PaymentMethodType.ORANGE_MONEY ? 'border-orange-600 bg-orange-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center font-bold text-[10px] text-orange-500">O</div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Orange</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedMethod(PaymentMethodType.AFRI_MONEY)}
            className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${selectedMethod === PaymentMethodType.AFRI_MONEY ? 'border-green-600 bg-green-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center font-bold text-[10px] text-white">A</div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Afri Money</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Customer Full Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>

          {selectedMethod === PaymentMethodType.CARD ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Card Number</label>
                <div className="relative">
                  <input 
                    required
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    value={form.cardNumber}
                    onChange={e => setForm({...form, cardNumber: e.target.value})}
                  />
                  <div className="absolute right-3 top-3.5 flex gap-1">
                    <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                    <div className="w-6 h-4 bg-slate-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Expiry Date</label>
                  <input 
                    required
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    value={form.expiry}
                    onChange={e => setForm({...form, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CVV</label>
                  <input 
                    required
                    type="text" 
                    placeholder="123"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    value={form.cvv}
                    onChange={e => setForm({...form, cvv: e.target.value})}
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 bg-slate-50 text-slate-500 text-sm font-medium">+232</span>
                <input 
                  required
                  type="tel" 
                  placeholder="76 000000"
                  className="w-full px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">A push notification (USSD) will be sent to your phone to authorize payment.</p>
            </div>
          )}

          <button 
            disabled={isProcessing}
            type="submit"
            className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transition transform active:scale-[0.98] ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
            ) : `Pay $${amount.toFixed(2)} Now`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutSimulator;
