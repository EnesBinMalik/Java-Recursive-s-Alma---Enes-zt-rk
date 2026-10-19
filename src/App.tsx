import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConsoleSimulator } from './components/ConsoleSimulator';
import { CallStackVisualizer } from './components/CallStackVisualizer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { AlgorithmAnalysis } from './components/AlgorithmAnalysis';
import { AuthorSignature } from './components/AuthorSignature';
import { ScenarioItem } from './data/javaSources';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [visualizerBase, setVisualizerBase] = useState<number>(5);
  const [visualizerExp, setVisualizerExp] = useState<number>(3);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectScenario = (scenario: ScenarioItem) => {
    setSelectedScenario(scenario);
    setVisualizerBase(scenario.taban);
    setVisualizerExp(scenario.us);
    handleNavigate('simulator');
  };

  const handleSendToVisualizer = (taban: number, us: number) => {
    setVisualizerBase(taban);
    setVisualizerExp(us);
    handleNavigate('visualizer');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-200">
      {/* 3-Zone Top Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Overview & Scenario Quick Access */}
        <HeroSection
          onSelectScenario={handleSelectScenario}
          onOpenSimulator={() => handleNavigate('simulator')}
          onOpenVisualizer={() => handleNavigate('visualizer')}
        />

        {/* Core Container */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          {/* Section 1: Interactive Console Terminal Simulator */}
          <section id="simulator" className="scroll-mt-20">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <span>01. Etkileşimli Java Konsolu</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Canlı Konsol Simülatörü & Senaryo Yürütücü
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Kullanıcıdan alınan taban ve üs verileriyle Scanner döngüsünü birebir simüle edin.
              </p>
            </div>

            <ConsoleSimulator
              onSendToVisualizer={handleSendToVisualizer}
              externalScenarioTrigger={selectedScenario}
            />
          </section>

          {/* Section 2: Recursive Call Stack Visualizer */}
          <section id="visualizer" className="scroll-mt-20">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <span>02. Bellek & Yığın Simülasyonu</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recursive Çağrı Yığını (Call Stack) Adım Adım İnceleme
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                JVM'in özyinelemeli fonksiyon çağrılarını yığına nasıl eklediğini ve taban durumundan (üs = 0) sonra nasıl geriye çözüldüğünü (unwinding) adım adım izleyin.
              </p>
            </div>

            <CallStackVisualizer
              initialTaban={visualizerBase}
              initialUs={visualizerExp}
            />
          </section>

          {/* Section 3: Clean Production-Grade Java Source Code */}
          <section id="code" className="scroll-mt-20">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <span>03. Java Kaynak Kodları</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Derlenebilir ve Doğrulanmış Java Sınıfları
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ödev teslimine hazır, temiz kod prensiplerine uygun, Enes Öztürk imzalı Java kaynak kodları.
              </p>
            </div>

            <JavaCodeViewer />
          </section>

          {/* Section 4: Algorithm & Complexity Analysis */}
          <section id="analysis" className="scroll-mt-20">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <span>04. Algoritma ve Matematik</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Zaman ve Bellek Karmaşıklığı Analizi
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Matematiksel ispat, özyineleme ağacı ve O(log N) optimizasyon karşılaştırması.
              </p>
            </div>

            <AlgorithmAnalysis />
          </section>

          {/* Section 5: Signature & Author Details */}
          <section id="signature" className="scroll-mt-20">
            <AuthorSignature />
          </section>
        </div>
      </main>

      {/* Quiet Footer with Enes Öztürk Signature */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold">Java Recursive Üslü Sayı Hesaplama</span>
            <span aria-hidden="true">·</span>
            <span>Senaryo: 2⁰=1, 2³=8, 5³=125</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>İmza:</span>
            <span className="text-amber-400 font-semibold">Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
