import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CustomerView from './components/CustomerView';
import WorkerDashboard from './components/WorkerDashboard';
import NegotiateModal from './components/NegotiateModal';
import DirectBookModal from './components/DirectBookModal';
import WorkerProfileModal from './components/WorkerProfileModal';
import LiveTrackingModal from './components/LiveTrackingModal';
import ReceiptModal from './components/ReceiptModal';
import TrustSafetyMatrix from './components/TrustSafetyMatrix';
import SocialImpactPanel from './components/SocialImpactPanel';
import Footer from './components/Footer';
import HelpModal from './components/HelpModal';
import { 
  WORKERS_DATA, 
  INITIAL_INCOMING_ALERTS, 
  INITIAL_ACTIVE_SCHEDULE 
} from './data/mockData';
import { 
  Sparkles, 
  X, 
  User, 
  Briefcase, 
  Columns2,
  CheckCircle2
} from 'lucide-react';

let uniqueJobCounter = 200;
const generateJobId = () => `job-${++uniqueJobCounter}`;

export default function App() {
  // Navigation & Mode states
  // 'customer' | 'worker' | 'split'
  const [activeView, setActiveView] = useState('customer');
  // 'customer' | 'worker'
  const [currentMode, setCurrentMode] = useState('customer');

  // Search & Filters state
  const [locationQuery, setLocationQuery] = useState('Greenwood & Westend (Ward 4)');
  const [serviceQuery, setServiceQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [urgentMode, setUrgentMode] = useState(false);

  // Data states for live two-way simulation
  const [workers, setWorkers] = useState(WORKERS_DATA);
  const [incomingAlerts, setIncomingAlerts] = useState(INITIAL_INCOMING_ALERTS);
  const [activeSchedule, setActiveSchedule] = useState(INITIAL_ACTIVE_SCHEDULE);
  const [walletBalance, setWalletBalance] = useState(428.50);
  const [todayEarnings, setTodayEarnings] = useState(94.00);

  // Customer-side pending negotiation proposals state
  const [customerProposals, setCustomerProposals] = useState([]);

  // Modals state
  const [negotiatingWorker, setNegotiatingWorker] = useState(null);
  const [bookingWorker, setBookingWorker] = useState(null);
  const [viewingWorkerProfile, setViewingWorkerProfile] = useState(null);
  const [trackingJob, setTrackingJob] = useState(null);
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Customer submits budget proposal to a worker
  const handleProposalSubmit = (proposal) => {
    setIncomingAlerts((prev) => [proposal, ...prev]);
    setCustomerProposals((prev) => [proposal, ...prev]);
    showToast(
      `Proposal for $${proposal.offeredRate}/hr sent! Check the "Worker Dashboard" to see the live incoming countdown timer alert.`,
      'success'
    );
  };

  // Direct booking from customer card
  const handleDirectBookConfirm = ({ worker, total, address }) => {
    const newJob = {
      id: generateJobId(),
      title: `Direct 30-Min Booking: ${worker.service}`,
      customerName: 'You (Sarah Jenkins)',
      address: address,
      time: 'In 20 mins',
      status: 'Confirmed - Scheduled',
      price: `$${total.toFixed(2)}`,
      distance: `${worker.distance} miles`,
      eta: 'En Route',
    };

    setActiveSchedule((prev) => [newJob, ...prev]);
    showToast(
      `Booked with ${worker.name}! Total: $${total.toFixed(2)}. Dispatch ETA: 18 mins. Worker received 100% of fair rate.`,
      'success'
    );
  };

  // Worker accepts on-demand job alert
  const handleAcceptAlert = (alert) => {
    setIncomingAlerts((prev) => prev.filter((a) => a.id !== alert.id));
    setCustomerProposals((prev) => prev.filter((p) => p.id !== alert.id));

    const newJob = {
      id: generateJobId(),
      title: alert.title,
      customerName: alert.customerName,
      address: alert.address,
      time: 'Immediate Dispatch',
      status: 'In Progress (En Route)',
      price: alert.totalOffer,
      distance: alert.distance,
      eta: 'Arriving in 16 min',
    };
    setActiveSchedule((prev) => [newJob, ...prev]);

    // Update earnings
    const numericAmount = alert.offeredRate || 20;
    setWalletBalance((prev) => prev + numericAmount);
    setTodayEarnings((prev) => prev + numericAmount);

    showToast(
      `Job Accepted! Navigation started to ${alert.address}. Escrow locked at ${alert.totalOffer}.`,
      'success'
    );
  };

  // Worker passes/declines
  const handleDeclineAlert = (alertId) => {
    setIncomingAlerts((prev) => prev.filter((a) => a.id !== alertId));
    setCustomerProposals((prev) =>
      prev.map((p) => (p.id === alertId ? { ...p, status: 'declined' } : p))
    );
    showToast('Alert passed to the next nearest neighborhood tradesperson.', 'info');
  };

  // Worker counter-offers
  const handleCounterOffer = (alertId, counterRate) => {
    const updatedOfferStr = `$${(counterRate * 1.5).toFixed(2)}`;
    
    setIncomingAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? {
              ...a,
              offeredRate: counterRate,
              totalOffer: updatedOfferStr,
              urgency: 'Counter-Offer Transmitted ($' + counterRate + '/hr)',
              hasCounter: true,
            }
          : a
      )
    );

    setCustomerProposals((prev) =>
      prev.map((p) =>
        p.id === alertId
          ? {
              ...p,
              counterRate: counterRate,
              counterTotal: updatedOfferStr,
              hasCounter: true,
            }
          : p
      )
    );

    showToast(`Counter proposal of $${counterRate}/hr transmitted to customer.`, 'info');
  };

  // Customer accepts worker's counter offer
  const handleCustomerAcceptCounter = (proposal) => {
    setCustomerProposals((prev) => prev.filter((p) => p.id !== proposal.id));
    setIncomingAlerts((prev) => prev.filter((a) => a.id !== proposal.id));

    const newJob = {
      id: generateJobId(),
      title: proposal.title,
      customerName: 'You (Sarah Jenkins)',
      address: proposal.address,
      time: 'In 20 mins',
      status: 'Confirmed - Scheduled',
      price: proposal.counterTotal || `$${(proposal.counterRate * 1.5).toFixed(2)}`,
      distance: proposal.distance,
      eta: 'En Route',
    };
    setActiveSchedule((prev) => [newJob, ...prev]);

    showToast(
      `Counter offer accepted at $${proposal.counterRate}/hr! Rajesh is dispatched.`,
      'success'
    );
  };

  // Worker completes job
  const handleCompleteJob = (jobId) => {
    setActiveSchedule((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Completed', eta: 'Payout Cleared' } : j))
    );
    showToast('Job marked complete! Customer verified quality & funds deposited to wallet.', 'success');
  };

  // Worker updates baseline hourly rate
  const handleUpdateWorkerRate = (newRate) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === 'w-1' ? { ...w, rate: newRate } : w))
    );
    showToast(`Rajesh's base rate updated to $${newRate}/hr across the marketplace!`, 'success');
  };

  // Worker instant payout
  const handleInstantPayout = () => {
    if (walletBalance <= 0) {
      showToast('Wallet is already cleared.', 'info');
      return;
    }
    const amount = walletBalance;
    setWalletBalance(0);
    showToast(`$${amount.toFixed(2)} transferred instantly to your bank account with $0 fees!`, 'success');
  };

  const handleSimulateCall = (name = 'Service Pro') => {
    showToast(`Connecting secure encrypted masked call to ${name}...`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage.text}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white shrink-0 cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. HEADER */}
      <Header
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        activeView={activeView}
        setActiveView={setActiveView}
        unreadAlertsCount={incomingAlerts.length}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* 2. HERO & DUAL SEARCH (Visible in customer or split view) */}
      <Hero
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        serviceQuery={serviceQuery}
        setServiceQuery={setServiceQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        urgentMode={urgentMode}
        setUrgentMode={setUrgentMode}
        onSearchSubmit={() => {
          showToast(`Filtered nearby pros for "${serviceQuery || selectedCategory}" in ${locationQuery}`);
        }}
      />

      {/* TWO-WAY INTERACTIVE DEMO SYSTEM */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Interactive Mode Banner with Quick View Tabs */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              {activeView === 'worker' ? <Briefcase className="w-5 h-5 text-emerald-700" /> : <User className="w-5 h-5 text-emerald-700" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {activeView === 'worker'
                    ? 'Worker Control Center (Rajesh Sharma)'
                    : activeView === 'customer'
                    ? 'Customer Hyperlocal Marketplace'
                    : 'Split View: Two-Way Marketplace Simulation'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Live Interactive Demo
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {activeView === 'worker'
                  ? 'Real-time on-demand job alerts ticking down, transparent earnings & active schedules.'
                  : activeView === 'customer'
                  ? 'Browse verified local pros, negotiate budgets freely, or book instant 30-min dispatches.'
                  : 'Experience how customer proposals flow immediately into worker on-demand countdown alerts!'}
              </p>
            </div>
          </div>

          {/* Quick tab toggle buttons */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1 shrink-0 text-xs font-bold">
            <button
              onClick={() => {
                setActiveView('customer');
                setCurrentMode('customer');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'customer'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer View</span>
            </button>
            <button
              onClick={() => {
                setActiveView('worker');
                setCurrentMode('worker');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'worker'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Worker Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('split')}
              className={`hidden md:flex px-3 py-1.5 rounded-lg items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'split'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>
        </div>

        {/* Customer Active Negotiation Tray (Two-Way simulation indicator) */}
        {customerProposals.length > 0 && activeView !== 'worker' && (
          <div className="mb-6 space-y-2">
            {customerProposals.map((prop) => (
              <div 
                key={prop.id}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left animate-in fade-in"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {prop.title}
                      </span>
                      {prop.hasCounter ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold animate-pulse">
                          Worker Counter-Offer Received!
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                          Pending Worker Review (${prop.offeredRate}/hr)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {prop.hasCounter
                        ? `${prop.workerName || 'Rajesh Sharma'} countered with $${prop.counterRate}/hr (Est. total: ${prop.counterTotal}).`
                        : `Transmitted to ${prop.workerName || 'worker'}. Awaiting response.`}
                    </p>
                  </div>
                </div>

                {prop.hasCounter && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setCustomerProposals((prev) => prev.filter((p) => p.id !== prop.id))}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleCustomerAcceptCounter(prop)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept ${prop.counterRate}/hr Counter</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View Render Logic */}
        {activeView === 'customer' && (
          <CustomerView
            workers={workers}
            onSelectWorkerForNegotiation={(w) => setNegotiatingWorker(w)}
            onDirectBook={(w) => setBookingWorker(w)}
            onViewProfile={(w) => setViewingWorkerProfile(w)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            serviceQuery={serviceQuery}
            locationQuery={locationQuery}
            urgentMode={urgentMode}
            setUrgentMode={setUrgentMode}
          />
        )}

        {activeView === 'worker' && (
          <WorkerDashboard
            incomingAlerts={incomingAlerts}
            activeSchedule={activeSchedule}
            onAcceptAlert={handleAcceptAlert}
            onDeclineAlert={handleDeclineAlert}
            onCounterOffer={handleCounterOffer}
            onCompleteJob={handleCompleteJob}
            onInstantPayout={handleInstantPayout}
            onTrackJob={(job) => setTrackingJob(job)}
            onViewReceipt={(receipt) => setViewingReceipt(receipt)}
            onCallCustomer={(name) => handleSimulateCall(name)}
            workerRate={workers.find((w) => w.id === 'w-1')?.rate || 15}
            onUpdateWorkerRate={handleUpdateWorkerRate}
            walletBalance={walletBalance}
            todayEarnings={todayEarnings}
          />
        )}

        {activeView === 'split' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            {/* Left: Customer Side */}
            <div className="bg-slate-50/70 p-4 sm:p-5 rounded-3xl border-2 border-emerald-300 shadow-sm">
              <div className="mb-4 pb-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-black text-slate-900 text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Customer Side (Marketplace & Negotiation)
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                  Propose Budget
                </span>
              </div>
              <CustomerView
                workers={workers}
                onSelectWorkerForNegotiation={(w) => setNegotiatingWorker(w)}
                onDirectBook={(w) => setBookingWorker(w)}
                onViewProfile={(w) => setViewingWorkerProfile(w)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                serviceQuery={serviceQuery}
                locationQuery={locationQuery}
                urgentMode={urgentMode}
                setUrgentMode={setUrgentMode}
              />
            </div>

            {/* Right: Worker Side */}
            <div className="bg-slate-50/70 p-4 sm:p-5 rounded-3xl border-2 border-amber-300 shadow-sm">
              <div className="mb-4 pb-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  Worker Side (On-Demand Dispatch & Wallet)
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                  Live Countdown
                </span>
              </div>
              <WorkerDashboard
                incomingAlerts={incomingAlerts}
                activeSchedule={activeSchedule}
                onAcceptAlert={handleAcceptAlert}
                onDeclineAlert={handleDeclineAlert}
                onCounterOffer={handleCounterOffer}
                onCompleteJob={handleCompleteJob}
                onInstantPayout={handleInstantPayout}
                onTrackJob={(job) => setTrackingJob(job)}
                onViewReceipt={(receipt) => setViewingReceipt(receipt)}
                onCallCustomer={(name) => handleSimulateCall(name)}
                workerRate={workers.find((w) => w.id === 'w-1')?.rate || 15}
                onUpdateWorkerRate={handleUpdateWorkerRate}
                walletBalance={walletBalance}
                todayEarnings={todayEarnings}
              />
            </div>
          </div>
        )}
      </main>

      {/* 3. TRUST, SAFETY & VERIFICATION MATRIX */}
      <TrustSafetyMatrix />

      {/* 4. SOCIAL IMPACT METRICS PANEL */}
      <SocialImpactPanel />

      {/* 5. FOOTER */}
      <Footer onOpenHelp={() => setIsHelpOpen(true)} />

      {/* Negotiation Modal Popup */}
      <NegotiateModal
        key={negotiatingWorker?.id || 'none'}
        worker={negotiatingWorker}
        isOpen={!!negotiatingWorker}
        onClose={() => setNegotiatingWorker(null)}
        onSubmitProposal={handleProposalSubmit}
      />

      {/* Direct Booking Modal */}
      <DirectBookModal
        key={bookingWorker?.id || 'none'}
        worker={bookingWorker}
        isOpen={!!bookingWorker}
        onClose={() => setBookingWorker(null)}
        onConfirmBooking={handleDirectBookConfirm}
      />

      {/* Worker Profile & Verification Detail Modal */}
      <WorkerProfileModal
        worker={viewingWorkerProfile}
        isOpen={!!viewingWorkerProfile}
        onClose={() => setViewingWorkerProfile(null)}
        onNegotiate={(w) => setNegotiatingWorker(w)}
        onDirectBook={(w) => setBookingWorker(w)}
      />

      {/* Live Simulated GPS Dispatch Tracking Modal */}
      <LiveTrackingModal
        job={trackingJob}
        isOpen={!!trackingJob}
        onClose={() => setTrackingJob(null)}
        onCallWorker={() => handleSimulateCall(trackingJob?.customerName || 'Customer')}
      />

      {/* Transparent Payout Receipt Modal */}
      <ReceiptModal
        receipt={viewingReceipt}
        isOpen={!!viewingReceipt}
        onClose={() => setViewingReceipt(null)}
      />

      {/* Community Helpline Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
