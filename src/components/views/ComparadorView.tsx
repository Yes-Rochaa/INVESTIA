import React, { useState } from 'react';
import { Scale, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export const ComparadorView: React.FC = () => {
  const [testAmount, setTestAmount] = useState<number>(50000);
  const [termMonths, setTermMonths] = useState<number>(12);

  const instruments = [
    {
      name: 'CETES 28 Días',
      entity: 'Cetesdirecto / NAFIN',
      type: 'Deuda Soberana',
      rate: 11.00,
      gatNominal: 11.57,
      gatReal: 6.64,
      seguro: 'Garantía Federal Ilimitada',
      seguroType: 'Soberano',
      liquidez: 'Semanal (Martes/Jueves)',
      isr: 'Retención Art. 54 (0.50%)',
      comision: 0.0,
      color: '#4edea3',
    },
    {
      name: 'Nu México (Cajitas)',
      entity: 'Nu Financiera SFP',
      type: 'SOFIPO',
      rate: 13.50,
      gatNominal: 14.36,
      gatReal: 9.31,
      seguro: 'PROSOFIPO (25k UDIs ≈ $204.5k)',
      seguroType: 'PROSOFIPO',
      liquidez: 'Inmediata 24/7',
      isr: 'Exento (hasta 5 UMAs anuales)',
      comision: 0.0,
      color: '#c0c1ff',
    },
    {
      name: 'Klar Plazo Fijo',
      entity: 'Klar Servicios SFP',
      type: 'SOFIPO',
      rate: 13.00,
      gatNominal: 13.80,
      gatReal: 8.78,
      seguro: 'PROSOFIPO (25k UDIs)',
      seguroType: 'PROSOFIPO',
      liquidez: 'Al Vencimiento (Plazo)',
      isr: 'Exento (hasta 5 UMAs)',
      comision: 0.0,
      color: '#c0c1ff',
    },
    {
      name: 'Finsus 1 Año',
      entity: 'Financiera Sustentable SFP',
      type: 'SOFIPO',
      rate: 14.09,
      gatNominal: 15.03,
      gatReal: 9.95,
      seguro: 'PROSOFIPO (25k UDIs)',
      seguroType: 'PROSOFIPO',
      liquidez: 'Al Vencimiento',
      isr: 'Exento (hasta 5 UMAs)',
      comision: 0.0,
      color: '#c0c1ff',
    },
    {
      name: 'Mercado Pago (BNDMX)',
      entity: 'GBM / Grupo Bursátil',
      type: 'Fondo Deuda Corto Plazo',
      rate: 10.30,
      gatNominal: 10.80,
      gatReal: 5.91,
      seguro: 'Garantía Fondo BNDMX CNBV',
      seguroType: 'Fondo',
      liquidez: 'Inmediata 24/7',
      isr: 'Retención Art. 54 (0.50%)',
      comision: 0.25,
      color: '#e29100',
    },
    {
      name: 'Pagaré Hey Banco',
      entity: 'Banregio / Hey',
      type: 'Banco Múltiple',
      rate: 10.00,
      gatNominal: 10.47,
      gatReal: 5.59,
      seguro: 'Seguro IPAB (400k UDIs ≈ $3.2M)',
      seguroType: 'IPAB',
      liquidez: 'Semanal (7 Días)',
      isr: 'Retención Art. 54 (0.50%)',
      comision: 0.0,
      color: '#86948a',
    },
  ];

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            ANÁLISIS COMPARATIVO OFICIAL
          </span>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
            METODOLOGÍA BANXICO / CONDUSEF
          </span>
        </div>
        <h1 className="font-sans font-bold text-xl text-white mt-1">
          Comparador de Rendimiento Neto & GAT Real en México
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Contrasta tasas brutas, GAT Nominal, GAT Real (descontando inflación 4.62%), marco regulatorio e impacto del ISR.
        </p>
      </div>

      {/* Simulator Quick Box */}
      <div className="p-5 rounded-2xl bg-[#181b25] border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-sans font-bold text-sm text-white">
              Simulador de Rendimiento Comparativo a {termMonths} Meses
            </h3>
            <p className="text-xs text-[#bbcabf]">
              Calcula exactamente cuánto ganarás en cada instrumento para un capital de prueba:
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#0f131c] px-3 py-1.5 rounded-lg border border-white/10 font-mono text-sm">
              <span className="text-[#86948a] mr-1.5">$</span>
              <input
                type="number"
                step="5000"
                value={testAmount}
                onChange={(e) => setTestAmount(Number(e.target.value))}
                className="w-28 bg-transparent text-white font-bold outline-none"
              />
              <span className="text-xs text-[#bbcabf] ml-1">MXN</span>
            </div>

            <select
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              className="bg-[#0f131c] border border-white/10 text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
            >
              <option value="1">1 Mes</option>
              <option value="3">3 Meses</option>
              <option value="6">6 Meses</option>
              <option value="12">12 Meses</option>
              <option value="24">24 Meses</option>
            </select>
          </div>
        </div>

        {/* Live calculated yield cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-2">
          {instruments.map((inst, idx) => {
            const isExempt = inst.isr.includes('Exento');
            const effectiveRate = isExempt ? inst.rate : inst.rate - 0.50;
            const yieldVal = testAmount * (effectiveRate / 100) * (termMonths / 12);
            const totalVal = testAmount + yieldVal;

            return (
              <div
                key={idx}
                className="bg-[#0f131c] p-3 rounded-xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] text-[#bbcabf] uppercase">{inst.type}</div>
                  <div className="font-bold text-white text-xs truncate" title={inst.name}>
                    {inst.name}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-base font-bold text-[#4edea3]">
                    +{formatMXN(yieldVal)}
                  </div>
                  <div className="text-[10px] font-mono text-[#86948a]">
                    Total: {formatMXN(totalVal)}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] font-mono flex justify-between">
                  <span className="text-[#bbcabf]">Tasa: {inst.rate}%</span>
                  <span className="text-[#c0c1ff]">GAT: {inst.gatReal}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-[#181b25] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0f131c] border-b border-white/5 text-[#86948a] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Instrumento & Entidad</th>
                <th className="py-3 px-3 font-semibold">Tasa Anual Bruta</th>
                <th className="py-3 px-3 font-semibold">GAT Nominal</th>
                <th className="py-3 px-3 font-semibold">GAT Real (Banxico)</th>
                <th className="py-3 px-3 font-semibold">Seguro / Respaldo</th>
                <th className="py-3 px-3 font-semibold">Liquidez</th>
                <th className="py-3 px-3 font-semibold">Régimen Fiscal ISR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {instruments.map((inst, idx) => (
                <tr key={idx} className="hover:bg-[#262a34]/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-bold text-white text-sm">{inst.name}</div>
                    <div className="text-[11px] text-[#bbcabf]">{inst.entity}</div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#4edea3] text-sm">
                    {inst.rate.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-white">
                    {inst.gatNominal.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#c0c1ff]">
                    +{inst.gatReal.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-[#dfe2ef]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                      <span className="truncate max-w-xs">{inst.seguro}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-[#dfe2ef]">
                    {inst.liquidez}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inst.isr.includes('Exento')
                          ? 'bg-[#003824] text-[#4edea3] border border-[#4edea3]/30'
                          : 'bg-[#262a34] text-[#bbcabf]'
                      }`}
                    >
                      {inst.isr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
