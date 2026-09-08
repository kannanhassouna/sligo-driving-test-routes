import React, { useState } from 'react';
import type { TestRoute } from '../../types/route';
import { Navigation, Clock, Route as RouteIcon, ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface RouteCardProps {
  route: TestRoute;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-600 text-white tracking-wide uppercase">
              Route {route.routeNumber}
            </span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {route.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{route.estimatedTimeMin}m
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <RouteIcon className="w-3.5 h-3.5 text-slate-400" />
              {route.distanceKm}km
            </span>
          </div>
        </div>

        {/* Route Title */}
        <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
          {route.title}
        </h2>

        {/* Subtitle / Key Areas */}
        <p className="text-xs text-slate-500 mt-0.5 mb-3">
          {route.subtitle}
        </p>

        {/* Maneuvers Tested Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {route.maneuversTested.map((m, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium"
            >
              <CheckCircle2 className="w-3 h-3 text-purple-600" />
              {m}
            </span>
          ))}
        </div>

        {/* Overview sentence */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {route.overview}
        </p>
      </div>

      {/* Action Row */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        {/* Navigation Button */}
        <div>
          <a
            href={route.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Steps Toggle */}
        <div className="pt-0.5">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
          >
            <span>{showSteps ? 'Hide turn-by-turn steps' : `View ${route.turnByTurn.length} turn-by-turn steps`}</span>
            {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Turn-by-Turn Steps Accordion */}
        {showSteps && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 max-h-72 overflow-y-auto pr-1 text-xs scrollbar-thin">
            <div className="text-slate-500 font-medium mb-1">Step-by-step turns:</div>
            {route.turnByTurn.map((t) => (
              <div 
                key={t.step} 
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                      {t.step}
                    </span>
                    <strong className="text-slate-900 font-semibold">{t.streetName}</strong>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {t.speedLimit} km/h
                  </span>
                </div>

                <p className="text-slate-700 pl-7 leading-relaxed">
                  {t.instruction}
                </p>

                {t.hazardAlert && (
                  <div className="ml-7 mt-1.5 p-1.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-start gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{t.hazardAlert}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
