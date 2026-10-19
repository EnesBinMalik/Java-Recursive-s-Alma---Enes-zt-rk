import React from 'react';
import { Network, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AlgorithmAnalysis: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Network className="w-5 h-5 text-amber-400" />
            <span>Matematiksel Mantık ve Algoritma Analizi</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Recursive (Özyinelemeli) üs alma algoritmasının çalışma mekanizması, karmaşıklık analizi ve Java sınırları.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Hazırlayan: <strong className="text-amber-400 font-semibold">Enes Öztürk</strong>
        </span>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Pillar 1: Time Complexity */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Zap className="w-4 h-4" />
            <h4 className="text-sm font-bold">Zaman Karmaşıklığı (Time)</h4>
          </div>
          <div className="font-mono text-xl font-bold text-white mb-1">
            O(N)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Burada <strong>N</strong> üs değeridir. Fonksiyon üs değeri 0 olana kadar tam <strong>N + 1</strong> kez çağrılır. Her çağrıda 1 çarpma işlemi yapıldığından süre doğrusal (linear) artar.
          </p>
        </div>

        {/* Pillar 2: Space Complexity */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <Network className="w-4 h-4" />
            <h4 className="text-sm font-bold">Bellek Karmaşıklığı (Space)</h4>
          </div>
          <div className="font-mono text-xl font-bold text-white mb-1">
            O(N) Yığın (Stack)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Döngülerin aksine (O(1) bellek), her recursive çağrı JVM bellek yığınına (Call Stack) bir frame ekler. Üs 3 ise bellekte aynı anda 4 stack frame bulunur.
          </p>
        </div>

        {/* Pillar 3: Fast Exponentiation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-sky-400">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-sm font-bold">Optimizasyon O(log N)</h4>
          </div>
          <div className="font-mono text-xl font-bold text-white mb-1">
            O(log₂ N)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hızlı Üs Alma (Divide & Conquer) tekniğiyle <code className="text-amber-300">b^(n) = (b^(n/2))²</code> yapılarak işlem sayısı 1000 adımdan yaklaşık 10 adıma düşürülebilir.
          </p>
        </div>
      </div>

      {/* Recursion Tree Breakdown */}
      <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
        <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
          Örnek Senaryo 3 Çözümleme Ağacı: usHesapla(5, 3)
        </h4>

        <div className="font-mono text-xs text-slate-300 space-y-2 bg-[#090d16] p-4 rounded-lg border border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">①</span>
            <span className="text-white font-semibold">usHesapla(5, 3)</span>
            <span className="text-slate-500">→ bekler:</span>
            <span>5 × usHesapla(5, 2)</span>
          </div>
          <div className="flex items-center gap-2 pl-4">
            <span className="text-amber-400">②</span>
            <span className="text-white font-semibold">usHesapla(5, 2)</span>
            <span className="text-slate-500">→ bekler:</span>
            <span>5 × usHesapla(5, 1)</span>
          </div>
          <div className="flex items-center gap-2 pl-8">
            <span className="text-amber-400">③</span>
            <span className="text-white font-semibold">usHesapla(5, 1)</span>
            <span className="text-slate-500">→ bekler:</span>
            <span>5 × usHesapla(5, 0)</span>
          </div>
          <div className="flex items-center gap-2 pl-12 bg-emerald-950/40 py-1 px-2 rounded border border-emerald-500/40 text-emerald-300">
            <span>④</span>
            <span className="font-bold">usHesapla(5, 0)</span>
            <span className="text-slate-300">→ Taban Durumu! Doğrudan döner:</span>
            <strong className="text-emerald-400 font-bold">1</strong>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <strong>Geriye Doğru Çözülme (Unwinding):</strong> ③'ye 1 döner → 5×1=5 | ②'ye 5 döner → 5×5=25 | ①'e 25 döner → 5×25=<strong className="text-emerald-400 font-bold">125</strong>
          </div>
        </div>
      </div>

      {/* Critical Java Caveats */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <h5 className="font-bold text-amber-300 mb-1">
            Java ile Recursive Yazarken Dikkat Edilmesi Gereken İpuçları
          </h5>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>
              <strong>StackOverflowError:</strong> Taban durumu (Base Case: <code className="text-amber-300">us == 0</code>) yazılmazsa metot sonsuz özyinelemeye girer ve JVM bellek hatası verir.
            </li>
            <li>
              <strong>Veri Tipi Taşması (Integer Overflow):</strong> Java'da <code className="text-amber-300">int</code> maksimum 2,147,483,647 değerini alabilir. Örneğin <code className="text-amber-300">5¹⁴</code> gibi büyük üslerde <code className="text-amber-300">long</code> veya <code className="text-amber-300">BigInteger</code> tercih edilmelidir.
            </li>
            <li>
              <strong>Negatif Üsler:</strong> <code className="text-amber-300">us &lt; 0</code> durumunda (örn. 2⁻³) sonuç ondalıklı (0.125) olacağından tam sayı metotlarında bu durum kontrol altına alınmalıdır.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
