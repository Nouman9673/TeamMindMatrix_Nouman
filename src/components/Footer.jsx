import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Award,
  Globe
} from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer({ onOpenHelp }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <HeartHandshake className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Neighborly<span className="text-emerald-400">Work</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              A Hyperlocal Social Impact Initiative restoring dignity, fair wages, and mutual trust to neighborhood blue-collar service trade. Zero corporate commission gouging.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-800/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                Municipal Non-Profit Partner
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-300 text-xs font-bold border border-amber-800/80">
                <Award className="w-3.5 h-3.5" />
                100% Living Wage Certified
              </span>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Hyperlocal Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Emergency Plumbing (15-min)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Residential Electrician</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Eco-Cleaning Services</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cabinetry & Carpentry</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Appliance Diagnostic</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Interior Painting</a></li>
            </ul>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              For Local Pros
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Worker Freedom Manifesto</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Zero-Fee Earnings Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Join Trade Guild Vetting</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tool Insurance Program</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Worker Community Forum</a></li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Safety & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onOpenHelp} className="hover:text-amber-300 transition-colors cursor-pointer text-left">24/7 Rapid Help Line</button></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Trust & Verification Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Escrow Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Accessibility Standards</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy & Data Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {CURRENT_YEAR} NeighborlyWork Platform. Social Impact Project for Fair Blue-Collar Employment.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              English (US) / Español / हिन्दी
            </span>
            <span>·</span>
            <span>Mobile-First Accessible Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
