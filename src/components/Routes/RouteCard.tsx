import React, { useState } from 'react';
import type { TestRoute } from '../../types/route';
import { Navigation, Clock, Route as RouteIcon, ChevronDown, ChevronUp, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

interface RouteCardProps {
  route: TestRoute;
  onPlayAudio: (route: TestRoute) => void;
  isLargeText?: boolean;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPlayAudio, isLargeText }) => {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <article className="bg-white border-3 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-blue-600 transition-colors flex flex-col justify-between">
      
      {/* Route Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="px-4 py-1.5 rounded-lg text-sm sm:text-base font-black bg-blue-700 text-white tracking-wide uppercase">
            Route {route.routeNumber}
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-300">
            {route.difficulty} Difficulty
          </span>
        </div>

        {/* Route Title */}
        <h2 className={`font-black text-slate-900 tracking-tight leading-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          {route.title}
        </h2>

        {/* Clear Subtitle */}
        <p className={`font-medium text-slate-600 mb-4 ${isLargeText ? 'text-lg' : 'text-base'}`}>
          {route.subtitle}
        </p>

        {/* Quick Facts */}
        <div className="flex flex-wrap items-center gap-4 py-3 px-4 bg-slate-100 rounded-xl border border-slate-200 text-slate-800 font-bold mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-700" />
            <span className={isLargeText ? 'text-lg' : 'text-base'}>About {route.estimatedTimeMin} mins</span>
          </div>
          <span className="text-slate-400">&bull;</span>
          <div className="flex items-center gap-2">
            <RouteIcon className="w-5 h-5 text-blue-700" />
            <span className={isLargeText ? 'text-lg' : 'text-base'}>{route.distanceKm} km</span>
          </div>
        </div>

        {/* Main Test Maneuvers Highlights */}
        <div className="mb-5">
          <div className="text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-2">
            Maneuvers Tested on this Route:
          </div>
          <div className="flex flex-wrap gap-2">
            {route.maneuversTested.map((m, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-300 font-bold text-sm sm:text-base"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Plain Overview */}
        <p className={`text-slate-700 leading-relaxed mb-6 ${isLargeText ? 'text-lg' : 'text-base'}`}>
          {route.overview}
        </p>
      </div>

      {/* Primary Giant Action Buttons */}
      <div className="space-y-3 pt-4 border-t-2 border-slate-200">
        
        {/* Google Maps (Large, Clear, High Visibility) */}
        <a
          href={route.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-green-700 hover:bg-green-800 text-white font-black text-base sm:text-lg shadow-md transition text-center"
        >
          <Navigation className="w-6 h-6" />
          <span>Open Route in Google Maps</span>
        </a>

        {/* Apple Maps */}
        <a
          href={route.appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base sm:text-lg shadow transition text-center"
        >
          <Navigation className="w-6 h-6 text-emerald-400" />
          <span>Open Route in Apple Maps</span>
        </a>

        {/* Secondary controls: Toggle Turn Cues & Audio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base transition"
          >
            <span>{showSteps ? 'Hide Road-by-Road Steps' : 'View Road-by-Road Steps'}</span>
            {showSteps ? <ChevronUp className="w-5 h-5 text-slate-700" /> : <ChevronDown className="w-5 h-5 text-slate-700" />}
          </button>

          <button
            onClick={() => onPlayAudio(route)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-sm sm:text-base transition"
          >
            <Volume2 className="w-5 h-5 text-rose-700" />
            <span>Read Instructions Aloud</span>
          </button>

        </div>

        {/* Expandable Step-by-Step Directions directly in Card */}
        {showSteps && (
          <div className="mt-4 pt-4 border-t-2 border-slate-200 space-y-3 animate-fadeIn">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Road-by-Road Instructions ({route.turnByTurn.length} Steps):
            </h3>

            <div className="space-y-3">
              {route.turnByTurn.map((t) => (
                <div 
                  key={t.step} 
                  className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-700 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                        {t.step}
                      </span>
                      <strong className="text-base sm:text-lg text-slate-900">{t.streetName}</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs sm:text-sm font-bold bg-white text-slate-800 border border-slate-300">
                      {t.speedLimit} km/h
                    </span>
                  </div>

                  <p className={`text-slate-800 ml-11 leading-relaxed ${isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {t.instruction}
                  </p>

                  {t.hazardAlert && (
                    <div className="ml-11 mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-sm font-semibold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <span>{t.hazardAlert}</span>
                    </div>
                  )}

                  {t.maneuverNotice && (
                    <div className="ml-11 mt-2 p-2.5 rounded-lg bg-purple-50 border border-purple-300 text-purple-900 text-sm font-semibold flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
                      <span>{t.maneuverNotice}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
