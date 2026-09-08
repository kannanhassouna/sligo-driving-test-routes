import React, { useState } from 'react';
import { 
  IRISH_THEORY_QUESTIONS, 
  THEORY_PRACTICE_QUIZ, 
  type TheoryQuestion 
} from '../../data/theoryQuestions';
import { 
  BookOpen, Eye, EyeOff, CheckCircle2, 
  Award, RotateCcw, Sparkles, Check, X 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TheorySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'study' | 'quiz'>('study');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'rules' | 'signs' | 'markings' | 'speed_limits'>('all');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions: TheoryQuestion[] = IRISH_THEORY_QUESTIONS.filter(q => {
    if (categoryFilter === 'all') return true;
    return q.category === categoryFilter;
  });

  // Quiz Handlers
  const handleSelectOption = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuizIndex]: optionIndex }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < THEORY_PRACTICE_QUIZ.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizSubmitted(true);
      // Calculate score and fire confetti if score >= 8
      const correctCount = THEORY_PRACTICE_QUIZ.reduce((count, q, idx) => {
        return selectedAnswers[idx] === q.correctIndex ? count + 1 : count;
      }, 0);

      if (correctCount >= 8) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrevQuizQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const currentQuiz = THEORY_PRACTICE_QUIZ[currentQuizIndex];
  const userSelected = selectedAnswers[currentQuizIndex];
  const isAnswered = userSelected !== undefined;

  const quizScore = THEORY_PRACTICE_QUIZ.reduce((count, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? count + 1 : count;
  }, 0);

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>RSA Driver Theory & Rules of the Road</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Driver Theory & Road Signs Guide
          </h2>
          <p className="text-sm text-slate-600 mt-0.5 max-w-2xl">
            Review the official oral questions and road signs examiners test inside the Carraroe waiting room, or take a quick 10-question practice quiz!
          </p>
        </div>

        {/* Study Mode vs Quiz Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('study')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'study'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study Guide ({IRISH_THEORY_QUESTIONS.length})
          </button>
          <button
            onClick={() => setViewMode('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'quiz'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Quiz (10)</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* 1. STUDY GUIDE MODE                         */}
      {/* ------------------------------------------- */}
      {viewMode === 'study' && (
        <div className="space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Questions ({IRISH_THEORY_QUESTIONS.length})
            </button>
            <button
              onClick={() => setCategoryFilter('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === 'rules'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Oral Test Questions
            </button>
            <button
              onClick={() => setCategoryFilter('signs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === 'signs'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Road Signs
            </button>
            <button
              onClick={() => setCategoryFilter('markings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === 'markings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Road Markings
            </button>
            <button
              onClick={() => setCategoryFilter('speed_limits')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === 'speed_limits'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Speed Limits
            </button>
          </div>

          {/* Question Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => {
              const isRevealed = revealedIds[q.id];

              return (
                <div 
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
                >
                  <div>
                    {/* Card Category Badge & Sign Symbol if applicable */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {q.category.replace('_', ' ')}
                      </span>

                      {q.signSymbol && (
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-xs ${
                          q.signColor === 'red' 
                            ? 'bg-red-600 text-white border-2 border-white ring-2 ring-red-600'
                            : 'bg-amber-400 text-slate-900 border-2 border-slate-900 rotate-45 transform'
                        }`}>
                          <span className={q.signColor === 'amber' ? '-rotate-45' : ''}>
                            {q.signSymbol}
                          </span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug mb-2">
                      {q.question}
                    </h3>

                    {/* Answer Reveal Area */}
                    {isRevealed ? (
                      <div className="mt-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2 animate-fadeIn">
                        <p className="whitespace-pre-line leading-relaxed">{q.answer}</p>
                        <div className="p-2 rounded-lg bg-white border border-blue-200 text-blue-900 font-semibold text-xs flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span><strong>Key takeaway: </strong>{q.keyTakeaway}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic mt-2">
                        Tap &ldquo;Show Answer&rdquo; to test what you would say to the examiner.
                      </p>
                    )}
                  </div>

                  {/* Toggle Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* 2. INTERACTIVE PRACTICE QUIZ MODE           */}
      {/* ------------------------------------------- */}
      {viewMode === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          
          {!quizSubmitted ? (
            <>
              {/* Quiz Progress */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Question {currentQuizIndex + 1} of {THEORY_PRACTICE_QUIZ.length}
                  </span>
                  <div className="w-36 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${((currentQuizIndex + 1) / THEORY_PRACTICE_QUIZ.length) * 100}%` }}
                    />
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {Object.keys(selectedAnswers).length} answered
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentQuiz.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentQuiz.options.map((opt, optIdx) => {
                    const isSelected = userSelected === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevQuizQuestion}
                  disabled={currentQuizIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <button
                  onClick={handleNextQuizQuestion}
                  disabled={!isAnswered}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  {currentQuizIndex === THEORY_PRACTICE_QUIZ.length - 1 ? 'Finish & See Results' : 'Next Question →'}
                </button>
              </div>
            </>
          ) : (
            /* Quiz Completed Results */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {quizScore >= 8 ? '🎉 Outstanding Result!' : quizScore >= 6 ? '👍 Good Effort!' : '📚 Keep Practicing!'}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  You scored <strong className="text-slate-900 font-bold">{quizScore} out of {THEORY_PRACTICE_QUIZ.length}</strong> ({Math.round((quizScore / THEORY_PRACTICE_QUIZ.length) * 100)}%)
                </p>
              </div>

              {/* Review of all 10 questions */}
              <div className="space-y-3 text-left max-h-96 overflow-y-auto pr-1">
                {THEORY_PRACTICE_QUIZ.map((q, idx) => {
                  const selected = selectedAnswers[idx];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                        isCorrect 
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                          : 'bg-rose-50/70 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        {isCorrect ? (
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        )}
                        <strong className="font-semibold text-slate-900">
                          #{idx + 1}: {q.question}
                        </strong>
                      </div>

                      <p className="text-xs text-slate-600 pl-6 mb-1">
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </p>

                      <p className="text-[11px] text-slate-500 pl-6 italic">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Reset Quiz Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => setViewMode('study')}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  Return to Study Guide
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
