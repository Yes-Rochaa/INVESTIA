import React, { useState } from 'react';
import { BellRing, ShieldAlert, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export const AlertasView: React.FC = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'vencimiento',
      title: 'Vencimiento Próximo: Klar Plazo Fijo',
      date: '08 Oct 2026',
      amount: '$24,660 MXN',
      desc: 'Tu pagaré a plazo fijo con tasa del 13.00% vencerá en 4 días. Elige si deseas reinvertir a tasa vigente o transferir a Cetes.',
      status: 'PENDIENTE',
      color: '#ffb95f',
    },
    {
      id: 2,
      type: 'corte',
      title: 'Corte de Subasta: Cetes 28 Días',
      date: '15 Oct 2026',
      amount: '$50,000 MXN',
      desc: 'Corte regular de subasta con abono de rendimientos por +$458 MXN. La reinversión automática se encuentra encendida.',
      status: 'PROGRAMADO',
      color: '#4edea3',
    },
    {
      id: 3,
      type: 'regulatorio',
      title: 'Actualización Regulatoria CNBV: Tasa Flotante Nu',
      date: '01 Oct 2026',
      amount: 'N/A',
      desc: 'Publicación oficial del indicador de capitalización de Nu México Financiera. Cobertura PROSOFIPO al 100% activa.',
      status: 'VERIFICADO',
      color: '#c0c1ff',
    },
    {
      id: 4,
      type: 'banxico',
      title: 'Anuncio de Política Monetaria Banco de México',
      date: 'Próxima Junta',
      amount: 'Tasa Objetivo',
      desc: 'El consenso de analistas prevé estabilidad en la tasa de referencia con sesgo a mantener tasas reales altas.',
      status: 'INFORMATIVO',
      color: '#86948a',
    },
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            CENTRO DE MONITOREO
          </span>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
            ALERTAS INTELIGENTES
          </span>
        </div>
        <h1 className="font-sans font-bold text-xl text-white mt-1">
          Alertas Patrimoniales & Vencimientos
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Avisos preventivos de fechas de corte, movimientos de tasas de Banxico y cobertura de seguros en tus instrumentos.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-5 rounded-2xl bg-[#181b25] border border-white/5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${a.color}15`,
                  borderColor: `${a.color}30`,
                  color: a.color,
                }}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-bold text-sm text-white">{a.title}</h3>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded font-bold"
                    style={{
                      backgroundColor: `${a.color}20`,
                      color: a.color,
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <p className="text-xs text-[#bbcabf] max-w-2xl">{a.desc}</p>
                <div className="font-mono text-[11px] text-[#86948a] flex items-center gap-3 pt-1">
                  <span>Fecha: {a.date}</span>
                  {a.amount !== 'N/A' && <span>Monto: {a.amount}</span>}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Gestionando alerta: ${a.title}`)}
              className="px-3.5 py-2 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-xs font-mono font-medium text-[#4edea3] transition-colors self-end md:self-auto shrink-0 flex items-center gap-1.5"
            >
              <span>Resolver postura</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
