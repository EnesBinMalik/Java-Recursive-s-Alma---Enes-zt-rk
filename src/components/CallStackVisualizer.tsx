import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ArrowDown, ArrowUp, Layers } from 'lucide-react';
import { generateSimulationSteps } from '../utils/recursionSimulator';

interface CallStackVisualizerProps {
  initialTaban?: number;
  initialUs?: number;
}

export const CallStackVisualizer: React.FC<CallStackVisualizerProps> = ({
  initialTaban = 5,
  initialUs = 3
}) => {
  const [taban, setTaban] = useState<number>(initialTaban);
  const [us, setUs] = useState<number>(initialUs);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1200); // ms per step

  // Sync when props change
  useEffect(() => {
    setTaban(initialTaban);
    setUs(initialUs);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [initialTaban, initialUs]);

  const steps = useMemo(() => {
    return generateSimulationSteps(taban, us);
  }, [taban, us]);

  // Keep index within bounds
  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)] || steps[0];

  // Auto-play interval
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, steps.length, playSpeed]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              JVM Çağrı Yığını (Call Stack) & Adım Adım Çalışma Görselleştiricisi
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Özyinelemeli fonksiyonların bellekte nasıl yığıldığını ve nasıl geri döndüğünü adım adım izleyin.
          </p>
        </div>

        {/* Input Parameters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400">Taban:</span>
            <input
              type="number"
              value={taban}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  setTaban(val);
                  setCurrentStepIndex(0);
                }
              }}
              className="w-12 bg-slate-950 text-center text-white font-mono text-xs py-0.5 rounded border border-slate-700"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400">Üs (0-8):</span>
            <input
              type="number"
              min="0"
              max="8"
              value={us}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 0 && val <= 8) {
                  setUs(val);
                  setCurrentStepIndex(0);
                }
              }}
              className="w-12 bg-slate-950 text-center text-white font-mono text-xs py-0.5 rounded border border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Main Visualizer Body */}
      <div className="p-6 grid lg:grid-cols-12 gap-6">
        {/* Left Column: Call Stack Representation */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Bellek Yığını (Stack Frames)</span>
                {currentStep.type === 'push' && (
                  <span className="text-[11px] text-amber-400 font-normal flex items-center gap-1">
                    <ArrowDown className="w-3 h-3" /> Yığına Ekleniyor (Push)
                  </span>
                )}
                {currentStep.type === 'unwind' && (
                  <span className="text-[11px] text-emerald-400 font-normal flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> Yığından Çözülüyor (Pop)
                  </span>
                )}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Yığın Derinliği: <strong className="text-white">{currentStep.stack.length}</strong>
              </span>
            </div>

            {/* Stack Box Container */}
            <div className="min-h-[290px] bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col-reverse gap-2.5 justify-start">
              {currentStep.stack.map((frame, index) => {
                const isBase = frame.us === 0;
                const isResolved = frame.status === 'resolved';
                const isUnwinding = currentStep.unwindingFrameId === frame.id;

                return (
                  <div
                    key={frame.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      isUnwinding
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
                        : isResolved
                        ? 'bg-slate-900/90 border-emerald-500/50'
                        : isBase
                        ? 'bg-amber-950/40 border-amber-500'
                        : 'bg-slate-900/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{currentStep.stack.length - index}
                        </span>
                        <span className="font-mono text-xs font-semibold text-white">
                          usHesapla(taban: {frame.taban}, us: {frame.us})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {frame.returnValue !== undefined ? (
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            Dönüş Değeri: {frame.returnValue}
                          </span>
                        ) : isBase ? (
                          <span className="text-[11px] font-medium text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            Base Case (1)
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">
                            Bekliyor: {frame.expression}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {currentStep.stack.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                  Yığın boş
                </div>
              )}
            </div>
          </div>

          {/* Player controls */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Başa Dön"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
                title="Önceki Adım"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex >= steps.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
                title="Sonraki Adım"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Step Counter & Speed */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Hız:</span>
                <select
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(Number(e.target.value))}
                  className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-1.5 py-0.5 text-xs font-mono"
                >
                  <option value={1800}>0.5x (Yavaş)</option>
                  <option value={1200}>1.0x (Normal)</option>
                  <option value={600}>2.0x (Hızlı)</option>
                </select>
              </div>

              <div className="font-mono text-slate-300">
                Adım <span className="text-amber-400 font-bold">{currentStepIndex + 1}</span> / {steps.length}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Line Inspector & Educational Explanation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Active Step Explanation */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Şu Anki İşlem Açıklaması
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {currentStep.type === 'push' && 'Yığına Ekleme (Winding)'}
                {currentStep.type === 'base_case' && 'Taban Durumu (Base Case)'}
                {currentStep.type === 'unwind' && 'Yığından Dönüş (Unwinding)'}
                {currentStep.type === 'complete' && 'Hesaplama Bitti'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              {currentStep.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Java Code Line Tracker */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Yürütülen Java Kodu Satırı
              </span>
              <span className="text-[10px] text-amber-400 font-mono">
                Satır {currentStep.activeLine}
              </span>
            </div>

            <div className="font-mono text-xs space-y-1">
              <div
                className={`p-1.5 rounded transition-colors ${
                  currentStep.activeLine === 1
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400'
                }`}
              >
                <span className="text-slate-600 select-none mr-2">1</span>
                <span>static int usHesapla(int taban, int us) &#123;</span>
              </div>

              <div
                className={`p-1.5 rounded transition-colors ${
                  currentStep.activeLine === 2
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400'
                }`}
              >
                <span className="text-slate-600 select-none mr-2">2</span>
                <span className="ml-3">if (us == 0) return 1;</span>
              </div>

              <div
                className={`p-1.5 rounded transition-colors ${
                  currentStep.activeLine === 3
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-slate-400'
                }`}
              >
                <span className="text-slate-600 select-none mr-2">3</span>
                <span className="ml-3">return taban * usHesapla(taban, us - 1);</span>
              </div>

              <div className="text-slate-600 select-none p-1.5">
                <span>&#125;</span>
              </div>
            </div>
          </div>

          {/* Step Progress Bar */}
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>İlerleme Çubuğu</span>
              <span className="font-mono">
                {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
