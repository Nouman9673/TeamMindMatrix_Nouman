import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Clock, 
  Navigation, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_SERVICES } from '../data/mockData';

export default function Hero({ 
  locationQuery, 
  setLocationQuery, 
  serviceQuery, 
  setServiceQuery, 
  selectedCategory, 
  setSelectedCategory,
  urgentMode,
  setUrgentMode,
  onSearchSubmit
}) {
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleUseLocation = () => {
    setDetectingLocation(true);
    setTimeout(() => {
      setLocationQuery('Greenwood & Westend (Ward 4)');
      setDetectingLocation(false);
    }, 450);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50/50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-emerald-100">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute -top-12 -left-12 w-72 h-72 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute top-12 right-0 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Social Impact Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 text-xs sm:text-sm font-semibold mb-5 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Hyperlocal Fair Work Initiative</span>
          <span className="text-emerald-400">|</span>
          <span className="text-emerald-700 font-medium">100% of agreed fees go directly to your local tradesperson</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
          Connecting you with reliable local professionals in{' '}
          <span className="relative inline-block text-emerald-700">
            <span className="relative z-10 underline decoration-amber-400 decoration-wavy decoration-2">
              30 minutes or less.
            </span>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
          Vetted plumbers, electricians, cleaners, and handymen living within your neighborhood. 
          Workers set their own honest rates, you negotiate freely, and help your community thrive.
        </p>

        {/* Dual Search Bar Component */}
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border-2 border-emerald-500/20 p-2 sm:p-3 max-w-4xl mx-auto transition-all focus-within:border-emerald-500 focus-within:shadow-2xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit?.();
            }}
            className="flex flex-col md:flex-row items-stretch gap-2"
          >
            {/* Input 1: Location */}
            <div className="flex-1 flex items-center px-3 py-2.5 sm:py-3 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 focus-within:bg-white focus-within:border-emerald-500 transition-colors">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mr-2.5" />
              <div className="w-full text-left">
                <label htmlFor="location-input" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Location
                </label>
                <div className="flex items-center justify-between gap-1">
                  <input
                    id="location-input"
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Enter your location (e.g., Ward 4, Greenwood)"
                    className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    disabled={detectingLocation}
                    className="shrink-0 text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-100/70 hover:bg-emerald-200/80 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    title="Auto-detect neighborhood"
                  >
                    <Navigation className={`w-3 h-3 ${detectingLocation ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">
                      {detectingLocation ? 'Locating...' : 'Auto-locate'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Input 2: Service need */}
            <div className="flex-1 flex items-center px-3 py-2.5 sm:py-3 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 focus-within:bg-white focus-within:border-emerald-500 transition-colors">
              <Search className="w-5 h-5 text-amber-500 shrink-0 mr-2.5" />
              <div className="w-full text-left">
                <label htmlFor="service-input" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Service Needed
                </label>
                <input
                  id="service-input"
                  type="text"
                  value={serviceQuery}
                  onChange={(e) => setServiceQuery(e.target.value)}
                  placeholder="What service do you need? (e.g., Plumber, Electrician, Cleaner)"
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Submit / Find Button */}
            <button
              type="submit"
              className="px-6 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-base sm:text-lg shrink-0 group focus:ring-4 focus:ring-emerald-300 focus:outline-hidden"
            >
              <span>Find Local Pros</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Quick Options Bar: Rapid Dispatch Toggle & Category Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          {/* Urgent 30-min toggle */}
          <button
            type="button"
            onClick={() => setUrgentMode(!urgentMode)}
            className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              urgentMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-300 animate-pulse'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:text-amber-700'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${urgentMode ? 'text-white' : 'text-amber-500'}`} />
            <span>⚡ 30-Minute Instant Dispatch Only</span>
          </button>

          <span className="text-slate-300 hidden sm:inline">•</span>

          {/* Service quick chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {INITIAL_SERVICES.slice(0, 5).map((srv) => (
              <button
                key={srv.id}
                onClick={() => {
                  setSelectedCategory(srv.id);
                  if (srv.id !== 'all') {
                    setServiceQuery(srv.name);
                  } else {
                    setServiceQuery('');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === srv.id
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {srv.name}
              </button>
            ))}
          </div>
        </div>

        {/* Fast Value Indicators */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-700 font-medium">100% Background Checked</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-700 font-medium">Workers Set Own Rates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-700 font-medium">Direct Budget Negotiation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-700 font-medium">Guaranteed Under 30 Mins</span>
          </div>
        </div>
      </div>
    </section>
  );
}
