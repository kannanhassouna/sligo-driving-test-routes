import React, { useEffect } from 'react';
import type { TestRoute } from '../../types/route';
import { SLIGO_TEST_ROUTES } from '../../data/sligoRoutes';
import { SLIGO_ROUTE_STUDENT_TIPS } from '../../data/routeStudentTips';
import { 
  ArrowLeft, Navigation, Clock, Route as RouteIcon, 
  AlertTriangle, CheckCircle2, MapPin, Gauge, 
  Compass, ShieldAlert, CheckSquare, Sparkles 
} from 'lucide-react';

interface RouteDetailPageProps {
  route: TestRoute;
  onBack: () => void;
  onSelectRoute: (route: TestRoute) => void;
}

export const RouteDetailPage: React.FC<RouteDetailPageProps> = ({ 
  route, 
  onBack, 
  onSelectRoute 
}) => {
  const tips = SLIGO_ROUTE_STUDENT_TIPS[route.id] || SLIGO_ROUTE_STUDENT_TIPS['sligo-route-1'];

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route.id]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Navigation & Route Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Routes</span>
        </button>

        {/* Quick route selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-semibold mr-1 hidden md:inline">Switch:</span>
          {SLIGO_TEST_ROUTES.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectRoute(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                r.id === route.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Route {r.routeNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Route Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
                Route {route.routeNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {route.difficulty} Difficulty
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {route.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {route.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {route.subtitle}
            </p>
          </div>

          {/* Big Direct Google Maps Action Button */}
          <div className="self-start md:self-auto flex-shrink-0">
            <a
              href={route.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition"
            >
              <Navigation className="w-5 h-5" />
              <span>Drive Route in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Key Route Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 py-3 px-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <RouteIcon className="w-4 h-4 text-blue-600" />
            <span>{route.distanceKm} km Circuit</span>
          </div>
          <span className="text-slate-300">&bull;</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Approx. {route.estimatedTimeMin} mins</span>
          </div>
          <span className="text-slate-300">&bull;</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>Start: Seamus McDaniel Motorcycles, Carraroe (F91 N267)</span>
          </div>
        </div>

        {/* Overview Quote */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-0.5">
                Instructor Route Summary
              </strong>
              <p className="text-sm font-medium leading-relaxed">
                &ldquo;{tips.summaryQuote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Examiner Focus & Speed Traps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: What Examiner Grades on this Route */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Key Focus Areas</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              What the Examiner Tests on Route {route.routeNumber}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {tips.examinerFocus.map((focus, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{focus}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Speed Traps & Speed Zone Changes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Gauge className="w-4 h-4" />
              <span>Speed Traps</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Speed Limits & Critical Speed Traps
            </h2>
            <div className="space-y-2.5">
              {tips.speedTraps.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs sm:text-sm">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-slate-900 font-bold">{st.location}</strong>
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[11px] font-bold">
                      {st.speedLimit}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">{st.warning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Maneuver Master Guide for this Route */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Maneuver Master Guide</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {tips.maneuverGuide.maneuverName}: {tips.maneuverGuide.location}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow this step-by-step checklist to ensure a clean Grade 0 on your maneuver.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step-by-Step Procedure:
            </h3>
            <div className="space-y-2">
              {tips.maneuverGuide.stepByStepInstructions.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm space-y-3 self-start">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Avoid These Fail Mistakes:</span>
            </div>
            <ul className="space-y-2 text-amber-950 list-disc list-inside">
              {tips.maneuverGuide.commonFailReasons.map((reason, i) => (
                <li key={i} className="leading-snug">{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Critical Roundabouts & Junctions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Junction & Roundabout Guidance</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Critical Junctions on Route {route.routeNumber}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.criticalJunctions.map((j, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900 text-base">{j.name}</h3>
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 font-medium">
                <span className="font-bold text-blue-900">Lane to take: </span>
                {j.approachLane}
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                <strong className="text-slate-900">Examiner check: </strong>
                {j.examinerCheck}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Pass Checklist for This Route */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <CheckSquare className="w-4 h-4" />
          <span>Pre-Drive Memory Checklist</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          5 Golden Rules to Pass Route {route.routeNumber}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tips.studentPassChecklist.map((rule, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span className="font-semibold leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Turn-by-Turn Driving Steps Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Turn-by-Turn Driving Directions ({route.turnByTurn.length} Steps)
            </h2>
            <p className="text-xs text-slate-500">Official sequential order from start bay to finish</p>
          </div>

          <a
            href={route.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="space-y-2.5 pt-2">
          {route.turnByTurn.map((t) => (
            <div key={t.step} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {t.step}
                  </span>
                  <strong className="text-sm sm:text-base text-slate-900">{t.streetName}</strong>
                </div>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-mono text-xs font-bold border border-slate-200">
                  {t.speedLimit} km/h
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 pl-8 leading-relaxed mb-1">
                {t.instruction}
              </p>

              {t.laneGuidance && (
                <div className="ml-8 mt-1.5 text-xs text-blue-900 bg-blue-50 border border-blue-200 rounded-lg p-2 font-medium">
                  <strong>Lane: </strong>{t.laneGuidance}
                </div>
              )}

              {t.hazardAlert && (
                <div className="ml-8 mt-1.5 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-2 font-medium">
                  <strong>Notice: </strong>{t.hazardAlert}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Back Button & Google Maps CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Routes</span>
        </button>

        <a
          href={route.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition"
        >
          <Navigation className="w-4 h-4" />
          <span>Launch Turn-by-Turn in Google Maps</span>
        </a>
      </div>

    </div>
  );
};
