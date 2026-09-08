import React, { useState, useEffect, useRef } from 'react';
import { SLIGO_TEST_ROUTES } from '../../data/sligoRoutes';
import type { TestRoute, TurnInstruction } from '../../types/route';
import { 
  Volume2, Play, Pause, SkipForward, SkipBack, 
  RotateCcw, Navigation, AlertCircle, CheckCircle2 
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
        }, 5000);
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
    <div className="space-y-5">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Volume2 className="w-4 h-4" />
          <span>Spoken Driving Instructions</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Virtual Examiner Voice Practice
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Hear the verbal directions as given by an RSA examiner. Practice anticipating turns and checking mirrors in advance.
        </p>
      </div>

      {!isSpeechSupported && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
          Note: Speech synthesis is not supported by your current browser. You can still step through the instructions manually.
        </div>
      )}

      {/* Main Player Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        
        {/* Route Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
              Select Driving Route:
            </label>
            <select
              value={selectedRoute.id}
              onChange={(e) => handleRouteChange(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {SLIGO_TEST_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  Route {r.routeNumber}: {r.title} ({r.distanceKm}km)
                </option>
              ))}
            </select>
          </div>

          <a
            href={selectedRoute.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Current Spoken Cue Box */}
        <div className="bg-slate-50 border border-rose-200 rounded-2xl p-5 relative">
          
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                {currentInstruction.step}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Step {currentStepIndex + 1} of {selectedRoute.turnByTurn.length}
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200">
              {currentInstruction.speedLimit} km/h
            </span>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Examiner direction:
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              &ldquo;{currentInstruction.spokenAudioText}&rdquo;
            </p>
            <p className="text-xs text-slate-500">
              Location: <span className="text-slate-800 font-medium">{currentInstruction.streetName}</span>
            </p>
          </div>

          {/* Extra Notes */}
          {currentInstruction.laneGuidance && (
            <div className="mt-3 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span><strong>Lane: </strong>{currentInstruction.laneGuidance}</span>
            </div>
          )}

          {currentInstruction.hazardAlert && (
            <div className="mt-1.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span><strong>Notice: </strong>{currentInstruction.hazardAlert}</span>
            </div>
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous instruction"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Voice'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex >= selectedRoute.turnByTurn.length - 1}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next instruction"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleRepeat}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Repeat instruction"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Auto Advance & Speed */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
              <span>Auto-advance</span>
            </label>

            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-500">Speed:</span>
              <button 
                onClick={() => setSpeechRate(0.85)}
                className={`px-1.5 py-0.5 rounded ${speechRate === 0.85 ? 'bg-rose-600 text-white' : 'hover:bg-slate-200'}`}
              >
                0.8x
              </button>
              <button 
                onClick={() => setSpeechRate(1.0)}
                className={`px-1.5 py-0.5 rounded ${speechRate === 1.0 ? 'bg-rose-600 text-white' : 'hover:bg-slate-200'}`}
              >
                1.0x
              </button>
            </div>
          </div>

        </div>

        {/* Step List Pills */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-400 block mb-2">
            Jump to step:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 scrollbar-thin">
            {selectedRoute.turnByTurn.map((t, idx) => (
              <button
                key={t.step}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  if (isPlaying) speakText(t.spokenAudioText);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border ${
                  currentStepIndex === idx
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                #{t.step} {t.streetName}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
