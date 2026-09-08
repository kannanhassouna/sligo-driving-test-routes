import React, { useState } from 'react';
import { RSA_BONNET_QUESTIONS, RSA_MARKING_GUIDE } from '../../data/rsaQuestions';
import { 
  BookOpen, CheckSquare, Square, Eye, EyeOff, 
  HelpCircle, Droplet, Thermometer, ShieldAlert, 
  Sparkles, Disc, Gauge, Wind, CloudFog, AlertOctagon 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RsaSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bonnet' | 'controls' | 'tires'>('all');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    insurance: true,
    tax: true,
    nct: true,
    lplates: false,
    tires: false,
    lights: false,
    fluids: false,
    clean_mirrors: false
  });

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheck = (id: string) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);

    const allChecked = Object.values(updated).every(Boolean);
    if (allChecked) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const getQuestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-4 h-4 text-amber-600" />;
      case 'Thermometer': return <Thermometer className="w-4 h-4 text-rose-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-purple-600" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-blue-600" />;
      case 'Disc': return <Disc className="w-4 h-4 text-emerald-600" />;
      case 'Gauge': return <Gauge className="w-4 h-4 text-cyan-600" />;
      case 'Wind': return <Wind className="w-4 h-4 text-sky-600" />;
      case 'CloudFog': return <CloudFog className="w-4 h-4 text-indigo-600" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredQuestions = RSA_BONNET_QUESTIONS.filter(q => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const checklistItems = [
    { id: 'insurance', label: 'Valid Motor Insurance disc on windscreen' },
    { id: 'tax', label: 'Valid Motor Tax disc in date' },
    { id: 'nct', label: 'Valid NCT disc displayed (if car is 4+ years old)' },
    { id: 'lplates', label: 'Red "L" plates fitted securely front & rear' },
    { id: 'tires', label: 'All 4 tires legal tread (>= 1.6mm) & good condition' },
    { id: 'lights', label: 'Brake lights, indicators, headlights all working' },
    { id: 'fluids', label: 'Engine oil, coolant, brake fluid & screenwash topped up' },
    { id: 'clean_mirrors', label: 'Windscreen and mirrors clean and adjusted' }
  ];

  const readyCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Official RSA Test Protocol</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Vehicle Checklist & Technical Questions
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Complete the morning checklist to ensure your car is test-ready, and review the technical questions asked before driving.
        </p>
      </div>

      {/* Checklist Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Test Morning Car Checklist
            </h3>
            <p className="text-xs text-slate-500">Tap to check off each item before leaving for the Carraroe centre</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
            {readyCount} of {checklistItems.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {checklistItems.map((item) => {
            const isChecked = checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Under The Bonnet & Technical Questions */}
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Technical Questions & Answers
            </h3>
            <p className="text-xs text-slate-500">Tap &ldquo;Show Answer&rdquo; to test your memory</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({RSA_BONNET_QUESTIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('bonnet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === 'bonnet'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Under Bonnet
            </button>
            <button
              onClick={() => setActiveCategory('tires')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === 'tires'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tires
            </button>
            <button
              onClick={() => setActiveCategory('controls')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === 'controls'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cabin Controls
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedIds[q.id];
            return (
              <div 
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                      {getQuestionIcon(q.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        {q.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  {isRevealed && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-fadeIn">
                      <p className="leading-relaxed">{q.answer}</p>
                      <div className="text-[11px] text-emerald-800 font-medium">
                        <strong>💡 Tip: </strong>{q.tip}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{isRevealed ? 'Hide' : 'Show Answer'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marking Guide */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertOctagon className="w-4 h-4" />
          <span>Marking Scheme</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          How Faults are Graded
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          The test allows room for minor mistakes—here is what each fault category means:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {RSA_MARKING_GUIDE.map((m) => {
            const isRed = m.grade === 'Grade 3';
            const isAmber = m.grade === 'Grade 2';
            return (
              <div 
                key={m.grade}
                className={`p-4 rounded-xl border text-xs flex flex-col justify-between ${
                  isRed 
                    ? 'bg-rose-50/50 border-rose-200' 
                    : isAmber 
                    ? 'bg-amber-50/50 border-amber-200' 
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${
                      isRed ? 'bg-rose-600' : isAmber ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      {m.grade}
                    </span>
                    <span className="font-bold text-slate-800">{m.title}</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-3">
                    {m.definition}
                  </p>

                  <div className="p-2 rounded bg-white border border-slate-200 mb-3 text-[11px]">
                    <strong className="text-slate-800">Rule: </strong>
                    <span className={isRed ? 'text-rose-700 font-semibold' : 'text-slate-700'}>{m.consequence}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Examples:
                    </span>
                    <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                      {m.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
