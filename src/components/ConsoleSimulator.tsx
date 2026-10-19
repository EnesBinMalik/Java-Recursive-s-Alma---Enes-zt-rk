import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { SCENARIOS, ScenarioItem } from '../data/javaSources';

interface ConsoleLog {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'signature' | 'error';
  text: string;
}

interface ConsoleSimulatorProps {
  onSendToVisualizer: (taban: number, us: number) => void;
  externalScenarioTrigger?: ScenarioItem | null;
}

export const ConsoleSimulator: React.FC<ConsoleSimulatorProps> = ({
  onSendToVisualizer,
  externalScenarioTrigger
}) => {
  const [tabanInput, setTabanInput] = useState<string>('5');
  const [usInput, setUsInput] = useState<string>('3');
  const [isCopied, setIsCopied] = useState(false);
  const [logs, setLogs] = useState<ConsoleLog[]>([
    { id: '1', type: 'system', text: 'java Main' },
    { id: '2', type: 'system', text: '==================================================' },
    { id: '3', type: 'system', text: '  RECURSIVE ÜSLÜ SAYI HESAPLAMA PROGRAMI' },
    { id: '4', type: 'system', text: '  Geliştirici: Enes Öztürk' },
    { id: '5', type: 'system', text: '==================================================' },
    { id: '6', type: 'prompt', text: 'Taban değeri giriniz : 2' },
    { id: '7', type: 'prompt', text: 'Üs değerini giriniz : 0' },
    { id: '8', type: 'output', text: 'Sonuç : 1' },
    { id: '9', type: 'prompt', text: 'Taban değeri giriniz : 2' },
    { id: '10', type: 'prompt', text: 'Üs değerini giriniz : 3' },
    { id: '11', type: 'output', text: 'Sonuç : 8' },
    { id: '12', type: 'prompt', text: 'Taban değeri giriniz : 5' },
    { id: '13', type: 'prompt', text: 'Üs değerini giriniz : 3' },
    { id: '14', type: 'output', text: 'Sonuç : 125' },
    { id: '15', type: 'signature', text: 'enes öztürk imzasıyla program aktif olarak çalışıyor...' },
  ]);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom on new log
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle external trigger if user clicked scenario in hero
  useEffect(() => {
    if (externalScenarioTrigger) {
      setTabanInput(String(externalScenarioTrigger.taban));
      setUsInput(String(externalScenarioTrigger.us));
      runCalculation(externalScenarioTrigger.taban, externalScenarioTrigger.us);
    }
  }, [externalScenarioTrigger]);

  // Pure recursive function matching Java's usHesapla
  const recursivePower = (base: number, exp: number): number => {
    if (exp === 0) return 1;
    return base * recursivePower(base, exp - 1);
  };

  const runCalculation = (baseVal?: number, expVal?: number) => {
    const b = baseVal !== undefined ? baseVal : parseInt(tabanInput, 10);
    const u = expVal !== undefined ? expVal : parseInt(usInput, 10);

    if (isNaN(b) || isNaN(u)) {
      setLogs(prev => [
        ...prev,
        { id: String(Date.now()), type: 'error', text: 'Hata: Lütfen geçerli bir sayı giriniz!' }
      ]);
      return;
    }

    if (u < 0) {
      setLogs(prev => [
        ...prev,
        { id: String(Date.now()), type: 'prompt', text: `Taban değeri giriniz : ${b}` },
        { id: String(Date.now() + 1), type: 'prompt', text: `Üs değerini giriniz : ${u}` },
        { id: String(Date.now() + 2), type: 'error', text: 'Hata: Üs değeri negatif olamaz! (Pozitif tam sayılar bekleniyor)' }
      ]);
      return;
    }

    if (u > 30) {
      setLogs(prev => [
        ...prev,
        { id: String(Date.now()), type: 'error', text: 'Uyarı: Java int/long taşmasını önlemek için üs değeri en fazla 30 olmalıdır.' }
      ]);
      return;
    }

    const result = recursivePower(b, u);

    setLogs(prev => [
      ...prev,
      { id: String(Date.now()), type: 'prompt', text: `Taban değeri giriniz : ${b}` },
      { id: String(Date.now() + 1), type: 'prompt', text: `Üs değerini giriniz : ${u}` },
      { id: String(Date.now() + 2), type: 'output', text: `Sonuç : ${result}` },
      { id: String(Date.now() + 3), type: 'signature', text: `Hesaplama tamamlandı. Enes Öztürk` }
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCalculation();
  };

  const handleRunFullScenario = () => {
    setLogs([
      { id: 'init-1', type: 'system', text: 'javac Main.java && java Main' },
      { id: 'init-2', type: 'system', text: '==================================================' },
      { id: 'init-3', type: 'system', text: '  RECURSIVE ÜSLÜ SAYI HESAPLAMA PROGRAMI' },
      { id: 'init-4', type: 'system', text: '  Geliştirici: Enes Öztürk' },
      { id: 'init-5', type: 'system', text: '==================================================' },
    ]);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        { id: 's1-1', type: 'prompt', text: 'Taban değeri giriniz : 2' },
        { id: 's1-2', type: 'prompt', text: 'Üs değerini giriniz : 0' },
        { id: 's1-3', type: 'output', text: 'Sonuç : 1' },
      ]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        { id: 's2-1', type: 'prompt', text: 'Taban değeri giriniz : 2' },
        { id: 's2-2', type: 'prompt', text: 'Üs değerini giriniz : 3' },
        { id: 's2-3', type: 'output', text: 'Sonuç : 8' },
      ]);
    }, 900);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        { id: 's3-1', type: 'prompt', text: 'Taban değeri giriniz : 5' },
        { id: 's3-2', type: 'prompt', text: 'Üs değerini giriniz : 3' },
        { id: 's3-3', type: 'output', text: 'Sonuç : 125' },
        { id: 's3-4', type: 'signature', text: 'enes öztürk imzasıyla olsun - Senaryo eksiksiz tamamlandı.' },
      ]);
    }, 1400);
  };

  const handleClearConsole = () => {
    setLogs([
      { id: String(Date.now()), type: 'system', text: 'Konsol temizlendi. Hazır. [Enes Öztürk]' }
    ]);
  };

  const handleCopyLogs = () => {
    const textToCopy = logs.map(l => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>java Main (JVM Terminal Konsolu)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
            title="Konsol Çıktısını Kopyala"
          >
            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{isCopied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
          <button
            onClick={handleClearConsole}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
            title="Konsolu Temizle"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="bg-[#0a0d14] p-5 font-mono text-xs sm:text-sm min-h-[300px] max-h-[420px] overflow-y-auto space-y-1.5 selection:bg-amber-500/30 selection:text-white">
        {logs.map((log) => {
          if (log.type === 'system') {
            return (
              <div key={log.id} className="text-slate-500">
                {log.text}
              </div>
            );
          }
          if (log.type === 'prompt') {
            return (
              <div key={log.id} className="text-slate-200 flex items-center gap-1">
                <span>{log.text}</span>
              </div>
            );
          }
          if (log.type === 'output') {
            return (
              <div key={log.id} className="text-emerald-400 font-bold bg-emerald-950/20 py-0.5 px-1.5 rounded inline-block">
                {log.text}
              </div>
            );
          }
          if (log.type === 'signature') {
            return (
              <div key={log.id} className="text-amber-400/90 text-xs italic pl-2 border-l border-amber-500/40 my-1">
                {log.text}
              </div>
            );
          }
          if (log.type === 'error') {
            return (
              <div key={log.id} className="text-red-400 bg-red-950/30 p-1.5 rounded">
                {log.text}
              </div>
            );
          }
          return null;
        })}
        <div ref={consoleEndRef} />
      </div>

      {/* Interactive Control Panel & Inputs */}
      <div className="bg-slate-950/90 p-4 border-t border-slate-800">
        <form onSubmit={handleFormSubmit} className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <label htmlFor="taban-input" className="text-xs text-slate-400 whitespace-nowrap">
              Taban:
            </label>
            <input
              id="taban-input"
              type="number"
              value={tabanInput}
              onChange={(e) => setTabanInput(e.target.value)}
              className="w-16 bg-slate-950 text-white font-mono text-sm px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-amber-400"
              placeholder="Taban"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <label htmlFor="us-input" className="text-xs text-slate-400 whitespace-nowrap">
              Üs:
            </label>
            <input
              id="us-input"
              type="number"
              min="0"
              max="30"
              value={usInput}
              onChange={(e) => setUsInput(e.target.value)}
              className="w-16 bg-slate-950 text-white font-mono text-sm px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-amber-400"
              placeholder="Üs"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Hesapla (Çalıştır)</span>
          </button>

          <button
            type="button"
            onClick={handleRunFullScenario}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Senaryoyu Sırayla Yürüt (2⁰, 2³, 5³)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const b = parseInt(tabanInput, 10);
              const u = parseInt(usInput, 10);
              if (!isNaN(b) && !isNaN(u)) {
                onSendToVisualizer(b, u);
              }
            }}
            className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg border border-slate-700/80 transition-colors"
            title="Çağrı Yığını Görselleştiricisine Aktar"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Görselleştiricide İncele</span>
          </button>
        </form>

        {/* Quick helper shortcuts */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500">Hazır Değerler:</span>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setTabanInput(String(sc.taban));
                setUsInput(String(sc.us));
                runCalculation(sc.taban, sc.us);
              }}
              className="text-slate-300 hover:text-amber-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] transition-colors"
            >
              {sc.taban}^{sc.us} = {sc.sonuc}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-500">
            İmza: Enes Öztürk
          </span>
        </div>
      </div>
    </div>
  );
};
