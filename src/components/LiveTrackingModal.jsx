import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Navigation, 
  CheckCircle2 
} from 'lucide-react';

export default function LiveTrackingModal({ 
  job, 
  isOpen, 
  onClose,
  onCallWorker 
}) {
  const [etaMinutes, setEtaMinutes] = useState(18);
  const currentStep = 2; // 1: Dispatched, 2: En Route, 3: Arrived, 4: Work in Progress, 5: Completed
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const steps = [
    { num: 1, title: 'Dispatched', time: '10 mins ago', desc: 'Worker accepted and gathered required tools' },
    { num: 2, title: 'En Route (Live GPS)', time: `${etaMinutes} mins ETA`, desc: 'Transit via neighborhood route (< 1.2 miles away)' },
    { num: 3, title: 'Arrived at Doorstep', time: 'Pending', desc: 'Doorbell arrival & OTP verification' },
    { num: 4, title: 'Work in Progress', time: 'Pending', desc: 'Diagnostics & active repair underway' },
    { num: 5, title: 'Completed & Inspected', time: 'Pending', desc: 'Escrow release & 2-way review' },
  ];

  const handleSimulateCall = () => {
    setCallActive(true);
    setTimeout(() => {
      setCallActive(false);
      onCallWorker?.();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close live tracking"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Live Hyperlocal Dispatch Telemetry
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 id="tracking-title" className="text-xl sm:text-2xl font-black text-white">
                {job.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
                Destination: {job.address || '742 Maple Street'} · {job.distance || '0.8 miles'}
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="block text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Arrival ETA
              </span>
              <span className="text-2xl font-black text-amber-300">
                {etaMinutes} Mins
              </span>
            </div>
          </div>
        </div>

        {/* Simulated Live Map Visualizer */}
        <div className="h-44 sm:h-52 bg-slate-100 relative overflow-hidden border-b border-slate-200 flex items-center justify-center">
          {/* Subtle grid pattern resembling neighborhood map */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-70" />
          
          {/* Simulated Street Roads */}
          <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-300/80 -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-slate-300/80" />
          <div className="absolute top-0 bottom-0 right-1/4 w-4 bg-slate-300/80" />

          {/* Neighborhood Labels */}
          <span className="absolute top-3 left-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
            Ward 4 — Westend Perimeter
          </span>

          {/* Destination Marker */}
          <div className="absolute top-1/2 right-1/5 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <span className="mt-1 text-[10px] font-bold bg-white/95 text-slate-900 px-2 py-0.5 rounded shadow-xs border border-slate-200">
              Your Home
            </span>
          </div>

          {/* Worker Moving Marker */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 flex flex-col items-center animate-pulse">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white">
              <Navigation className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="mt-1 text-[10px] font-extrabold bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-full shadow-xs">
              Tradesperson En Route
            </span>
          </div>

          {/* GPS telemetry tag */}
          <div className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Telemetry: 1.1 mi · Speed 18 mph</span>
          </div>
        </div>

        {/* Safety OTP & Worker Communication */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Doorstep Safety Verification
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Arrival Verification Code (OTP)
                </h4>
                <p className="text-xs text-slate-500">
                  Share this 4-digit code ONLY when worker arrives at your door.
                </p>
              </div>
            </div>

            <div className="bg-white px-4 py-2 rounded-xl border border-emerald-300 text-center shrink-0">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Your Secure Code</span>
              <span className="text-2xl font-mono font-black text-emerald-800 tracking-widest">
                4 8 2 9
              </span>
            </div>
          </div>

          {/* Step Progress Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Real-Time Dispatch Progress
            </h4>
            <div className="space-y-3">
              {steps.map((st) => {
                const isPassed = st.num < currentStep;
                const isCurrent = st.num === currentStep;
                return (
                  <div key={st.num} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isPassed 
                          ? 'bg-emerald-600 text-white' 
                          : isCurrent 
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse' 
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                      </div>
                      {st.num !== steps.length && (
                        <div className={`w-0.5 h-6 ${isPassed ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-slate-900 font-extrabold' : 'text-slate-700'}`}>
                          {st.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {st.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Communication Action Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
            <button
              onClick={handleSimulateCall}
              disabled={callActive}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{callActive ? 'Connecting Masked Line...' : 'Call (Privacy Masked)'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
