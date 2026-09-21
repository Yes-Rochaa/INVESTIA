import React from 'react';
import { InvestmentPosition } from '../../types';
import { FileText, Download, ShieldCheck, AlertCircle, Scale, CheckCircle2 } from 'lucide-react';

interface FiscalViewProps {
  positions: InvestmentPosition[];
}

export const FiscalView: React.FC<FiscalViewProps> = ({ positions }) => {
  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  const sofipoTotal = positions
    .filter((p) => p.institutionType === 'SOFIPO')
    .reduce((acc, p) => acc + p.depositedAmount, 0);

  // 5 UMAs anualizadas para 2026 en México ≈ $198,140 MXN
  const uma5Anual = 198140;
  const isSofipoExempt = sofipoTotal <= uma5Anual;

  const cetesTotal = positions
    .filter((p) => p.institutionType === 'CETES_DIRECTO' || p.category === 'Fondos Deuda')
    .reduce((acc, p) => acc + p.depositedAmount, 0);

  const estimatedAnnualRetention = cetesTotal * 0.005; // 0.50%

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
              MÓDULO TRIBUTARIO SAT
            </span>
            <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
              LISR ART. 54 & 93 FRACC. XX
            </span>
          </div>
          <h1 className="font-sans font-bold text-xl text-white mt-1">
            Reporte Fiscal & Retenciones en México (2026)
          </h1>
          <p className="text-xs text-[#bbcabf]">
            Cálculo analítico de retenciones provisionales, exención de 5 UMAs en SOFIPOs y crédito acreditable para declaración anual.
          </p>
        </div>

        <button
          onClick={() => alert('Generando y descargando Constancia Fiscal Simulada SAT (Formato 37)...')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono font-medium text-white transition-colors border border-white/5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#4edea3]" />
          <span>Descargar Constancia Retenciones</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Exención SOFIPOs (5 UMAs) */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#c0c1ff] uppercase font-bold">
              SOFIPOs (Art. 93 LISR)
            </span>
            <ShieldCheck className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">
            Exención de 5 UMAs Anuales
          </h3>
          <p className="text-xs text-[#bbcabf]">
            Los rendimientos generados en SOFIPOs están exentos de ISR hasta un saldo de 5 UMAs anualizadas (~$198,140 MXN).
          </p>

          <div className="p-3 bg-[#0f131c] rounded-xl border border-white/5 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#86948a]">Tu Saldo en SOFIPOs:</span>
              <span className="font-bold text-white">{formatMXN(sofipoTotal)} MXN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#86948a]">Límite Exento 5 UMAs:</span>
              <span className="font-bold text-[#4edea3]">{formatMXN(uma5Anual)} MXN</span>
            </div>
            <div className="w-full bg-[#262a34] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#c0c1ff] h-full rounded-full"
                style={{ width: `${Math.min(100, (sofipoTotal / uma5Anual) * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-[#4edea3]">
              {isSofipoExempt
                ? '✓ 100% de tus intereses en SOFIPOs están totalmente libres de impuestos.'
                : '⚠ Excedente sujeto a retención conforme a ley.'}
            </div>
          </div>
        </div>

        {/* Card 2: Retención Art. 54 LISR */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold">
              Sistema Financiero (Art. 54)
            </span>
            <Scale className="w-4 h-4 text-[#4edea3]" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">
            Retención de Capital (0.50%)
          </h3>
          <p className="text-xs text-[#bbcabf]">
            Tasa aplicable por instituciones bancarias y Cetesdirecto sobre el monto del capital que dé lugar al pago de intereses.
          </p>

          <div className="p-3 bg-[#0f131c] rounded-xl border border-white/5 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#86948a]">Capital Sujeto a Retención:</span>
              <span className="font-bold text-white">{formatMXN(cetesTotal)} MXN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#86948a]">Retención Estimada Anual:</span>
              <span className="font-bold text-[#ffb4ab]">-{formatMXN(estimatedAnnualRetention)} MXN</span>
            </div>
            <div className="text-[10px] text-[#86948a] pt-1 border-t border-white/5">
              Este impuesto provisional es acreditable en tu Declaración Anual de personas físicas ante el SAT.
            </div>
          </div>
        </div>

        {/* Card 3: Renta Variable Bolsa */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold">
              Renta Variable (Art. 161)
            </span>
            <FileText className="w-4 h-4 text-[#ffb95f]" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">
            10% sobre Ganancia de Capital
          </h3>
          <p className="text-xs text-[#bbcabf]">
            La compraventa de acciones y ETFs en la Bolsa Mexicana de Valores (BMV/SIC) tributa con tasa definitiva del 10% únicamente sobre la utilidad neta real al enajenar.
          </p>

          <div className="p-3 bg-[#0f131c] rounded-xl border border-white/5 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#86948a]">Posición en ETFs (VOO):</span>
              <span className="font-bold text-white">$42,000 MXN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#86948a]">Ganancia No Realizada:</span>
              <span className="font-bold text-[#4edea3]">+$6,480 MXN</span>
            </div>
            <div className="text-[10px] text-[#4edea3]">
              ✓ No causa impuesto hasta el momento de venta de los títulos en broker.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
