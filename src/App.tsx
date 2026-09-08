import { useState } from 'react';
import { SLIGO_TEST_ROUTES, SLIGO_TEST_CENTRE } from './data/sligoRoutes';
import { Navbar } from './components/Common/Navbar';
import { RouteCard } from './components/Routes/RouteCard';
import { ManeuverSection } from './components/Maneuvers/ManeuverSection';
import { JunctionsSection } from './components/Junctions/JunctionsSection';
import { RsaSection } from './components/RSA/RsaSection';
import { MapPin, Search, Navigation } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'routes' | 'maneuvers' | 'junctions' | 'prep'>('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManeuverFilter, setSelectedManeuverFilter] = useState<string>('all');

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Sleek Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      {/* Clean Starting Hub Notice */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>
              All routes start from RSA bays at{' '}
              <strong className="text-slate-900">Seamus McDaniel Motorcycles</strong>, Cuilbeg, Carraroe (F91 N267)
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href={SLIGO_TEST_CENTRE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              <Navigation className="w-3 h-3" />
              Navigate to Test Centre
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        
        {/* Tab 1: Test Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-4">
            
            {/* Search & Maneuver Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search areas (Caltragh, Cleveragh, Gallows Hill, Crozon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedManeuverFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedManeuverFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Routes ({SLIGO_TEST_ROUTES.length})
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Reverse')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedManeuverFilter === 'Reverse'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Reverse Corner
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Hill Start')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedManeuverFilter === 'Hill Start'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hill Start
                </button>
                <button
                  onClick={() => setSelectedManeuverFilter('Turnabout')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedManeuverFilter === 'Turnabout'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Turnabout
                </button>
              </div>
            </div>

            {/* Routes Grid */}
            {filteredRoutes.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <p className="text-slate-500 text-sm">No driving routes match your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedManeuverFilter('all'); }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
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

      </main>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">Sligo Driving Test Routes</span> &bull; Practice tool for the RSA Sligo Driving Test Centre.
          </div>
          <div className="flex items-center gap-2">
            <span>Test Centre: Seamus McDaniel Motorcycles, Cuilbeg, Carraroe (F91 N267)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
