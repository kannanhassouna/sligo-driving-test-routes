import React from 'react';
import { SLIGO_TRICKY_JUNCTIONS } from '../../data/sligoRoutes';
import { AlertTriangle, Navigation, MapPin, ArrowRightCircle, ShieldAlert } from 'lucide-react';

export const JunctionsSection: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Lane Choice & Roundabout Navigation</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Sligo Roundabouts & Complex Junctions
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Quick lane rules for Sligo’s busiest roundabouts and N4 slip roads to prevent hesitation and late lane changes on your test.
        </p>
      </div>

      {/* Junction Cards */}
      <div className="space-y-4">
        {SLIGO_TRICKY_JUNCTIONS.map((j) => (
          <div 
            key={j.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-amber-400 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                    j.difficulty === 'Critical'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {j.difficulty} Risk
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {j.locationName}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {j.name}
                </h3>
              </div>

              {/* Navigation CTA */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <a
                  href={j.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              {j.summary}
            </p>

            {/* Lane Guidance */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 mb-2.5">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs mb-0.5">
                <ArrowRightCircle className="w-4 h-4 text-blue-600" />
                Correct Lane & Indicator:
              </div>
              <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                {j.recommendedLane}
              </p>
            </div>

            {/* Examiner Watchpoints */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                What the examiner watches for:
              </div>
              <ul className="space-y-0.5 text-xs text-amber-950 list-disc list-inside">
                {j.examinerWatchpoints.map((pt, idx) => (
                  <li key={idx} className="font-medium">{pt}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
