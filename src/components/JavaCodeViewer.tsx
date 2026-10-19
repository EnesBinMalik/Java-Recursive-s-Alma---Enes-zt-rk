import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { JAVA_CODE_STANDARD, JAVA_CODE_ROBUST, JAVA_CODE_FAST } from '../data/javaSources';

export const JavaCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'robust' | 'fast'>('standard');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeCode = 
    activeTab === 'standard' 
      ? JAVA_CODE_STANDARD 
      : activeTab === 'robust' 
      ? JAVA_CODE_ROBUST 
      : JAVA_CODE_FAST;

  const fileName = 
    activeTab === 'standard' 
      ? 'Main.java' 
      : activeTab === 'robust' 
      ? 'RecursivePowerCalculator.java' 
      : 'FastExponentiation.java';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Code Viewer Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Java Kaynak Kodu (Eksiksiz & Derlenebilir)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Java Compiler (javac) ve JVM ile %100 uyumludur. Geliştirici: Enes Öztürk.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'standard'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Ödev / Standart Sürüm (Main.java)
          </button>
          <button
            onClick={() => setActiveTab('robust')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'robust'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Genişletilmiş (Hata Kontrollü)
          </button>
          <button
            onClick={() => setActiveTab('fast')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'fast'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Hızlı Üs Alma (O(log n))
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{fileName} İndir</span>
          </button>
        </div>
      </div>

      {/* Code Text with Line Numbers */}
      <div className="bg-[#0b0f19] p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed max-h-[500px] overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {activeCode.split('\n').map((line, idx) => {
              const lineNum = idx + 1;
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*');
              const isKeyword = line.includes('public class') || line.includes('static int') || line.includes('return') || line.includes('import');
              const isSignature = line.toLowerCase().includes('enes öztürk');

              return (
                <tr key={idx} className={isSignature ? 'bg-amber-500/10' : 'hover:bg-slate-800/40'}>
                  <td className="text-right pr-4 text-slate-600 select-none w-10 text-[11px] align-top py-0.5">
                    {lineNum}
                  </td>
                  <td className="text-slate-200 whitespace-pre align-top py-0.5">
                    {isSignature ? (
                      <span className="text-amber-300 font-semibold">{line}</span>
                    ) : isComment ? (
                      <span className="text-slate-500 italic">{line}</span>
                    ) : isKeyword ? (
                      <span className="text-amber-200">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Code Highlights & Pedagogical Callout */}
      <div className="bg-slate-950/80 p-5 border-t border-slate-800 grid md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Taban Durumu (Base Case)</span>
          </div>
          <code className="text-[11px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-300 block mb-1">
            if (us == 0) return 1;
          </code>
          <p className="text-slate-400 text-[11px]">
            Sonsuz özyinelemeyi (StackOverflowError) önleyen en kritik satırdır. Üs 0 olduğunda fonksiyon durup 1 döndürür.
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. Özyinelemeli Çağrı</span>
          </div>
          <code className="text-[11px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-300 block mb-1">
            return taban * usHesapla(taban, us - 1);
          </code>
          <p className="text-slate-400 text-[11px]">
            Metot her çağrıda üssü 1 azaltır. Dönen sonuç taban ile çarpılarak bir üst çağrıya aktarılır.
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Senaryo Uyumluluğu</span>
          </div>
          <code className="text-[11px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-300 block mb-1">
            while(true) &#123; scan.nextInt(); &#125;
          </code>
          <p className="text-slate-400 text-[11px]">
            Senaryodaki 3 farklı durumun (2⁰=1, 2³=8, 5³=125) kesintisiz test edilmesi için konsol döngü içerisindedir.
          </p>
        </div>
      </div>
    </div>
  );
};
