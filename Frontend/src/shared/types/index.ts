export type OrderStatus = 'IN_PROGRESS' | 'SCHEDULED' | 'COMPLETED' | 'BLOCKED' | 'MAINTENANCE';
export type OrderPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type SeverityLevel = 'CRITICAL' | 'WARNING' | 'INFO';

export interface ProductionKPI {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  benchmark?: string;
  sparkline?: number[];
  statusText?: string;
}

export interface ProductionLine {
  id: string;
  name: string;
  facility: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'DOWN';
  activeLot: string;
  targetUnits: number;
  completedUnits: number;
  oee: number;
  currentShift: string;
  operator: string;
  temperatureC: number;
  vibrationMmS: number;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  partName: string;
  sku: string;
  customer: string;
  quantity: number;
  completedQuantity: number;
  progressPercentage: number;
  status: OrderStatus;
  priority: OrderPriority;
  line: string;
  startDate: string;
  dueDate: string;
  batchLot: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'RAW_MATERIAL' | 'COMPONENTS' | 'PACKAGING' | 'CONSUMABLES';
  location: string;
  inStock: number;
  safetyStock: number;
  reorderPoint: number;
  unit: string;
  status: 'OPTIMAL' | 'REORDER_REQUIRED' | 'CRITICAL_LOW';
  supplier: string;
  lastUpdated: string;
}

export interface AlertNotification {
  id: string;
  timestamp: string;
  source: string;
  severity: SeverityLevel;
  title: string;
  message: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
}

export interface UserRole {
  id: string;
  name: string;
  email: string;
  role: 'PLANT_DIRECTOR' | 'PRODUCTION_MANAGER' | 'SHIFT_SUPERVISOR' | 'LINE_OPERATOR' | 'QUALITY_INSPECTOR';
  facility: string;
  activeShift: string;
  status: 'ACTIVE' | 'OFF_SHIFT' | 'SUSPENDED';
  lastSeen: string;
}
