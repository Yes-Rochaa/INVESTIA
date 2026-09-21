import React, { useState } from 'react';
import { InvestmentPosition, WealthGoal } from '../../types';
import { ASSET_BREAKDOWN, MONTHLY_HISTORY_2026 } from '../../data/mockData';
import {
  Landmark,
  TrendingUp,
  PieChart as PieIcon,
  Calendar,
  ShieldAlert,
  ArrowRight,
  X,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  DollarSign,
  Scale,
} from 'lucide-react';

interface PatrimonioViewProps {
  positions: InvestmentPosition[];
  goals: WealthGoal[];
  onNavigateToPortfolio: () => void;
  onNavigateToDecisions: () => void;
  onNavigateToGoals: () => void;
  onOpenAddModal: () => void;
}

export const PatrimonioView: React.FC<PatrimonioViewProps> = ({
  positions,
  goals,
  onNavigateToPortfolio,
  onNavigateToDecisions,
  onNavigateToGoals,
  onOpenAddModal,
}) => {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'3M' | '6M' | '10M' | 'MAX'>('10M');
  const [allocationTab, setAllocationTab] = useState<'INSTRUMENTO' | 'RF_RV' | 'CURRENCY'>('INSTRUMENTO');
  const [monthlyInvested, setMonthlyInvested] = useState(4500);
  const [showDcaSuccess, setShowDcaSuccess] = useState(false);

  // Dynamic calculations based on live positions
  const totalWealth = positions.reduce((acc, p) => acc + p.depositedAmount + p.totalAccumulatedGain, 0);
  const totalContributed = positions.reduce((acc, p) => acc + p.depositedAmount, 0);
  const totalGain = positions.reduce((acc, p) => acc + p.totalAccumulatedGain, 0);

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  const handleCompleteDca = () => {
    setMonthlyInvested(6500);
    setShowDcaSuccess(true);
    setTimeout(() => setShowDcaSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Alerta Patrimonial Banner */}
      {!alertDismissed && (
        <div
          id="alert-banner-patrimonial"
          className="p-3.5 rounded-xl bg-[#181b25] border border-[#ffb95f]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/10 border border-[#ffb95f]/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#ffb95f]" />
            </div>
            <div className="text-xs text-[#dfe2ef]">
              <span className="font-mono font-bold text-[#ffb95f] uppercase tracking-wider mr-2">
                ALERTA PATRIMONIAL
              </span>
              <span className="font-medium text-white">
                2 inversiones próximas a corte/vencimiento •
              </span>{' '}
              <span className="text-[#bbcabf]">
                Klar (08 Oct) y Cetes 28D (15 Oct). La tasa flotante de Cajitas Nu requiere validación preventiva (CNBV 01/10/2026).
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={onNavigateToPortfolio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-semibold text-[#4edea3] transition-colors"
            >
              <span>Revisar posturas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAlertDismissed(true)}
              className="p-1.5 rounded-lg hover:bg-[#262a34] text-[#86948a] hover:text-white transition-colors"
              title="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Six Top Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Patrimonio Total */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-[#4edea3]/30 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Patrimonio Total
            </span>
            <Landmark className="w-4 h-4 text-[#4edea3]" />
          </div>
          <div className="font-mono text-xl font-bold text-white tracking-tight">
            {formatMXN(totalWealth)}
            <span className="text-xs text-[#bbcabf] font-normal ml-1">MXN</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-[#4edea3]">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4% vs 2025</span>
          </div>
        </div>

        {/* Card 2: Rendimiento Acumulado */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-[#4edea3]/30 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Rendimiento Acum.
            </span>
            <TrendingUp className="w-4 h-4 text-[#4edea3]" />
          </div>
          <div className="font-mono text-xl font-bold text-[#4edea3] tracking-tight">
            +{formatMXN(totalGain)}
            <span className="text-xs text-[#bbcabf] font-normal ml-1">MXN</span>
          </div>
          <div className="font-mono text-[11px] text-[#bbcabf]">
            +13.7% TWRR anual
          </div>
        </div>

        {/* Card 3: Aportación Media */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Aportación Media
            </span>
            <DollarSign className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <div className="font-mono text-xl font-bold text-white tracking-tight">
            $6,500
            <span className="text-xs text-[#bbcabf] font-normal ml-1">MXN</span>
          </div>
          <div className="text-[11px] text-[#bbcabf]">
            Ritmo mensual recurrente
          </div>
        </div>

        {/* Card 4: Estado de Metas */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Estado de Metas
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#ffb95f]" />
          </div>
          <div className="font-mono text-xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
            <span>3 de 4</span>
            <span className="text-xs text-[#ffb95f] font-mono font-semibold uppercase">
              Óptimo
            </span>
          </div>
          <div className="text-[11px] text-[#bbcabf]">
            1 cumplida al 100%
          </div>
        </div>

        {/* Card 5: Diversificación */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Diversificación
            </span>
            <PieIcon className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <div className="font-mono text-xl font-bold text-white tracking-tight">
            5 Clases
          </div>
          <div className="text-[11px] text-[#bbcabf] truncate" title="SOFIPO • CETES • ETFs • Fondos • Efectivo">
            SOFIPO • CETES • E...
          </div>
        </div>

        {/* Card 6: Próxima Aportación */}
        <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#bbcabf]">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              Próx. Aportación
            </span>
            <Calendar className="w-4 h-4 text-[#4edea3]" />
          </div>
          <div className="font-sans text-base font-bold text-white tracking-tight">
            15 Octubre
          </div>
          <div className="font-mono text-[11px] text-[#4edea3]">
            $3,000 MXN prog.
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Evolución Patrimonial YTD + Asset Allocation Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Evolución Patrimonial (7 cols) */}
        <div className="lg:col-span-7 bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                  EVOLUCIÓN PATRIMONIAL
                </span>
                <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
                  2026 YTD
                </span>
              </div>
              <h2 className="font-sans font-bold text-base text-white">
                Capital Aportado vs Rendimientos
              </h2>
            </div>

            <div className="flex items-center gap-1 bg-[#0f131c] p-1 rounded-lg border border-white/5 self-start sm:self-auto">
              {(['3M', '6M', '10M', 'MAX'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    selectedTimeframe === tf
                      ? 'bg-[#262a34] text-[#4edea3] shadow'
                      : 'text-[#86948a] hover:text-white'
                  }`}
                >
                  {tf === '10M' ? '10M (YTD)' : tf}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0f131c] p-3 rounded-xl border border-white/5">
            <div>
              <div className="font-mono text-[9px] text-[#bbcabf] uppercase">Capital Aportado</div>
              <div className="font-mono text-sm font-bold text-white">{formatMXN(totalContributed)}</div>
              <div className="font-mono text-[10px] text-[#86948a]">87.9% del total</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#bbcabf] uppercase">Rendimiento Bruto</div>
              <div className="font-mono text-sm font-bold text-[#4edea3]">+{formatMXN(totalGain)}</div>
              <div className="font-mono text-[10px] text-[#4edea3]">+12.1% acumulado</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#bbcabf] uppercase">Comisiones Broker</div>
              <div className="font-mono text-sm font-bold text-[#ffb4ab]">-$850</div>
              <div className="font-mono text-[10px] text-[#86948a]">Custodia & Corretaje</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#bbcabf] uppercase">Retención ISR (Art 54)</div>
              <div className="font-mono text-sm font-bold text-[#ffb4ab]">-$480</div>
              <div className="font-mono text-[10px] text-[#86948a]">0.50% tasa anual</div>
            </div>
          </div>

          {/* Line Chart Visualizer with SVG */}
          <div className="relative w-full h-52 bg-[#0a0e17] rounded-xl p-3 border border-white/5 flex flex-col justify-between overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-15">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-b border-r border-white/20"></div>
              ))}
            </div>

            <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="patrimonioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area under portfolio line */}
              <polygon
                points="30,160 100,145 170,135 240,125 310,115 380,105 450,92 520,80 590,72 670,55 670,165 30,165"
                fill="url(#patrimonioGrad)"
              />

              {/* Capital Invertido Line (Dotted Gray) */}
              <polyline
                points="30,160 100,154 170,148 240,142 310,136 380,130 450,124 520,118 590,115 670,112"
                fill="none"
                stroke="#86948a"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Valor Portafolio Line (Green Solid) */}
              <polyline
                points="30,160 100,145 170,135 240,125 310,115 380,105 450,92 520,80 590,72 670,55"
                fill="none"
                stroke="#4edea3"
                strokeWidth="3"
              />

              {/* Target Marker Circles */}
              <circle cx="670" cy="55" r="5" fill="#4edea3" stroke="#0f131c" strokeWidth="2" />
              <circle cx="670" cy="112" r="4" fill="#86948a" stroke="#0f131c" strokeWidth="2" />
            </svg>

            {/* X-Axis Months */}
            <div className="flex justify-between font-mono text-[10px] text-[#86948a] pt-1 z-10 border-t border-white/5">
              {MONTHLY_HISTORY_2026.map((m, idx) => (
                <span key={idx} className={m.month === 'Oct 26' ? 'text-[#4edea3] font-bold' : ''}>
                  {m.month}
                </span>
              ))}
            </div>
          </div>

          {/* Chart Legend & Spread */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-1">
            <div className="flex items-center gap-4 text-[#bbcabf]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                <span>Valor Portafolio: <strong className="text-white">{formatMXN(totalWealth)} MXN</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#86948a]"></span>
                <span>Capital Neto: <strong className="text-white">{formatMXN(totalContributed)} MXN</strong></span>
              </div>
            </div>

            <div className="text-[#4edea3] font-bold">
              SPREAD DE GENERACIÓN: +{formatMXN(totalGain)} MXN
            </div>
          </div>
        </div>

        {/* Right Card: Asset Allocation Donut (5 cols) */}
        <div className="lg:col-span-5 bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                ASSET ALLOCATION
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {formatMXN(totalWealth)}
              </span>
            </div>

            <h2 className="font-sans font-bold text-base text-white mt-1">
              ¿Dónde está mi dinero?
            </h2>
            <p className="text-xs text-[#bbcabf]">
              Distribución estratégica por clase de activo y perfil de riesgo en México.
            </p>

            {/* Sub-Pills */}
            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono">
              <button
                onClick={() => setAllocationTab('INSTRUMENTO')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  allocationTab === 'INSTRUMENTO'
                    ? 'bg-[#10b981] text-[#003824] font-bold'
                    : 'bg-[#0f131c] text-[#bbcabf] border border-white/5'
                }`}
              >
                Por Instrumento
              </button>
              <button
                onClick={() => setAllocationTab('RF_RV')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  allocationTab === 'RF_RV'
                    ? 'bg-[#10b981] text-[#003824] font-bold'
                    : 'bg-[#0f131c] text-[#bbcabf] border border-white/5'
                }`}
              >
                RF (70%) vs RV (25%)
              </button>
              <button
                onClick={() => setAllocationTab('CURRENCY')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  allocationTab === 'CURRENCY'
                    ? 'bg-[#10b981] text-[#003824] font-bold'
                    : 'bg-[#0f131c] text-[#bbcabf] border border-white/5'
                }`}
              >
                MXN (85%) / USD (15%)
              </button>
            </div>
          </div>

          {/* Donut Chart & Breakdown */}
          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#262a34" strokeWidth="14" />
                {/* Segments: CETES (32%), SOFIPOs (28%), ETFs (25%), Deuda (10%), Efectivo (5%) */}
                {/* Circumference = 2 * PI * 38 ≈ 238.76 */}
                {/* Cetes: 32% => 76.4 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#4edea3"
                  strokeWidth="14"
                  strokeDasharray="76.4 238.76"
                  strokeDashoffset="0"
                />
                {/* SOFIPOs: 28% => 66.85 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#c0c1ff"
                  strokeWidth="14"
                  strokeDasharray="66.85 238.76"
                  strokeDashoffset="-76.4"
                />
                {/* ETFs: 25% => 59.69 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#ffb95f"
                  strokeWidth="14"
                  strokeDasharray="59.69 238.76"
                  strokeDashoffset="-143.25"
                />
                {/* Fondos Deuda: 10% => 23.87 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#e29100"
                  strokeWidth="14"
                  strokeDasharray="23.87 238.76"
                  strokeDashoffset="-202.94"
                />
                {/* Efectivo: 5% => 11.94 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#86948a"
                  strokeWidth="14"
                  strokeDasharray="11.94 238.76"
                  strokeDashoffset="-226.81"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-lg font-bold text-white">100%</span>
                <span className="font-mono text-[9px] text-[#bbcabf] uppercase tracking-wider">
                  Asignado
                </span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-1.5 w-full text-xs font-mono">
              {ASSET_BREAKDOWN.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#dfe2ef] truncate">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold shrink-0 ml-2">
                    {formatMXN(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Protection Guarantee Badge */}
          <div className="p-2.5 rounded-xl bg-[#0f131c] border border-white/5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#bbcabf]">
              <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
              <span>COBERTURA PROSOFIPO / IPAB:</span>
            </div>
            <span className="text-[#4edea3] font-bold">
              100% Blindado (&lt; 25k UDIS)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section 1: Instrumentos Principales en Cartera */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-sans font-bold text-base text-white">
              Instrumentos Principales en Cartera
            </h2>
            <span className="font-mono text-[10px] text-[#4edea3] bg-[#003824] px-2 py-0.5 rounded border border-[#4edea3]/20">
              ACTUALIZACIÓN CONTINUA BANXICO
            </span>
          </div>
          <button
            onClick={onNavigateToPortfolio}
            className="text-xs font-mono font-semibold text-[#4edea3] hover:underline flex items-center gap-1"
          >
            <span>Ver todas las 9 posiciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid from Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Mercado Pago */}
          <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#262a34] flex items-center justify-center font-bold text-[#4edea3] text-xs">
                    MP
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">Mercado Pago</h3>
                    <p className="text-[11px] text-[#bbcabf]">Fondo BNDMX / GBM</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#262a34] text-[#bbcabf] font-semibold border border-white/5">
                  CNBV
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="text-[10px] font-mono text-[#bbcabf] uppercase">Capital Depositado</div>
                <div className="font-mono text-xl font-bold text-white">$15,000 <span className="text-xs text-[#bbcabf] font-normal">MXN</span></div>
              </div>

              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Tasa Anualizada:</span>
                  <span className="text-[#4edea3] font-bold">10.30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Ganancia est./mes:</span>
                  <span className="text-white">+$128 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Liquidez:</span>
                  <span className="text-white">Inmediata (24/7)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Perfil de Riesgo:</span>
                  <span className="text-[#4edea3]">Bajo</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-[#86948a]">
              <span>REG: BNDMX-GBM</span>
              <span>Fte: 02/10/2026</span>
            </div>
          </div>

          {/* Card 2: Nu México */}
          <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-3 flex flex-col justify-between ring-1 ring-[#c0c1ff]/20">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#262a34] flex items-center justify-center font-bold text-[#c0c1ff] text-xs">
                    NU
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">Nu México</h3>
                    <p className="text-[11px] text-[#bbcabf]">Cuenta Nu • SOFIPO</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#c0c1ff]/10 text-[#c0c1ff] font-semibold border border-[#c0c1ff]/20">
                  PROSOFIPO
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="text-[10px] font-mono text-[#bbcabf] uppercase">Capital en Cajitas</div>
                <div className="font-mono text-xl font-bold text-white">$45,000 <span className="text-xs text-[#bbcabf] font-normal">MXN</span></div>
              </div>

              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Tasa Rendimiento:</span>
                  <span className="text-[#4edea3] font-bold">13.50% anual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Proyección mensual:</span>
                  <span className="text-white">+$506 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Liquidez:</span>
                  <span className="text-white">Cajitas 24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Garantía Segura:</span>
                  <span className="text-[#c0c1ff]">Hasta $204,500 MXN</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono">
              <span className="text-[#4edea3] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Seguro Activo
              </span>
              <span className="text-[#86948a]">Fte: Nu 28/09/2026</span>
            </div>
          </div>

          {/* Card 3: Cetesdirecto */}
          <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#262a34] flex items-center justify-center font-bold text-[#4edea3] text-xs">
                    CET
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">Cetesdirecto</h3>
                    <p className="text-[11px] text-[#bbcabf]">CETES 28 Días</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-semibold border border-[#4edea3]/20">
                  SHCP / BANXICO
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="text-[10px] font-mono text-[#bbcabf] uppercase">Posición Actual</div>
                <div className="font-mono text-xl font-bold text-white">$50,000 <span className="text-xs text-[#bbcabf] font-normal">MXN</span></div>
              </div>

              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Tasa de Subasta:</span>
                  <span className="text-[#4edea3] font-bold">11.00% anual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Rendimiento al corte:</span>
                  <span className="text-white">+$458 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Disponibilidad:</span>
                  <span className="text-white">Semanal (Jueves)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Riesgo País:</span>
                  <span className="text-[#4edea3]">Soberano México (AAA)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-[#86948a]">
              <span>VENCE: 15 OCT 2026</span>
              <span>Subasta Banxico</span>
            </div>
          </div>

          {/* Card 4: Vanguard S&P 500 */}
          <div className="bg-[#181b25] border border-white/5 p-4 rounded-xl shadow-md space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#262a34] flex items-center justify-center font-bold text-[#ffb95f] text-xs">
                    VOO
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">Vanguard S&P 500</h3>
                    <p className="text-[11px] text-[#bbcabf]">SIC BMV via GBM+</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#ffb95f]/10 text-[#ffb95f] font-semibold border border-[#ffb95f]/20">
                  RENTA VAR
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="text-[10px] font-mono text-[#bbcabf] uppercase">Valuación Portafolio</div>
                <div className="font-mono text-xl font-bold text-white">$42,000 <span className="text-xs text-[#bbcabf] font-normal">MXN</span></div>
              </div>

              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Precio por título:</span>
                  <span className="text-white">$9,650 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Ganancia No Realizada:</span>
                  <span className="text-[#4edea3] font-bold">+$6,480 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Rendimiento Hist. 1Y:</span>
                  <span className="text-[#4edea3] font-bold">+18.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86948a]">Liquidación:</span>
                  <span className="text-white">BMV Horario T+2</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-[#86948a]">
              <span>EXPOSICIÓN: USD/SP500</span>
              <span className="text-[#ffb95f]">Volatilidad Alta</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section 2: Objetivo de Aportación & Metas Patrimoniales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Objetivo de Aportación (5 cols) */}
        <div className="lg:col-span-5 bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4edea3]" />
                <h3 className="font-sans font-bold text-base text-white">Objetivo de Aportación</h3>
              </div>
              <span className="font-mono text-[10px] text-[#4edea3] bg-[#003824] px-2 py-0.5 rounded border border-[#4edea3]/20">
                OCTUBRE 2026
              </span>
            </div>
            <p className="text-xs text-[#bbcabf]">
              Estrategia Dollar-Cost Averaging (DCA) mensual para mitigar volatilidad cambiaria.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0f131c] border border-white/5 space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Invertido Este Mes</div>
                <div className="font-mono text-2xl font-bold text-[#4edea3]">{formatMXN(monthlyInvested)} <span className="text-xs text-[#bbcabf] font-normal">MXN</span></div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Meta Mensual</div>
                <div className="font-mono text-base font-bold text-white">$6,500 MXN</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#262a34] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#10b981] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (monthlyInvested / 6500) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#4edea3] font-semibold">
                {((monthlyInvested / 6500) * 100).toFixed(1)}% completado
              </span>
              <span className="text-[#bbcabf]">
                {monthlyInvested >= 6500 ? '¡Meta del mes alcanzada!' : `Faltante: ${formatMXN(6500 - monthlyInvested)} MXN`}
              </span>
            </div>
          </div>

          {showDcaSuccess && (
            <div className="p-2 rounded-lg bg-[#003824] border border-[#4edea3]/40 text-[#4edea3] text-xs font-mono text-center">
              ✓ ¡Aportación DCA completada exitosamente!
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleCompleteDca}
              disabled={monthlyInvested >= 6500}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                monthlyInvested >= 6500
                  ? 'bg-[#262a34] text-[#86948a] cursor-not-allowed'
                  : 'bg-[#10b981] hover:bg-[#059669] text-[#003824] shadow-lg cursor-pointer'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{monthlyInvested >= 6500 ? 'Aportación Completa' : '+ Completar aportación ($2,000)'}</span>
            </button>
            <button
              onClick={onNavigateToDecisions}
              className="px-4 py-2.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-xs font-mono font-medium transition-colors"
            >
              Configurar CLABE
            </button>
          </div>
        </div>

        {/* Right: Metas Patrimoniales en Progreso (7 cols) */}
        <div className="lg:col-span-7 bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                <h3 className="font-sans font-bold text-base text-white">Metas Patrimoniales en Progreso</h3>
              </div>
              <p className="text-xs text-[#bbcabf]">
                Seguimiento de horizontes temporales de ahorro e inversión con ajuste inflacionario.
              </p>
            </div>
            <button
              onClick={onNavigateToGoals}
              className="px-2.5 py-1 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono text-[#4edea3] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Meta</span>
            </button>
          </div>

          <div className="space-y-3">
            {goals.map((g) => {
              const pct = Math.min(100, (g.currentAmount / g.targetAmount) * 100);
              const isCompleted = g.status === 'COMPLETADO' || pct >= 100;
              return (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-[#0f131c] border border-white/5 space-y-2 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{g.title}</span>
                      {isCompleted && (
                        <span className="px-1.5 py-0.2 rounded bg-[#003824] text-[#4edea3] text-[9px] font-mono font-bold border border-[#4edea3]/30">
                          ¡COMPLETADO!
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-white font-bold">
                      {formatMXN(g.currentAmount)} / {formatMXN(g.targetAmount)} MXN
                    </span>
                  </div>

                  <div className="w-full bg-[#262a34] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isCompleted ? 'bg-[#4edea3]' : pct > 25 ? 'bg-[#c0c1ff]' : 'bg-[#ffb95f]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#86948a] font-mono">
                    <span>
                      {pct.toFixed(0)}% completado • Instrumentos: {g.instrumentsUsed}
                    </span>
                    <span>
                      {isCompleted ? 'Meta Cumplida' : `Faltan ${g.horizonMonths} meses (~${formatMXN(g.monthlyRequired)}/mes)`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#bbcabf]">
            <span>PROYECCIONES BASADAS EN RENDIMIENTO HISTÓRICO REAL</span>
            <span className="text-[#4edea3] font-semibold">Estatus General: En Camino</span>
          </div>
        </div>
      </div>

      {/* 6. Regulatory Institutional Disclaimer Footer */}
      <div className="p-4 rounded-xl bg-[#0a0e17] border border-white/5 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <Scale className="w-3.5 h-3.5 text-[#86948a]" />
          <span className="text-[#86948a] uppercase font-bold tracking-wider">
            Marco Normativo Vigente en México:
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#4edea3]">CNBV</span>
          <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#c0c1ff]">CONDUSEF</span>
          <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#ffb95f]">PROSOFIPO (25,000 UDI)</span>
          <span className="ml-auto text-[#86948a]">ID: INV-MXN-2026-V8</span>
        </div>
        <p className="text-[11px] text-[#86948a] leading-relaxed">
          Ley para Regular las Agrupaciones Financieras, Ley del Mercado de Valores y Ley de Ahorro y Crédito Popular. INVESTIA México es una plataforma analítica y de consolidación independiente; no actúa como entidad captadora ni provee asesoría personalizada de inversión. Rendimientos pasados no garantizan desempeños futuros. Los recursos en Sociedades Financieras Populares (SOFIPOs) se encuentran protegidos por el Fondo de Protección hasta por un monto equivalente a 25,000 Unidades de Inversión (UDIs) por persona física.
        </p>
      </div>
    </div>
  );
};
