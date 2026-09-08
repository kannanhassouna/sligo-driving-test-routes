import React, { useState, useEffect, useRef } from 'react';
import { SLIGO_TEST_ROUTES } from '../../data/sligoRoutes';
import type { TestRoute, TurnInstruction } from '../../types/route';
import { 
  Volume2, Play, Pause, SkipForward, SkipBack, 
  RotateCcw, Navigation, ExternalLink 
} from 'lucide-react';

interface ExaminerAudioPlayerProps {
  initialRoute?: TestRoute;
}

export const ExaminerAudioPlayer: React.FC<ExaminerAudioPlayerProps> = ({ initialRoute }) => {
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
    
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    
    // Try to pick an English / Irish accent voice if available
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
      <div className="bg-gradient-to-r from-pink-950/60 via-slate-900 to-slate-900 border border-pink-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Volume2 className="w-4 h-4" />
          Virtual Passenger Seat Simulation
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Virtual RSA Examiner Audio Simulator
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Simulate how an RSA examiner delivers verbal instructions in the car. 
          Put on your earphones, sit in your car, or walk the route while the examiner reads out turns, maneuvers, and speed alerts!
        </p>
      </div>

      {!isSpeechSupported && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 text-xs sm:text-sm text-amber-200">
          Note: Your browser does not support the Web Speech API speech synthesis. The text prompts can still be read and stepped through manually.
        </div>
      )}

      {/* Main Audio Player Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6">
        {/* Route Selector Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Select Driving Test Route
            </label>
            <select
              value={selectedRoute.id}
              onChange={(e) => handleRouteChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:border-pink-500 transition"
            >
              {SLIGO_TEST_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  Route {r.routeNumber}: {r.title} ({r.distanceKm}km)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={selectedRoute.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open Route in Google Maps
              <ExternalLink className="w-3 h-3 text-blue-200" />
            </a>
          </div>
        </div>

        {/* Current Instruction Box */}
        <div className="bg-slate-950/80 border border-pink-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500" 
            style={{ width: `${((currentStepIndex + 1) / selectedRoute.turnByTurn.length) * 100}%` }}
          />

          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 text-xs font-black flex items-center justify-center">
                {currentInstruction.step}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Step {currentStepIndex + 1} of {selectedRoute.turnByTurn.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">
                {currentInstruction.speedLimit} km/h
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-medium text-pink-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 animate-pulse" />
              Examiner instruction spoken aloud:
            </div>
            <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              &ldquo;{currentInstruction.spokenAudioText}&rdquo;
            </p>
            <p className="text-xs text-slate-400">
              Location: <span className="text-slate-200 font-semibold">{currentInstruction.streetName}</span>
            </p>
          </div>

          {currentInstruction.laneGuidance && (
            <div className="mt-4 text-xs text-blue-300 bg-blue-950/40 border border-blue-800/50 rounded-lg p-2.5">
              <strong>Lane note: </strong>{currentInstruction.laneGuidance}
            </div>
          )}

          {currentInstruction.maneuverNotice && (
            <div className="mt-2 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/50 rounded-lg p-2.5">
              <strong>Maneuver: </strong>{currentInstruction.maneuverNotice}
            </div>
          )}

          {currentInstruction.hazardAlert && (
            <div className="mt-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 rounded-lg p-2.5">
              <strong>Watch out: </strong>{currentInstruction.hazardAlert}
            </div>
          )}
        </div>

        {/* Audio Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Main playback buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous instruction"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="p-4 rounded-full bg-pink-600 hover:bg-pink-500 text-white shadow-lg transition transform active:scale-95"
              title={isPlaying ? 'Pause narration' : 'Play voice instruction'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex >= selectedRoute.turnByTurn.length - 1}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next instruction"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={handleRepeat}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Replay current voice prompt"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Settings & Auto advance */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded border-slate-700 text-pink-600 focus:ring-pink-500"
              />
              <span>Auto-advance (Simulate drive)</span>
            </label>

            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span>Speed:</span>
              <button 
                onClick={() => setSpeechRate(0.85)}
                className={`px-1.5 py-0.5 rounded ${speechRate === 0.85 ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
              >
                0.8x
              </button>
              <button 
                onClick={() => setSpeechRate(1.0)}
                className={`px-1.5 py-0.5 rounded ${speechRate === 1.0 ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
              >
                1.0x
              </button>
              <button 
                onClick={() => setSpeechRate(1.2)}
                className={`px-1.5 py-0.5 rounded ${speechRate === 1.2 ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
              >
                1.2x
              </button>
            </div>
          </div>
        </div>

        {/* Step list navigator */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Jump to specific instruction
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 scrollbar-thin">
            {selectedRoute.turnByTurn.map((t, idx) => (
              <button
                key={t.step}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  if (isPlaying) speakText(t.spokenAudioText);
                }}
                className={`p-2 rounded-lg text-left text-xs transition truncate border ${
                  currentStepIndex === idx
                    ? 'bg-pink-600 text-white border-pink-500 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
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
