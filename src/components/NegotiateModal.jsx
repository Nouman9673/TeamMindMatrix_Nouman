import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  HeartHandshake, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function NegotiateModal({ 
  worker, 
  isOpen, 
  onClose, 
  onSubmitProposal 
}) {
  const [proposedRate, setProposedRate] = useState(worker?.rate ?? 15);
  const [jobDescription, setJobDescription] = useState('Emergency pipe leak under kitchen sink. Active water pooling.');
  const [urgency, setUrgency] = useState('immediate');
  const [hoursEstimated, setHoursEstimated] = useState(1.5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleClose = () => {
    setSubmittedSuccess(false);
    onClose?.();
  };

  if (!isOpen || !worker) return null;

  const calculateTotal = () => {
    return (proposedRate * hoursEstimated).toFixed(2);
  };

  const handleQuickAdjust = (delta) => {
    setProposedRate((prev) => Math.max(8, Math.min(60, prev + delta)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      const proposalData = {
        id: `alert-${Date.now()}`,
        title: jobDescription.slice(0, 42) || 'Emergency Local Service Request',
        customerName: 'You (Sarah Jenkins)',
        address: '742 Maple Street, Apt 3B',
        distance: `${worker.distance} miles away`,
        offeredRate: Number(proposedRate),
        suggestedDuration: `~${hoursEstimated} hrs`,
        totalOffer: `$${calculateTotal()}`,
        urgency: urgency === 'immediate' ? 'Immediate (< 30 mins)' : 'Flexible today',
        createdAt: 'Just now',
        secondsLeft: 60,
        workerTargetId: worker.id,
        workerName: worker.name,
        category: worker.category,
      };

      onSubmitProposal?.(proposalData);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="negotiate-title"
      >
        {/* Modal Header */}
        <div className="bg-linear-to-r from-emerald-700 to-teal-800 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-emerald-100 hover:text-white bg-emerald-800/60 hover:bg-emerald-800 rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close negotiation modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wide">
              Fair Negotiation System
            </span>
            <span className="text-emerald-200 text-xs">Direct to Worker</span>
          </div>
          <h2 id="negotiate-title" className="text-xl sm:text-2xl font-black text-white">
            Propose a Budget to {worker.name}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            {worker.service} · {worker.distance} miles away · Base Rate: ${worker.rate}/hr
          </p>
        </div>

        {submittedSuccess ? (
          /* Confirmation State */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Proposal Sent to {worker.name}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your proposed budget of <span className="font-bold text-emerald-700">${proposedRate}/hr</span> (est. ${calculateTotal()} total) has been transmitted directly to {worker.name}'s on-demand dispatch alert queue.
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Live Prototype Feature:</p>
                <p className="text-amber-800">
                  Switch over to the <strong>"Worker Dashboard"</strong> view above to see this job alert tick down on {worker.name.split(' ')[0]}'s incoming dispatch screen in real time!
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Active Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 text-left">
            {/* Worker Snapshot Card */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <img 
                src={worker.avatar} 
                alt={worker.name} 
                className="w-12 h-12 rounded-xl object-cover border border-emerald-400" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{worker.name}</h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Sets own: ${worker.rate}/hr
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {worker.distance} mi
                  </span>
                  <span className="text-amber-600 font-semibold">★ {worker.rating}</span>
                  <span className="text-emerald-600 font-medium">⚡ 30-min dispatch ready</span>
                </div>
              </div>
            </div>

            {/* Proposal Rate Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="proposed-rate" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Proposed Hourly Rate
                </label>
                <span className="text-xs text-slate-500">
                  Worker baseline: ${worker.rate}/hr
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                  <input
                    id="proposed-rate"
                    type="number"
                    min="10"
                    max="80"
                    step="1"
                    value={proposedRate}
                    onChange={(e) => setProposedRate(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-black text-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Quick adjustments */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleQuickAdjust(-2)}
                    className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer border border-slate-300"
                    title="Lower offer by $2"
                  >
                    -$2
                  </button>
                  <button
                    type="button"
                    onClick={() => setProposedRate(worker.rate)}
                    className="px-2.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs cursor-pointer border border-emerald-300"
                    title="Reset to worker rate"
                  >
                    Base (${worker.rate})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAdjust(3)}
                    className="px-2.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs cursor-pointer border border-amber-300"
                    title="Add fair work bonus +$3"
                  >
                    +$3 Tip
                  </button>
                </div>
              </div>

              {/* Wage health indicator */}
              <div className="mt-2 flex items-center justify-between text-xs">
                {proposedRate < worker.minRate ? (
                  <span className="text-amber-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Below {worker.name}'s minimum (${worker.minRate}/hr). May take longer to accept.
                  </span>
                ) : proposedRate >= worker.rate ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Generous offer! Likely accepted within 60 seconds.
                  </span>
                ) : (
                  <span className="text-slate-600 flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                    Within fair negotiation range. Fair community trade!
                  </span>
                )}
              </div>
            </div>

            {/* Estimated Duration & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Estimated Hours Needed
                </label>
                <select
                  value={hoursEstimated}
                  onChange={(e) => setHoursEstimated(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 text-slate-800 text-sm font-semibold focus:outline-hidden focus:border-emerald-500"
                >
                  <option value={1}>1 hour (~quick fix)</option>
                  <option value={1.5}>1.5 hours (standard repair)</option>
                  <option value={2}>2 hours (moderate project)</option>
                  <option value={3}>3 hours (half day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Arrival Urgency
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setUrgency('immediate')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-colors ${
                      urgency === 'immediate'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    ⚡ &lt; 30 Mins
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('flexible')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-colors ${
                      urgency === 'flexible'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Flexible Today
                  </button>
                </div>
              </div>
            </div>

            {/* Job Description note */}
            <div>
              <label htmlFor="job-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Describe the Issue (helps worker bring right tools)
              </label>
              <textarea
                id="job-notes"
                rows={2}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="e.g., Leaking pipe, need urgent fix, bring 1/2-inch copper fittings"
                className="w-full px-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-300 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Transparent Payout breakdown */}
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <div className="flex justify-between font-medium text-slate-600">
                <span>Worker Take-Home ({hoursEstimated} hrs @ ${proposedRate}/hr):</span>
                <span className="font-bold text-emerald-800">${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Platform Commission / Middleman Cut:</span>
                <span className="font-bold text-emerald-600">$0.00 (Zero Cut)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Community Insurance & Guarantee Pool:</span>
                <span className="text-slate-700">$1.50</span>
              </div>
              <div className="border-t border-emerald-200 pt-1.5 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Budget Proposed:</span>
                <span className="text-emerald-700 font-black">
                  ${(Number(calculateTotal()) + 1.5).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 font-semibold text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 flex items-center gap-2 cursor-pointer transition-colors text-sm"
              >
                {isSubmitting ? (
                  <span>Sending Proposal...</span>
                ) : (
                  <>
                    <span>Submit Proposal (${proposedRate}/hr)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
