import React, { useState } from 'react';
import { InvestmentPosition, InstitutionType, RiskLevel, LiquidityType, FiscalRegime } from '../types';
import { PlusCircle, X, Info, Sliders, Check } from 'lucide-react';

interface RegisterInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPosition: (position: InvestmentPosition) => void;
}

export const RegisterInvestmentModal: React.FC<RegisterInvestmentModalProps> = ({
  isOpen,
  onClose,
  onAddPosition,
}) => {
  const [institutionType, setInstitutionType] = useState<InstitutionType>('SOFIPO');
  const [institution, setInstitution] = useState('Nu México Financiera');
  const [productName, setProductName] = useState('Cajita Ahorro Rendimiento');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('BAJO');
  const [capital, setCapital] = useState<number>(15000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [annualRate, setAnnualRate] = useState<number>(13.50);
  const [startDate, setStartDate] = useState('2026-10-01');
  const [term, setTerm] = useState('1 Año');
  const [liquidity, setLiquidity] = useState<LiquidityType>('Inmediata 24/7');
  const [annualFee, setAnnualFee] = useState<number>(0.00);
  const [fiscalRegime, setFiscalRegime] = useState<FiscalRegime>('Exento SOFIPO (Hasta 5 UMAs anuales)');
  const [isAutoReinvest, setIsAutoReinvest] = useState(true);

  if (!isOpen) return null;

  // Real calculation for projected gross annual return
  // If auto-reinvest with monthly contributions:
  const monthlyRate = annualRate / 100 / 12;
  let simulatedBalance = capital;
  let grossYield = 0;
  for (let i = 0; i < 12; i++) {
    const yieldThisMonth = simulatedBalance * monthlyRate;
    grossYield += yieldThisMonth;
    simulatedBalance = simulatedBalance + yieldThisMonth + monthlyContribution;
  }
  const projectedTotalAtOneYear = simulatedBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPos: InvestmentPosition = {
      id: 'pos-' + Date.now(),
      name: productName,
      institution: institution,
      institutionType: institutionType,
      productCode: institutionType === 'SOFIPO' ? 'NU' : institutionType === 'CETES_DIRECTO' ? 'CT' : 'INV',
      category: institutionType === 'SOFIPO' ? 'SOFIPO' : institutionType === 'CETES_DIRECTO' ? 'Renta Fija' : institutionType === 'CASA_DE_BOLSA' ? 'ETFs / Renta Variable' : 'Fondos Deuda',
      regulatoryFramework: institutionType === 'SOFIPO' ? 'PROSOFIPO (25k UDIs)' : institutionType === 'CETES_DIRECTO' ? 'Deuda Soberana SHCP' : institutionType === 'BANCO' ? 'Protección IPAB (400k UDIs)' : 'Custodia CNBV / SEC',
      protectionCeiling: institutionType === 'SOFIPO' ? 'Tope legal: $204,500 MXN' : institutionType === 'BANCO' ? 'Tope legal: $3,272,000 MXN' : 'Garantía Soberana SHCP',
      depositedAmount: Number(capital),
      monthlyContribution: Number(monthlyContribution),
      annualRate: Number(annualRate),
      monthlyEstimatedYield: Math.round(grossYield / 12),
      totalAccumulatedGain: Math.round(grossYield / 12),
      liquidity: liquidity,
      riskLevel: riskLevel,
      startDate: startDate,
      fiscalRegime: fiscalRegime,
      annualFeePercent: Number(annualFee),
      isAutoReinvest: isAutoReinvest,
      notes: `Registrado en portafolio bajo regulación ${institutionType}. Plazo objetivo: ${term}.`
    };

    onAddPosition(newPos);
    onClose();
  };

  const handleInstitutionTypeChange = (type: InstitutionType) => {
    setInstitutionType(type);
    if (type === 'SOFIPO') {
      setInstitution('Nu México Financiera');
      setProductName('Cajita Ahorro Rendimiento');
      setAnnualRate(13.50);
      setFiscalRegime('Exento SOFIPO (Hasta 5 UMAs anuales)');
      setLiquidity('Inmediata 24/7');
      setRiskLevel('BAJO');
    } else if (type === 'CETES_DIRECTO') {
      setInstitution('Cetesdirecto / NAFIN S.N.C.');
      setProductName('CETES 28 Días');
      setAnnualRate(11.00);
      setFiscalRegime('Retención Art. 54 LISR (0.50% s/capital)');
      setLiquidity('Semanal (Jueves)');
      setRiskLevel('BAJO');
    } else if (type === 'BANCO') {
      setInstitution('Banregio / Hey Banco');
      setProductName('Pagaré Bancario 7 Días');
      setAnnualRate(10.00);
      setFiscalRegime('Retención Art. 54 LISR (0.50% s/capital)');
      setLiquidity('Semanal (Jueves)');
      setRiskLevel('BAJO');
    } else if (type === 'CASA_DE_BOLSA') {
      setInstitution('GBM+ / SIC BMV');
      setProductName('Vanguard S&P 500 ETF (VOO)');
      setAnnualRate(14.80);
      setFiscalRegime('10% s/Ganancia de Capital (Acciones/ETFs Art. 161)');
      setLiquidity('T+2 Mercado Abierto');
      setRiskLevel('ALTO');
    } else {
      setInstitution('Mercado Pago / GBM');
      setProductName('Fondo BNDMX Liquidez');
      setAnnualRate(10.30);
      setFiscalRegime('Retención Art. 54 LISR (0.50% s/capital)');
      setLiquidity('Inmediata 24/7');
      setRiskLevel('BAJO');
    }
  };

  return (
    <div
      id="register-investment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        id="register-investment-modal"
        className="relative w-full max-w-2xl bg-[#181b25] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0f131c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#003824] border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-white leading-tight">
                Registrar Inversión en Portafolio
              </h2>
              <p className="font-mono text-xs text-[#bbcabf]">
                Parámetros oficiales del sistema financiero mexicano
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#bbcabf] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Regulatory Info Banner */}
        <div className="p-4 mx-6 mt-4 rounded-xl bg-[#0a0e17] border border-[#4edea3]/20 flex items-center gap-3">
          <Info className="w-5 h-5 text-[#4edea3] shrink-0" />
          <p className="text-xs text-[#dfe2ef]">
            El cálculo de retención de ISR y seguro regulatorio se adaptará al tipo de institución seleccionado.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tipo de Institución */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Tipo de Institución *
              </label>
              <select
                id="select-institution-type"
                value={institutionType}
                onChange={(e) => handleInstitutionTypeChange(e.target.value as InstitutionType)}
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#4edea3] outline-none"
              >
                <option value="SOFIPO">SOFIPO (Protección 25,000 UDI)</option>
                <option value="CETES_DIRECTO">Cetesdirecto (Deuda Soberana SHCP)</option>
                <option value="BANCO">Banco Múltiple (Seguro IPAB 400k UDI)</option>
                <option value="CASA_DE_BOLSA">Casa de Bolsa (Custodia BMV/SIC)</option>
                <option value="FINTECH_REGULADA">Fintech Regulada IFPE (CNBV)</option>
              </select>
            </div>

            {/* Institución Financiera */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Institución Financiera *
              </label>
              <input
                id="input-institution-name"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#4edea3] outline-none font-sans"
                placeholder="Ej. Nu México Financiera"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre del Producto */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Nombre del Producto *
              </label>
              <input
                id="input-product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#4edea3] outline-none font-sans"
                placeholder="Ej. Cajita Ahorro Rendimiento"
              />
            </div>

            {/* Categoría de Riesgo */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Categoría de Riesgo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['BAJO', 'MEDIO', 'ALTO'] as RiskLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setRiskLevel(lvl)}
                    className={`py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                      riskLevel === lvl
                        ? lvl === 'BAJO'
                          ? 'bg-[#10b981] text-[#003824]'
                          : lvl === 'MEDIO'
                          ? 'bg-[#ffb95f] text-[#472a00]'
                          : 'bg-[#ffb4ab] text-[#690005]'
                        : 'bg-[#0f131c] text-[#bbcabf] border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Capital Inicial */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Capital Inicial (MXN) *
              </label>
              <div className="flex items-center bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2">
                <span className="text-[#86948a] font-mono text-sm mr-2">$</span>
                <input
                  id="modal-capital-input"
                  type="number"
                  min="0"
                  step="500"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  required
                  className="w-full bg-transparent font-mono text-sm text-white outline-none"
                />
              </div>
            </div>

            {/* Aportación Mensual Programada */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Aportación Mensual Programada
              </label>
              <div className="flex items-center bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2">
                <span className="text-[#86948a] font-mono text-sm mr-2">$</span>
                <input
                  id="modal-monthly-input"
                  type="number"
                  min="0"
                  step="250"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full bg-transparent font-mono text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tasa Anual Bruta */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Tasa Anual Bruta (%) *
              </label>
              <div className="flex items-center bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2">
                <input
                  id="modal-rate-input"
                  type="number"
                  step="0.05"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  required
                  className="w-full bg-transparent font-mono text-sm text-white outline-none"
                />
                <span className="text-[#4edea3] font-mono text-xs font-semibold whitespace-nowrap ml-2">
                  % Anual
                </span>
              </div>
            </div>

            {/* Fecha de Inicio */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
                Fecha de Inicio *
              </label>
              <input
                id="modal-start-date-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full bg-[#0f131c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#4edea3] outline-none font-mono"
              />
            </div>
          </div>

          {/* Plazo de la Inversión */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
              Plazo de la Inversión
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {['1 Mes', '3 Meses', '6 Meses', '1 Año', '3 Años', 'Personaliz.'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTerm(p)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    term === p
                      ? 'bg-[#10b981] text-[#003824] font-bold'
                      : 'bg-[#0f131c] text-[#bbcabf] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Disponibilidad de Liquidez */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-[#bbcabf] uppercase">
              Disponibilidad de Liquidez
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Inmediata 24/7', 'Días Hábiles (7:30 - 13:00)', 'Mensual', 'Al Vencimiento (Plazo Fijo)'] as LiquidityType[]).map((liq) => (
                <button
                  key={liq}
                  type="button"
                  onClick={() => setLiquidity(liq)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all truncate ${
                    liquidity === liq
                      ? 'bg-[#10b981] text-[#003824] font-bold'
                      : 'bg-[#0f131c] text-[#bbcabf] border border-white/10 hover:border-white/20'
                  }`}
                  title={liq}
                >
                  {liq}
                </button>
              ))}
            </div>
          </div>

          {/* Configuración Fiscal & Comisiones Section */}
          <div className="p-4 rounded-xl bg-[#0f131c] border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#4edea3]" />
                <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                  Configuración Fiscal & Comisiones
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#ffb95f]">
                ART. 54 / 93 LISR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#bbcabf] uppercase">
                  Comisión Anual por Manejo
                </label>
                <div className="flex items-center bg-[#181b25] border border-white/10 rounded-lg px-2.5 py-1.5">
                  <input
                    type="number"
                    step="0.01"
                    value={annualFee}
                    onChange={(e) => setAnnualFee(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-xs text-white outline-none"
                  />
                  <span className="font-mono text-xs text-[#86948a]">%</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#bbcabf] uppercase">
                  Régimen Fiscal ISR
                </label>
                <select
                  value={fiscalRegime}
                  onChange={(e) => setFiscalRegime(e.target.value as FiscalRegime)}
                  className="w-full bg-[#181b25] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                >
                  <option value="Exento SOFIPO (Hasta 5 UMAs anuales)">
                    Exento SOFIPO (Hasta 5 UMAs anuales)
                  </option>
                  <option value="Retención Art. 54 LISR (0.50% s/capital)">
                    Retención Art. 54 LISR (0.50% s/capital)
                  </option>
                  <option value="10% s/Ganancia de Capital (Acciones/ETFs Art. 161)">
                    10% s/Ganancia de Capital (Acciones/ETFs)
                  </option>
                  <option value="Exento Total (Deuda Soberana Exenta)">
                    Exento Total
                  </option>
                </select>
              </div>
            </div>

            {/* Reinversión automática switch */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <div className="text-xs font-semibold text-white">
                  Reinversión automática de rendimientos
                </div>
                <div className="text-[11px] text-[#86948a]">
                  Aplica interés compuesto continuo mes a mes
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAutoReinvest(!isAutoReinvest)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isAutoReinvest ? 'bg-[#10b981]' : 'bg-[#262a34]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isAutoReinvest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Real-time Projection Metrics */}
          <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#4edea3]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-[#bbcabf]">
                Rendimiento Anual Bruto Proyectado
              </div>
              <div className="font-mono text-xl font-bold text-[#4edea3]">
                +${Math.round(grossYield).toLocaleString('es-MX')}.00 MXN
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-mono uppercase text-[#bbcabf]">
                Valor al año (Con aportaciones)
              </div>
              <div className="font-mono text-xl font-bold text-white">
                ${Math.round(projectedTotalAtOneYear).toLocaleString('es-MX')}.00 MXN
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="btn-confirm-add-investment"
              className="px-6 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#003824] font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Guardar e Incorporar a Portafolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
