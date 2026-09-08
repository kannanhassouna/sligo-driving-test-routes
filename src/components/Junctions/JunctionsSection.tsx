import React from 'react';
import { SLIGO_TRICKY_JUNCTIONS } from '../../data/sligoRoutes';
import { 
  AlertTriangle, Navigation, MapPin, 
  ArrowRightCircle, ShieldAlert 
} from 'lucide-react';

interface JunctionsSectionProps {
  isLargeText?: boolean;
}

export const JunctionsSection: React.FC<JunctionsSectionProps> = ({ isLargeText }) => {
  return (
    <section className="space-y-6">
      {/* Intro header */}
      <div className="bg-white border-3 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 text-sm font-black uppercase tracking-wider mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Sligo Road Hazards & Complex Junctions</span>
        </div>
        <h2 className={`font-black text-slate-900 tracking-tight leading-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          Sligo Roundabouts & Tricky Junctions
        </h2>
        <p className={`text-slate-700 leading-relaxed max-w-3xl ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          Sligo has multiple busy multi-lane roundabouts, fast N4 dual carriageway slip roads, and tight blind junctions. 
          Knowing which lane to pick before you enter makes the driving test much easier and prevents sudden lane-change faults.
        </p>
      </div>

      {/* Junction Cards */}
      <div className="space-y-6">
        {SLIGO_TRICKY_JUNCTIONS.map((j) => (
          <article 
            key={j.id}
            className="bg-white border-3 border-slate-300 hover:border-amber-500 rounded-2xl p-6 sm:p-8 shadow-sm transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-black uppercase tracking-wide border ${
                    j.difficulty === 'Critical'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {j.difficulty} Risk
                  </span>
                  <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    {j.locationName}
                  </span>
                </div>
                <h3 className={`font-black text-slate-900 tracking-tight leading-snug ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                  {j.name}
                </h3>
              </div>

              {/* Navigation CTAs */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
                <a
                  href={j.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm sm:text-base font-bold shadow transition"
                >
                  <Navigation className="w-4 h-4" />
                  Google Maps
                </a>

                <a
                  href={j.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm sm:text-base font-bold transition"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  Apple Maps
                </a>
              </div>
            </div>

            {/* Plain explanation */}
            <p className={`text-slate-800 leading-relaxed mb-4 ${isLargeText ? 'text-lg' : 'text-base'}`}>
              {j.summary}
            </p>

            {/* Recommended Lane Guidance */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 mb-4">
              <div className="flex items-center gap-2 text-blue-900 font-black text-sm sm:text-base mb-1.5">
                <ArrowRightCircle className="w-5 h-5 text-blue-700" />
                Correct Lane & Indicator Rules:
              </div>
              <p className={`text-blue-950 font-bold leading-relaxed ${isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                {j.recommendedLane}
              </p>
            </div>

            {/* Examiner Watchpoints */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm sm:text-base mb-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                What examiners watch for (Avoid test marks):
              </div>
              <ul className={`space-y-1.5 text-amber-950 list-disc list-inside ${isLargeText ? 'text-base' : 'text-sm sm:text-base'}`}>
                {j.examinerWatchpoints.map((pt, idx) => (
                  <li key={idx} className="font-medium">{pt}</li>
                ))}
              </ul>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
};
