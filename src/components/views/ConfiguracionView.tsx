import React, { useState } from 'react';
import { Sliders, CheckCircle2, Shield, Key, RefreshCw } from 'lucide-react';

export const ConfiguracionView: React.FC = () => {
  const [banxicoToken, setBanxicoToken] = useState('sie_token_live_banxico_authenticated_v2');
  const [udiValue, setUdiValue] = useState('8.18');
  const [inpcRate, setInpcRate] = useState('4.62');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-wider">
            SISTEMA & FUENTES DE DATOS
          </span>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#262a34] px-1.5 py-0.5 rounded">
            BANXICO / INEGI / DOF
          </span>
        </div>
        <h1 className="font-sans font-bold text-xl text-white mt-1">
          Configuración de Parámetros Económicos
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Conexión al Sistema de Información Económica (SIE) de Banxico y actualización de indicadores oficiales.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 rounded-xl bg-[#003824] border border-[#4edea3]/40 text-[#4edea3] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuración económica actualizada correctamente.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token SIE */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Key className="w-4 h-4 text-[#4edea3]" />
            <h2 className="font-sans font-bold text-sm text-white">API BANXICO (SIE v2)</h2>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#bbcabf] uppercase text-[10px]">Token del Sistema de Información Económica</label>
            <input
              type="text"
              value={banxicoToken}
              onChange={(e) => setBanxicoToken(e.target.value)}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2.5 text-white text-xs outline-none focus:border-[#4edea3]"
            />
            <p className="text-[10px] text-[#86948a]">
              Permite sincronizar automáticamente las series históricas de CETES (SF43783), TIIE y UDI.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0f131c] border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-[#bbcabf]">Estado de Enlace:</span>
            <span className="text-[#4edea3] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
              CONECTADO (200 OK)
            </span>
          </div>
        </div>

        {/* Parámetros de Cálculo */}
        <div className="bg-[#181b25] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Sliders className="w-4 h-4 text-[#c0c1ff]" />
            <h2 className="font-sans font-bold text-sm text-white">Variables Macro Oficiales</h2>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#bbcabf] uppercase text-[10px]">Valor de la UDI (Pesos MXN)</label>
            <input
              type="number"
              step="0.01"
              value={udiValue}
              onChange={(e) => setUdiValue(e.target.value)}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white outline-none"
            />
            <p className="text-[10px] text-[#86948a]">
              Tope PROSOFIPO: 25,000 UDIs = ${(Number(udiValue) * 25000).toLocaleString('es-MX')} MXN
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#bbcabf] uppercase text-[10px]">Inflación Anualizada INPC (%)</label>
            <input
              type="number"
              step="0.01"
              value={inpcRate}
              onChange={(e) => setInpcRate(e.target.value)}
              className="w-full bg-[#0f131c] border border-white/10 rounded-lg p-2 text-white outline-none"
            />
            <p className="text-[10px] text-[#86948a]">
              Dato oficial INEGI utilizado para el cálculo de rendimientos reales y GAT Real.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#003824] font-mono text-xs font-bold transition-all shadow"
            >
              Guardar Parámetros
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
