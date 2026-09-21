import React, { useState } from 'react';
import { MarketTicker } from '../types';
import { CheckCircle2, Bell, X, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  tickers: MarketTicker[];
  totalWealth: number;
  annualYieldPercent: number;
  onNavigateToNotifications?: () => void;
  onNavigateToPortfolio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tickers,
  totalWealth,
  annualYieldPercent,
  onNavigateToNotifications,
  onNavigateToPortfolio,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const formatCurrency = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-72 right-0 h-16 bg-[#0a0e17]/95 backdrop-blur-xl z-40 border-b border-white/5 px-6 flex items-center justify-between gap-4"
    >
      {/* Live Market Indicators Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {tickers.map((t, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#262a34] font-mono text-xs text-[#dfe2ef] shrink-0 border border-white/5"
          >
            <span className="text-[#bbcabf] font-semibold text-[11px] uppercase tracking-wide">
              {t.label}
            </span>
            <span
              className={`font-semibold ${
                t.label.includes('INFLACIÓN')
                  ? 'text-[#ffb95f]'
                  : t.label.includes('CETES')
                  ? 'text-[#4edea3]'
                  : 'text-white'
              }`}
            >
              {t.value}
            </span>
            {t.source && (
              <span className="text-[10px] text-[#86948a] font-normal">
                {t.source}
              </span>
            )}
            {t.subtext && (
              <span className="text-[10px] text-[#ffb95f] font-medium">
                {t.subtext}
              </span>
            )}
          </div>
        ))}

        <div className="hidden xl:flex items-center gap-1 px-2 py-1 rounded bg-[#1c1f29] text-[#4edea3] text-[10px] font-mono border border-[#4edea3]/20 shrink-0">
          <CheckCircle2 className="w-3 h-3 text-[#4edea3]" />
          <span>Verificado: Banxico/INEGI</span>
        </div>
      </div>

      {/* Right Side: Quick KPIs, Bell & Profile */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Quick KPI pill */}
        <button
          onClick={onNavigateToPortfolio}
          className="hidden md:flex items-center gap-4 px-3.5 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] transition-all border border-white/5 text-right cursor-pointer group"
        >
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#bbcabf] uppercase tracking-wider">
              Patrimonio Total
            </span>
            <span className="font-mono text-sm text-white font-bold tracking-tight group-hover:text-[#4edea3] transition-colors">
              {formatCurrency(totalWealth)}{' '}
              <span className="text-[10px] text-[#bbcabf] font-normal">MXN</span>
            </span>
          </div>

          <div className="h-6 w-px bg-[#3c4a42]/50"></div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#bbcabf] uppercase tracking-wider">
              Rendimiento
            </span>
            <span className="font-mono text-xs text-[#4edea3] font-bold">
              +{annualYieldPercent.toFixed(1)}%{' '}
              <span className="text-[9px] text-[#bbcabf] font-normal">anual</span>
            </span>
          </div>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#bbcabf] hover:text-white flex items-center justify-center transition-colors relative border border-white/5"
            title="Alertas Patrimoniales"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ffb4ab] text-[#690005] font-mono text-[10px] font-bold flex items-center justify-center shadow">
              3
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div
              id="notifications-dropdown"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#181b25] border border-white/10 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#ffb95f]" />
                  <span className="font-sans font-bold text-sm text-white">
                    Alertas Patrimoniales (3)
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[#bbcabf] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-white/5 my-2 space-y-2">
                <div className="pt-2 text-xs">
                  <div className="flex items-center justify-between text-[#ffb95f] font-semibold">
                    <span>Klar Inversión a Plazo</span>
                    <span className="font-mono text-[10px] bg-[#ffb95f]/10 px-1.5 py-0.5 rounded">
                      08 Oct 2026
                    </span>
                  </div>
                  <p className="text-[#bbcabf] mt-1">
                    Vencimiento de pagaré de $24,660 MXN (13.00% tasa fija). Definir instrucción de reinversión para no perder tasa.
                  </p>
                </div>

                <div className="pt-2 text-xs">
                  <div className="flex items-center justify-between text-[#4edea3] font-semibold">
                    <span>Cetesdirecto 28 Días</span>
                    <span className="font-mono text-[10px] bg-[#4edea3]/10 px-1.5 py-0.5 rounded">
                      15 Oct 2026
                    </span>
                  </div>
                  <p className="text-[#bbcabf] mt-1">
                    Corte de subasta semanal ($50,000 MXN). Rendimiento estimado al corte: +$458 MXN.
                  </p>
                </div>

                <div className="pt-2 text-xs">
                  <div className="flex items-center justify-between text-[#c0c1ff] font-semibold">
                    <span>Cajitas Nu México</span>
                    <span className="font-mono text-[10px] bg-[#c0c1ff]/10 px-1.5 py-0.5 rounded">
                      Validación CNBV
                    </span>
                  </div>
                  <p className="text-[#bbcabf] mt-1">
                    Ajuste mensual de tasa flotante publicado por Nu Financiera. Cobertura PROSOFIPO al 100% activa.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowNotifications(false);
                  if (onNavigateToNotifications) onNavigateToNotifications();
                }}
                className="w-full mt-2 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#4edea3] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver Centro de Alertas Inteligentes</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 border-l border-white/5">
          <img
            alt="Alejandro Morales"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4edea3]/40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLK8lIDjOtN8WB-BYMO6vtUR-OW_bKlhfMbIMi-h8SPjnQckdt2RhZRAP5gEQiAm-zamHAL5BggEo6hdew3fnKt_DqIR7jhO94czVOOCxa43Iu02XpwADQ-YwF_UycOpEgp5qXvMruccNLJLFsGIplrFuqgXOGFk_OZGETrcQ5sJK90O8YrkIENQjlSAMrY-8NFatDqox0RkNHlZjHuHnXgPx35Wg45xXnw2UMyAVy"
            onError={(e) => {
              // Fallback if network blocked
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="hidden 2xl:flex flex-col text-left">
            <span className="font-sans text-xs font-semibold text-white leading-tight">
              Alejandro Morales
            </span>
            <span className="font-mono text-[9px] text-[#4edea3] uppercase tracking-wider font-semibold">
              Inversionista Verificado
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
