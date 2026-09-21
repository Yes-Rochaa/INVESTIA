import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle2, Clock, DollarSign, ArrowRight } from 'lucide-react';

export const AportacionesView: React.FC = () => {
  const [scheduledDay, setScheduledDay] = useState('15');

  const history = [
    { date: '15 Sep 2026', amount: 3000, status: 'EJECUTADA', concept: 'DCA Quincenal Cetes 28D', method: 'SPEI Domiciliado' },
    { date: '01 Sep 2026', amount: 3500, status: 'EJECUTADA', concept: 'DCA Quincenal Nu Cajitas', method: 'Transferencia Directa' },
    { date: '15 Ago 2026', amount: 3000, status: 'EJECUTADA', concept: 'DCA Quincenal Cetes 28D', method: 'SPEI Domiciliado' },
    { date: '01 Ago 2026', amount: 3500, status: 'EJECUTADA', concept: 'DCA Quincenal VOO S&P 500', method: 'GBM Transferencia' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            PROGRAMACIÓN RECURRENTE DCA
          </span>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
            CALENDARIO DE LIQUIDEZ
          </span>
        </div>
        <h1 className="font-sans font-bold text-xl text-white mt-1">
          Aportaciones & Objetivos de Ahorro
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Estrategia Dollar-Cost Averaging quincenal y mensual para mitigar la volatilidad y automatizar el crecimiento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Next Scheduled */}
        <div className="p-5 bg-[#181b25] border border-white/5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold">
              Próxima Ejecución
            </span>
            <Calendar className="w-4 h-4 text-[#4edea3]" />
          </div>
          <div className="font-mono text-3xl font-bold text-white">15 Octubre</div>
          <div className="font-mono text-sm text-[#4edea3] font-semibold">$3,000 MXN programados</div>
          <p className="text-xs text-[#bbcabf]">
            Destino: Cetesdirecto (CETES 28 Días). Subasta semanal Banxico.
          </p>
          <button
            onClick={() => alert('Domiciliación verificada con Banxico/Cetesdirecto.')}
            className="w-full py-2 bg-[#262a34] hover:bg-[#31353f] text-xs font-mono text-white rounded-lg transition-colors"
          >
            Modificar Fecha o Monto
          </button>
        </div>

        {/* DCA Pace */}
        <div className="p-5 bg-[#181b25] border border-white/5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#c0c1ff] uppercase font-bold">
              Ritmo Mensual
            </span>
            <Clock className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <div className="font-mono text-3xl font-bold text-white">$6,500 MXN</div>
          <div className="text-xs text-[#4edea3] font-mono">100% de cumplimiento en 2026</div>
          <p className="text-xs text-[#bbcabf]">
            Distribuido en 2 aportaciones quincenales sincronizadas a la nómina (días 1 y 15).
          </p>
        </div>

        {/* Accumulated this year */}
        <div className="p-5 bg-[#181b25] border border-white/5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold">
              Aportado en 2026 YTD
            </span>
            <DollarSign className="w-4 h-4 text-[#ffb95f]" />
          </div>
          <div className="font-mono text-3xl font-bold text-white">$65,000 MXN</div>
          <div className="text-xs text-[#bbcabf] font-mono">10 meses consecutivos</div>
          <p className="text-xs text-[#bbcabf]">
            Capital neto inyectado que ya genera interés compuesto continuo.
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[#181b25] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 font-bold text-sm text-white">
          Historial de Aportaciones Ejecutadas
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0f131c] text-[#86948a] uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Fecha</th>
                <th className="py-2.5 px-3 font-semibold">Concepto / Destino</th>
                <th className="py-2.5 px-3 font-semibold">Monto</th>
                <th className="py-2.5 px-3 font-semibold">Método</th>
                <th className="py-2.5 px-4 font-semibold text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-[#262a34]/40">
                  <td className="py-3 px-4 text-white font-semibold">{h.date}</td>
                  <td className="py-3 px-3 text-[#dfe2ef]">{h.concept}</td>
                  <td className="py-3 px-3 text-[#4edea3] font-bold">${h.amount.toLocaleString('es-MX')} MXN</td>
                  <td className="py-3 px-3 text-[#bbcabf]">{h.method}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-[#003824] text-[#4edea3] text-[10px] font-bold">
                      {h.status}
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
