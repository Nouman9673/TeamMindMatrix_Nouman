import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Heart, 
  Quote, 
  Check, 
  X
} from 'lucide-react';
import { IMPACT_METRICS, IMPACT_STORIES } from '../data/mockData';

export default function SocialImpactPanel() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stats = [
    {
      id: 'workers',
      label: 'Local Workers Empowered',
      value: '1,240+',
      subtext: 'Tradespeople earning on their own terms',
      growth: '+28% this quarter',
      icon: Users,
      color: 'emerald',
    },
    {
      id: 'income',
      label: 'Average Worker Income Increase',
      value: '+35%',
      subtext: 'Boosted through 0% platform commission cuts',
      growth: 'vs traditional agencies',
      icon: TrendingUp,
      color: 'amber',
    },
    {
      id: 'neighborhoods',
      label: 'Neighborhoods Served',
      value: '14',
      subtext: 'Active hyperlocal dispatch wards',
      growth: '4 new wards opening',
      icon: MapPin,
      color: 'emerald',
    },
    {
      id: 'payouts',
      label: 'Direct Community Payouts',
      value: IMPACT_METRICS.totalPayouts,
      subtext: '100% circulated back into local households',
      growth: 'Zero commission gouging',
      icon: DollarSign,
      color: 'amber',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>Social Impact Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Building Community Wealth, One Honest Repair at a Time
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every transaction on NeighborlyWork protects local family livelihoods. 
            Here is our measurable impact across 14 municipal districts.
          </p>
        </div>

        {/* Statistics Counter Grid - Core Requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isEmerald = stat.color === 'emerald';
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all text-left relative overflow-hidden group"
              >
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 transition-transform group-hover:scale-125 ${
                  isEmerald ? 'bg-emerald-600' : 'bg-amber-500'
                }`} />

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isEmerald ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    isEmerald ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
                  }`}>
                    {stat.growth}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>

                <h3 className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Comparison: NeighborlyWork vs Traditional Middleman Apps */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-md mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                The Fair Work Standard
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Why NeighborlyWork Changes The Blue-Collar Economy
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
              Empowerment vs Exploitation
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Dimension</th>
                  <th className="py-3 px-3 bg-red-50/60 text-red-900 rounded-t-lg">Traditional Middleman Apps</th>
                  <th className="py-3 px-3 bg-emerald-100/70 text-emerald-950 font-black rounded-t-lg">NeighborlyWork Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-700">Worker Commission Fee</td>
                  <td className="py-3.5 px-3 bg-red-50/30 text-red-700 font-medium flex items-center gap-1.5">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    <span>20% to 35% taken from worker's sweat</span>
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/50 text-emerald-900 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>0% Platform Cut — Worker receives 100% of rate</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-700">Pricing Control</td>
                  <td className="py-3.5 px-3 bg-red-50/30 text-slate-600">
                    Opaque algorithmic pricing & surge gouging
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/50 text-emerald-900 font-bold">
                    Workers set own rate; Customers negotiate directly
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-700">Dispatch Speed</td>
                  <td className="py-3.5 px-3 bg-red-50/30 text-slate-600">
                    3 to 6 hours or scheduled days away
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/50 text-emerald-900 font-bold">
                    Under 30 Minutes guaranteed hyperlocal dispatch
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-3 font-bold text-slate-700">Local Wealth Retention</td>
                  <td className="py-3.5 px-3 bg-red-50/30 text-slate-600">
                    Profits transferred away to offshore holding firms
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/50 text-emerald-900 font-bold">
                    100% of labor dollars spent circulates in your neighborhood
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Community Voices / Story Carousel */}
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Quote className="w-10 h-10 text-amber-300 mx-auto opacity-75" />

            <p className="text-base sm:text-xl font-medium leading-relaxed italic text-emerald-50">
              "{IMPACT_STORIES[activeStoryIdx].quote}"
            </p>

            <div className="flex items-center justify-center gap-3">
              <img
                src={IMPACT_STORIES[activeStoryIdx].image}
                alt={IMPACT_STORIES[activeStoryIdx].author}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shadow-md"
              />
              <div className="text-left">
                <h4 className="font-bold text-white text-base">
                  {IMPACT_STORIES[activeStoryIdx].author}
                </h4>
                <p className="text-xs text-emerald-200">
                  {IMPACT_STORIES[activeStoryIdx].role} · <span className="text-amber-300 font-semibold">{IMPACT_STORIES[activeStoryIdx].badge}</span>
                </p>
              </div>
            </div>

            {/* Carousel navigation pills */}
            <div className="flex justify-center gap-2 pt-2">
              {IMPACT_STORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStoryIdx(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeStoryIdx === i ? 'w-8 bg-amber-400' : 'w-2.5 bg-emerald-600 hover:bg-emerald-500'
                  }`}
                  aria-label={`Show impact story ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
