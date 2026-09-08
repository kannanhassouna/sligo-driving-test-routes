import { useState } from 'react';
import { SLIGO_TEST_ROUTES, SLIGO_TEST_CENTRE } from './data/sligoRoutes';
import type { TestRoute } from './types/route';
import { Navbar } from './components/Common/Navbar';
import { RouteCard } from './components/Routes/RouteCard';
import { RouteDetailModal } from './components/Routes/RouteDetailModal';
import { ManeuverSection } from './components/Maneuvers/ManeuverSection';
import { JunctionsSection } from './components/Junctions/JunctionsSection';
import { RsaSection } from './components/RSA/RsaSection';
import { ExaminerAudioPlayer } from './components/Audio/ExaminerAudioPlayer';
import { Navigation, MapPin, Search } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'routes' | 'maneuvers' | 'junctions' | 'prep' | 'audio'>('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManeuverFilter, setSelectedManeuverFilter] = useState<string>('all');
  const [activeModalRoute, setActiveModalRoute] = useState<TestRoute | null>(null);
  const [audioTargetRoute, setAudioTargetRoute] = useState<TestRoute | undefined>(undefined);

  // Filter routes based on search and maneuver filter
  const filteredRoutes = SLIGO_TEST_ROUTES.filter((route) => {
    const matchesSearch = 
      route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.areasCovered.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesManeuver = 
      selectedManeuverFilter === 'all' || 
      route.maneuversTested.some(m => m.toLowerCase().includes(selectedManeuverFilter.toLowerCase()));

    return matchesSearch && matchesManeuver;
  });

  const handlePlayAudioFromCard = (route: TestRoute) => {
    setAudioTargetRoute(route);
    setActiveTab('audio');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedRouteCount={SLIGO_TEST_ROUTES.length} 
      />

      {/* Hero Banner with Quick Test Centre Navigation */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Updated with 2025/2026 RSA Sligo Test Clusters
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Sligo Driving Test Routes
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                Master the 6 official route families starting from the RSA Sligo Driving Test Centre bays at <strong className="text-white">Seamus McDaniel Motorcycles Ltd, Cuilbeg, Carraroe (F91 N267)</strong>. 
                Instant 1-tap driving directions in <span className="text-blue-400 font-semibold">Google Maps</span> and <span className="text-emerald-400 font-semibold">Apple Maps</span>, 
                exact maneuver spots, and virtual audio examiner instructions.
              </p>
            </div>

            {/* Quick Test Centre Card */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex-shrink-0 w-full lg:w-80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Test Centre Starting Hub
              </div>
              <div className="text-base font-bold text-white">Seamus McDaniel Motorcycles Ltd</div>
              <div className="text-xs text-slate-300 mt-0.5">Cuilbeg, Carraroe, Co. Sligo</div>
              <div className="text-xs text-emerald-400 font-mono font-semibold mt-0.5">Eircode: F91 N267</div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={SLIGO_TEST_CENTRE.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                </a>
                <a
                  href={SLIGO_TEST_CENTRE.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  Apple Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Tab 1: Test Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            {/* Search & Maneuver Filter Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search routes by area (e.g. Caltragh, Cleveragh, Crozon, Gallows Hill)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Filter:</span>
                <button
                  onClick={() => setSelectedManeuverFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    selectedManeuverFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Routes
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Reverse')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    selectedManeuverFilter === 'Reverse'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Reverse Corner
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Hill Start')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    selectedManeuverFilter === 'Hill Start'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Hill Start
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Turnabout')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    selectedManeuverFilter === 'Turnabout'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Turnabout
                </button>
              </div>
            </div>

            {/* Routes Grid */}
            {filteredRoutes.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
                <p className="text-slate-400 text-sm">No driving test routes match your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedManeuverFilter('all'); }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onSelectRoute={(r) => setActiveModalRoute(r)}
                    onPlayAudio={handlePlayAudioFromCard}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Sligo Maneuver Hotspots */}
        {activeTab === 'maneuvers' && <ManeuverSection />}

        {/* Tab 3: Tricky Junctions */}
        {activeTab === 'junctions' && <JunctionsSection />}

        {/* Tab 4: RSA Test Prep & Questions */}
        {activeTab === 'prep' && <RsaSection />}

        {/* Tab 5: Audio Examiner Player */}
        {activeTab === 'audio' && <ExaminerAudioPlayer initialRoute={audioTargetRoute} />}

      </main>

      {/* Turn-by-Turn Detail Modal */}
      {activeModalRoute && (
        <RouteDetailModal
          route={activeModalRoute}
          onClose={() => setActiveModalRoute(null)}
          onPlayAudio={handlePlayAudioFromCard}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-white font-semibold">Sligo Driving Test Routes Explorer</span> &bull; Unofficial student study resource for RSA Carraroe Centre.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>RSA Test Centre: Seamus McDaniel Motorcycles, Cuilbeg, Carraroe (F91 N267)</span>
            <span>&bull;</span>
            <a 
              href="https://www.rsa.ie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
            >
              RSA.ie Official Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
