import React from 'react';
import type { TestRoute } from '../../types/route';
import { 
  Navigation, ExternalLink, Download, Clock, Route as RouteIcon, 
  ListOrdered, Volume2, ShieldCheck 
} from 'lucide-react';
import { RoutePathSchematic } from './RoutePathSchematic';
import { downloadRouteGpx } from '../../utils/navigationLinks';

interface RouteCardProps {
  route: TestRoute;
  onSelectRoute: (route: TestRoute) => void;
  onPlayAudio: (route: TestRoute) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onSelectRoute, onPlayAudio }) => {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Moderate':
        return 'bg-blue-950/80 text-blue-300 border-blue-700/50';
      case 'Challenging':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/50';
      case 'Advanced':
        return 'bg-red-950/80 text-red-300 border-red-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white shadow-sm">
              Route {route.routeNumber}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getDifficultyBadge(route.difficulty)}`}>
              {route.difficulty}
            </span>
          </div>

          <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
            {route.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
          {route.title}
        </h2>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{route.subtitle}</p>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mt-3 py-2 px-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <RouteIcon className="w-3.5 h-3.5 text-blue-400" />
            {route.distanceKm} km
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            ~{route.estimatedTimeMin} mins
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1 text-purple-300 font-medium truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            {route.maneuversTested.join(', ')}
          </span>
        </div>

        {/* Route Path Flow Schematic */}
        <RoutePathSchematic waypoints={route.waypoints} color={route.color} />

        {/* Overview snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {route.overview}
        </p>

        {/* Speed Zones Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {route.speedZones.map((zone, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/60">
              {zone}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
        {/* Primary Redirect to Google Maps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={route.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md transition group/btn text-center"
          >
            <Navigation className="w-4 h-4 text-white group-hover/btn:rotate-12 transition-transform" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
          </a>

          <a
            href={route.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition group/btn text-center"
          >
            <Navigation className="w-4 h-4 text-emerald-400 group-hover/btn:rotate-12 transition-transform" />
            <span>Open in Apple Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Secondary Auxiliary Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => onSelectRoute(route)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
          >
            <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
            Turn Cues ({route.turnByTurn.length})
          </button>

          <button
            onClick={() => onPlayAudio(route)}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-pink-950/50 hover:bg-pink-900/60 border border-pink-700/40 text-xs font-medium text-pink-300 transition"
            title="Listen to spoken audio examiner for this route"
          >
            <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            Audio
          </button>

          <button
            onClick={() => downloadRouteGpx(route)}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            title="Download GPX route file for car GPS/navigation apps"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            GPX
          </button>
        </div>
      </div>
    </div>
  );
};
