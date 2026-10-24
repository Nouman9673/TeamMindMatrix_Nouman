import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';

export default function DirectBookModal({ 
  worker, 
  isOpen, 
  onClose, 
  onConfirmBooking 
}) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [address, setAddress] = useState('742 Maple Street, Ward 4');
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [notes, setNotes] = useState('Front door access. Call on arrival.');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setBookingConfirmed(false);
    onClose?.();
  };

  if (!isOpen || !worker) return null;

  const subtotal = worker.rate * estimatedHours;
  const platformFee = 0.00; // 0% platform fee
  const communityGuarantee = 1.25;
  const total = subtotal + platformFee + communityGuarantee;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingConfirmed(true);
      onConfirmBooking?.({
        worker,
        total,
        address,
        estimatedHours,
        notes
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-emerald-700 text-white p-5 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white bg-emerald-800 rounded-full p-1.5 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>30-Minute Dispatch Guarantee</span>
          </div>
          <h3 className="text-xl font-black">
            Book Instant Service with {worker.name}
          </h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            {worker.service} · {worker.distance} miles away · ETA: {worker.dispatchTime}
          </p>
        </div>

        {bookingConfirmed ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              Dispatch Confirmed!
            </h4>
            <p className="text-sm text-slate-600">
              {worker.name} has been notified and is preparing tools. Estimated arrival: <strong className="text-emerald-700">18 minutes</strong> to {address}.
            </p>
            <div className="bg-slate-50 p-3.5 rounded-xl border text-xs text-slate-600 text-left space-y-1">
              <div className="flex justify-between">
                <span>Hold in Escrow:</span>
                <span className="font-bold text-slate-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Worker Take-home (100%):</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm cursor-pointer hover:bg-emerald-700"
            >
              Back to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-5 space-y-4 text-left">
            {/* Address */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Your Service Address
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border rounded-xl">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent font-medium text-slate-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Estimated Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setEstimatedHours(hr)}
                    className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                      estimatedHours === hr 
                        ? 'bg-emerald-600 text-white border-emerald-700' 
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {hr} {hr === 1 ? 'Hour' : 'Hours'} (${worker.rate * hr})
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Instructions for {worker.name}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gate code, parking instructions, or tools needed"
                className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border rounded-xl focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Payout Summary */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Labor ({estimatedHours} hr @ ${worker.rate}/hr):</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Commission:</span>
                <span className="font-bold text-emerald-700">${platformFee.toFixed(2)} (Zero Cut)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Community Escrow Insurance:</span>
                <span>${communityGuarantee.toFixed(2)}</span>
              </div>
              <div className="border-t border-emerald-200 pt-1 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Escrow Deposit:</span>
                <span className="text-emerald-700">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                {isProcessing ? 'Dispatching...' : `Confirm & Dispatch ($${total.toFixed(2)})`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
