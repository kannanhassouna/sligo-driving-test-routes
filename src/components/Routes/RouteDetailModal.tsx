import React, { useState } from 'react';
import type { TestRoute } from '../../types/route';
import { 
  X, Navigation, ExternalLink, Download, AlertTriangle, 
  CheckCircle2, Clock, Route as RouteIcon, Volume2, Copy, Check 
} from 'lucide-react';
import { downloadRouteGpx } from '../../utils/navigationLinks';

interface RouteDetailModalProps {
  route: TestRoute | null;
  onClose: () => void;
  onPlayAudio: (route: TestRoute) => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ route, onClose, onPlayAudio }) => {
  const [copied, setCopied] = useState(false);

  if (!route) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(route.googleMapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Route {route.routeNumber}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {route.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-700/40">
                {route.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{route.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{route.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-slate-800/60 p-3 sm:px-6 border-b border-slate-700/50 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <RouteIcon className="w-4 h-4 text-blue-400" />
              {route.distanceKm} km
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-emerald-400" />
              ~{route.estimatedTimeMin} mins
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onPlayAudio(route);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white shadow-sm transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Audio Examiner
            </button>

            <button
              onClick={() => downloadRouteGpx(route)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition"
              title="Download GPX File for GPS/Garmin/OsmAnd"
            >
              <Download className="w-3.5 h-3.5" />
              GPX
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>

        {/* Primary Navigation Launchers */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={route.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md transition group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold">Start in Google Maps</div>
                <div className="text-[11px] text-blue-100 opacity-90">Open full multi-point navigation</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition" />
          </a>

          <a
            href={route.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-medium border border-slate-600 shadow-md transition group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold">Start in Apple Maps</div>
                <div className="text-[11px] text-slate-300">Direct iPhone / Mac Maps app</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
          </a>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Overview & Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Route Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{route.overview}</p>
            
            <div className="mt-3 flex flex-wrap gap-1.5">
              {route.areasCovered.map((area, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Examiner Warnings */}
          {route.examinerWarnings.length > 0 && (
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                Examiner Watchpoints & Common Sligo Failure Traps
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-amber-200/90 list-disc list-inside">
                {route.examinerWarnings.map((w, idx) => (
                  <li key={idx} className="leading-snug">{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Maneuvers Tested */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Maneuvers Tested on this Route</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {route.maneuversTested.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="font-medium">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Turn-by-Turn Cue Sheet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Step-by-Step Cue Sheet ({route.turnByTurn.length} Steps)
              </h3>
              <span className="text-xs text-slate-400">Follows official RSA sequence</span>
            </div>

            <div className="space-y-3">
              {route.turnByTurn.map((t) => (
                <div key={t.step} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {t.step}
                      </span>
                      <span className="font-semibold text-white">{t.streetName}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-700 flex-shrink-0">
                      {t.speedLimit} km/h
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm ml-8 mb-2">{t.instruction}</p>

                  {t.laneGuidance && (
                    <div className="ml-8 text-xs text-blue-300/90 bg-blue-950/30 border border-blue-800/40 rounded p-1.5 mb-1.5">
                      <span className="font-semibold text-blue-400">Lane guidance: </span>{t.laneGuidance}
                    </div>
                  )}

                  {t.maneuverNotice && (
                    <div className="ml-8 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/50 rounded p-1.5 mb-1.5">
                      <span className="font-semibold text-purple-400">Maneuver: </span>{t.maneuverNotice}
                    </div>
                  )}

                  {t.hazardAlert && (
                    <div className="ml-8 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 rounded p-1.5">
                      <span className="font-semibold text-amber-400">Warning: </span>{t.hazardAlert}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
