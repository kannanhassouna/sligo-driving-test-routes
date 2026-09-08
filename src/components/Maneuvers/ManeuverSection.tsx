import React, { useState } from 'react';
import { SLIGO_MANEUVER_SPOTS } from '../../data/sligoRoutes';
import { Navigation, MapPin, CheckCircle2, AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';

interface ManeuverSectionProps {
  isLargeText?: boolean;
}

export const ManeuverSection: React.FC<ManeuverSectionProps> = ({ isLargeText }) => {
  const [filter, setFilter] = useState<'all' | 'reverse_corner' | 'turnabout' | 'hill_start'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSpots = SLIGO_MANEUVER_SPOTS.filter(s => {
    if (filter === 'all') return true;
    return s.type === filter;
  });

  return (
    <section className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border-3 border-purple-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className={`font-black text-slate-900 tracking-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          Sligo Driving Maneuver Practice Locations
        </h2>
        <p className={`text-slate-700 leading-relaxed max-w-3xl mb-4 ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          In the Sligo driving test, examiners will ask you to perform a <strong>Hill Start</strong>, a <strong>Reverse Around a Corner</strong>, and a <strong>Turnabout (3-point turn)</strong>.
          Choose any location below to get instant driving directions straight there in Google Maps or Apple Maps.
        </p>

        {/* Big Simple Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              filter === 'all'
                ? 'bg-purple-700 text-white border-purple-800 shadow'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Show All Spots ({SLIGO_MANEUVER_SPOTS.length})
          </button>
          <button
            onClick={() => setFilter('reverse_corner')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              filter === 'reverse_corner'
                ? 'bg-purple-700 text-white border-purple-800 shadow'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Reverse Corner
          </button>
          <button
            onClick={() => setFilter('hill_start')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              filter === 'hill_start'
                ? 'bg-purple-700 text-white border-purple-800 shadow'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Hill Starts
          </button>
          <button
            onClick={() => setFilter('turnabout')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              filter === 'turnabout'
                ? 'bg-purple-700 text-white border-purple-800 shadow'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Turnabouts (3-Point)
          </button>
        </div>
      </div>

      {/* Maneuvers Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpots.map((spot) => {
          const isExpanded = expandedId === spot.id;

          return (
            <article 
              key={spot.id} 
              className="bg-white border-3 border-slate-300 hover:border-purple-600 rounded-2xl p-6 sm:p-8 shadow-sm transition flex flex-col justify-between"
            >
              <div>
                {/* Title */}
                <h3 className={`font-black text-slate-900 tracking-tight mb-1 ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                  {spot.title}
                </h3>
                
                {/* Location text */}
                <p className="text-sm sm:text-base font-bold text-purple-800 flex items-center gap-1.5 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-purple-700" />
                  <span>{spot.locationName}</span>
                </p>

                {/* Description */}
                <p className={`text-slate-700 leading-relaxed mb-4 ${isLargeText ? 'text-lg' : 'text-base'}`}>
                  {spot.description}
                </p>

                {/* Collapsible Advice */}
                <div className="border-t border-slate-200 pt-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : spot.id)}
                    className="flex items-center justify-between w-full text-left py-2 font-bold text-purple-800 hover:text-purple-900 text-sm sm:text-base transition"
                  >
                    <span>{isExpanded ? 'Hide Driving Advice' : 'Show Driving Advice & Common Mistakes'}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-4 pt-2 border-t border-slate-200 animate-fadeIn">
                      {/* What to do */}
                      <div className="p-4 rounded-xl bg-green-50 border border-green-300">
                        <div className="font-black text-green-900 flex items-center gap-2 mb-2 text-base">
                          <CheckCircle2 className="w-5 h-5 text-green-700" />
                          How to pass this maneuver:
                        </div>
                        <ul className="space-y-2 text-green-950 list-disc list-inside text-sm sm:text-base">
                          {spot.examinerTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Common mistakes */}
                      <div className="p-4 rounded-xl bg-red-50 border border-red-300">
                        <div className="font-black text-red-900 flex items-center gap-2 mb-2 text-base">
                          <AlertOctagon className="w-5 h-5 text-red-700" />
                          Mistakes that cause a test fail:
                        </div>
                        <ul className="space-y-2 text-red-950 list-disc list-inside text-sm sm:text-base">
                          {spot.commonFaults.map((fault, i) => (
                            <li key={i}>{fault}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Big Direct Navigation Buttons */}
              <div className="mt-6 pt-4 border-t-2 border-slate-200 space-y-2">
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm sm:text-base shadow transition text-center"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Drive here in Google Maps</span>
                </a>

                <a
                  href={spot.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base transition text-center"
                >
                  <Navigation className="w-5 h-5 text-emerald-400" />
                  <span>Drive here in Apple Maps</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
