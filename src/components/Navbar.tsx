import React from 'react';
import { Download, Code2 } from 'lucide-react';
import { JAVA_CODE_STANDARD } from '../data/javaSources';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const handleDownload = () => {
    const blob = new Blob([JAVA_CODE_STANDARD], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Main.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: 'simulator', label: 'Konsol Simülatörü' },
    { id: 'visualizer', label: 'Çağrı Yığını (Call Stack)' },
    { id: 'code', label: 'Java Kodu' },
    { id: 'analysis', label: 'Algoritma Analizi' },
    { id: 'signature', label: 'Enes Öztürk İmzası' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => onNavigate('simulator')} 
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
            <Code2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Java Recursive <span className="text-amber-400 font-semibold">Üs Alma</span>
          </span>
        </div>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  isActive ? 'text-amber-400 font-semibold' : 'hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            title="Main.java dosyasını bilgisayarına indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Java Kodunu İndir (.java)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
