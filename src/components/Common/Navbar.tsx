import React from 'react';
import { Compass, MapPin, Navigation, Car, AlertTriangle, BookOpen, Volume2, ExternalLink } from 'lucide-react';
import { SLIGO_TEST_CENTRE } from '../../data/sligoRoutes';

interface NavbarProps {
  activeTab: 'routes' | 'maneuvers' | 'junctions' | 'prep' | 'audio';
  setActiveTab: (tab: 'routes' | 'maneuvers' | 'junctions' | 'prep' | 'audio') => void;
  selectedRouteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, selectedRouteCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Sligo Test Centre Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('routes')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl shadow-inner">
              <span className="text-red-500 font-black text-2xl">L</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">Sligo Driving Test Routes</h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  RSA Carraroe
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                Seamus McDaniel Motorcycles, Cuilbeg &bull; <span className="font-mono text-emerald-400">{SLIGO_TEST_CENTRE.eircode}</span>
              </p>
            </div>
          </div>

          {/* Quick External Launch directly to Test Centre */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={SLIGO_TEST_CENTRE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Open Sligo RSA Test Centre in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              Test Centre on Google Maps
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'routes'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            Test Routes ({selectedRouteCount})
          </button>

          <button
            onClick={() => setActiveTab('maneuvers')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'maneuvers'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            Maneuver Spots (Crozon, Caltragh...)
          </button>

          <button
            onClick={() => setActiveTab('junctions')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'junctions'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Tricky Junctions & Roundabouts
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'prep'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            RSA Prep & Under the Bonnet
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'audio'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Audio Examiner Mode
          </button>
        </nav>
      </div>
    </header>
  );
};
