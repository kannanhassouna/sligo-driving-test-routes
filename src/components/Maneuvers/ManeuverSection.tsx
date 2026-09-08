import React, { useState } from 'react';
import { SLIGO_MANEUVER_SPOTS } from '../../data/sligoRoutes';
import { 
  Navigation, ExternalLink, ShieldCheck, AlertOctagon, CheckCircle2, 
  MapPin, ChevronDown, ChevronUp, RotateCcw, Mountain, Car 
} from 'lucide-react';

export const ManeuverSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'reverse_corner' | 'turnabout' | 'hill_start'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSpots = SLIGO_MANEUVER_SPOTS.filter(s => {
    if (filter === 'all') return true;
    return s.type === filter;
  });

  const getManeuverIcon = (type: string) => {
    switch (type) {
      case 'reverse_corner':
        return <RotateCcw className="w-4 h-4 text-purple-400" />;
      case 'hill_start':
        return <Mountain className="w-4 h-4 text-amber-400" />;
      case 'turnabout':
        return <Car className="w-4 h-4 text-blue-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section className="space-y-6">
      {/* Introduction banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              Sligo RSA Test Maneuvers Hotspots
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Direct Navigation to Sligo Maneuver Practice Locations
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              In Sligo, examiners take candidates to specific housing estates and hills for the required maneuvers. 
              Tap any spot below to navigate directly there in <strong>Google Maps</strong> or <strong>Apple Maps</strong> to practice!
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Spots ({SLIGO_MANEUVER_SPOTS.length})
            </button>
            <button
              onClick={() => setFilter('reverse_corner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'reverse_corner'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Reverse Corner
            </button>
            <button
              onClick={() => setFilter('hill_start')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'hill_start'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Hill Starts
            </button>
            <button
              onClick={() => setFilter('turnabout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'turnabout'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Turnabouts (3-Point)
            </button>
          </div>
        </div>
      </div>

      {/* Maneuver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSpots.map((spot) => {
          const isExpanded = expandedId === spot.id;

          return (
            <div 
              key={spot.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                      {getManeuverIcon(spot.type)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{spot.title}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {spot.locationName}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {spot.description}
                </p>

                {/* Collapsible details for Examiner Tips & Common Faults */}
                <div className="mt-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : spot.id)}
                    className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium py-1 transition"
                  >
                    <span>{isExpanded ? 'Hide Examiner Tips & Faults' : 'View Sligo Examiner Tips & Fail Traps'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-3 pt-3 border-t border-slate-800 text-xs animate-fadeIn">
                      {/* Examiner Tips */}
                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          How to Ace It (RSA Technique)
                        </div>
                        <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                          {spot.examinerTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Faults */}
                      <div className="bg-red-950/30 p-3 rounded-xl border border-red-900/40">
                        <div className="flex items-center gap-1.5 font-semibold text-red-400 mb-2">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          Common Sligo Grade 2 & 3 Failures
                        </div>
                        <ul className="space-y-1.5 text-red-200/90 list-disc list-inside">
                          {spot.commonFaults.map((fault, i) => (
                            <li key={i}>{fault}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>

                <a
                  href={spot.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  Apple Maps
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
