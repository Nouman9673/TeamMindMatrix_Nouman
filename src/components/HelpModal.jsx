import React from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert
} from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1.5 cursor-pointer"
          aria-label="Close helpline modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <PhoneCall className="w-6 h-6 text-amber-600 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Community Dispatch & SOS Helpline
            </h3>
            <p className="text-xs text-slate-500">
              Instant human support for homeowners and workers
            </p>
          </div>
        </div>

        <div className="space-y-3 my-4">
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Emergency Active Plumbing / Electrical Hazard
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-900">1-800-NEIGHBOR</span>
              <a 
                href="tel:18006344426" 
                className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700"
              >
                Call Now
              </a>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              Direct line to on-call Ward 4 Master Guild Dispatcher. Average ring time: 4 seconds.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">
              SMS / WhatsApp Dispatch (Low Bandwidth)
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-slate-800">+1 (555) 347-8675</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Active 24/7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Send voice notes or photos of leaks and broken outlets for quick guidance.
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Neighborhood Escrow Protection</p>
              <p className="text-[11px] text-amber-800">
                100% money-back guarantee if worker doesn't arrive within agreed dispatch window or work fails guild standards.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
        >
          Close Helpline
        </button>
      </div>
    </div>
  );
}
