/**
 * Java Kaynak Kodları ve Senaryo Tanımları
 * Geliştirici / Yazar: Enes Öztürk
 */

export interface ScenarioItem {
  id: string;
  title: string;
  taban: number;
  us: number;
  sonuc: number;
  description: string;
}

export const SCENARIOS: ScenarioItem[] = [
  {
    id: 'senaryo-1',
    title: 'Senaryo 1 (Sıfırıncı Üs Kuralı)',
    taban: 2,
    us: 0,
    sonuc: 1,
    description: 'Matematiksel kural gereği, sıfır hariç herhangi bir sayının sıfırıncı kuvveti 1\'dir. Bu durum recursive metodun taban durumudur (Base Case).'
  },
  {
    id: 'senaryo-2',
    title: 'Senaryo 2 (2³ = 8)',
    taban: 2,
    us: 3,
    sonuc: 8,
    description: '2 * (2 * (2 * 1)) adım adım 3 derinlikli özyinelemeli çağrı ile 8 sonucunu üretir.'
  },
  {
    id: 'senaryo-3',
    title: 'Senaryo 3 (5³ = 125)',
    taban: 5,
    us: 3,
    sonuc: 125,
    description: '5 * (5 * (5 * 1)) adımlarıyla taban 5 ve üs 3 için 125 sonucunu hesaplar. Enes Öztürk imzalı örnek senaryo.'
  }
];

export const JAVA_CODE_STANDARD = `/**
 * @author Enes Öztürk
 * Proje: Recursive Metotlar ile Üslü Sayı Hesaplama
 * Dil: Java (JDK 8+)
 * 
 * Açıklama:
 * Taban ve üs değerleri kullanıcıdan alınan üs alma işlemini 
 * "Recursive" (Özyinelemeli) metot kullanarak yapan Java programı.
 */

import java.util.Scanner;

public class Main {

    /**
     * Recursive Üs Alma Metodu
     * Matematiksel Formül: a^b = a * a^(b-1)
     * Taban Durumu (Base Case): a^0 = 1
     * 
     * @param taban Taban değeri
     * @param us Üs değeri
     * @return Hesaplanmış üslü sayı sonucu
     */
    static int usHesapla(int taban, int us) {
        // Taban durumu (Base case): Herhangi bir sayının 0. kuvveti 1'dir.
        if (us == 0) {
            return 1;
        }

        // Recursive çağrı: taban * usHesapla(taban, us - 1)
        return taban * usHesapla(taban, us - 1);
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  RECURSIVE ÜSLÜ SAYI HESAPLAMA PROGRAMI");
        System.out.println("  Geliştirici: Enes Öztürk");
        System.out.println("==================================================");

        // Kullanıcıdan sürekli veri alıp hesaplama yapan döngü
        while (true) {
            System.out.print("Taban değeri giriniz : ");
            int taban = scan.nextInt();

            System.out.print("Üs değerini giriniz : ");
            int us = scan.nextInt();

            if (us < 0) {
                System.out.println("Hata: Bu program pozitif üsler için tasarlanmıştır!");
            } else {
                int sonuc = usHesapla(taban, us);
                System.out.println("Sonuç : " + sonuc);
            }

            System.out.println(); // Yeni satır boşluğu
        }
    }
}
`;

export const JAVA_CODE_ROBUST = `/**
 * @author Enes Öztürk
 * Sınıf: RecursivePowerCalculator
 * Açıklama: Negatif üs korumalı, long veri tipli ve güvenli scanner okuyuculu sürüm.
 */

import java.util.Scanner;

public class RecursivePowerCalculator {

    // Enes Öztürk - Güvenli Recursive Üs Alma
    public static long power(long base, int exponent) {
        // Sıfırın sıfırıncı kuvveti matematiksel belirsizliktir, standart kural gereği 1 kabul edilir
        if (exponent == 0) {
            return 1L;
        }
        if (base == 0) {
            return 0L;
        }
        if (exponent < 0) {
            throw new IllegalArgumentException("Üs değeri negatif olamaz! Negatif üsler için kesirli hesaplama gereklidir.");
        }

        // Özyinelemeli adım
        return base * power(base, exponent - 1);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("--- Java Recursive Üs Alma Sistemi ---");
        System.out.println("Hazırlayan: Enes Öztürk | 2026");

        boolean calisiyor = true;
        while (calisiyor) {
            try {
                System.out.print("Taban değeri giriniz : ");
                long taban = scanner.nextLong();

                System.out.print("Üs değerini giriniz : ");
                int us = scanner.nextInt();

                if (us < 0) {
                    System.out.println("Uyarı: Lütfen 0 veya pozitif bir üs giriniz.");
                } else {
                    long sonuc = power(taban, us);
                    System.out.println("Sonuç : " + sonuc);
                }

                System.out.print("\\nDevam etmek istiyor musunuz? (E/H) : ");
                String cevap = scanner.next();
                if (cevap.equalsIgnoreCase("H") || cevap.equalsIgnoreCase("HAYIR")) {
                    calisiyor = false;
                }
                System.out.println("----------------------------------------------");
            } catch (Exception e) {
                System.out.println("Geçersiz giriş! Lütfen tam sayı giriniz.");
                scanner.nextLine(); // Hatalı girdiyi temizle
            }
        }

        System.out.println("Program başarıyla tamamlandı. Enes Öztürk iyi çalışmalar diler!");
        scanner.close();
    }
}
`;

export const JAVA_CODE_FAST = `/**
 * @author Enes Öztürk
 * İleri Seviye Optimizasyon: Hızlı Üs Alma (Fast Exponentiation)
 * Zaman Karmaşıklığı: O(log N)
 * 
 * Klasik O(N) yerine 2'nin kuvvetleriyle böl ve yönet (Divide and Conquer)
 */

public class FastExponentiation {

    public static long fastPower(long base, int exp) {
        // Taban durumları
        if (exp == 0) return 1;
        if (exp == 1) return base;

        // Üs çift ise: (base^(exp/2))^2
        if (exp % 2 == 0) {
            long half = fastPower(base, exp / 2);
            return half * half;
        } 
        // Üs tek ise: base * base^(exp - 1)
        else {
            return base * fastPower(base, exp - 1);
        }
    }
}
`;
