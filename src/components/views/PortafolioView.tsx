import React, { useState } from 'react';
import { InvestmentPosition } from '../../types';
import {
  Wallet,
  PlusCircle,
  Download,
  Printer,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface PortafolioViewProps {
  positions: InvestmentPosition[];
  onOpenAddModal: () => void;
  onDeletePosition: (id: string) => void;
  onNavigateToDecisions: () => void;
}

export const PortafolioView: React.FC<PortafolioViewProps> = ({
  positions,
  onOpenAddModal,
  onDeletePosition,
  onNavigateToDecisions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  const filteredPositions = positions.filter((p) => {
    const matchesCat =
      selectedCategory === 'TODOS'
        ? true
        : selectedCategory === 'RENTA_FIJA'
        ? p.category === 'Renta Fija'
        : selectedCategory === 'SOFIPOS'
        ? p.category === 'SOFIPO'
        : selectedCategory === 'RENTA_VARIABLE'
        ? p.category === 'ETFs / Renta Variable'
        : p.category === 'Fondos Deuda' || p.category === 'Efectivo';

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.regulatoryFramework.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const totalInvested = positions.reduce((acc, p) => acc + p.depositedAmount, 0);
  const totalGain = positions.reduce((acc, p) => acc + p.totalAccumulatedGain, 0);
  const totalMonthlyYield = positions.reduce((acc, p) => acc + p.monthlyEstimatedYield, 0);
  const sofiposTotal = positions
    .filter((p) => p.institutionType === 'SOFIPO')
    .reduce((acc, p) => acc + p.depositedAmount, 0);

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Institucion,Monto_Invertido,Tasa_Anual,Ganancia_Acumulada,Liquidez,Marco_Regulatorio\n';
    const rows = positions
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.institution}",${p.depositedAmount},${p.annualRate}%,${p.totalAccumulatedGain},"${p.liquidity}","${p.regulatoryFramework}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'investia_portafolio_mexico_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
              MI PORTAFOLIO DE INVERSIONES
            </span>
            <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded border border-white/5">
              {positions.length} POSICIONES ACTIVAS
            </span>
          </div>
          <h1 className="font-sans font-bold text-xl text-white mt-1">
            Registro Consolidado de Instrumentos Financieros en México
          </h1>
          <p className="text-xs text-[#bbcabf]">
            Tasas de rendimiento vigentes, retención fiscal aplicable (Art. 54 LISR) y estado de escudos de protección (PROSOFIPO / IPAB).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono font-medium text-white transition-colors border border-white/5"
          >
            <Download className="w-3.5 h-3.5 text-[#bbcabf]" />
            <span>Exportar CSV / SAT</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono font-medium text-white transition-colors border border-white/5"
          >
            <Printer className="w-3.5 h-3.5 text-[#bbcabf]" />
            <span>Imprimir Constancia</span>
          </button>
          <button
            onClick={onOpenAddModal}
            id="btn-register-investment-top"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-xs font-mono font-bold text-[#003824] shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Registrar Inversión</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'TODOS', label: 'Todos', count: positions.length },
            { id: 'RENTA_FIJA', label: 'CETES / Renta Fija', count: positions.filter(p => p.category === 'Renta Fija').length },
            { id: 'SOFIPOS', label: 'SOFIPOs', count: positions.filter(p => p.category === 'SOFIPO').length },
            { id: 'RENTA_VARIABLE', label: 'ETFs / Renta Var.', count: positions.filter(p => p.category === 'ETFs / Renta Variable').length },
            { id: 'FONDOS_EFECTIVO', label: 'Fondos & Efectivo', count: positions.filter(p => p.category === 'Fondos Deuda' || p.category === 'Efectivo').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#10b981] text-[#003824]'
                  : 'bg-[#181b25] text-[#bbcabf] border border-white/5 hover:border-white/15'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#86948a]" />
          <input
            type="text"
            placeholder="Buscar instrumento o banco..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181b25] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#86948a] outline-none focus:border-[#4edea3]"
          />
        </div>
      </div>

      {/* 3. Comprehensive Positions Table */}
      <div className="bg-[#181b25] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0f131c] border-b border-white/5 text-[#86948a] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Instrumento & Entidad</th>
                <th className="py-3 px-3 font-semibold">Categoría / Marco</th>
                <th className="py-3 px-3 font-semibold text-right">Capital Invertido</th>
                <th className="py-3 px-3 font-semibold text-right">Tasa Anual</th>
                <th className="py-3 px-3 font-semibold text-right">Rend. Mes</th>
                <th className="py-3 px-3 font-semibold text-right">Ganancia Acum.</th>
                <th className="py-3 px-3 font-semibold">Liquidez</th>
                <th className="py-3 px-3 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPositions.map((pos) => (
                <tr key={pos.id} className="hover:bg-[#262a34]/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-sans font-bold text-sm text-white">{pos.name}</div>
                    <div className="text-[11px] text-[#bbcabf] truncate max-w-xs">{pos.institution}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        pos.category === 'SOFIPO'
                          ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border-[#c0c1ff]/20'
                          : pos.category === 'Renta Fija'
                          ? 'bg-[#4edea3]/10 text-[#4edea3] border-[#4edea3]/20'
                          : pos.category === 'ETFs / Renta Variable'
                          ? 'bg-[#ffb95f]/10 text-[#ffb95f] border-[#ffb95f]/20'
                          : 'bg-[#e29100]/10 text-[#ffb95f] border-[#e29100]/20'
                      }`}
                    >
                      {pos.category}
                    </span>
                    <div className="text-[9px] text-[#86948a] mt-0.5">{pos.regulatoryFramework}</div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="font-bold text-white text-sm">{formatMXN(pos.depositedAmount)}</div>
                    {pos.monthlyContribution > 0 && (
                      <div className="text-[10px] text-[#4edea3]">+{formatMXN(pos.monthlyContribution)}/mes</div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-bold text-[#4edea3] text-sm">{pos.annualRate.toFixed(2)}%</span>
                    <div className="text-[9px] text-[#86948a]">Bruta</div>
                  </td>

                  <td className="py-3 px-3 text-right text-white font-semibold">
                    +{formatMXN(pos.monthlyEstimatedYield)}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="font-bold text-[#4edea3]">+{formatMXN(pos.totalAccumulatedGain)}</div>
                    <div className="text-[9px] text-[#bbcabf]">Generado</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-white text-xs">{pos.liquidity}</div>
                    {pos.maturityDate && (
                      <div className="text-[10px] text-[#ffb95f]">Vence: {pos.maturityDate}</div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onDeletePosition(pos.id)}
                      title="Eliminar posición"
                      className="p-1.5 rounded-lg text-[#86948a] hover:text-[#ffb4ab] hover:bg-[#262a34] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPositions.length === 0 && (
          <div className="p-8 text-center text-[#86948a] font-mono text-xs">
            No se encontraron instrumentos para el filtro o búsqueda seleccionada.
          </div>
        )}
      </div>

      {/* 4. Three Bottom Analytical Cards from Image 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Proyección a 12 Meses */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
                PROYECCIÓN A 12 MESES
              </span>
              <TrendingUp className="w-4 h-4 text-[#4edea3]" />
            </div>
            <h3 className="font-sans font-bold text-base text-white mt-1">
              Interés Compuesto + Aportaciones
            </h3>
            <p className="text-xs text-[#bbcabf]">
              Con un ritmo de ahorro constante de $10,000 MXN mensuales y reinversión total.
            </p>
          </div>

          <div className="p-3 bg-[#0f131c] rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#86948a]">Rendimientos Proyectados:</span>
              <span className="text-[#4edea3] font-bold">+$48,910 MXN</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#86948a]">Valor Estimado al Cierre:</span>
              <span className="text-white font-bold text-sm">$453,410 MXN</span>
            </div>
          </div>

          <div className="h-10 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 300 40">
              <polyline
                points="0,35 60,30 120,24 180,18 240,10 300,4"
                fill="none"
                stroke="#4edea3"
                strokeWidth="2.5"
              />
              <circle cx="300" cy="4" r="4" fill="#4edea3" />
            </svg>
          </div>
        </div>

        {/* Card 2: Escudos Regulatorios */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#c0c1ff] uppercase font-bold tracking-wider">
                ESCUDOS REGULATORIOS
              </span>
              <ShieldCheck className="w-4 h-4 text-[#c0c1ff]" />
            </div>
            <h3 className="font-sans font-bold text-base text-white mt-1">
              Blindaje Institucional en México
            </h3>
            <p className="text-xs text-[#bbcabf]">
              Límites legales de protección contra quiebra de entidades financieras.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#bbcabf]">Fondo PROSOFIPO (25k UDIs):</span>
                <span className="text-white font-bold">{formatMXN(sofiposTotal)} / $204,500</span>
              </div>
              <div className="w-full bg-[#262a34] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#4edea3] h-full rounded-full"
                  style={{ width: `${Math.min(100, (sofiposTotal / 204500) * 100)}%` }}
                />
              </div>
              <div className="text-[9px] text-[#4edea3] mt-0.5">
                Zona Segura ({((sofiposTotal / 204500) * 100).toFixed(1)}% del límite)
              </div>
            </div>

            <div className="pt-1">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#bbcabf]">Seguro Bancario IPAB (400k UDIs):</span>
                <span className="text-white font-bold">$11,075 / $3,272,000</span>
              </div>
              <div className="text-[9px] text-[#86948a]">
                100% de capacidad disponible para pagarés bancarios.
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#bbcabf] pt-1 border-t border-white/5">
            Riesgo Global Calculado: <strong className="text-[#4edea3]">BAJO (Grado Inversión)</strong>
          </div>
        </div>

        {/* Card 3: Rebalanceo Sugerido */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold tracking-wider">
                REBALANCEO SUGERIDO
              </span>
              <Sparkles className="w-4 h-4 text-[#ffb95f]" />
            </div>
            <h3 className="font-sans font-bold text-base text-white mt-1">
              Optimización de Tasa Fija
            </h3>
            <p className="text-xs text-[#bbcabf]">
              Oportunidad identificada: Mover $20,000 MXN de Nu Cajita a Cetes 364D o Bonos M para amarrar tasa fija previo a posibles bajas de tasa de Banxico.
            </p>
          </div>

          <div className="p-3 bg-[#0f131c] rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#86948a]">Diferencial Estimado:</span>
              <span className="text-[#4edea3] font-bold">+1.8% a 12 meses</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#86948a]">Beneficio Proyectado:</span>
              <span className="text-white font-semibold">+$2,480 MXN</span>
            </div>
          </div>

          <button
            onClick={() => setShowRebalanceModal(true)}
            className="w-full py-2.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#ffb95f] hover:text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Simular Rebalanceo Inteligente</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Rebalance Modal */}
      {showRebalanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#181b25] border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ffb95f]" />
                <h3 className="font-bold text-white text-base">Simulación de Rebalanceo</h3>
              </div>
              <button onClick={() => setShowRebalanceModal(false)} className="text-[#86948a] hover:text-white">
                ✕
              </button>
            </div>

            <div className="text-xs text-[#dfe2ef] space-y-3">
              <p>
                Al transferir <strong>$20,000 MXN</strong> de Cajitas Nu (tasa flotante sujeta a recortes) a <strong>CETES 364 Días</strong> (11.20% tasa fija garantizada):
              </p>
              <div className="bg-[#0f131c] p-3 rounded-xl font-mono space-y-1.5">
                <div className="text-[#4edea3]">✓ Bloqueas tasa del 11.20% anual por los próximos 12 meses.</div>
                <div className="text-[#c0c1ff]">✓ Reduces exposición a SOFIPOs y liberas margen en PROSOFIPO.</div>
                <div className="text-white">✓ Garantía 100% directa del Gobierno Federal (SHCP / Banxico).</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRebalanceModal(false)}
                className="px-4 py-2 rounded-lg bg-[#262a34] text-xs text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert('Instrucción guardada: Se notificará en la subasta de Cetes del próximo martes.');
                  setShowRebalanceModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#10b981] text-[#003824] font-bold text-xs"
              >
                Confirmar Rebalanceo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
