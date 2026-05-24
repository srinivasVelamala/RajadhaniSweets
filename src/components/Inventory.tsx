import React, { useState } from 'react';
import { 
  Package, Plus, TrendingDown, RefreshCw, AlertTriangle, Scale, CheckCircle2, ShoppingCart 
} from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryProps {
  inventory: InventoryItem[];
  onUpdateInventory: (item: InventoryItem) => void;
  userRole: 'Admin' | 'Operator';
}

export default function Inventory({ inventory, onUpdateInventory, userRole }: InventoryProps) {
  // Inventory modifiers state
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [modType, setModType] = useState<'purchase' | 'consumption'>('purchase');
  const [modAmount, setModAmount] = useState(0);

  // Filter alerts (remaining stock <= alert triggers)
  const lowStockItems = inventory.filter(item => item.remainingStock <= item.lowStockAlertLevel);

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || modAmount <= 0) {
      alert("Please select a raw material and specify an amount greater than zero.");
      return;
    }

    const matched = inventory.find(i => i.id === selectedItemId);
    if (!matched) return;

    let updatedOpening = matched.openingStock;
    let updatedPurchase = matched.purchase;
    let updatedConsumption = matched.consumption;

    if (modType === 'purchase') {
      updatedPurchase += Number(modAmount);
    } else {
      updatedConsumption += Number(modAmount);
    }

    const updatedRemaining = updatedOpening + updatedPurchase - updatedConsumption;

    onUpdateInventory({
      ...matched,
      purchase: updatedPurchase,
      consumption: updatedConsumption,
      remainingStock: updatedRemaining
    });

    // Reset modification fields
    setSelectedItemId(null);
    setModAmount(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Package className="text-amber-500 w-6 h-6 shrink-0" />
            Raw Inventory Ledger
          </h2>
          <p className="text-sm text-slate-400">Track critical sweets ingredients stock: Sugar, Ghee, Milk, Flour, Dry Fruits and Oils</p>
        </div>
      </div>

      {/* OVERVIEW METRIC / ALERTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low Stock Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4 shadow-sm relative">
          <div className={`p-3 rounded-lg shrink-0 ${
            lowStockItems.length > 0 ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-300">Ingredient Sourcing Status</h4>
            <span className={`text-xl font-bold font-mono block ${lowStockItems.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {lowStockItems.length > 0 
                ? `${lowStockItems.length} Ingredients Triggering Refill Warning` 
                : 'All Raw Stocks Healthy / Steady'
              }
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              Configured threshold guards will flag warnings when current remaining stock matches or dips below low-limit buffers.
            </p>
          </div>
        </div>

        {/* Quick stock adjusting form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-200 mb-3 block">Quick Adjust Stock Logs</h4>
          <form onSubmit={handleUpdateStock} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-slate-500 font-mono font-bold block uppercase">Ingredient</label>
              <select
                value={selectedItemId || ''}
                onChange={(e) => setSelectedItemId(e.target.value || null)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-250 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="">-- Choose Raw material --</option>
                {inventory.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.remainingStock} {item.unit} left)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-mono font-bold block uppercase">Transaction Type</label>
              <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setModType('purchase')}
                  className={`py-1 rounded text-center transition-all ${
                    modType === 'purchase' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setModType('consumption')}
                  className={`py-1 rounded text-center transition-all ${
                    modType === 'consumption' ? 'bg-red-500/20 text-rose-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Consume
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-mono font-bold block uppercase">
                Amt ({selectedItemId ? inventory.find(i => i.id === selectedItemId)?.unit : 'Qty'})
              </label>
              <input
                type="number"
                min="1"
                placeholder="0"
                value={modAmount || ''}
                onChange={(e) => setModAmount(Number(e.target.value))}
                className="w-full px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="py-1 px-4 bg-slate-800 hover:bg-slate-700 hover:text-amber-400 text-slate-300 font-mono font-semibold rounded text-xs h-8 text-center cursor-pointer whitespace-nowrap"
            >
              Commit Log
            </button>
          </form>
        </div>
      </div>

      {/* STOCKS DIRECTORY LIST */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-350 uppercase">Current Inventory Registry</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((item) => {
            const isLow = item.remainingStock <= item.lowStockAlertLevel;

            return (
              <div 
                key={item.id} 
                className={`bg-slate-900 border rounded-xl overflow-hidden p-5 shadow-sm space-y-4 hover:border-slate-700 transition-colors ${
                  isLow ? 'border-rose-500/30' : 'border-slate-800'
                }`}
              >
                {/* Title Line */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-200">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">UNIT: {item.unit}</span>
                  </div>
                  {isLow ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider text-rose-400 bg-rose-500/10 animate-pulse flex items-center gap-1.5 shrink-0">
                      <AlertTriangle className="w-3 h-3 text-rose-450" />
                      LOW STOCK ALERT
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 flex items-center gap-1 shrink-0 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      SECURE
                    </span>
                  )}
                </div>

                {/* Stock Stats details */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">OPEN</span>
                    <span className="text-slate-300 font-bold">{item.openingStock}</span>
                  </div>

                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">BOUGH</span>
                    <span className="text-emerald-400 font-bold">+{item.purchase}</span>
                  </div>

                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">USED</span>
                    <span className="text-rose-400 font-bold">-{item.consumption}</span>
                  </div>
                </div>

                {/* Remaining Store progress bar and quantity */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Remaining Balance:</span>
                    <span className={`font-bold font-mono text-base ${isLow ? 'text-rose-400 font-bold' : 'text-slate-100'}`}>
                      {item.remainingStock} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                    </span>
                  </div>

                  {/* Visual gauge */}
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    {/* Width base on percent of opening + purchase */}
                    <div 
                      style={{ width: `${Math.min(100, (item.remainingStock / Math.max(1, item.openingStock + item.purchase)) * 100)}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLow ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                    />
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>Target warning level:</span>
                    <span>{item.lowStockAlertLevel} {item.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
