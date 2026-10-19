import React from 'react';
import { Play, Sparkles, Terminal, Layers, CheckCircle2 } from 'lucide-react';
import { SCENARIOS, ScenarioItem } from '../data/javaSources';

interface HeroSectionProps {
  onSelectScenario: (scenario: ScenarioItem) => void;
  onOpenSimulator: () => void;
  onOpenVisualizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectScenario,
  onOpenSimulator,
  onOpenVisualizer
}) => {
  return (
    <section className="relative pt-8 pb-10 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold">Java 17/21+</span>
            <span aria-hidden="true">·</span>
            <span>Özyinelemeli (Recursive) Fonksiyonlar</span>
            <span aria-hidden="true">·</span>
            <span>Scanner Girdisi</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <span className="text-slate-400">Proje Sahibi:</span>
            <span className="text-amber-400 font-semibold tracking-wide">Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Çözüm
            </span>
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 text-balance">
              Recursive Metotlar ile <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Üslü Sayı Hesaplama
              </span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-2xl">
              Java dilinde taban ve üs değerleri kullanıcıdan alınarak, klasik döngü (for/while) kullanmadan,
              yalnızca fonksiyonun kendi kendini çağırdığı <strong>Recursive (Özyinelemeli)</strong> metot ile üslü sayı hesabı.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSimulator}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm"
              >
                <Terminal className="w-4 h-4" />
                <span>Konsolu Canlı Çalıştır</span>
              </button>
              <button
                onClick={onOpenVisualizer}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-lg border border-slate-700 transition-colors"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Çağrı Yığını (Call Stack) İzle</span>
              </button>
            </div>
          </div>

          {/* Quick Mathematical Principle Card */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Recursive Matematiksel Mantık
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80">
                <div className="text-xs text-amber-400 font-sans font-medium mb-1">
                  1. Taban Durumu (Base Case):
                </div>
                <div className="text-slate-200 font-semibold">
                  üs == 0 → <span className="text-emerald-400">1</span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Her sayının 0. kuvveti 1'dir. Özyineleme burada durur.
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80">
                <div className="text-xs text-amber-400 font-sans font-medium mb-1">
                  2. Özyineleme Adımı (Recursive Step):
                </div>
                <div className="text-slate-200 font-semibold">
                  taban<sup>üs</sup> = taban × taban<sup>(üs - 1)</sup>
                </div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Fonksiyon her adımda üssü bir azaltarak kendini çağırır.
                </div>
              </div>
            </div>

            {/* Author note */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Program Çıktısı İmza:</span>
              <span className="font-semibold text-amber-400">enes öztürk</span>
            </div>
          </div>
        </div>

        {/* Preset Scenarios Strip (Directly addressing user scenario prompt) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Kullanıcı Senaryoları (Doğrudan Test Et)
            </h2>
            <span className="text-xs text-slate-400">Tıklayarak konsola ve simülatöre aktarabilirsiniz</span>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className="group cursor-pointer bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-400">
                      {scenario.title}
                    </span>
                    <Play className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 font-mono text-xs space-y-1 mb-2.5">
                    <div className="text-slate-300">Taban değeri giriniz : <span className="text-amber-400 font-bold">{scenario.taban}</span></div>
                    <div className="text-slate-300">Üs değerini giriniz : <span className="text-amber-400 font-bold">{scenario.us}</span></div>
                    <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800">Sonuç : {scenario.sonuc}</div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {scenario.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Çalıştır & Görselleştir</span>
                  <span className="text-amber-400 font-medium">Seç →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
