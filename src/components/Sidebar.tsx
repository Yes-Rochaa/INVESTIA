import React from 'react';
import { NavigationTab } from '../types';
import {
  TrendingUp,
  Wallet,
  PlusCircle,
  Scale,
  Calculator,
  GitFork,
  Flag,
  Calendar,
  Receipt,
  FileText,
  BellRing,
  Sliders,
  ChevronDown,
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAddModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
}) => {
  return (
    <aside
      id="main-sidebar"
      className="fixed left-0 top-0 h-full w-72 bg-[#181b25] z-50 flex flex-col justify-between border-r border-white/5 shadow-2xl"
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between bg-[#0a0e17] border-b border-white/5 shrink-0">
          <button
            onClick={() => onSelectTab('mi-patrimonio')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#003824] to-[#10b981] flex items-center justify-center p-1 shadow-md border border-[#4edea3]/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4edea3]" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
                <circle cx="21" cy="7" r="2" fill="#4edea3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg text-[#4edea3] font-bold tracking-tight leading-none group-hover:text-white transition-colors">
                INVESTIA
              </span>
              <span className="font-mono text-[10px] text-[#bbcabf] tracking-widest uppercase font-semibold">
                MÉXICO • MXN
              </span>
            </div>
          </button>
          <span className="px-1.5 py-0.5 rounded bg-[#1c1f29] text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/20">
            PRO
          </span>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-4 space-y-4">
          {/* Section 1: Principal */}
          <div className="space-y-1">
            <div className="px-2 pb-1 flex items-center justify-between text-[#bbcabf] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Principal</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="space-y-0.5">
              <button
                id="nav-mi-patrimonio"
                onClick={() => onSelectTab('mi-patrimonio')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'mi-patrimonio'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>Mi Patrimonio</span>
              </button>

              <button
                id="nav-mi-portafolio"
                onClick={() => onSelectTab('mi-portafolio')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'mi-portafolio'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Wallet className="w-4 h-4 shrink-0" />
                <span>Mi Portafolio</span>
              </button>

              <button
                id="nav-agregar-inversion"
                onClick={() => {
                  onOpenAddModal();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef] group"
              >
                <PlusCircle className="w-4 h-4 shrink-0 text-[#4edea3] group-hover:scale-110 transition-transform" />
                <span className="text-[#4edea3] font-medium">Agregar Inversión</span>
              </button>
            </div>
          </div>

          {/* Section 2: Análisis y Estrategia */}
          <div className="space-y-1">
            <div className="px-2 pb-1 flex items-center justify-between text-[#bbcabf] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Análisis y Estrategia</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="space-y-0.5">
              <button
                id="nav-comparador-financiero"
                onClick={() => onSelectTab('comparador-financiero')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'comparador-financiero'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Scale className="w-4 h-4 shrink-0" />
                <span>Comparador Financiero</span>
              </button>

              <button
                id="nav-calculadora-crecimiento"
                onClick={() => onSelectTab('calculadora-de-crecimiento')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'calculadora-de-crecimiento'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Calculator className="w-4 h-4 shrink-0" />
                <span>Calculadora de Crecimiento</span>
              </button>

              <button
                id="nav-centro-decisiones"
                onClick={() => onSelectTab('centro-de-decisiones')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'centro-de-decisiones'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <GitFork className="w-4 h-4 shrink-0" />
                <span>Centro de Decisiones</span>
              </button>

              <button
                id="nav-mis-metas"
                onClick={() => onSelectTab('mis-metas-patrimoniales')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'mis-metas-patrimoniales'
                    ? 'bg-[#10b981] text-[#003824] font-semibold shadow-[inset_0_0_16px_rgba(16,185,129,0.2)]'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Flag className="w-4 h-4 shrink-0" />
                <span>Mis Metas Patrimoniales</span>
              </button>
            </div>
          </div>

          {/* Section 3: Gestión y Seguimiento */}
          <div className="space-y-1">
            <div className="px-2 pb-1 flex items-center justify-between text-[#bbcabf] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Gestión y Seguimiento</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="space-y-0.5">
              <button
                id="nav-aportaciones"
                onClick={() => onSelectTab('aportaciones-y-objetivos')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'aportaciones-y-objetivos'
                    ? 'bg-[#10b981] text-[#003824] font-semibold'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Aportaciones & Objetivos</span>
              </button>

              <button
                id="nav-movimientos"
                onClick={() => onSelectTab('movimientos-e-historial')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'movimientos-e-historial'
                    ? 'bg-[#10b981] text-[#003824] font-semibold'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Receipt className="w-4 h-4 shrink-0" />
                <span>Movimientos e Historial</span>
              </button>

              <button
                id="nav-reporte-fiscal"
                onClick={() => onSelectTab('reporte-mensual-y-fiscal')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'reporte-mensual-y-fiscal'
                    ? 'bg-[#10b981] text-[#003824] font-semibold'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Reporte Mensual & Fiscal</span>
              </button>

              <button
                id="nav-alertas"
                onClick={() => onSelectTab('alertas-inteligentes')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'alertas-inteligentes'
                    ? 'bg-[#10b981] text-[#003824] font-semibold'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <BellRing className="w-4 h-4 shrink-0" />
                <span>Alertas Inteligentes</span>
              </button>

              <button
                id="nav-config"
                onClick={() => onSelectTab('configuracion-y-fuentes-api')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium text-left ${
                  currentTab === 'configuracion-y-fuentes-api'
                    ? 'bg-[#10b981] text-[#003824] font-semibold'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2ef]'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Configuración & API</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Status Block */}
        <div className="p-3 bg-[#0a0e17] border-t border-white/5 space-y-2 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#262a34]/60 border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="font-mono text-[10px] text-[#bbcabf] font-semibold tracking-wider truncate">
              API BANXICO V2 / SIE CONECTADO
            </span>
          </div>
          <p className="px-1 text-[11px] text-[#86948a] leading-tight">
            Simulaciones con fines ilustrativos. Rendimientos pasados no garantizan rendimientos futuros.
          </p>
        </div>
      </div>
    </aside>
  );
};
