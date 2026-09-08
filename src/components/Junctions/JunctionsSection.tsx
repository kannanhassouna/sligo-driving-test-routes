import React from 'react';
import { SLIGO_TRICKY_JUNCTIONS } from '../../data/sligoRoutes';
import { 
  AlertTriangle, Navigation, ExternalLink, MapPin, 
  ArrowRightCircle, ShieldAlert 
} from 'lucide-react';

export const JunctionsSection: React.FC = () => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Critical':
        return 'bg-red-950/80 text-red-300 border-red-700/60';
      case 'High':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
    }
  };

  return (
    <section className="space-y-6">
      {/* Intro header */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4" />
          Sligo Road Hazards & Complex Junctions
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          How to Navigate Sligo’s Hardest Roundabouts & Turns
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Sligo is known for multi-lane roundabouts, fast N4 slip road mergers, and blind urban junctions. 
          Mastering lane selection and mirror-signal-maneuver timing at these 5 critical hotspots will dramatically raise your pass probability.
        </p>
      </div>

      {/* Junction Cards */}
      <div className="space-y-5">
        {SLIGO_TRICKY_JUNCTIONS.map((j) => (
          <div 
            key={j.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xl transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getDifficultyColor(j.difficulty)}`}>
                    {j.difficulty} Risk
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {j.locationName}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{j.name}</h3>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center gap-2 self-start">
                <a
                  href={j.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>

                <a
                  href={j.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  Apple Maps
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {j.summary}
            </p>

            {/* Recommended Lane Guidance */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 mb-3">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
                <ArrowRightCircle className="w-4 h-4" />
                Recommended Lane & Signaling Rule:
              </div>
              <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed font-mono">
                {j.recommendedLane}
              </p>
            </div>

            {/* Examiner Watchpoints */}
            <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-3.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1.5">
                <ShieldAlert className="w-4 h-4" />
                Examiner Watchpoints (Avoid Instant Grade 2/3 Faults):
              </div>
              <ul className="space-y-1 text-xs text-amber-200/90 list-disc list-inside">
                {j.examinerWatchpoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
