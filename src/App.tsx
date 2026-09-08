import { useState, useEffect } from 'react';
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
  const [isLargeText, setIsLargeText] = useState(false);

  // Sync isLargeText class to <html> element
  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isLargeText={isLargeText}
        setIsLargeText={setIsLargeText}
      />

      {/* Hero Banner with Clear Test Centre Info */}
      <div className="bg-white border-b-2 border-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-green-100 text-green-900 border border-green-300 mb-2">
                <span>✓</span>
                Official RSA Sligo Driving Test Routes
              </div>
              <h1 className={`font-black text-slate-900 tracking-tight leading-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
                Sligo Driving Test Routes
              </h1>
              <p className={`text-slate-700 leading-relaxed ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                Practice all 6 official driving test routes starting from the RSA test bays at{' '}
                <strong className="text-slate-900 underline decoration-red-500 decoration-2">
                  Seamus McDaniel Motorcycles Ltd, Cuilbeg, Carraroe (F91 N267)
                </strong>. 
                Tap below to open any route directly in Google Maps or Apple Maps with step-by-step guidance.
              </p>
            </div>

            {/* Quick Test Centre Card */}
            <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-5 shadow-sm flex-shrink-0 w-full lg:w-96">
              <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Test Centre Starting Location</span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900">Seamus McDaniel Motorcycles Ltd</div>
              <div className="text-sm sm:text-base text-slate-700 mt-0.5">Cuilbeg, Carraroe, Co. Sligo</div>
              <div className="text-sm font-black text-blue-800 font-mono mt-1">Eircode: F91 N267</div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={SLIGO_TEST_CENTRE.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-bold shadow transition text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={SLIGO_TEST_CENTRE.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow transition text-center"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        
        {/* Tab 1: Test Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            
            {/* Search & Maneuver Filter Bar */}
            <div className="bg-white border-3 border-slate-300 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search areas (e.g. Caltragh, Cleveragh, Crozon, Gallows Hill)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-sm font-bold text-slate-600 hidden sm:inline">Filter:</span>
                <button
                  onClick={() => setSelectedManeuverFilter('all')}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap border-2 ${
                    selectedManeuverFilter === 'all'
                      ? 'bg-blue-700 text-white border-blue-800 shadow'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  All Routes ({SLIGO_TEST_ROUTES.length})
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Reverse')}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap border-2 ${
                    selectedManeuverFilter === 'Reverse'
                      ? 'bg-purple-700 text-white border-purple-800 shadow'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Reverse Corner
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Hill Start')}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap border-2 ${
                    selectedManeuverFilter === 'Hill Start'
                      ? 'bg-amber-600 text-white border-amber-700 shadow'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Hill Start
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Turnabout')}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap border-2 ${
                    selectedManeuverFilter === 'Turnabout'
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Turnabout
                </button>
              </div>
            </div>

            {/* Routes Grid */}
            {filteredRoutes.length === 0 ? (
              <div className="bg-white border-3 border-slate-300 rounded-2xl p-12 text-center">
                <p className="text-slate-600 text-base font-medium">No driving test routes match your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedManeuverFilter('all'); }}
                  className="mt-4 px-6 py-3 bg-blue-700 text-white text-base font-bold rounded-xl hover:bg-blue-800 transition"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onPlayAudio={handlePlayAudioFromCard}
                    isLargeText={isLargeText}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Sligo Maneuver Hotspots */}
        {activeTab === 'maneuvers' && <ManeuverSection isLargeText={isLargeText} />}

        {/* Tab 3: Tricky Junctions */}
        {activeTab === 'junctions' && <JunctionsSection isLargeText={isLargeText} />}

        {/* Tab 4: RSA Test Prep & Questions */}
        {activeTab === 'prep' && <RsaSection isLargeText={isLargeText} />}

        {/* Tab 5: Audio Examiner Player */}
        {activeTab === 'audio' && (
          <ExaminerAudioPlayer 
            initialRoute={audioTargetRoute} 
            isLargeText={isLargeText}
          />
        )}

      </main>

      {/* Turn-by-Turn Detail Modal */}
      {activeModalRoute && (
        <RouteDetailModal
          route={activeModalRoute}
          onClose={() => setActiveModalRoute(null)}
          onPlayAudio={handlePlayAudioFromCard}
          isLargeText={isLargeText}
        />
      )}

      {/* Senior-Friendly Footer */}
      <footer className="mt-auto border-t-2 border-slate-300 bg-white py-8 text-sm text-slate-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <strong className="text-slate-900">Sligo Driving Test Routes Explorer</strong> &bull; Free learning guide for the RSA Sligo Driving Test Centre.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>Starting Hub: Seamus McDaniel Motorcycles, Cuilbeg, Carraroe (F91 N267)</span>
            <span>&bull;</span>
            <a 
              href="https://www.rsa.ie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-700 font-bold hover:underline"
            >
              Official RSA Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
