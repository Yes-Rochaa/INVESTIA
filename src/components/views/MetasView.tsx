import React, { useState } from 'react';
import { WealthGoal } from '../../types';
import { Flag, Plus, CheckCircle2, Home, Car, Shield, Sparkles, X } from 'lucide-react';

interface MetasViewProps {
  goals: WealthGoal[];
  onAddGoal: (goal: WealthGoal) => void;
}

export const MetasView: React.FC<MetasViewProps> = ({ goals, onAddGoal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState(100000);
  const [currentAmount, setCurrentAmount] = useState(15000);
  const [horizonMonths, setHorizonMonths] = useState(24);
  const [instruments, setInstruments] = useState('CETES 28D + Nu Cajitas');

  const formatMXN = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-MX');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const remaining = Math.max(0, targetAmount - currentAmount);
    const monthly = horizonMonths > 0 ? Math.round(remaining / horizonMonths) : 0;
    const newGoal: WealthGoal = {
      id: 'goal-' + Date.now(),
      title,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      status: currentAmount >= targetAmount ? 'COMPLETADO' : 'EN_CAMINO',
      horizonMonths: Number(horizonMonths),
      monthlyRequired: monthly,
      instrumentsUsed: instruments,
      icon: 'flag',
    };
    onAddGoal(newGoal);
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
              PLANIFICACIÓN ESTRATÉGICA
            </span>
            <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
              HORIZONTES Y FONDOS
            </span>
          </div>
          <h1 className="font-sans font-bold text-xl text-white mt-1">
            Mis Metas Patrimoniales en México
          </h1>
          <p className="text-xs text-[#bbcabf]">
            Monitorea el avance de tus fondos de emergencia, compras planeadas y metas de libertad financiera.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-xs font-mono font-bold text-[#003824] shadow-lg transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Meta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((g) => {
          const pct = Math.min(100, (g.currentAmount / g.targetAmount) * 100);
          const isDone = g.status === 'COMPLETADO' || pct >= 100;
          return (
            <div
              key={g.id}
              className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f131c] border border-white/10 flex items-center justify-center text-[#4edea3]">
                      {g.title.toLowerCase().includes('emergencia') ? (
                        <Shield className="w-5 h-5" />
                      ) : g.title.toLowerCase().includes('depto') ? (
                        <Home className="w-5 h-5" />
                      ) : g.title.toLowerCase().includes('auto') ? (
                        <Car className="w-5 h-5" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-white">{g.title}</h3>
                      <p className="text-[11px] text-[#bbcabf]">Instrumentos: {g.instrumentsUsed}</p>
                    </div>
                  </div>

                  {isDone ? (
                    <span className="px-2 py-0.5 rounded bg-[#003824] text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
                      ¡COMPLETADO!
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#ffb95f] font-mono text-[10px] font-bold">
                      EN CAMINO
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#86948a]">Acumulado:</span>
                    <span className="font-bold text-white">
                      {formatMXN(g.currentAmount)}{' '}
                      <span className="text-[#86948a] font-normal">/ {formatMXN(g.targetAmount)} MXN</span>
                    </span>
                  </div>

                  <div className="w-full bg-[#0f131c] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone ? 'bg-[#4edea3]' : pct > 25 ? 'bg-[#c0c1ff]' : 'bg-[#ffb95f]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-[#4edea3] font-semibold">{pct.toFixed(1)}% Alcanzado</span>
                    <span className="text-[#bbcabf]">
                      {isDone ? 'Objetivo asegurado' : `Faltan ${formatMXN(g.targetAmount - g.currentAmount)} MXN`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#bbcabf]">
                <span>
                  {isDone ? 'Meta asegurada en cartera' : `Aportación sugerida: ${formatMXN(g.monthlyRequired)}/mes`}
                </span>
                <span>{isDone ? '0 meses' : `${g.horizonMonths} meses`}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#181b25] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-bold text-white text-base">Registrar Nueva Meta Patrimonial</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#86948a] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#bbcabf] uppercase text-[10px]">Título de la Meta</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Fondo para Maestría o Negocio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white font-sans text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-[#bbcabf] uppercase text-[10px]">Monto Objetivo (MXN)</label>
                <input
                  type="number"
                  required
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-[#bbcabf] uppercase text-[10px]">Monto Actual Ahorrado (MXN)</label>
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-[#bbcabf] uppercase text-[10px]">Horizonte (Meses)</label>
                <input
                  type="number"
                  value={horizonMonths}
                  onChange={(e) => setHorizonMonths(Number(e.target.value))}
                  className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-[#bbcabf] uppercase text-[10px]">Instrumentos Planeados</label>
                <input
                  type="text"
                  value={instruments}
                  onChange={(e) => setInstruments(e.target.value)}
                  className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#262a34] text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#10b981] text-[#003824] font-bold"
                >
                  Guardar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
