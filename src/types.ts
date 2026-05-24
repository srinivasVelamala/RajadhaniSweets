export interface Shop {
  id: string;
  name: string;
  owner: string;
  mobile: string;
  address: string;
  discountPercentage: number;
  creditDays: number;
  outstandingBalance: number;
  notes: string;
  active: boolean;
}

export interface SweetItem {
  id: string;
  name: string;
  category: 'Dry' | 'Khoya/Milk' | 'Syrup' | 'Savory' | 'Ghee Special';
  unit: 'Kg' | 'Box' | 'Piece';
  sellingRate: number;
  productionCost: number;
  ingredients: string; // Comma separated items
  active: boolean;
}

export interface ProductionEntry {
  id: string;
  date: string;
  sweetItemId: string;
  sweetItemName: string;
  quantityPrepared: number; // in unit
  batchNumber: string;
  notes: string;
  expectedSales: number; // calculated quantityPrepared * sellingRate
}

export interface TripEntry {
  id: string;
  tripNumber: string; // S1, S2, S3
  shopId: string;
  shopName: string;
  date: string;
  items: TripItem[];
  totalAmount: number;
  status: 'Completed' | 'Pending Collection' | 'Cancelled';
}

export interface TripItem {
  sweetItemId: string;
  sweetItemName: string;
  grossWeight: number; // kg
  trayWeight: number; // kg
  wastage: number; // kg
  netWeight: number; // gross - tray - wastage
  rate: number;
  discountPercentage: number;
  amount: number; // netWeight * rate * (1 - discountPercentage/100)
}

export interface InventoryItem {
  id: string;
  name: string; // Sugar, Ghee, Milk, Flour, Dry Fruits, Oil
  openingStock: number;
  purchase: number;
  consumption: number;
  remainingStock: number;
  unit: string; // Kg, Litre, Box
  lowStockAlertLevel: number;
}

export interface Expense {
  id: string;
  date: string;
  category: 'Milk Purchase' | 'Transport' | 'Gas' | 'Electricity' | 'Salary' | 'Miscellaneous';
  amount: number;
  description: string;
}

export interface Worker {
  id: string;
  name: string;
  mobile: string;
  attendance: { [date: string]: 'Present' | 'Absent' | 'Half Day' };
  dailyWage: number;
  payments: WorkerPayment[];
}

export interface WorkerPayment {
  id: string;
  date: string;
  amount: number;
  description: string;
}

export interface Notification {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  read: boolean;
}
