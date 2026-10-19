/**
 * Recursive Metot Çağrı Yığını (Call Stack) Simülatörü
 * Geliştirici: Enes Öztürk
 */

export interface StackFrame {
  id: string;
  depth: number;
  taban: number;
  us: number;
  status: 'active' | 'waiting' | 'resolved';
  returnValue?: number;
  expression: string;
}

export interface SimulationStep {
  stepIndex: number;
  type: 'push' | 'base_case' | 'unwind' | 'complete';
  title: string;
  description: string;
  activeLine: 1 | 2 | 3; // 1: Method entry, 2: if (us == 0), 3: return taban * usHesapla(...)
  stack: StackFrame[];
  unwindingFrameId?: string;
  currentResult?: number;
}

/**
 * Verilen taban ve üs için adım adım JVM çağrı yığını adımlarını oluşturur.
 */
export function generateSimulationSteps(taban: number, us: number): SimulationStep[] {
  // Sınırlandırma (Görselleştiricinin taşmaması için üs maksimum 10 olsun)
  const clampedUs = Math.max(0, Math.min(Math.floor(us), 8));
  const clampedTaban = Math.max(-100, Math.min(Math.floor(taban), 100));

  const steps: SimulationStep[] = [];
  const stackSnapshots: StackFrame[] = [];

  // Aşama 1: Çağrıların Yığına Eklenmesi (Winding / Pushing Phase)
  for (let currentUs = clampedUs; currentUs >= 0; currentUs--) {
    const depth = clampedUs - currentUs;
    const isBaseCase = currentUs === 0;

    const frame: StackFrame = {
      id: `frame-${currentUs}`,
      depth,
      taban: clampedTaban,
      us: currentUs,
      status: isBaseCase ? 'active' : 'waiting',
      expression: isBaseCase ? `usHesapla(${clampedTaban}, 0)` : `${clampedTaban} * usHesapla(${clampedTaban}, ${currentUs - 1})`
    };

    stackSnapshots.unshift({ ...frame });

    if (!isBaseCase) {
      steps.push({
        stepIndex: steps.length + 1,
        type: 'push',
        title: `Çağrı Yığınına Ekleme (Stack Push) [Derinlik ${depth + 1}]`,
        description: `usHesapla(${clampedTaban}, ${currentUs}) çağrıldı. us != 0 olduğu için metot tamamlanamaz; ${clampedTaban} * usHesapla(${clampedTaban}, ${currentUs - 1}) sonucunu beklemek üzere yığına (Call Stack) konur.`,
        activeLine: 3,
        stack: JSON.parse(JSON.stringify(stackSnapshots))
      });
    } else {
      // Taban durumu (Base case)
      steps.push({
        stepIndex: steps.length + 1,
        type: 'base_case',
        title: `Taban Durumuna (Base Case) Ulaşıldı! [Derinlik ${depth + 1}]`,
        description: `usHesapla(${clampedTaban}, 0) çağrıldı. us == 0 şartı sağlandı! Özyineleme durur ve doğrudan 1 değeri döndürülür. Artık yığın boşalmaya (Unwinding) başlayacak.`,
        activeLine: 2,
        stack: JSON.parse(JSON.stringify(stackSnapshots)),
        currentResult: 1
      });
    }
  }

  // Aşama 2: Yığından Çözülerek Dönme (Unwinding / Pop Phase)
  let accumulatedResult = 1;

  for (let currentUs = 0; currentUs <= clampedUs; currentUs++) {
    const frameIndex = stackSnapshots.findIndex(f => f.us === currentUs);
    if (frameIndex !== -1) {
      if (currentUs === 0) {
        stackSnapshots[frameIndex].status = 'resolved';
        stackSnapshots[frameIndex].returnValue = 1;
      } else {
        accumulatedResult = accumulatedResult * clampedTaban;
        stackSnapshots[frameIndex].status = 'resolved';
        stackSnapshots[frameIndex].returnValue = accumulatedResult;

        steps.push({
          stepIndex: steps.length + 1,
          type: 'unwind',
          title: `Geri Dönüş ve Çarpım (Stack Pop) [üs = ${currentUs}]`,
          description: `usHesapla(${clampedTaban}, ${currentUs - 1})'den dönen değer (${accumulatedResult / clampedTaban}) ile taban (${clampedTaban}) çarpıldı: ${clampedTaban} × ${accumulatedResult / clampedTaban} = ${accumulatedResult}. Bu değer bir üstteki çağrıya iletiliyor.`,
          activeLine: 3,
          stack: JSON.parse(JSON.stringify(stackSnapshots)),
          unwindingFrameId: stackSnapshots[frameIndex].id,
          currentResult: accumulatedResult
        });
      }
    }
  }

  // Final Adımı: Tamamlanma
  const finalResult = Math.pow(clampedTaban, clampedUs);
  steps.push({
    stepIndex: steps.length + 1,
    type: 'complete',
    title: `Hesaplama Tamamlandı! Sonuç: ${finalResult}`,
    description: `Tüm çağrılar başarıyla çözüldü. main() metoduna dönen nihai değer ${finalResult}. (Enes Öztürk imzasıyla)`,
    activeLine: 1,
    stack: JSON.parse(JSON.stringify(stackSnapshots)),
    currentResult: finalResult
  });

  return steps;
}
