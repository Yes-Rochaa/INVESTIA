import React, { useState, useId } from 'react';
import { InvestmentPosition } from '../../types';
import {
  GitFork,
  Sliders,
  TrendingUp,
  ShieldCheck,
  Download,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface DecisionesViewProps {
  onApplyScenarioToPortfolio: (positions: InvestmentPosition[]) => void;
  onNavigateToPortfolio: () => void;
}

export const DecisionesView: React.FC<DecisionesViewProps> = ({
  onApplyScenarioToPortfolio,
  onNavigateToPortfolio,
}) => {
  const [initialCapital, setInitialCapital] = useState<number>(200000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [horizonYears, setHorizonYears] = useState<number>(3);
  const [annualInflation, setAnnualInflation] = useState<number>(4.50);
  const [isrRetention, setIsrRetention] = useState<number>(0.50);
  const [compoundInterest, setCompoundInterest] = useState<boolean>(true);
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'balanced' | 'optimistic'>('balanced');
  const [appliedNotification, setAppliedNotification] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);

  const initialCapitalInputId = useId();
  const monthlyContributionInputId = useId();
  const horizonYearsInputId = useId();
  const annualInflationInputId = useId();
  const isrRetentionInputId = useId();

  // Scenario rates
  const rates = {
    conservative: 9.50,
    balanced: 12.20,
    optimistic: 15.00,
  };

  // Math simulation engine
  const calculateProjection = (annualRatePercent: number) => {
    const months = horizonYears * 12;
    const monthlyRate = compoundInterest ? (annualRatePercent - isrRetention) / 100 / 12 : 0;
    let balance = initialCapital;
    let totalContributed = initialCapital;
    const trajectory: { month: number; balance: number; contributed: number }[] = [];

    trajectory.push({ month: 0, balance: initialCapital, contributed: initialCapital });

    for (let m = 1; m <= months; m++) {
      if (compoundInterest) {
        const yieldThisMonth = balance * monthlyRate;
        balance = balance + yieldThisMonth + monthlyContribution;
      } else {
        // Simple interest
        const monthlySimpleYield = initialCapital * ((annualRatePercent - isrRetention) / 100 / 12);
        balance = balance + monthlySimpleYield + monthlyContribution;
      }
      totalContributed += monthlyContribution;
      if (m % Math.max(1, Math.floor(months / 12)) === 0 || m === months) {
        trajectory.push({ month: m, balance: Math.round(balance), contributed: totalContributed });
      }
    }

    const netGain = balance - totalContributed;
    // Deflated real purchasing power
    const inflationFactor = Math.pow(1 + annualInflation / 100, horizonYears);
    const realPurchasingPower = balance / inflationFactor;

    return {
      finalBalance: Math.round(balance),
      totalContributed,
      netGain: Math.round(netGain),
      realPurchasingPower: Math.round(realPurchasingPower),
      trajectory,
    };
  };

  const conservativeCalc = calculateProjection(rates.conservative);
  const balancedCalc = calculateProjection(rates.balanced);
  const optimisticCalc = calculateProjection(rates.optimistic);

  const activeCalc =
    selectedScenario === 'conservative'
      ? conservativeCalc
      : selectedScenario === 'balanced'
      ? balancedCalc
      : optimisticCalc;

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  const handleApply = () => {
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
              CENTRO DE DECISIONES & ESCENARIOS
            </span>
            <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded border border-white/5">
              MÓDULO INSTITUCIONAL V2.4 • MARCO FISCAL ART. 54 LISR
            </span>
          </div>
          <h1 className="font-sans font-bold text-xl text-white mt-1">
            Simulador Estocástico & Optimización Patrimonial (MXN)
          </h1>
          <p className="text-xs text-[#bbcabf]">
            Proyecta diferentes combinaciones de CETES, SOFIPOs y Renta Variable con retención fiscal y ajuste inflacionario Banxico.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowDossierModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono font-medium text-white transition-colors border border-white/5"
          >
            <Download className="w-3.5 h-3.5 text-[#bbcabf]" />
            <span>Exportar Dossier PDF</span>
          </button>
          <button
            onClick={handleApply}
            id="btn-apply-scenario"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-xs font-mono font-bold text-[#003824] shadow-lg transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Aplicar al Portafolio</span>
          </button>
        </div>
      </div>

      {appliedNotification && (
        <div className="p-3 rounded-xl bg-[#003824] border border-[#4edea3]/40 text-[#4edea3] text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Parámetros de escenario {selectedScenario.toUpperCase()} aplicados exitosamente a tus proyecciones patrimoniales.
            </span>
          </div>
          <button
            onClick={onNavigateToPortfolio}
            className="underline font-bold text-white hover:text-[#4edea3] cursor-pointer"
          >
            Ver en Mi Portafolio →
          </button>
        </div>
      )}

      {/* 2. Main Grid: Parameter Controls (Left 5 cols) + Scenario Matrices & Charts (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Panel de Configuración Paramétrica */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#4edea3]" />
                <h2 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                  Configuración Paramétrica
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#bbcabf]">
                VALORES EN PESOS MEXICANOS
              </span>
            </div>

            {/* Slider 1: Capital Inicial */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={initialCapitalInputId} className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                  1. Capital Inicial (MXN)
                </label>
                <div className="flex items-center bg-[#0f131c] px-2.5 py-1 rounded-lg border border-white/10 font-mono text-sm font-bold text-white">
                  <span className="text-[#86948a] mr-1">$</span>
                  <input
                    id={initialCapitalInputId}
                    aria-label="1. Capital Inicial (MXN)"
                    type="number"
                    step="5000"
                    min="0"
                    max="5000000"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-24 bg-transparent text-right outline-none text-[#4edea3]"
                  />
                </div>
              </div>
              <input
                aria-label="Control deslizante de Capital Inicial (MXN)"
                type="range"
                min="0"
                max="1000000"
                step="5000"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-[#262a34] rounded-lg"
              />
              <p className="text-[11px] text-[#86948a]">
                Patrimonio base disponible para asignación estratégica inmediata.
              </p>
            </div>

            {/* Slider 2: Aportación Mensual */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={monthlyContributionInputId} className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                  2. Aportación Mensual (DCA)
                </label>
                <div className="flex items-center bg-[#0f131c] px-2.5 py-1 rounded-lg border border-white/10 font-mono text-sm font-bold text-white">
                  <span className="text-[#86948a] mr-1">$</span>
                  <input
                    id={monthlyContributionInputId}
                    aria-label="2. Aportación Mensual (DCA)"
                    type="number"
                    step="500"
                    min="0"
                    max="100000"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-24 bg-transparent text-right outline-none text-[#4edea3]"
                  />
                </div>
              </div>
              <input
                aria-label="Control deslizante de Aportación Mensual (DCA)"
                type="range"
                min="0"
                max="50000"
                step="500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-[#262a34] rounded-lg"
              />
              <p className="text-[11px] text-[#86948a]">
                Ahorro periódico recurrente para promediar costo de entrada (DCA).
              </p>
            </div>

            {/* Slider 3: Horizonte Temporal */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={horizonYearsInputId} className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                  3. Horizonte Temporal
                </label>
                <div className="flex items-center bg-[#0f131c] px-2.5 py-1 rounded-lg border border-white/10 font-mono text-sm font-bold text-white">
                  <input
                    id={horizonYearsInputId}
                    aria-label="3. Horizonte Temporal"
                    type="number"
                    min="1"
                    max="30"
                    value={horizonYears}
                    onChange={(e) => setHorizonYears(Number(e.target.value))}
                    className="w-12 bg-transparent text-right outline-none text-[#4edea3]"
                  />
                  <span className="text-[#bbcabf] ml-1">Años</span>
                </div>
              </div>
              <input
                aria-label="Control deslizante de Horizonte Temporal en Años"
                type="range"
                min="1"
                max="25"
                step="1"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-[#262a34] rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#86948a]">
                <span>1 Año</span>
                <span>3 Años</span>
                <span>5 Años</span>
                <span>10 Años</span>
                <span>20+ Años</span>
              </div>
            </div>

            {/* Parámetros Fiscales e Inflacionarios */}
            <div className="pt-3 border-t border-white/5 space-y-3">
              <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-bold tracking-wider">
                Parámetros Fiscales e Inflacionarios
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0f131c] p-2.5 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor={annualInflationInputId} className="text-[10px] font-mono text-[#86948a] uppercase">
                      Inflación Anual
                    </label>
                    <span className="text-[9px] font-mono text-[#ffb95f]">BANXICO</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      id={annualInflationInputId}
                      aria-label="Inflación Anual (BANXICO)"
                      type="number"
                      step="0.1"
                      value={annualInflation}
                      onChange={(e) => setAnnualInflation(Number(e.target.value))}
                      className="w-full bg-transparent font-mono text-sm font-bold text-white outline-none"
                    />
                    <span className="font-mono text-xs text-[#86948a]">%</span>
                  </div>
                </div>

                <div className="bg-[#0f131c] p-2.5 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor={isrRetentionInputId} className="text-[10px] font-mono text-[#86948a] uppercase">
                      Retención ISR
                    </label>
                    <span className="text-[9px] font-mono text-[#c0c1ff]">LISR 54</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      id={isrRetentionInputId}
                      aria-label="Retención ISR (LISR 54)"
                      type="number"
                      step="0.05"
                      value={isrRetention}
                      onChange={(e) => setIsrRetention(Number(e.target.value))}
                      className="w-full bg-transparent font-mono text-sm font-bold text-white outline-none"
                    />
                    <span className="font-mono text-xs text-[#86948a]">%</span>
                  </div>
                </div>
              </div>

              {/* Interés Compuesto Switch */}
              <div className="p-3 rounded-xl bg-[#0f131c] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Interés Compuesto</div>
                  <div className="text-[11px] text-[#86948a]">
                    Reinversión automática de rendimientos mes con mes
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCompoundInterest(!compoundInterest)}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                    compoundInterest
                      ? 'bg-[#10b981] text-[#003824]'
                      : 'bg-[#262a34] text-[#86948a]'
                  }`}
                >
                  {compoundInterest ? 'ACTIVADO' : 'SIMPLE'}
                </button>
              </div>
            </div>
          </div>

          {/* Resumen Matriz Base (Equilibrada) Box from Image 5 */}
          <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                RESUMEN MATRIZ BASE (EQUILIBRADA)
              </span>
              <span className="font-mono text-xs text-[#4edea3] font-bold">
                +21.2% real vs inflación
              </span>
            </div>

            <div className="pt-2">
              <div className="font-mono text-[10px] text-[#bbcabf] uppercase">
                Valor Futuro Estimado ({horizonYears} Años)
              </div>
              <div className="font-mono text-3xl font-bold text-[#4edea3] tracking-tight">
                {formatMXN(activeCalc.finalBalance)}{' '}
                <span className="text-sm font-normal text-[#bbcabf]">MXN</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#86948a]">Contribución Total:</span>
                <span className="text-white font-semibold">
                  {formatMXN(activeCalc.totalContributed)} (
                  {((activeCalc.totalContributed / activeCalc.finalBalance) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86948a]">Ganancia Compuesta Neta:</span>
                <span className="text-[#4edea3] font-semibold">
                  +{formatMXN(activeCalc.netGain)} (
                  {((activeCalc.netGain / activeCalc.finalBalance) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86948a]">Poder Adquisitivo Real:</span>
                <span className="text-[#c0c1ff] font-semibold">
                  {formatMXN(activeCalc.realPurchasingPower)} MXN
                </span>
              </div>
            </div>

            {/* PROSOFIPO Insurance Ceiling Progress */}
            <div className="p-3 rounded-xl bg-[#0f131c] border border-white/5 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#bbcabf] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3]" />
                  <span>Estatus Seguro PROSOFIPO:</span>
                </span>
                <span className="text-white font-bold">$144,398 / $204,500 MXN</span>
              </div>
              <div className="w-full bg-[#262a34] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '70.6%' }} />
              </div>
              <div className="text-[10px] font-mono text-[#4edea3]">
                ✓ Dentro de zona segura (25,000 UDIs por persona física)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Scenarios Cards + Trajectory Chart + Instruments Matrix */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Comparativa Ejecutiva de 3 Escenarios */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                Comparativa Ejecutiva de Escenarios
              </h3>
              <span className="font-mono text-xs text-[#bbcabf]">
                Haz clic para simular cada estrategia
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Escenario 1: Conservador */}
              <button
                onClick={() => setSelectedScenario('conservative')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  selectedScenario === 'conservative'
                    ? 'bg-[#1c1f29] border-[#4edea3] shadow-lg shadow-[#4edea3]/10'
                    : 'bg-[#181b25] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-bold">
                    Conservador
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-[#262a34] px-2 py-0.5 rounded">
                    9.50%
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-white">
                  {formatMXN(conservativeCalc.finalBalance)}
                </div>
                <div className="font-mono text-xs text-[#4edea3]">
                  +{formatMXN(conservativeCalc.netGain)} neta
                </div>
                <p className="text-[11px] text-[#86948a] mt-2 line-clamp-2">
                  80% CETES Deuda Soberana / 20% Sofipos AAA. Riesgo prácticamente nulo.
                </p>
              </button>

              {/* Escenario 2: Base Equilibrado (Recomendado) */}
              <button
                onClick={() => setSelectedScenario('balanced')}
                className={`p-4 rounded-xl text-left transition-all border relative ${
                  selectedScenario === 'balanced'
                    ? 'bg-[#1c1f29] border-[#4edea3] shadow-lg shadow-[#4edea3]/10 ring-1 ring-[#4edea3]'
                    : 'bg-[#181b25] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="absolute -top-2.5 right-3 bg-[#10b981] text-[#003824] px-2 py-0.5 rounded-full font-mono text-[9px] font-bold">
                  RECOMENDADO
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold">
                    Equilibrado
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3] bg-[#003824] px-2 py-0.5 rounded">
                    12.20%
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-white">
                  {formatMXN(balancedCalc.finalBalance)}
                </div>
                <div className="font-mono text-xs text-[#4edea3]">
                  +{formatMXN(balancedCalc.netGain)} neta
                </div>
                <p className="text-[11px] text-[#86948a] mt-2 line-clamp-2">
                  50% Sofipos / 30% Cetes / 20% ETFs Indexados. Riesgo moderado y seguro.
                </p>
              </button>

              {/* Escenario 3: Optimista Indexado */}
              <button
                onClick={() => setSelectedScenario('optimistic')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  selectedScenario === 'optimistic'
                    ? 'bg-[#1c1f29] border-[#ffb95f] shadow-lg shadow-[#ffb95f]/10'
                    : 'bg-[#181b25] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold">
                    Optimista
                  </span>
                  <span className="font-mono text-xs font-bold text-[#ffb95f] bg-[#ffb95f]/10 px-2 py-0.5 rounded">
                    15.00%
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-white">
                  {formatMXN(optimisticCalc.finalBalance)}
                </div>
                <div className="font-mono text-xs text-[#ffb95f]">
                  +{formatMXN(optimisticCalc.netGain)} neta
                </div>
                <p className="text-[11px] text-[#86948a] mt-2 line-clamp-2">
                  60% S&P 500 (VOO) / 30% Sofipos / 10% Cetes. Alta apreciación de capital.
                </p>
              </button>
            </div>
          </div>

          {/* 2. Curva de Proyección Dinámica (Interactive SVG) */}
          <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                  TRAYECTORIA DINÁMICA DE CAPITAL
                </span>
                <h3 className="font-sans font-bold text-base text-white">
                  Curva de Acumulación Compuesta ({horizonYears} Años)
                </h3>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-[#bbcabf]">Escenario Activo: </span>
                <span className="text-[#4edea3] font-bold">
                  {selectedScenario === 'conservative'
                    ? 'Conservador (9.50%)'
                    : selectedScenario === 'balanced'
                    ? 'Equilibrado (12.20%)'
                    : 'Optimista (15.00%)'}
                </span>
              </div>
            </div>

            <div className="relative w-full h-56 bg-[#0a0e17] rounded-xl p-3 border border-white/5 flex flex-col justify-between overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4edea3" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="50" x2="600" y2="50" stroke="#262a34" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#262a34" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="150" x2="600" y2="150" stroke="#262a34" strokeWidth="1" strokeDasharray="4" />

                {/* Contributed Base (Dotted line) */}
                <polyline
                  points="20,170 150,150 300,130 450,110 580,90"
                  fill="none"
                  stroke="#86948a"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Conservative Curve */}
                <polyline
                  points="20,170 150,140 300,110 450,80 580,55"
                  fill="none"
                  stroke="#c0c1ff"
                  strokeWidth={selectedScenario === 'conservative' ? 3 : 1.5}
                  strokeOpacity={selectedScenario === 'conservative' ? 1 : 0.4}
                />

                {/* Balanced Curve */}
                <polyline
                  points="20,170 150,135 300,100 450,65 580,35"
                  fill="none"
                  stroke="#4edea3"
                  strokeWidth={selectedScenario === 'balanced' ? 3.5 : 1.5}
                  strokeOpacity={selectedScenario === 'balanced' ? 1 : 0.4}
                />

                {/* Optimistic Curve */}
                <polyline
                  points="20,170 150,130 300,90 450,50 580,15"
                  fill="none"
                  stroke="#ffb95f"
                  strokeWidth={selectedScenario === 'optimistic' ? 3 : 1.5}
                  strokeOpacity={selectedScenario === 'optimistic' ? 1 : 0.4}
                />

                {/* Markers */}
                <circle cx="580" cy={selectedScenario === 'conservative' ? 55 : selectedScenario === 'balanced' ? 35 : 15} r="6" fill="#4edea3" stroke="#0f131c" strokeWidth="2" />
              </svg>

              <div className="flex justify-between font-mono text-[10px] text-[#86948a] pt-1 border-t border-white/5">
                <span>Mes 0 (Hoy)</span>
                <span>Mes {Math.round((horizonYears * 12) / 3)}</span>
                <span>Mes {Math.round(((horizonYears * 12) / 3) * 2)}</span>
                <span>Mes {horizonYears * 12} (Vencimiento)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#bbcabf]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86948a]"></span>
                  <span>Capital Depositado: {formatMXN(activeCalc.totalContributed)}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                  <span>Interés Compuesto: +{formatMXN(activeCalc.netGain)}</span>
                </span>
              </div>
              <span className="text-[#4edea3] font-bold">
                TOTAL: {formatMXN(activeCalc.finalBalance)} MXN
              </span>
            </div>
          </div>

          {/* 3. Matriz Comparativa de Instrumentos Regulados en México */}
          <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                  AUDITORÍA CNBV / CONDUSEF
                </span>
                <h3 className="font-sans font-bold text-base text-white">
                  Matriz de Instrumentos Regulados en México
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-2 py-0.5 rounded">
                ACTUALIZACIÓN BANXICO
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[#86948a] uppercase text-[10px]">
                    <th className="pb-2 font-semibold">Instrumento</th>
                    <th className="pb-2 font-semibold">Tasa Anual</th>
                    <th className="pb-2 font-semibold">Liquidez</th>
                    <th className="pb-2 font-semibold">Seguro / Blindaje</th>
                    <th className="pb-2 font-semibold">Impacto Fiscal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Cetesdirecto (CETES 28D)</td>
                    <td className="py-2.5 text-[#4edea3] font-bold">11.00%</td>
                    <td className="py-2.5 text-[#dfe2ef]">Semanal (Jueves)</td>
                    <td className="py-2.5 text-[#dfe2ef]">Soberano México (AAA)</td>
                    <td className="py-2.5 text-[#86948a]">Retención Art. 54 (0.50%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Nu México (Cajitas)</td>
                    <td className="py-2.5 text-[#4edea3] font-bold">13.50%</td>
                    <td className="py-2.5 text-[#dfe2ef]">Inmediata 24/7</td>
                    <td className="py-2.5 text-[#c0c1ff]">PROSOFIPO (25k UDIs)</td>
                    <td className="py-2.5 text-[#4edea3] font-semibold">Exento (hasta 5 UMAs)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Klar Plazo Fijo</td>
                    <td className="py-2.5 text-[#4edea3] font-bold">13.00%</td>
                    <td className="py-2.5 text-[#dfe2ef]">Plazo Fijo</td>
                    <td className="py-2.5 text-[#c0c1ff]">PROSOFIPO (25k UDIs)</td>
                    <td className="py-2.5 text-[#4edea3] font-semibold">Exento (hasta 5 UMAs)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Vanguard S&P 500 (VOO)</td>
                    <td className="py-2.5 text-[#ffb95f] font-bold">14.80% prom.</td>
                    <td className="py-2.5 text-[#dfe2ef]">T+2 BMV</td>
                    <td className="py-2.5 text-[#dfe2ef]">Indeval Custodia</td>
                    <td className="py-2.5 text-[#86948a]">10% sobre ganancia</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Mercado Pago (BNDMX)</td>
                    <td className="py-2.5 text-[#4edea3] font-bold">10.30%</td>
                    <td className="py-2.5 text-[#dfe2ef]">Inmediata 24/7</td>
                    <td className="py-2.5 text-[#dfe2ef]">Fondo Deuda GBM</td>
                    <td className="py-2.5 text-[#86948a]">Retención Art. 54 (0.50%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Transición Automatizada: Domiciliación CLABE */}
          <div className="p-4 rounded-xl bg-[#181b25] border border-[#4edea3]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <h4 className="font-sans font-bold text-sm text-white">
                ¿Deseas vincular este escenario como orden recurrente?
              </h4>
              <p className="text-xs text-[#bbcabf] mt-0.5">
                Programa transferencias automáticas SPEI a tu cuenta CLABE para cumplir la aportación mensual de {formatMXN(monthlyContribution)}.
              </p>
            </div>
            <button
              onClick={() => alert(`Configuración CLABE: Programa una transferencia de ${formatMXN(monthlyContribution)} MXN los días 1 y 15 de cada mes a tu cuenta concentradora Cetesdirecto o Nu.`)}
              className="px-4 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#4edea3] font-mono text-xs font-bold shrink-0 transition-colors"
            >
              Configurar Domiciliación
            </button>
          </div>
        </div>
      </div>

      {/* Dossier PDF Download Modal */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#181b25] border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#4edea3]" />
                <h3 className="font-bold text-white text-base">Dossier Ejecutivo de Escenarios</h3>
              </div>
              <button onClick={() => setShowDossierModal(false)} className="text-[#86948a] hover:text-white">
                ✕
              </button>
            </div>

            <div className="text-xs text-[#dfe2ef] space-y-2">
              <p>
                Se ha generado el resumen consolidado en formato estándar de reporte para inversionista:
              </p>
              <div className="bg-[#0f131c] p-3 rounded-xl font-mono space-y-1">
                <div>• Titular: Alejandro Morales (Inversionista Verificado)</div>
                <div>• Capital Base: {formatMXN(initialCapital)} MXN</div>
                <div>• Aportación: {formatMXN(monthlyContribution)} MXN/mes</div>
                <div>• Horizonte: {horizonYears} Años</div>
                <div>• Escenario Seleccionado: {selectedScenario.toUpperCase()}</div>
                <div>• Valor Proyectado: {formatMXN(activeCalc.finalBalance)} MXN</div>
                <div>• Ganancia Estimada: +{formatMXN(activeCalc.netGain)} MXN</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDossierModal(false)}
                className="px-4 py-2 rounded-lg bg-[#262a34] text-xs text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert('Descargando reporte financiero INVESTIA-MX-DOSSIER-2026.pdf...');
                  setShowDossierModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#10b981] text-[#003824] font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
