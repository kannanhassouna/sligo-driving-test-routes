import React, { useState } from 'react';
import type { TestRoute } from '../../types/route';
import { 
  X, Navigation, Download, AlertTriangle, 
  CheckCircle2, Clock, Route as RouteIcon, Volume2, Copy, Check 
} from 'lucide-react';
import { downloadRouteGpx } from '../../utils/navigationLinks';

interface RouteDetailModalProps {
  route: TestRoute | null;
  onClose: () => void;
  onPlayAudio: (route: TestRoute) => void;
  isLargeText?: boolean;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ 
  route, 
  onClose, 
  onPlayAudio,
  isLargeText 
}) => {
  const [copied, setCopied] = useState(false);

  if (!route) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(route.googleMapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white border-3 border-slate-300 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b-2 border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg text-sm font-black bg-blue-700 text-white uppercase">
                Route {route.routeNumber}
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-bold bg-slate-200 text-slate-800">
                {route.difficulty}
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                {route.badge}
              </span>
            </div>
            <h2 className={`font-black text-slate-900 tracking-tight leading-tight ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              {route.title}
            </h2>
            <p className="text-base text-slate-600 font-medium mt-1">{route.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-slate-100 p-4 sm:px-6 border-b-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-base font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <RouteIcon className="w-5 h-5 text-blue-700" />
              {route.distanceKm} km
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-emerald-700" />
              About {route.estimatedTimeMin} mins
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onPlayAudio(route);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-rose-700 hover:bg-rose-800 text-white shadow transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </button>

            <button
              onClick={() => downloadRouteGpx(route)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              GPX File
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Primary Navigation Launchers */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={route.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-black text-base shadow transition"
          >
            <Navigation className="w-5 h-5" />
            <span>Open in Google Maps</span>
          </a>

          <a
            href={route.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow transition"
          >
            <Navigation className="w-5 h-5 text-emerald-400" />
            <span>Open in Apple Maps</span>
          </a>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overview & Areas */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2">Route Overview</h3>
            <p className={`text-slate-800 leading-relaxed ${isLargeText ? 'text-lg' : 'text-base'}`}>{route.overview}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {route.areasCovered.map((area, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-sm font-bold bg-slate-100 text-slate-800 border border-slate-300">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Examiner Warnings */}
          {route.examinerWarnings.length > 0 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
              <div className="flex items-center gap-2 text-amber-900 font-black text-base mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
                Examiner Watchpoints for Sligo
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-amber-950 list-disc list-inside">
                {route.examinerWarnings.map((w, idx) => (
                  <li key={idx} className="font-medium">{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Maneuvers Tested */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2">Maneuvers Tested</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {route.maneuversTested.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-300 text-purple-950 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-purple-700 flex-shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cue Sheet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">
                Road-by-Road Instructions ({route.turnByTurn.length} Steps)
              </h3>
            </div>

            <div className="space-y-3">
              {route.turnByTurn.map((t) => (
                <div key={t.step} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                        {t.step}
                      </span>
                      <strong className="text-base text-slate-900">{t.streetName}</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-800 border border-slate-300">
                      {t.speedLimit} km/h
                    </span>
                  </div>

                  <p className="text-slate-800 text-sm sm:text-base ml-9 leading-relaxed">{t.instruction}</p>

                  {t.laneGuidance && (
                    <div className="ml-9 mt-2 text-sm text-blue-950 bg-blue-50 border border-blue-200 rounded-lg p-2 font-semibold">
                      <span>Lane note: </span>{t.laneGuidance}
                    </div>
                  )}

                  {t.hazardAlert && (
                    <div className="ml-9 mt-2 text-sm text-amber-950 bg-amber-50 border border-amber-300 rounded-lg p-2 font-semibold">
                      <span>Watch out: </span>{t.hazardAlert}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-base font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
