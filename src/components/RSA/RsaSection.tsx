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
  
  // Checklist state
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const getQuestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-4 h-4 text-amber-400" />;
      case 'Thermometer': return <Thermometer className="w-4 h-4 text-red-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'Disc': return <Disc className="w-4 h-4 text-emerald-400" />;
      case 'Gauge': return <Gauge className="w-4 h-4 text-cyan-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-sky-400" />;
      case 'CloudFog': return <CloudFog className="w-4 h-4 text-indigo-400" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredQuestions = RSA_BONNET_QUESTIONS.filter(q => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const checklistItems = [
    { id: 'insurance', label: 'Valid Motor Insurance disc displayed on windscreen' },
    { id: 'tax', label: 'Valid Motor Tax disc in date and visible' },
    { id: 'nct', label: 'Valid NCT disc displayed (mandatory if car is 4+ years old)' },
    { id: 'lplates', label: 'Red "L" plates fitted securely front & rear (at least 15cm high on white background)' },
    { id: 'tires', label: 'All 4 tires have legal tread depth (>= 1.6mm) and no sidewall cuts or bulges' },
    { id: 'lights', label: 'Brake lights, indicators, dipped headlights, reverse light & number plate lights all working' },
    { id: 'fluids', label: 'Engine oil, coolant, brake fluid and screenwash checked and topped up' },
    { id: 'clean_mirrors', label: 'Windscreen clean inside and out; interior and exterior mirrors adjusted' }
  ];

  return (
    <section className="space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          Official RSA Driving Test Protocol
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Under the Bonnet, Secondary Controls & RSA Marking Scheme
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Before you even turn on the ignition in Carraroe, the RSA examiner will ask you technical questions under the bonnet and inside the cabin. 
          Use these interactive flashcards and car checklist to guarantee a 100% score on the technical checks!
        </p>
      </div>

      {/* Pre-Test Vehicle Readiness Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              Test Day Vehicle Checklist
            </h3>
            <p className="text-xs text-slate-400">
              If your car fails any of these on test morning, the RSA examiner will cancel your test with no refund!
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 self-start">
            {Object.values(checklist).filter(Boolean).length} of {checklistItems.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {checklistItems.map((item) => {
            const isChecked = checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm transition ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                )}
                <span className={isChecked ? 'font-medium text-emerald-100' : ''}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Under The Bonnet & Technical Questions */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Under the Bonnet & Cabin Questions</h3>
            <p className="text-xs text-slate-400">Tap "Reveal Answer" to test your knowledge</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Questions ({RSA_BONNET_QUESTIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('bonnet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === 'bonnet'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Under Bonnet
            </button>
            <button
              onClick={() => setActiveCategory('tires')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === 'tires'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Tires & Wheels
            </button>
            <button
              onClick={() => setActiveCategory('controls')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === 'controls'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Secondary Controls
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedIds[q.id];
            return (
              <div 
                key={q.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0">
                      {getQuestionIcon(q.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {q.category} Question
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  {isRevealed ? (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 animate-fadeIn space-y-2">
                      <p className="leading-relaxed">{q.answer}</p>
                      <div className="text-[11px] text-emerald-400 font-medium bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                        <strong>Examiner Tip: </strong>{q.tip}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic mt-2">
                      Click reveal to see the model answer expected by RSA examiners.
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                    {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RSA Marking Sheet Breakdown (Grade 1, 2, 3) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertOctagon className="w-4 h-4" />
          Marking Scheme
        </div>
        <h3 className="text-xl font-bold text-white mb-2">How RSA Examiners Grade the Test</h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-3xl leading-relaxed">
          The Irish Driving Test uses a 3-grade fault scoring system. Understanding these limits takes away the fear and shows you exactly how much room for error you actually have.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RSA_MARKING_GUIDE.map((m) => {
            const isRed = m.grade === 'Grade 3';
            const isAmber = m.grade === 'Grade 2';
            return (
              <div 
                key={m.grade}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isRed 
                    ? 'bg-red-950/20 border-red-500/40 text-red-200' 
                    : isAmber 
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-black ${
                      isRed ? 'bg-red-600 text-white' : isAmber ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {m.grade}
                    </span>
                    <span className="text-xs font-bold">{m.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {m.definition}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-3 text-xs">
                    <span className="font-bold text-white">Rule: </span>
                    <span className={isRed ? 'text-red-400 font-semibold' : 'text-slate-300'}>{m.consequence}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Examples:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
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
    </section>
  );
};
