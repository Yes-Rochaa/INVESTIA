import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Sliders } from 'lucide-react';

export const CalculadoraView: React.FC = () => {
  const [initialCapital, setInitialCapital] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12.0);
  const [years, setYears] = useState<number>(5);
  const [inflation, setInflation] = useState<number>(4.5);
  const [isrRate, setIsrRate] = useState<number>(0.50);

  const months = years * 12;
  const netMonthlyRate = (rate - isrRate) / 100 / 12;

  let balance = initialCapital;
  let totalInvested = initialCapital;
  const yearlyBreakdown: { year: number; balance: number; contributed: number; interest: number }[] = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      const yieldMonth = balance * netMonthlyRate;
      balance = balance + yieldMonth + monthlyContribution;
      totalInvested += monthlyContribution;
    }
    yearlyBreakdown.push({
      year: y,
      balance: Math.round(balance),
      contributed: totalInvested,
      interest: Math.round(balance - totalInvested),
    });
  }

  const finalBalance = Math.round(balance);
  const totalInterest = Math.round(finalBalance - totalInvested);
  const inflationFactor = Math.pow(1 + inflation / 100, years);
  const realValue = Math.round(finalBalance / inflationFactor);

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            HERRAMIENTA ANALÍTICA
          </span>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
            FÓRMULA BANXICO / INTERÉS COMPUESTO
          </span>
        </div>
        <h1 className="font-sans font-bold text-xl text-white mt-1">
          Calculadora de Crecimiento & Rendimiento Compuesto
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Simula el efecto multiplicador de la reinversión de utilidades y aportaciones continuas con retención de ISR y deflación real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Sliders className="w-4 h-4 text-[#4edea3]" />
            <h2 className="font-sans font-bold text-sm text-white uppercase">Variables de Entrada</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#bbcabf] uppercase">Capital Inicial (MXN)</label>
            <input
              type="number"
              step="5000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#bbcabf] uppercase">Aportación Mensual (MXN)</label>
            <input
              type="number"
              step="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#bbcabf] uppercase">Tasa Anual Bruta (%)</label>
            <input
              type="number"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#bbcabf] uppercase">Plazo en Años</label>
            <input
              type="number"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#86948a] uppercase">Inflación (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value))}
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#86948a] uppercase">Retención ISR (%)</label>
              <input
                type="number"
                step="0.05"
                value={isrRate}
                onChange={(e) => setIsrRate(Number(e.target.value))}
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Results and Schedule */}
        <div className="lg:col-span-8 space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#181b25] border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Total Proyectado</div>
              <div className="font-mono text-2xl font-bold text-[#4edea3]">{formatMXN(finalBalance)}</div>
              <div className="text-[11px] text-[#86948a]">A {years} años</div>
            </div>

            <div className="p-4 rounded-xl bg-[#181b25] border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Ganancia Neta Compuesta</div>
              <div className="font-mono text-2xl font-bold text-white">+{formatMXN(totalInterest)}</div>
              <div className="text-[11px] text-[#4edea3]">
                {((totalInterest / finalBalance) * 100).toFixed(1)}% del valor final
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#181b25] border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Poder Adquisitivo Real</div>
              <div className="font-mono text-2xl font-bold text-[#c0c1ff]">{formatMXN(realValue)}</div>
              <div className="text-[11px] text-[#86948a]">Deflactado con {inflation}% anual</div>
            </div>
          </div>

          {/* Yearly Schedule Table */}
          <div className="bg-[#181b25] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-sans font-bold text-sm text-white">
                Cronograma de Acumulación Año con Año
              </h3>
              <span className="font-mono text-[10px] text-[#4edea3]">
                Tasa Neta: {(rate - isrRate).toFixed(2)}%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#0f131c] text-[#86948a] uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Año</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Capital Invertido</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Rendimiento Compuesto</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Saldo Final del Periodo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-[#262a34]/40 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-white">Año {row.year}</td>
                      <td className="py-2.5 px-3 text-right text-[#bbcabf]">{formatMXN(row.contributed)}</td>
                      <td className="py-2.5 px-3 text-right text-[#4edea3] font-bold">+{formatMXN(row.interest)}</td>
                      <td className="py-2.5 px-4 text-right text-white font-bold">{formatMXN(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
