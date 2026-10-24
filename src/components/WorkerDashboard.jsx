import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ArrowUpRight, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Navigation,
  Phone,
  CheckCircle2,
  FileText,
  Sliders
} from 'lucide-react';

export default function WorkerDashboard({ 
  incomingAlerts, 
  activeSchedule, 
  onAcceptAlert, 
  onDeclineAlert,
  onCounterOffer,
  onCompleteJob,
  onInstantPayout,
  onTrackJob,
  onViewReceipt,
  onCallCustomer,
  workerRate = 15,
  onUpdateWorkerRate,
  walletBalance = 428.50,
  todayEarnings = 94.00
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts'); // 'alerts' | 'schedule' | 'wallet'
  const [counterAlertId, setCounterAlertId] = useState(null);
  const [counterAmount, setCounterAmount] = useState(24);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [tempRate, setTempRate] = useState(workerRate);

  // Countdown timer state for top alert
  const [timeLeft, setTimeLeft] = useState(58);

  useEffect(() => {
    if (incomingAlerts.length === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [incomingAlerts]);

  const handleSaveRate = () => {
    onUpdateWorkerRate?.(tempRate);
    setIsEditingRate(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Worker Control Center Header */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Worker identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"
                alt="Rajesh Sharma"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-emerald-400 shadow-md"
              />
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">Rajesh Sharma</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Master Pro Tier
                </span>
              </div>
              <p className="text-emerald-200 text-xs sm:text-sm font-medium mt-0.5">
                Master Plumber & Pipe Fitter · Serving Ward 4 & Greenwood
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-2 font-medium">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  ★ 4.9 (142 reviews)
                </span>
                <span>•</span>
                <span>326 Completed Jobs</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">100% Rate Freedom</span>
              </div>
            </div>
          </div>

          {/* Quick status & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Base Rate Setting Pill */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 px-3.5 border border-white/15 flex items-center gap-2.5">
              <div>
                <span className="block text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Baseline Rate
                </span>
                {isEditingRate ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-bold">$</span>
                    <input
                      type="number"
                      min="10"
                      max="60"
                      value={tempRate}
                      onChange={(e) => setTempRate(Number(e.target.value))}
                      className="w-14 px-1.5 py-0.5 bg-white text-slate-900 rounded font-black text-xs text-center"
                    />
                    <button
                      onClick={handleSaveRate}
                      className="px-2 py-0.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] rounded cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span className="text-sm font-black text-white">
                    ${workerRate}/hr
                  </span>
                )}
              </div>
              {!isEditingRate && (
                <button
                  onClick={() => setIsEditingRate(true)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 cursor-pointer"
                  title="Change baseline hourly rate"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dispatch Availability Toggle */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 px-4 border border-white/15 flex items-center gap-3">
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Dispatch Readiness
                </span>
                <span className="text-xs font-bold text-white">
                  {isOnline ? '🟢 Online (< 30m alerts on)' : '🔴 Offline (Paused)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
                title="Toggle on-demand job availability"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isOnline ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Quick Wallet preview */}
            <div className="bg-amber-400/20 backdrop-blur-md rounded-2xl p-2.5 px-4 border border-amber-300/30 text-left">
              <span className="block text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Available Wallet
              </span>
              <span className="text-lg font-black text-amber-300">
                ${walletBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'alerts'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>On-Demand Alerts</span>
            {incomingAlerts.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black">
                {incomingAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Active Schedules ({activeSchedule.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Transparent Wallet & Payouts</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Incoming On-Demand Job Alerts with Live Countdown Timer */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Incoming On-Demand Job Alerts</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                  Live Dispatch Stream
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Direct customer offers in your 1.5-mile zone. Accept to lock dispatch or counter-offer your fair rate.
              </p>
            </div>
          </div>

          {incomingAlerts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800">All caught up! No pending alerts</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                You're in active standby. When neighbors within 2 miles submit emergency requests or negotiate, they pop up here with a live countdown timer.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {incomingAlerts.map((alert, index) => {
                const isTopAlert = index === 0;
                return (
                  <div
                    key={alert.id}
                    className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
                      isTopAlert 
                        ? 'border-amber-400 shadow-lg ring-2 ring-amber-100' 
                        : 'border-slate-200 shadow-xs'
                    }`}
                  >
                    {/* Urgency countdown bar */}
                    <div className="bg-amber-500 px-4 py-2 text-white flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>URGENT DISPATCH REQUEST · {alert.urgency}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-600/60 px-2.5 py-0.5 rounded-full font-mono text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{isTopAlert ? `${timeLeft}s left to accept` : 'Active Alert'}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                              {alert.category ? alert.category.toUpperCase() : 'PLUMBING'}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{alert.createdAt}</span>
                          </div>

                          <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                            {alert.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              Customer: {alert.customerName}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                              <MapPin className="w-3.5 h-3.5" />
                              {alert.address} ({alert.distance})
                            </span>
                          </div>
                        </div>

                        {/* Customer proposed offer pill */}
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 sm:text-right shrink-0">
                          <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                            Customer Proposed Rate
                          </span>
                          <div className="flex sm:justify-end items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                              ${alert.offeredRate}
                            </span>
                            <span className="text-xs font-bold text-emerald-700">/hr</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                            Est. Total: <strong className="text-slate-800">{alert.totalOffer}</strong> ({alert.suggestedDuration})
                          </span>
                        </div>
                      </div>

                      {/* Counter proposal inline drawer */}
                      {counterAlertId === alert.id && (
                        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-3 animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-900">
                              Propose Your Counter-Rate to {alert.customerName}
                            </span>
                            <button
                              onClick={() => setCounterAlertId(null)}
                              className="text-xs text-slate-500 hover:text-slate-800"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-800">$</span>
                            <input
                              type="number"
                              min="15"
                              max="60"
                              value={counterAmount}
                              onChange={(e) => setCounterAmount(Number(e.target.value))}
                              className="w-32 px-3 py-1.5 bg-white border border-amber-400 rounded-lg font-bold text-base"
                            />
                            <span className="text-xs text-slate-600">/hr (Base is ${workerRate}/hr)</span>
                            <button
                              onClick={() => {
                                onCounterOffer?.(alert.id, counterAmount);
                                setCounterAlertId(null);
                              }}
                              className="ml-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg cursor-pointer"
                            >
                              Send Counter Offer
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Tap-Friendly Action Buttons */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>100% of payout deposited instantly upon job completion</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {/* Decline button */}
                          <button
                            type="button"
                            onClick={() => onDeclineAlert(alert.id)}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer transition-colors"
                          >
                            Pass
                          </button>

                          {/* Counter Offer button */}
                          <button
                            type="button"
                            onClick={() => {
                              setCounterAlertId(counterAlertId === alert.id ? null : alert.id);
                              setCounterAmount(alert.offeredRate + 4);
                            }}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs cursor-pointer transition-colors"
                          >
                            Counter Offer
                          </button>

                          {/* Accept button */}
                          <button
                            type="button"
                            onClick={() => onAcceptAlert(alert)}
                            className="flex-2 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm cursor-pointer shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept Job (Dispatch in 18 min)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Active Job Schedules */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Today's Active Job Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Real-time dispatch timeline and customer communication hub.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Ward 4 Territory
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeSchedule.map((job) => {
              const isCompleted = job.status === 'Completed';
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {job.status}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.time}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">
                      {job.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Client: {job.customerName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.address} ({job.distance})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-left md:text-right mr-2">
                      <span className="text-xs text-slate-400 block font-medium">Agreed Rate</span>
                      <span className="text-lg font-black text-emerald-700">{job.price}</span>
                    </div>

                    {/* Navigation / GPS button */}
                    <button
                      type="button"
                      onClick={() => onTrackJob?.(job)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Open simulated GPS telemetry and customer OTP code"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>GPS Telemetry</span>
                    </button>

                    {/* Masked call customer */}
                    <button
                      type="button"
                      onClick={() => onCallCustomer?.(job.customerName)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Call customer via privacy masked number"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">Call</span>
                    </button>

                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={() => onCompleteJob(job.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Done & Release Escrow</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Settled
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Transparent Wallet & Earnings Tracking */}
      {activeTab === 'wallet' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Balance Card */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Available for Instant Payout
              </span>
              <div className="text-3xl font-black text-emerald-800 mt-1">
                ${walletBalance.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Direct to checking account or UPI
              </p>
              <button
                type="button"
                onClick={onInstantPayout}
                className="mt-3.5 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Instant Payout (0% fee)</span>
              </button>
            </div>

            {/* Today's Earnings */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Today's Direct Earnings
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                ${todayEarnings.toFixed(2)}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+38% vs traditional contracting apps</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero commission taken by platform
              </p>
            </div>

            {/* Social Impact Metric */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-amber-900 tracking-wider">
                Your Monthly Fair Wage Surplus
              </span>
              <div className="text-3xl font-black text-amber-950 mt-1">
                +$480.00
              </div>
              <p className="text-xs text-amber-800 mt-1">
                Amount saved compared to middleman agencies charging 30% take rates.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                100% Retained in Local Household
              </div>
            </div>
          </div>

          {/* Transparent Ledger breakdown */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <h4 className="font-extrabold text-slate-900 text-base mb-3">
              Transparent Payout Ledger (Recent Transactions)
            </h4>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Faucet Replacement - Anita Roy</p>
                  <p className="text-slate-400 text-xs">Today, 2:45 PM · Direct Bank Deposit</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700">+$28.00</span>
                    <span className="block text-[10px] text-slate-400">100% Rate Payout</span>
                  </div>
                  <button
                    onClick={() => onViewReceipt?.({
                      id: 101,
                      title: 'Faucet Replacement - Anita Roy',
                      date: 'Today, 2:45 PM',
                      amount: '+$28.00',
                      rate: '$20.00/hr',
                      duration: '1.4 hrs'
                    })}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    title="Inspect transparent payout receipt"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Emergency Leak Diagnostic - Carlos Gomez</p>
                  <p className="text-slate-400 text-xs">Today, 11:30 AM · Instant Payout</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700">+$22.50</span>
                    <span className="block text-[10px] text-slate-400">100% Rate Payout</span>
                  </div>
                  <button
                    onClick={() => onViewReceipt?.({
                      id: 102,
                      title: 'Emergency Leak Diagnostic - Carlos Gomez',
                      date: 'Today, 11:30 AM',
                      amount: '+$22.50',
                      rate: '$15.00/hr',
                      duration: '1.5 hrs'
                    })}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    title="Inspect transparent payout receipt"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Weekly Payout Transfer to Checking (...4821)</p>
                  <p className="text-slate-400 text-xs">Yesterday, 5:00 PM · Automated Transfer</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-extrabold text-slate-700">-$315.00</span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">Completed ($0 fees)</span>
                  </div>
                  <button
                    onClick={() => onViewReceipt?.({
                      id: 103,
                      title: 'Direct Bank Deposit Transfer (...4821)',
                      date: 'Yesterday, 5:00 PM',
                      amount: '$315.00',
                      rate: 'N/A (Lump Sum)',
                      duration: 'Batch Payout'
                    })}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    title="Inspect transparent payout receipt"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
