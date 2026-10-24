import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Filter, 
  DollarSign, 
  SearchX,
  UserCheck
} from 'lucide-react';
import { INITIAL_SERVICES } from '../data/mockData';

export default function CustomerView({ 
  workers, 
  onSelectWorkerForNegotiation,
  onDirectBook,
  onViewProfile,
  selectedCategory,
  setSelectedCategory,
  serviceQuery = '',
  locationQuery = '',
  urgentMode,
  setUrgentMode
}) {
  const [maxDistance, setMaxDistance] = useState(5.0);
  const [sortBy, setSortBy] = useState('recommended');
  const [minRating, setMinRating] = useState(0);

  // Memoized filter and sort logic for 60fps performance
  const filteredWorkers = useMemo(() => {
    const sQuery = serviceQuery.toLowerCase().trim();

    return workers.filter((w) => {
      // category filter
      if (selectedCategory && selectedCategory !== 'all' && w.category !== selectedCategory) {
        return false;
      }
      // distance filter
      if (w.distance > maxDistance) {
        return false;
      }
      // rating filter
      if (minRating > 0 && w.rating < minRating) {
        return false;
      }
      // urgent 30-min mode filter
      if (urgentMode && (!w.isAvailable || w.distance > 2.0)) {
        return false;
      }
      // Service keyword search query
      if (sQuery) {
        const matchName = w.name.toLowerCase().includes(sQuery);
        const matchService = w.service.toLowerCase().includes(sQuery);
        const matchCategory = w.category.toLowerCase().includes(sQuery);
        const matchSkills = w.skills.some((s) => s.toLowerCase().includes(sQuery));
        if (!matchName && !matchService && !matchCategory && !matchSkills) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rate-low') return a.rate - b.rate;
      if (sortBy === 'rate-high') return b.rate - a.rate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended default
    });
  }, [workers, selectedCategory, maxDistance, minRating, urgentMode, sortBy, serviceQuery]);

  return (
    <div className="space-y-6 text-left">
      {/* View Header with Marketplace context */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Verified Hyperlocal Marketplace
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Nearby Service Professionals in {locationQuery || 'Your Neighborhood'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent pricing: Workers set their rates directly. Negotiate freely with zero middleman markups.
          </p>
        </div>

        {/* Quick metric pills */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-left">
            <span className="block text-[10px] uppercase font-bold text-emerald-800">Available Nearby</span>
            <span className="text-base font-extrabold text-emerald-900">{filteredWorkers.length} Pros</span>
          </div>
          <div className="bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 text-left">
            <span className="block text-[10px] uppercase font-bold text-amber-800">Avg. Arrival ETA</span>
            <span className="text-base font-extrabold text-amber-900">22 Mins</span>
          </div>
        </div>
      </div>

      {/* Filter and sorting bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Category selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span className="font-bold text-slate-700 flex items-center gap-1 shrink-0">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Category:</span>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {INITIAL_SERVICES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Distance, Rating, and sorting controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {/* Distance Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Distance:</span>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              aria-label="Filter by maximum distance"
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500"
            >
              <option value={1.0}>Within 1 mile</option>
              <option value={2.0}>Within 2 miles</option>
              <option value={5.0}>Within 5 miles</option>
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Rating:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500"
            >
              <option value={0}>All Ratings</option>
              <option value={4.8}>4.8+ ★</option>
              <option value={4.9}>4.9+ ★</option>
              <option value={5.0}>5.0 ★ Only</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort service professionals"
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="recommended">Recommended (Local Trust)</option>
              <option value="distance">Nearest Distance (Proximity)</option>
              <option value="rate-low">Rate: Low to High</option>
              <option value="rate-high">Rate: High to Low</option>
              <option value="rating">Highest Rated (5.0 ★)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Available Local Service Cards */}
      {filteredWorkers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No professionals found with these filters</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try expanding your distance radius, adjusting the search term, or removing the urgent 30-min filter.
          </p>
          <button
            onClick={() => {
              setMaxDistance(5.0);
              setMinRating(0);
              setSelectedCategory('all');
              setUrgentMode(false);
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group text-left"
            >
              <div>
                {/* Card Top: Avatar, Status, Distance & Verified Badges */}
                <div className="p-4 sm:p-5 pb-3">
                  <div className="flex items-start gap-3.5">
                    {/* Worker Avatar with online ring */}
                    <div 
                      className="relative shrink-0 cursor-pointer"
                      onClick={() => onViewProfile?.(worker)}
                      title="Click to view full verified profile"
                    >
                      <img
                        src={worker.avatar}
                        alt={worker.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/30 group-hover:scale-105 transition-transform"
                      />
                      {worker.isAvailable ? (
                        <span 
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs" 
                          title="Online & Ready for 30-Min Dispatch"
                        />
                      ) : (
                        <span 
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-400 border-2 border-white rounded-full shadow-xs" 
                          title="Currently busy on active job"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <button
                          onClick={() => onViewProfile?.(worker)}
                          className="text-base font-extrabold text-slate-900 truncate group-hover:text-emerald-700 transition-colors text-left cursor-pointer"
                        >
                          {worker.name}
                        </button>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{worker.rating}</span>
                          <span className="text-amber-700 text-[10px]">({worker.reviewsCount})</span>
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-emerald-800 mt-0.5 line-clamp-1">
                        {worker.service}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {worker.distance} miles away
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {worker.dispatchTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Highlight Pill */}
                  <div className="mt-3.5 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">
                        Worker Freedom Rate
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        Sets own rate:
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-emerald-800">
                        ${worker.rate}
                      </span>
                      <span className="text-xs text-emerald-700 font-bold">/hr</span>
                    </div>
                  </div>

                  {/* Worker bio snippet */}
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    "{worker.bio}"
                  </p>

                  {/* Skills Chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <button
                        onClick={() => onViewProfile?.(worker)}
                        className="text-[10px] text-emerald-700 hover:underline self-center font-semibold cursor-pointer"
                      >
                        +{worker.skills.length - 3} more
                      </button>
                    )}
                  </div>
                </div>

                {/* Verification badges bar with profile click */}
                <div 
                  onClick={() => onViewProfile?.(worker)}
                  className="px-4 sm:px-5 py-2 bg-slate-50 hover:bg-slate-100 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-semibold text-emerald-950">
                      {worker.verifiedBadges[0]} · {worker.completedJobs} Neighborhood Jobs
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold text-[10px] shrink-0 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    View Profile
                  </span>
                </div>
              </div>

              {/* Action Buttons: Tap-Friendly & Accessible */}
              <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-white grid grid-cols-2 gap-2">
                {/* Negotiate Button */}
                <button
                  type="button"
                  onClick={() => onSelectWorkerForNegotiation(worker)}
                  className="py-3 px-3 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-900 font-bold rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  aria-label={`Negotiate rate with ${worker.name}`}
                >
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  <span>Negotiate</span>
                </button>

                {/* Direct Booking / 30-min Dispatch */}
                <button
                  type="button"
                  onClick={() => onDirectBook(worker)}
                  className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  aria-label={`Instant 30-min dispatch booking with ${worker.name}`}
                >
                  <Clock className="w-4 h-4 text-emerald-200" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
