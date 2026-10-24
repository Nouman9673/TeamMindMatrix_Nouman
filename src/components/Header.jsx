import React from 'react';
import { 
  HeartHandshake, 
  User, 
  Briefcase, 
  Columns2, 
  Bell, 
  PhoneCall
} from 'lucide-react';

export default function Header({ 
  currentMode, 
  setCurrentMode, 
  activeView, 
  setActiveView,
  unreadAlertsCount = 1,
  onOpenHelp
}) {
  const isWorker = currentMode === 'worker';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-colors">
      {/* Top micro-bar: Social Impact Pledge & Emergency hotline */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-700 text-emerald-200 font-semibold tracking-wide uppercase text-[10px]">
              Social Impact Certified
            </span>
            <span className="hidden sm:inline text-emerald-200">
              Direct Community Payouts · 0% Middleman Wage Cuts · Fair Local Work
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              Avg. 22-min response active in Ward 4
            </span>
            <button 
              onClick={onOpenHelp}
              className="hover:text-white underline decoration-dotted flex items-center gap-1 cursor-pointer transition-colors"
              title="Community Emergency Dispatch"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS Helpline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-emerald-500 rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Neighborly<span className="text-emerald-600">Work</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  Hyperlocal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Fair Wages · Instant Local Trades · Direct Negotiation
              </p>
            </div>
          </a>

          {/* Mobile Profile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                const next = isWorker ? 'customer' : 'worker';
                setCurrentMode(next);
                setActiveView(next);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isWorker 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
              }`}
            >
              {isWorker ? <Briefcase className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              <span>{isWorker ? 'Worker Mode' : 'Customer'}</span>
            </button>
          </div>
        </div>

        {/* Center / Navigation View Switcher (Customer / Worker / Split) */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-inner gap-1 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveView('customer');
                setCurrentMode('customer');
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'customer'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              aria-label="Switch to Customer Marketplace View"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer View</span>
            </button>

            <button
              onClick={() => {
                setActiveView('worker');
                setCurrentMode('worker');
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer relative ${
                activeView === 'worker'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              aria-label="Switch to Worker Control Center"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Worker Dashboard</span>
              {unreadAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            <button
              onClick={() => setActiveView('split')}
              className={`hidden lg:flex px-3.5 py-1.5 rounded-lg items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'split'
                  ? 'bg-slate-900 text-amber-300 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Compare Customer and Worker interfaces side-by-side"
            >
              <Columns2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Split View</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Role Switcher Button & Profile status */}
        <div className="hidden md:flex items-center gap-3">
          {/* Main Requested Feature: Toggle Switch "Switch to Worker Profile" */}
          <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/90 rounded-full py-1.5 px-3">
            <span className="text-xs font-medium text-slate-700">
              {isWorker ? (
                <span className="font-bold text-amber-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Rajesh's Dashboard
                </span>
              ) : (
                <span className="text-slate-600">Viewing as Customer</span>
              )}
            </span>

            {/* Toggle switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isWorker}
              onClick={() => {
                const next = isWorker ? 'customer' : 'worker';
                setCurrentMode(next);
                if (activeView !== 'split') {
                  setActiveView(next);
                }
              }}
              className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                isWorker ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
              title={isWorker ? 'Switch back to Customer mode' : 'Switch to Worker Profile'}
            >
              <span className="sr-only">Switch to Worker Profile</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isWorker ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>

            <span className="text-xs font-bold text-emerald-800">
              {isWorker ? 'Worker' : 'Switch to Worker'}
            </span>
          </div>

          {/* Quick Notification or Status */}
          <div className="relative">
            <button
              onClick={() => {
                setActiveView('worker');
                setCurrentMode('worker');
              }}
              className="p-2 rounded-full text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer relative"
              title="Job Alerts & Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadAlertsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
