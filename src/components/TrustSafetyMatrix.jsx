import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Award
} from 'lucide-react';
import { VERIFICATION_POINTS } from '../data/mockData';

export default function TrustSafetyMatrix() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7" />;
      case 'Scale': return <Scale className="w-7 h-7" />;
      case 'Clock': return <Clock className="w-7 h-7" />;
      case 'Users': return <Users className="w-7 h-7" />;
      default: return <ShieldCheck className="w-7 h-7" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Community Trust & Integrity</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Solving Gig Marketplace Challenges with Radical Transparency
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Traditional platforms squeeze worker wages with 25-35% hidden cuts while leaving customers with unpredictable wait times. 
            NeighborlyWork re-engineers trust for the local neighborhood.
          </p>
        </div>

        {/* 4-Card Clean Feature Layout - Core Requirement */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFICATION_POINTS.map((card) => {
            const isEmerald = card.color === 'emerald';
            return (
              <div
                key={card.id}
                className={`rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl ${
                  isEmerald 
                    ? 'border-emerald-200 bg-linear-to-b from-emerald-50/50 to-white hover:border-emerald-400' 
                    : 'border-amber-200 bg-linear-to-b from-amber-50/50 to-white hover:border-amber-400'
                }`}
              >
                <div>
                  {/* Icon wrapper */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform ${
                    isEmerald 
                      ? 'bg-emerald-600 text-white shadow-emerald-700/20' 
                      : 'bg-amber-500 text-white shadow-amber-600/20'
                  }`}>
                    {getIcon(card.icon)}
                  </div>

                  <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                    isEmerald ? 'text-emerald-700' : 'text-amber-800'
                  }`}>
                    {card.tagline}
                  </span>

                  <h3 className="text-xl font-black text-slate-900 mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card footer metric badge */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    isEmerald 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {card.metrics}
                  </span>

                  <button
                    onClick={() => setSelectedPoint(card)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
                    aria-label={`View verification details for ${card.title}`}
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification modal inspector */}
        {selectedPoint && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  {getIcon(selectedPoint.icon)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedPoint.title} Standard</h4>
                  <p className="text-xs text-slate-500">{selectedPoint.tagline}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 my-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Mandatory national identification & criminal records check.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Local trade master reference validation and tool safety audit.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>GPS location verified strictly to 2-mile neighborhood zone.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Continuous 2-way rating protection guaranteeing respectful community dialogue.</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPoint(null)}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 cursor-pointer"
              >
                Close Verification Overview
              </button>
            </div>
          </div>
        )}

        {/* Additional trust strip */}
        <div className="mt-10 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-900">
                Community Escrow Protection Pledge
              </h4>
              <p className="text-xs text-slate-500">
                Payment is held securely in neighborhood escrow until you inspect the work and tap "Approve". 0% platform wage deduction.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">
              100% Direct Payout
            </span>
            <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Licensed & Insured
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
