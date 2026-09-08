import React, { useState } from 'react';
import { SLIGO_MANEUVER_SPOTS } from '../../data/sligoRoutes';
import { Navigation, MapPin, CheckCircle2, AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';

export const ManeuverSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'reverse_corner' | 'turnabout' | 'hill_start'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSpots = SLIGO_MANEUVER_SPOTS.filter(s => {
    if (filter === 'all') return true;
    return s.type === filter;
  });

  return (
    <div className="space-y-5">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Sligo Test Maneuver Locations
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Exact spots used by Sligo RSA examiners for Hill Starts, Reversing Around Corners, and Turnabouts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({SLIGO_MANEUVER_SPOTS.length})
          </button>
          <button
            onClick={() => setFilter('reverse_corner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'reverse_corner'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Reverse Corner
          </button>
          <button
            onClick={() => setFilter('hill_start')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'hill_start'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Hill Start
          </button>
          <button
            onClick={() => setFilter('turnabout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'turnabout'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Turnabout
          </button>
        </div>
      </div>

      {/* Maneuvers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSpots.map((spot) => {
          const isExpanded = expandedId === spot.id;

          return (
            <div 
              key={spot.id} 
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                    {spot.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    {spot.locationName}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {spot.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {spot.description}
                </p>

                {/* Collapsible Advice */}
                <div className="border-t border-slate-100 pt-2.5">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : spot.id)}
                    className="flex items-center justify-between w-full text-left py-1 text-xs font-semibold text-purple-700 hover:text-purple-900 transition"
                  >
                    <span>{isExpanded ? 'Hide examiner tips' : 'View examiner tips & faults to avoid'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 space-y-2.5 pt-1 text-xs animate-fadeIn">
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          How to pass:
                        </div>
                        <ul className="space-y-1 list-disc list-inside">
                          {spot.examinerTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-800">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          Common test fail reasons:
                        </div>
                        <ul className="space-y-1 list-disc list-inside">
                          {spot.commonFaults.map((fault, i) => (
                            <li key={i}>{fault}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={spot.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
