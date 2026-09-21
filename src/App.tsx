/**
 * INVESTIA México PRO - Gestión Patrimonial & Rendimiento Compuesto
 */

import React, { useState } from 'react';
import { NavigationTab, InvestmentPosition, WealthGoal } from './types';
import { INITIAL_POSITIONS, INITIAL_GOALS, INITIAL_TICKERS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RegisterInvestmentModal } from './components/RegisterInvestmentModal';

import { PatrimonioView } from './components/views/PatrimonioView';
import { PortafolioView } from './components/views/PortafolioView';
import { DecisionesView } from './components/views/DecisionesView';
import { ComparadorView } from './components/views/ComparadorView';
import { CalculadoraView } from './components/views/CalculadoraView';
import { MetasView } from './components/views/MetasView';
import { FiscalView } from './components/views/FiscalView';
import { AportacionesView } from './components/views/AportacionesView';
import { AlertasView } from './components/views/AlertasView';
import { ConfiguracionView } from './components/views/ConfiguracionView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('mi-patrimonio');
  const [positions, setPositions] = useState<InvestmentPosition[]>(INITIAL_POSITIONS);
  const [goals, setGoals] = useState<WealthGoal[]>(INITIAL_GOALS);
  const [tickers] = useState(INITIAL_TICKERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic portfolio totals
  const totalWealth = positions.reduce(
    (acc, p) => acc + p.depositedAmount + p.totalAccumulatedGain,
    0
  );
  const totalCapital = positions.reduce((acc, p) => acc + p.depositedAmount, 0);
  const weightedAnnualRate =
    totalCapital > 0
      ? positions.reduce((acc, p) => acc + (p.annualRate * p.depositedAmount) / totalCapital, 0)
      : 12.4;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddPosition = (newPosition: InvestmentPosition) => {
    setPositions((prev) => [newPosition, ...prev]);
    showToast(`Inversión "${newPosition.name}" agregada exitosamente al portafolio.`);
  };

  const handleDeletePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
    showToast('Posición eliminada del portafolio.');
  };

  const handleAddGoal = (newGoal: WealthGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    showToast(`Meta "${newGoal.title}" creada exitosamente.`);
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef] flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header
          tickers={tickers}
          totalWealth={totalWealth}
          annualYieldPercent={weightedAnnualRate}
          onNavigateToNotifications={() => setCurrentTab('alertas-inteligentes')}
          onNavigateToPortfolio={() => setCurrentTab('mi-portafolio')}
        />

        {/* Dynamic Main Workspace */}
        <main className="flex-1 pt-20 px-6 sm:px-8 max-w-[1600px] w-full mx-auto">
          {toastMessage && (
            <div className="mb-4 p-3 rounded-xl bg-[#003824] border border-[#4edea3]/40 text-[#4edea3] text-xs font-mono flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
              <span>✓ {toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-white hover:text-[#4edea3] ml-4 font-bold">
                ✕
              </button>
            </div>
          )}

          {currentTab === 'mi-patrimonio' && (
            <PatrimonioView
              positions={positions}
              goals={goals}
              onNavigateToPortfolio={() => setCurrentTab('mi-portafolio')}
              onNavigateToDecisions={() => setCurrentTab('centro-de-decisiones')}
              onNavigateToGoals={() => setCurrentTab('mis-metas-patrimoniales')}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {currentTab === 'mi-portafolio' && (
            <PortafolioView
              positions={positions}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onDeletePosition={handleDeletePosition}
              onNavigateToDecisions={() => setCurrentTab('centro-de-decisiones')}
            />
          )}

          {currentTab === 'centro-de-decisiones' && (
            <DecisionesView
              onApplyScenarioToPortfolio={() => {
                showToast('Escenario aplicado al modelo financiero.');
              }}
              onNavigateToPortfolio={() => setCurrentTab('mi-portafolio')}
            />
          )}

          {currentTab === 'comparador-financiero' && <ComparadorView />}

          {currentTab === 'calculadora-de-crecimiento' && <CalculadoraView />}

          {currentTab === 'mis-metas-patrimoniales' && (
            <MetasView goals={goals} onAddGoal={handleAddGoal} />
          )}

          {currentTab === 'aportaciones-y-objetivos' && <AportacionesView />}

          {currentTab === 'movimientos-e-historial' && <AportacionesView />}

          {currentTab === 'reporte-mensual-y-fiscal' && <FiscalView positions={positions} />}

          {currentTab === 'alertas-inteligentes' && <AlertasView />}

          {currentTab === 'configuracion-y-fuentes-api' && <ConfiguracionView />}
        </main>
      </div>

      {/* Modal Registrar Inversión */}
      <RegisterInvestmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPosition={handleAddPosition}
      />
    </div>
  );
}
