/**
 * Types and interfaces for INVESTIA México PRO
 */

export type NavigationTab =
  | 'mi-patrimonio'
  | 'mi-portafolio'
  | 'agregar-inversion'
  | 'comparador-financiero'
  | 'calculadora-de-crecimiento'
  | 'centro-de-decisiones'
  | 'mis-metas-patrimoniales'
  | 'aportaciones-y-objetivos'
  | 'movimientos-e-historial'
  | 'reporte-mensual-y-fiscal'
  | 'alertas-inteligentes'
  | 'configuracion-y-fuentes-api';

export type InstitutionType =
  | 'SOFIPO'
  | 'CETES_DIRECTO'
  | 'BANCO'
  | 'CASA_DE_BOLSA'
  | 'FINTECH_REGULADA';

export type RiskLevel = 'BAJO' | 'MEDIO' | 'ALTO';

export type LiquidityType =
  | 'Inmediata 24/7'
  | 'Días Hábiles (7:30 - 13:00)'
  | 'Semanal (Jueves)'
  | 'Mensual'
  | 'Al Vencimiento (Plazo Fijo)'
  | 'T+2 Mercado Abierto';

export type FiscalRegime =
  | 'Exento SOFIPO (Hasta 5 UMAs anuales)'
  | 'Retención Art. 54 LISR (0.50% s/capital)'
  | '10% s/Ganancia de Capital (Acciones/ETFs Art. 161)'
  | 'Exento Total (Deuda Soberana Exenta)';

export interface InvestmentPosition {
  id: string;
  name: string;
  institution: string;
  institutionType: InstitutionType;
  productCode: string;
  category: 'Renta Fija' | 'SOFIPO' | 'ETFs / Renta Variable' | 'Fondos Deuda' | 'Efectivo';
  regulatoryFramework: string;
  protectionCeiling: string;
  depositedAmount: number;
  monthlyContribution: number;
  annualRate: number; // e.g. 11.00 for 11%
  monthlyEstimatedYield: number;
  totalAccumulatedGain: number;
  liquidity: LiquidityType;
  riskLevel: RiskLevel;
  startDate: string;
  maturityDate?: string;
  fiscalRegime: FiscalRegime;
  annualFeePercent: number;
  isAutoReinvest: boolean;
  notes?: string;
  pricePerShare?: number;
  unrealizedGain?: number;
}

export interface WealthGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  status: 'COMPLETADO' | 'EN_CAMINO' | 'ATRASADO';
  horizonMonths: number;
  monthlyRequired: number;
  instrumentsUsed: string;
  notes?: string;
  icon: string;
}

export interface MarketTicker {
  label: string;
  value: string;
  source: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}
