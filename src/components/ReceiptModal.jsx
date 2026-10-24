import React from 'react';
import { X, ShieldCheck, Printer } from 'lucide-react';

export default function ReceiptModal({ receipt, isOpen, onClose }) {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
      >
        {/* Receipt Header */}
        <div className="bg-slate-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
              Verified 100% Fair Payout
            </span>
          </div>
          <h3 id="receipt-title" className="text-xl font-black text-white">
            Transparent Payout Receipt
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Transaction ID: NW-{Math.abs(receipt.id?.hashCode?.() || 94821).toString().slice(0, 8)}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-900">{receipt.title || receipt.jobName || 'Service Settlement'}</p>
              <p className="text-xs text-slate-500">{receipt.date || 'Today, Settled Instantly'}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-emerald-700">
                {receipt.amount || '+$28.00'}
              </span>
              <span className="block text-[10px] text-emerald-600 font-bold">100% Rate Deposited</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Customer Agreed Hourly Rate:</span>
              <span className="font-bold text-slate-900">{receipt.rate || '$20.00/hr'}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Duration / Service Units:</span>
              <span className="font-bold text-slate-900">{receipt.duration || '1.4 hrs'}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Platform Take-Rate (Commission):</span>
              <span className="font-bold text-emerald-700">$0.00 (0% Cut)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Instant Bank Transfer Fee:</span>
              <span className="font-bold text-emerald-700">$0.00 (Zero Fee)</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
              <span>Net Worker Deposit:</span>
              <span className="text-emerald-700">{receipt.amount || '$28.00'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow verification code verified by customer upon job inspection.</span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 px-3 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
