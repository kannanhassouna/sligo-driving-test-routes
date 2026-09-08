import React from 'react';
import type { Waypoint } from '../../types/route';
import { MapPin, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoutePathSchematicProps {
  waypoints: Waypoint[];
  color?: string;
}

export const RoutePathSchematic: React.FC<RoutePathSchematicProps> = ({ waypoints }) => {
  // Show key waypoints along the line
  const displayedWaypoints = waypoints.slice(0, 6);

  return (
    <div className="w-full bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 my-3">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">Route Waypoint Flow</span>
        <span className="text-[11px] text-slate-400">Total Waypoints: {waypoints.length}</span>
      </div>
      
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {displayedWaypoints.map((w, idx) => {
          const isStart = idx === 0;
          const isLast = idx === displayedWaypoints.length - 1;
          const isManeuver = w.type === 'maneuver';
          const isHazard = w.type === 'hazard';

          return (
            <React.Fragment key={w.id || idx}>
              <div 
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                  isManeuver 
                    ? 'bg-purple-950/70 border-purple-500/50 text-purple-200'
                    : isHazard
                    ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                    : isStart
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {isStart && <MapPin className="w-3.5 h-3.5 text-emerald-400" />}
                {isManeuver && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                {isHazard && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                <span className="truncate max-w-[130px]">{w.name}</span>
                {w.speedLimit && (
                  <span className="ml-1 text-[10px] px-1 py-0.2 rounded bg-slate-800 font-mono text-slate-300 border border-slate-700">
                    {w.speedLimit}k
                  </span>
                )}
              </div>
              {!isLast && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
        {waypoints.length > 6 && (
          <div className="flex-shrink-0 px-2 py-1 text-xs text-slate-400 italic">
            +{waypoints.length - 6} more
          </div>
        )}
      </div>
    </div>
  );
};
