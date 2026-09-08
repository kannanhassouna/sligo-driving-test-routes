import React from 'react';
import { MapPin, Navigation, Car, AlertTriangle, BookOpen, Volume2, ZoomIn, ZoomOut } from 'lucide-react';
import { SLIGO_TEST_CENTRE } from '../../data/sligoRoutes';

interface NavbarProps {
  activeTab: 'routes' | 'maneuvers' | 'junctions' | 'prep' | 'audio';
  setActiveTab: (tab: 'routes' | 'maneuvers' | 'junctions' | 'prep' | 'audio') => void;
  isLargeText: boolean;
  setIsLargeText: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isLargeText, 
  setIsLargeText 
}) => {
  return (
    <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div 
            onClick={() => setActiveTab('routes')}
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="w-14 h-14 bg-white border-4 border-red-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-red-600 font-black text-4xl select-none">L</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sligo Driving Test Routes
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-600 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Starts at: <strong>Seamus McDaniel Motorcycles</strong>, Cuilbeg, Carraroe (F91 N267)</span>
              </p>
            </div>
          </div>

          {/* Quick Buttons: Text Zoom & Direct Directions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLargeText(!isLargeText)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base transition cursor-pointer"
              title="Toggle bigger text for easier reading"
            >
              {isLargeText ? <ZoomOut className="w-5 h-5 text-blue-600" /> : <ZoomIn className="w-5 h-5 text-blue-600" />}
              <span>{isLargeText ? 'Standard Text' : 'Bigger Text (A+)'}</span>
            </button>

            <a
              href={SLIGO_TEST_CENTRE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm sm:text-base shadow transition"
            >
              <Navigation className="w-5 h-5" />
              Directions to Test Centre
            </a>
          </div>
        </div>

        {/* Big Simple Navigation Tabs */}
        <nav className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              activeTab === 'routes'
                ? 'bg-blue-700 text-white border-blue-800 shadow'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Car className="w-5 h-5 flex-shrink-0" />
            <span>1. Test Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('maneuvers')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              activeTab === 'maneuvers'
                ? 'bg-purple-700 text-white border-purple-800 shadow'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="text-xl">🔄</span>
            <span>2. Maneuvers</span>
          </button>

          <button
            onClick={() => setActiveTab('junctions')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              activeTab === 'junctions'
                ? 'bg-amber-600 text-white border-amber-700 shadow'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>3. Roundabouts</span>
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              activeTab === 'prep'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            <span>4. Under Bonnet</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition ${
              activeTab === 'audio'
                ? 'bg-rose-700 text-white border-rose-800 shadow'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Volume2 className="w-5 h-5 flex-shrink-0" />
            <span>5. Read Aloud</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
