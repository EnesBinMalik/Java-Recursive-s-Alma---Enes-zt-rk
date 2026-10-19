import React, { useState } from 'react';
import { Award, CheckCircle2, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const AuthorSignature: React.FC = () => {
  const [copiedReport, setCopiedReport] = useState(false);

  const reportText = `ÖDEV / PROJE RAPORU
Proje Adı: Recursive Metotlar ile Üslü Sayı Hesaplama
Geliştirici / İmza: Enes Öztürk
Programlama Dili: Java (JDK 8 / 17 / 21+)

PROBLEM VE SENARYO:
Kullanıcıdan taban ve üs değerleri alınarak özyinelemeli (recursive) metot ile üs alma işlemi gerçekleştirilmiştir.
- Test 1: Taban: 2, Üs: 0 -> Sonuç: 1
- Test 2: Taban: 2, Üs: 3 -> Sonuç: 8
- Test 3: Taban: 5, Üs: 3 -> Sonuç: 125

ALGORİTMA MANTIĞI:
1. Taban Durumu (Base Case): if (us == 0) return 1;
2. Recursive Bağıntı: return taban * usHesapla(taban, us - 1);
3. Zaman Karmaşıklığı: O(N)
4. Bellek Yığını (Call Stack): O(N)

Geliştirici: Enes Öztürk`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Signature Badge */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Resmi Proje & Kod İmzası
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            Geliştirici: <span className="text-amber-400">Enes Öztürk</span>
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
            Bu yazılım ve algoritma, Java dilinde kullanıcıdan alınan taban ve üs verileriyle
            özyinelemeli (recursive) üs alma hesaplamasını eksiksiz gerçekleştirmek ve senaryoyu
            (2⁰=1, 2³=8, 5³=125) doğrulamak üzere <strong>Enes Öztürk</strong> imzasıyla hazırlanmıştır.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Senaryo Doğrulandı (100% Uyum)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Clean Code & Standart Java</span>
            </div>
          </div>
        </div>

        {/* Right Column: Homework Submission Report Card */}
        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">
              Ödev / Çıktı Rapor Özeti
            </span>
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
            >
              {copiedReport ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedReport ? 'Kopyalandı' : 'Raporu Kopyala'}</span>
            </button>
          </div>

          <div className="bg-[#0b0f19] p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1 select-all">
            <div className="text-slate-200 font-semibold">// Java Recursive Üs Alma</div>
            <div>Taban: 2, Üs: 0 → <span className="text-emerald-400 font-bold">1</span></div>
            <div>Taban: 2, Üs: 3 → <span className="text-emerald-400 font-bold">8</span></div>
            <div>Taban: 5, Üs: 3 → <span className="text-emerald-400 font-bold">125</span></div>
            <div className="pt-1 border-t border-slate-800 text-amber-400 font-medium">
              İmza: Enes Öztürk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
