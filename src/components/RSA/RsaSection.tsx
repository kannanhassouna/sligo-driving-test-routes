import React, { useState } from 'react';
import { RSA_BONNET_QUESTIONS, RSA_MARKING_GUIDE } from '../../data/rsaQuestions';
import { 
  BookOpen, CheckSquare, Square, Eye, EyeOff, 
  HelpCircle, Droplet, Thermometer, ShieldAlert, 
  Sparkles, Disc, Gauge, Wind, CloudFog, AlertOctagon 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsaSectionProps {
  isLargeText?: boolean;
}

export const RsaSection: React.FC<RsaSectionProps> = ({ isLargeText }) => {
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
      case 'Droplet': return <Droplet className="w-5 h-5 text-amber-700" />;
      case 'Thermometer': return <Thermometer className="w-5 h-5 text-red-700" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-purple-700" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-700" />;
      case 'Disc': return <Disc className="w-5 h-5 text-emerald-700" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-cyan-700" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-700" />;
      case 'CloudFog': return <CloudFog className="w-5 h-5 text-indigo-700" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-700" />;
    }
  };

  const filteredQuestions = RSA_BONNET_QUESTIONS.filter(q => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const checklistItems = [
    { id: 'insurance', label: 'Valid Motor Insurance disc clearly displayed on windscreen' },
    { id: 'tax', label: 'Valid Motor Tax disc in date and visible' },
    { id: 'nct', label: 'Valid NCT disc displayed (mandatory if car is 4+ years old)' },
    { id: 'lplates', label: 'Red "L" plates fitted securely front & rear (at least 15cm high on white background)' },
    { id: 'tires', label: 'All 4 tires have legal tread depth (at least 1.6mm) and no cuts or bulges' },
    { id: 'lights', label: 'Brake lights, indicators, headlights, reverse light & number plate lights all working' },
    { id: 'fluids', label: 'Engine oil, coolant, brake fluid and screenwash checked and topped up' },
    { id: 'clean_mirrors', label: 'Windscreen clean inside and out; interior and exterior mirrors clean and adjusted' }
  ];

  const readyCount = Object.values(checklist).filter(Boolean).length;

  return (
    <section className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border-3 border-emerald-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 text-sm font-black uppercase tracking-wider mb-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>Official RSA Driving Test Protocol</span>
        </div>
        <h2 className={`font-black text-slate-900 tracking-tight leading-tight mb-2 ${isLargeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          Car Checks & Questions Asked by the Examiner
        </h2>
        <p className={`text-slate-700 leading-relaxed max-w-3xl ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          Before you drive out onto the road in Sligo, the examiner will ask you to point out items under the bonnet and demonstrate controls inside the car. 
          Use this checklist and simple questions below so you can answer with full confidence.
        </p>
      </div>

      {/* Pre-Test Vehicle Readiness Checklist */}
      <div className="bg-white border-3 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-slate-200">
          <div>
            <h3 className={`font-black text-slate-900 flex items-center gap-2.5 ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              <CheckSquare className="w-6 h-6 text-emerald-700" />
              Test Morning Car Checklist
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-600 mt-1">
              Tap each item to check it off. If your car fails any of these, the RSA examiner cannot take you out!
            </p>
          </div>
          <span className="text-base font-black px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 border-2 border-emerald-300 self-start">
            {readyCount} of {checklistItems.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklistItems.map((item) => {
            const isChecked = checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <span className={`leading-relaxed ${isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Under The Bonnet & Technical Questions */}
      <div className="space-y-4">
        <div className="bg-white border-3 border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className={`font-black text-slate-900 ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              Under the Bonnet & Cabin Questions
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-600 mt-1">
              Tap &ldquo;Show Answer&rdquo; to test your memory on what to say.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-bold border-2 transition ${
                activeCategory === 'all'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              All ({RSA_BONNET_QUESTIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('bonnet')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-bold border-2 transition ${
                activeCategory === 'bonnet'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              Under Bonnet
            </button>
            <button
              onClick={() => setActiveCategory('tires')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-bold border-2 transition ${
                activeCategory === 'tires'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              Tires
            </button>
            <button
              onClick={() => setActiveCategory('controls')}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-bold border-2 transition ${
                activeCategory === 'controls'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              Cabin Controls
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedIds[q.id];
            return (
              <article 
                key={q.id}
                className="bg-white border-3 border-slate-300 hover:border-emerald-600 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 flex-shrink-0">
                      {getQuestionIcon(q.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                        {q.category} Question
                      </span>
                      <h4 className={`font-black text-slate-900 leading-snug mt-0.5 ${isLargeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  {isRevealed ? (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 space-y-3 animate-fadeIn">
                      <p className={`text-emerald-950 font-medium leading-relaxed ${isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                        {q.answer}
                      </p>
                      <div className="p-3 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-bold text-sm">
                        <span>💡 Examiner Tip: </span>{q.tip}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic mt-3 text-sm">
                      Tap &ldquo;Show Answer&rdquo; below to see what the examiner wants you to say.
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t-2 border-slate-200 flex justify-end">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition cursor-pointer"
                  >
                    {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5 text-emerald-700" />}
                    <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* RSA Marking Sheet Breakdown (Grade 1, 2, 3) */}
      <div className="bg-white border-3 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-rose-700 text-sm font-black uppercase tracking-wider mb-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <span>Marking Scheme Explained</span>
          </div>
          <h3 className={`font-black text-slate-900 leading-tight mb-2 ${isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            How the Examiner Marks You (Grade 1, Grade 2, Grade 3)
          </h3>
          <p className={`text-slate-700 leading-relaxed max-w-3xl ${isLargeText ? 'text-lg' : 'text-base'}`}>
            Understanding how marks are given takes away fear. You do not need a perfect score to pass! Here is what each mark means:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RSA_MARKING_GUIDE.map((m) => {
            const isRed = m.grade === 'Grade 3';
            const isAmber = m.grade === 'Grade 2';
            return (
              <div 
                key={m.grade}
                className={`p-6 rounded-2xl border-3 flex flex-col justify-between ${
                  isRed 
                    ? 'bg-red-50 border-red-300 text-red-950' 
                    : isAmber 
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-black text-white ${
                      isRed ? 'bg-red-700' : isAmber ? 'bg-amber-700' : 'bg-emerald-700'
                    }`}>
                      {m.grade}
                    </span>
                    <span className="font-bold text-sm sm:text-base">{m.title}</span>
                  </div>

                  <p className="text-sm sm:text-base font-medium leading-relaxed mb-4">
                    {m.definition}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-slate-200 mb-4 text-sm sm:text-base">
                    <strong className="block text-slate-900 mb-1">Pass / Fail Rule:</strong>
                    <span className={isRed ? 'text-red-700 font-bold' : 'text-slate-800 font-semibold'}>
                      {m.consequence}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase text-slate-600 tracking-wider block mb-2">
                      Examples:
                    </span>
                    <ul className="space-y-1.5 text-sm list-disc list-inside">
                      {m.examples.map((ex, i) => (
                        <li key={i} className="font-medium">{ex}</li>
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
