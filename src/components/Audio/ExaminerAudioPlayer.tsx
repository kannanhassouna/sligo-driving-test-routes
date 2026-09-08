import React, { useState, useEffect, useRef } from 'react';
import { SLIGO_TEST_ROUTES } from '../../data/sligoRoutes';
import type { TestRoute, TurnInstruction } from '../../types/route';
import { 
  Volume2, Play, Pause, SkipForward, SkipBack, 
  RotateCcw, Navigation, AlertCircle, CheckCircle2 
} from 'lucide-react';

interface ExaminerAudioPlayerProps {
  initialRoute?: TestRoute;
  isLargeText?: boolean;
}

export const ExaminerAudioPlayer: React.FC<ExaminerAudioPlayerProps> = ({ initialRoute, isLargeText }) => {
  const [selectedRoute, setSelectedRoute] = useState<TestRoute>(initialRoute || SLIGO_TEST_ROUTES[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const autoAdvanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialRoute) {
      setSelectedRoute(initialRoute);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [initialRoute]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
    }
  }, []);

  const currentInstruction: TurnInstruction = selectedRoute.turnByTurn[currentStepIndex] || selectedRoute.turnByTurn[0];

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const irishVoice = voices.find(v => v.lang === 'en-IE') || voices.find(v => v.lang.startsWith('en-GB')) || voices[0];
    if (irishVoice) {
      utterance.voice = irishVoice;
    }

    utterance.onend = () => {
      if (autoAdvance && currentStepIndex < selectedRoute.turnByTurn.length - 1) {
        autoAdvanceTimerRef.current = window.setTimeout(() => {
          handleNext();
        }, 6000);
      } else if (autoAdvance && currentStepIndex === selectedRoute.turnByTurn.length - 1) {
        setIsPlaying(false);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(currentInstruction.spokenAudioText);
    }
  };

  const handleNext = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    if (currentStepIndex < selectedRoute.turnByTurn.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextCue = selectedRoute.turnByTurn[nextIndex];
      if (isPlaying) {
        speakText(nextCue.spokenAudioText);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevCue = selectedRoute.turnByTurn[prevIndex];
      if (isPlaying) {
        speakText(prevCue.spokenAudioText);
      }
    }
  };

  const handleRepeat = () => {
    speakText(currentInstruction.spokenAudioText);
  };

  const handleRouteChange = (routeId: string) => {
    const route = SLIGO_TEST_ROUTES.find(r => r.id === routeId);
    if (route) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      setSelectedRoute(route);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border-3 border-rose-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-rose-800 text-sm font-black uppercase tracking-wider mb-2">
          <Volume2 className="w-5 h-5 text-rose-600" />
          <span>Examiner Voice Simulator</span>
        </div>
        <h2 className={`font-black text-slate-900 tracking-tight leading-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          Listen to the Examiner&rsquo;s Driving Instructions
        </h2>
        <p className={`text-slate-700 leading-relaxed max-w-3xl ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          Hear how the driving examiner speaks instructions during the test. 
          You can practice sitting in your car or at home listening to the turns and speed limits step by step.
        </p>
      </div>

      {!isSpeechSupported && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-base font-bold text-amber-900">
          Note: Your browser does not have speech sound built-in, but you can still read through the step instructions below!
        </div>
      )}

      {/* Main Audio Player Card */}
      <div className="bg-white border-3 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Route Selector Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200">
          <div className="flex-1">
            <label className="text-sm font-black uppercase tracking-wider text-slate-700 block mb-2">
              Choose a Driving Test Route:
            </label>
            <select
              value={selectedRoute.id}
              onChange={(e) => handleRouteChange(e.target.value)}
              className="w-full md:w-auto bg-slate-50 border-2 border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-base sm:text-lg font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              {SLIGO_TEST_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  Route {r.routeNumber}: {r.title} ({r.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          <a
            href={selectedRoute.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-base font-bold shadow transition text-center"
          >
            <Navigation className="w-5 h-5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Current Instruction Box */}
        <div className="bg-slate-50 border-3 border-rose-300 rounded-2xl p-6 sm:p-8 relative">
          
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-rose-700 text-white font-black text-base flex items-center justify-center">
                {currentInstruction.step}
              </span>
              <span className="text-base font-black text-slate-700 uppercase tracking-wider">
                Step {currentStepIndex + 1} of {selectedRoute.turnByTurn.length}
              </span>
            </div>

            <span className="px-3 py-1 rounded-lg text-sm sm:text-base font-black bg-white text-slate-900 border-2 border-slate-300">
              {currentInstruction.speedLimit} km/h Zone
            </span>
          </div>

          {/* Big spoken instruction */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-rose-800 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-rose-600" />
              <span>The examiner says:</span>
            </div>
            <p className={`font-black text-slate-900 tracking-tight leading-snug ${isLargeText ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
              &ldquo;{currentInstruction.spokenAudioText}&rdquo;
            </p>
            <p className="text-base font-bold text-slate-600">
              Location: <span className="text-slate-900">{currentInstruction.streetName}</span>
            </p>
          </div>

          {/* Help details */}
          {currentInstruction.laneGuidance && (
            <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-base font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-700 flex-shrink-0" />
              <span><strong>Lane guidance: </strong>{currentInstruction.laneGuidance}</span>
            </div>
          )}

          {currentInstruction.maneuverNotice && (
            <div className="mt-2 p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-base font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-700 flex-shrink-0" />
              <span><strong>Maneuver: </strong>{currentInstruction.maneuverNotice}</span>
            </div>
          )}

          {currentInstruction.hazardAlert && (
            <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-base font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <span><strong>Notice: </strong>{currentInstruction.hazardAlert}</span>
            </div>
          )}
        </div>

        {/* Audio Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          
          {/* Main playback buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
            >
              <SkipBack className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handlePlayToggle}
              className="px-6 py-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-lg shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              <span>{isPlaying ? 'Pause Voice' : 'Play Voice'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex >= selectedRoute.turnByTurn.length - 1}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
            >
              <span>Next</span>
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={handleRepeat}
              className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 font-bold transition"
              title="Repeat instruction"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Settings: Auto Advance & Speed */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-base text-slate-800">
            <label className="flex items-center gap-2.5 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border-2 border-slate-300 font-bold">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="w-5 h-5 rounded border-slate-400 text-rose-700 focus:ring-rose-600"
              />
              <span>Auto-advance (Simulate drive)</span>
            </label>

            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border-2 border-slate-300 font-bold">
              <span className="text-slate-600 mr-1">Speed:</span>
              <button 
                onClick={() => setSpeechRate(0.85)}
                className={`px-2.5 py-1 rounded-lg ${speechRate === 0.85 ? 'bg-rose-700 text-white' : 'text-slate-700 hover:bg-slate-200'}`}
              >
                Slow (0.8x)
              </button>
              <button 
                onClick={() => setSpeechRate(1.0)}
                className={`px-2.5 py-1 rounded-lg ${speechRate === 1.0 ? 'bg-rose-700 text-white' : 'text-slate-700 hover:bg-slate-200'}`}
              >
                Normal (1.0x)
              </button>
            </div>
          </div>

        </div>

        {/* Step List Navigator */}
        <div className="pt-4 border-t-2 border-slate-200">
          <span className="text-sm font-black uppercase tracking-wider text-slate-700 block mb-3">
            Jump to any step on this route:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
            {selectedRoute.turnByTurn.map((t, idx) => (
              <button
                key={t.step}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  if (isPlaying) speakText(t.spokenAudioText);
                }}
                className={`p-3 rounded-xl text-left text-sm font-bold transition truncate border-2 ${
                  currentStepIndex === idx
                    ? 'bg-rose-700 text-white border-rose-800 shadow'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="truncate">#{t.step}: {t.streetName}</div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
