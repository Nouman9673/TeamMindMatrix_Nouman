import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  DollarSign
} from 'lucide-react';

export default function WorkerProfileModal({ 
  worker, 
  isOpen, 
  onClose, 
  onNegotiate, 
  onDirectBook 
}) {
  if (!isOpen || !worker) return null;

  const mockReviews = [
    {
      id: 1,
      author: 'David & Karen L.',
      rating: 5.0,
      date: '3 days ago',
      text: `${worker.name} arrived in 18 minutes flat! Fixed the leak under our sink with absolute professionalism and charged exactly what was agreed with zero hidden add-ons.`,
      verified: true
    },
    {
      id: 2,
      author: 'Marcus Sterling',
      rating: 4.9,
      date: '2 weeks ago',
      text: `Courteous, clean, and brought all the right tools. Great to know our money goes 100% to support a neighborhood tradesperson.`,
      verified: true
    },
    {
      id: 3,
      author: 'Priya Narang',
      rating: 5.0,
      date: 'Last month',
      text: `Negotiated a fair weekend budget directly. No corporate agency surcharge. Highest recommendation!`,
      verified: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worker-profile-title"
      >
        {/* Cover banner */}
        <div className="h-28 sm:h-36 bg-linear-to-r from-emerald-800 via-teal-800 to-slate-900 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors cursor-pointer"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-6 text-white text-xs font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active in Ward 4 & Greenwood Perimeter</span>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="p-5 sm:p-7 relative pt-0">
          {/* Avatar and Quick Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-5">
            <div className="flex items-end gap-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl shrink-0"
              />
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h3 id="worker-profile-title" className="text-xl sm:text-2xl font-black text-slate-900">
                    {worker.name}
                  </h3>
                  <span className="p-1 rounded-full bg-emerald-100 text-emerald-800" title="Background Verified">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-0.5">
                  {worker.service}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {worker.rating} ({worker.reviewsCount} reviews)
                  </span>
                  <span>•</span>
                  <span>{worker.completedJobs} Neighborhood Jobs</span>
                </div>
              </div>
            </div>

            {/* Price Pill */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 text-right shrink-0">
              <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                Worker Freedom Rate
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-black text-emerald-900">${worker.rate}</span>
                <span className="text-xs font-bold text-emerald-700">/hr</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium block">
                0% platform cut taken
              </span>
            </div>
          </div>

          {/* Verification Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">Police Screened</p>
                <p className="text-[10px] text-slate-500">100% ID Verified</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
              <Wrench className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">Tools Inspected</p>
                <p className="text-[10px] text-slate-500">Trade Guild Vetted</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs col-span-2 sm:col-span-1">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">Dispatch Speed</p>
                <p className="text-[10px] text-slate-500">Avg. {worker.dispatchTime}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              About {worker.name}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
              "{worker.bio}"
            </p>
          </div>

          {/* Skills Breakdown */}
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Specialized Skills & Capabilities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {worker.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Neighbor Reviews */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Neighborhood Reviews ({worker.reviewsCount})
              </h4>
              <span className="text-xs text-emerald-700 font-bold">100% Verified Work</span>
            </div>

            <div className="space-y-2.5">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{rev.rating}</span>
                      <span className="text-slate-400 font-normal">· {rev.date}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onNegotiate?.(worker);
              }}
              className="flex-1 py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl border border-amber-300 text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <DollarSign className="w-4 h-4 text-amber-700" />
              <span>Negotiate Budget</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onDirectBook?.(worker);
              }}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Clock className="w-4 h-4 text-emerald-200" />
              <span>Book 30-Min Dispatch (${worker.rate}/hr)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
