import React from 'react';
import { Navigation, Car, AlertTriangle, BookOpen, HelpCircle } from 'lucide-react';
import { SLIGO_TEST_CENTRE } from '../../data/sligoRoutes';

interface NavbarProps {
  activeTab: 'routes' | 'maneuvers' | 'junctions' | 'theory' | 'prep';
  setActiveTab: (tab: 'routes' | 'maneuvers' | 'junctions' | 'theory' | 'prep') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Header Row */}
        <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div 
            onClick={() => setActiveTab('routes')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white border-2 border-red-600 rounded-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="text-red-600 font-black text-2xl select-none leading-none">L</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none">
                Sligo Driving Test Routes
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                RSA Centre: <span className="text-slate-700 font-medium">Seamus McDaniel Motorcycles, Carraroe (F91 N267)</span>
              </p>
            </div>
          </div>

          {/* Quick Direct Link to Test Centre */}
          <a
            href={SLIGO_TEST_CENTRE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition self-start sm:self-auto"
            title="Get driving directions to the test centre starting bays"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>Directions to Test Centre</span>
          </a>
        </div>

        {/* Clean Pill Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none text-sm">
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === 'routes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Test Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('maneuvers')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === 'maneuvers'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="text-sm">🔄</span>
            <span>Maneuvers</span>
          </button>

          <button
            onClick={() => setActiveTab('junctions')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === 'junctions'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Roundabouts</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === 'theory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Theory & Signs</span>
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === 'prep'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Under Bonnet & Checklist</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
