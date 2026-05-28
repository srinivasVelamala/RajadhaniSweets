import { useState, useEffect } from 'react';
import { 
  Menu, Sparkles, BrainCircuit, ShieldAlert, CheckCircle2, UserCheck, Bell, Info 
} from 'lucide-react';

// Import datasets
import { 
  INITIAL_SHOPS, INITIAL_SWEETS, INITIAL_PRODUCTION, INITIAL_TRIPS, INITIAL_INVENTORY, INITIAL_EXPENSES, INITIAL_WORKERS 
} from './data';

// Import interfaces
import { 
  Shop, SweetItem, ProductionEntry, TripEntry, InventoryItem, Expense, Worker, Notification 
} from './types';

// Import UI sub-modules
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Shops from './components/Shops';
import Items from './components/Items';
import DailyProduction from './components/DailyProduction';
import Dispatches from './components/Dispatches';
import Inventory from './components/Inventory';
import Expenses from './components/Expenses';
import Workers from './components/Workers';
import ExcelMigration from './components/ExcelMigration';
import Reports from './components/Reports';

const API_BASE = '';

async function apiGet<T>(path: string): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`);
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  const json = await r.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json.data;
}

async function apiPost(path: string, body: any) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  const json = await r.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json;
}

async function apiPut(path: string, body: any) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  const json = await r.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<'Admin' | 'Operator'>('Admin');
  const [fastEntryMode, setFastEntryMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [shops, setShops] = useState<Shop[]>([]);
  const [items, setItems] = useState<SweetItem[]>([]);
  const [production, setProduction] = useState<ProductionEntry[]>([]);
  const [dispatches, setDispatches] = useState<TripEntry[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  // Load all data from SQLite on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [s, i, p, d, inv, e, w] = await Promise.all([
          apiGet<Shop[]>('/api/shops'),
          apiGet<SweetItem[]>('/api/items'),
          apiGet<ProductionEntry[]>('/api/production'),
          apiGet<TripEntry[]>('/api/dispatches'),
          apiGet<InventoryItem[]>('/api/inventory'),
          apiGet<Expense[]>('/api/expenses'),
          apiGet<Worker[]>('/api/workers'),
        ]);
        if (cancelled) return;
        // If all tables are empty, migrate localStorage data or seed defaults
        const isEmpty = !s.length && !i.length && !p.length && !d.length && !inv.length && !e.length && !w.length;
        if (isEmpty) {
          const migrated = await tryMigrateLocalStorage();
          if (migrated) return;
          // Seed defaults
          await Promise.all([
            apiPost('/api/shops/bulk', INITIAL_SHOPS),
            apiPost('/api/items/bulk', INITIAL_SWEETS),
            apiPost('/api/production/bulk', INITIAL_PRODUCTION),
            apiPost('/api/dispatches/bulk', INITIAL_TRIPS),
            apiPost('/api/inventory/bulk', INITIAL_INVENTORY),
            apiPost('/api/expenses/bulk', INITIAL_EXPENSES),
            apiPost('/api/workers/bulk', INITIAL_WORKERS),
          ]);
          // Reload after seeding
          const [s2, i2, p2, d2, inv2, e2, w2] = await Promise.all([
            apiGet<Shop[]>('/api/shops'),
            apiGet<SweetItem[]>('/api/items'),
            apiGet<ProductionEntry[]>('/api/production'),
            apiGet<TripEntry[]>('/api/dispatches'),
            apiGet<InventoryItem[]>('/api/inventory'),
            apiGet<Expense[]>('/api/expenses'),
            apiGet<Worker[]>('/api/workers'),
          ]);
          if (!cancelled) {
            setShops(s2);
            setItems(i2);
            setProduction(p2);
            setDispatches(d2);
            setInventory(inv2);
            setExpenses(e2);
            setWorkers(w2);
          }
        } else {
          setShops(s);
          setItems(i);
          setProduction(p);
          setDispatches(d);
          setInventory(inv);
          setExpenses(e);
          setWorkers(w);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function tryMigrateLocalStorage(): Promise<boolean> {
    const data: Record<string, any> = {};
    const keys = [
      'rajadhani_shops_v_excel_24may_v4',
      'rajadhani_items_v_excel_24may_v4',
      'rajadhani_production_v_excel_24may_v4',
      'rajadhani_dispatches_v_excel_24may_v4',
      'rajadhani_inventory_v_excel_24may_v4',
      'rajadhani_expenses_v_excel_24may_v4',
      'rajadhani_workers_v_excel_24may_v4',
    ];
    let hasAny = false;
    for (const key of keys) {
      const v = localStorage.getItem(key);
      if (v) {
        data[key] = JSON.parse(v);
        hasAny = true;
      }
    }
    if (!hasAny) return false;

    await apiPost('/api/migrate', {
      shops: data['rajadhani_shops_v_excel_24may_v4'] || undefined,
      items: data['rajadhani_items_v_excel_24may_v4'] || undefined,
      production: data['rajadhani_production_v_excel_24may_v4'] || undefined,
      dispatches: data['rajadhani_dispatches_v_excel_24may_v4'] || undefined,
      inventory: data['rajadhani_inventory_v_excel_24may_v4'] || undefined,
      expenses: data['rajadhani_expenses_v_excel_24may_v4'] || undefined,
      workers: data['rajadhani_workers_v_excel_24may_v4'] || undefined,
    });

    // Clear localStorage after migration
    for (const key of keys) localStorage.removeItem(key);
    return true;
  }

  // System alert notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const list: Notification[] = [];
    inventory.forEach(item => {
      if (item.remainingStock <= item.lowStockAlertLevel) {
        list.push({
          id: `notif-inv-${item.id}`,
          type: 'warning',
          title: `Raw stock warning: ${item.name}`,
          message: `Only ${item.remainingStock} ${item.unit} remaining. Buy more ingredients to avoid cooking delays.`,
          timestamp: 'Just now',
          read: false
        });
      }
    });
    shops.forEach(sh => {
      if (sh.outstandingBalance > 5000) {
        list.push({
          id: `notif-shop-${sh.id}`,
          type: 'warning',
          title: `High Outstanding Balance: ${sh.name}`,
          message: `Cumulative credit balances at \u20b9${sh.outstandingBalance.toLocaleString()}. Limit: ${sh.creditDays || 15} days.`,
          timestamp: '1h ago',
          read: false
        });
      }
    });
    setNotifications(list);
  }, [inventory, shops, dispatches.length]);

  // STATE MANIPULATORS

  const handleAddShop = async (newShop: Omit<Shop, 'id' | 'outstandingBalance'>) => {
    const created: Shop = { ...newShop, id: `SH-${Date.now()}`, outstandingBalance: 0 };
    await apiPost('/api/shops', created);
    setShops([created, ...shops]);
  };

  const handleUpdateShop = async (updated: Shop) => {
    await apiPut('/api/shops', updated);
    setShops(shops.map(s => s.id === updated.id ? updated : s));
  };

  const handleAddItem = async (newItem: Omit<SweetItem, 'id'>) => {
    const created: SweetItem = { ...newItem, id: `SW-${Date.now()}` };
    await apiPost('/api/items', created);
    setItems([created, ...items]);
  };

  const handleUpdateItem = async (updated: SweetItem) => {
    await apiPut('/api/items', updated);
    setItems(items.map(it => it.id === updated.id ? updated : it));
  };

  const handleAddProduction = async (newEntry: Omit<ProductionEntry, 'id'>) => {
    const created: ProductionEntry = { ...newEntry, id: `PR-${Date.now()}` };
    await apiPost('/api/production', created);
    setProduction([created, ...production]);
  };

  const handleSaveBulkProduction = async (date: string, entries: Omit<ProductionEntry, 'id'>[]) => {
    const withoutDate = production.filter(p => p.date !== date);
    const withIds = entries.map((e, idx) => ({ ...e, id: `PR-${date}-${Date.now()}-${idx}` }));
    const all = [...withIds, ...withoutDate];
    await apiPost('/api/production/bulk', all);
    setProduction(all);
  };

  const handleAddDispatch = async (newTrip: Omit<TripEntry, 'id'>) => {
    const created: TripEntry = { ...newTrip, id: `TR-${Date.now()}` };
    await apiPost('/api/dispatches', created);
    setDispatches([created, ...dispatches]);
    // Update shop balance
    const updatedShops = shops.map(sh =>
      sh.id === newTrip.shopId ? { ...sh, outstandingBalance: sh.outstandingBalance + newTrip.totalAmount } : sh
    );
    await apiPost('/api/shops/bulk', updatedShops);
    setShops(updatedShops);
  };

  const handleUpdateDispatch = async (updated: TripEntry) => {
    await apiPut('/api/dispatches', updated);
    setDispatches(dispatches.map(d => d.id === updated.id ? updated : d));
  };

  const handleSaveDailyProductionData = async (
    date: string,
    allDateTrips: TripEntry[],
    productionEntries: Omit<ProductionEntry, 'id'>[]
  ) => {
    const oldDateDispatches = dispatches.filter(d => d.date === date);
    const balanceMap: Record<string, number> = {};
    oldDateDispatches.forEach(d => { balanceMap[d.shopId] = (balanceMap[d.shopId] || 0) - d.totalAmount; });
    allDateTrips.forEach(d => { balanceMap[d.shopId] = (balanceMap[d.shopId] || 0) + d.totalAmount; });

    const updatedShops = shops.map(sh => {
      const diff = balanceMap[sh.id] || 0;
      if (diff !== 0) {
        return { ...sh, outstandingBalance: Number(Math.max(0, sh.outstandingBalance + diff).toFixed(2)) };
      }
      return sh;
    });

    const updatedDispatches = [...allDateTrips, ...dispatches.filter(d => d.date !== date)];
    const updatedProduction = [
      ...productionEntries.map((pe, idx) => ({ ...pe, id: `PR-${date}-${Date.now()}-${idx}-${Math.random()}` })),
      ...production.filter(p => p.date !== date)
    ];

    await Promise.all([
      apiPost('/api/shops/bulk', updatedShops),
      apiPost('/api/dispatches/bulk', updatedDispatches),
      apiPost('/api/production/bulk', updatedProduction),
    ]);

    setShops(updatedShops);
    setDispatches(updatedDispatches);
    setProduction(updatedProduction);
  };

  const handleUpdateInventory = async (updated: InventoryItem) => {
    await apiPut('/api/inventory', updated);
    setInventory(inventory.map(inv => inv.id === updated.id ? updated : inv));
  };

  const handleAddExpense = async (newExpense: Omit<Expense, 'id'>) => {
    const created: Expense = { ...newExpense, id: `EX-${Date.now()}` };
    await apiPost('/api/expenses', created);
    setExpenses([created, ...expenses]);
  };

  const handleAddWorker = async (newWorker: Omit<Worker, 'id' | 'attendance' | 'payments'>) => {
    const created: Worker = { ...newWorker, id: `WK-${Date.now()}`, attendance: {}, payments: [] };
    await apiPost('/api/workers', created);
    setWorkers([created, ...workers]);
  };

  const handleUpdateWorker = async (updated: Worker) => {
    await apiPut('/api/workers', updated);
    setWorkers(workers.map(w => w.id === updated.id ? updated : w));
  };

  const handleExcelImportCompleted = async (
    importedShops: Shop[],
    importedItems: SweetItem[],
    importedDispatches: TripEntry[]
  ) => {
    const mergedShops = [...shops];
    importedShops.forEach(nSh => {
      const existingIdx = mergedShops.findIndex(s => s.name.toLowerCase() === nSh.name.toLowerCase());
      if (existingIdx >= 0) {
        mergedShops[existingIdx] = {
          ...mergedShops[existingIdx],
          owner: nSh.owner || mergedShops[existingIdx].owner,
          mobile: nSh.mobile || mergedShops[existingIdx].mobile,
          address: nSh.address || mergedShops[existingIdx].address,
          discountPercentage: nSh.discountPercentage !== undefined ? nSh.discountPercentage : mergedShops[existingIdx].discountPercentage,
          creditDays: nSh.creditDays || mergedShops[existingIdx].creditDays,
          outstandingBalance: nSh.outstandingBalance !== 0 ? nSh.outstandingBalance : mergedShops[existingIdx].outstandingBalance,
        };
      } else {
        mergedShops.push(nSh);
      }
    });

    const mergedItems = [...items];
    importedItems.forEach(nIt => {
      const existingIdx = mergedItems.findIndex(i => i.name.toLowerCase() === nIt.name.toLowerCase());
      if (existingIdx >= 0) {
        mergedItems[existingIdx] = {
          ...mergedItems[existingIdx],
          sellingRate: nIt.sellingRate || mergedItems[existingIdx].sellingRate,
          productionCost: nIt.productionCost || mergedItems[existingIdx].productionCost,
          category: nIt.category || mergedItems[existingIdx].category,
          unit: nIt.unit || mergedItems[existingIdx].unit,
        };
      } else {
        mergedItems.push(nIt);
      }
    });

    const mergedDispatches = [...importedDispatches, ...dispatches];

    await Promise.all([
      apiPost('/api/shops/bulk', mergedShops),
      apiPost('/api/items/bulk', mergedItems),
      apiPost('/api/dispatches/bulk', mergedDispatches),
    ]);

    setShops(mergedShops);
    setItems(mergedItems);
    setDispatches(mergedDispatches);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Loading SQLite Engine...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        <div className="flex flex-col items-center gap-3 max-w-md text-center">
          <ShieldAlert className="w-8 h-8" />
          <span className="font-mono text-sm">Database Error: {error}</span>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* SIDEBAR NAVIGATION REGION (Desktop) */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-800 z-20">
        <Sidebar 
          currentTab={activeTab} 
          setCurrentTab={setActiveTab} 
          userRole={userRole} 
          setUserRole={setUserRole}
          fastEntryMode={fastEntryMode}
          setFastEntryMode={setFastEntryMode}
        />
      </div>

      {/* MOBILE COLLAPSIBLE NAVIGATION CONTAINER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/90 backdrop-blur-sm animate-fade-in">
          <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen overflow-y-auto">
            <div className="flex flex-col h-full justify-between">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-amber-500 uppercase font-mono tracking-wider flex items-center gap-2">
                  Navigation Menu
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 hover:bg-slate-850 rounded text-xs text-amber-500 font-mono font-bold hover:text-white"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="flex-1 min-h-0">
                <Sidebar 
                  currentTab={activeTab} 
                  setCurrentTab={(tab) => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }} 
                  userRole={userRole} 
                  setUserRole={setUserRole}
                  fastEntryMode={fastEntryMode}
                  setFastEntryMode={setFastEntryMode}
                />
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* MAIN SCREEN CANVAS AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-4 lg:px-8 py-5 min-h-screen space-y-6 w-full">
        
        {/* TOP COMPREHENSIVE HEADER RESPONSIVE METRIC RAIL */}
        <header className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-xl print:hidden">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-slate-800 text-slate-300 rounded cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-500 font-mono uppercase tracking-wider">
                  Live Operations
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              </div>
              <h1 className="text-lg font-bold text-white mb-0 flex items-center gap-2 mt-0.5">
                Rajadhani Sweets
                <span className="text-xs font-mono font-normal text-slate-500">(SQLite Active)</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4.5 font-mono text-xs text-slate-400">
            {/* Active notifications indicator badge */}
            {notifications.length > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-400">
                <Bell className="w-4 h-4 text-amber-550 animate-bounce" />
                <span className="font-bold">{notifications.length} Alerts</span>
              </div>
            )}

            {/* Current user role authorization bubble */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-950/70 py-1.5 px-3 rounded-lg border border-slate-800">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Auth: <span className="text-slate-200 font-bold uppercase">{userRole}</span></span>
            </div>
          </div>
        </header>

        {/* ALERTS TICKER EXPANDED IF ACTIVE */}
        {notifications.length > 0 && activeTab === 'dashboard' && (
          <div className="bg-slate-900 border border-amber-500/10 p-4 rounded-xl space-y-2.5 print:hidden">
            <h4 className="text-[10.5px] uppercase font-mono tracking-widest text-amber-500 font-bold flex items-center gap-1.5 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Operational Alert Warnings ({notifications.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="p-2.5 bg-slate-950/80 rounded border border-slate-850 text-[11px] leading-relaxed flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></div>
                  <div>
                    <span className="font-bold text-slate-200 block">{n.title}</span>
                    <span className="text-slate-400 font-sans block">{n.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE MODULE VIEWPORT ROUTER */}
        <div className="flex-grow">
          {activeTab === 'dashboard' && (
            <Dashboard 
              shops={shops} 
              items={items} 
              production={production} 
              dispatches={dispatches} 
              expenses={expenses}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'shops' && (
            <Shops
              shops={shops}
              onAddShop={handleAddShop}
              onUpdateShop={handleUpdateShop}
              onSyncShops={async (shops) => {
                await apiPost('/api/shops/bulk', shops);
                setShops(shops);
              }}
              userRole={userRole}
            />
          )}

          {activeTab === 'items' && (
            <Items 
              items={items} 
              onAddItem={handleAddItem} 
              onUpdateItem={handleUpdateItem}
              userRole={userRole}
            />
          )}

          {activeTab === 'production' && (
            <DailyProduction 
              production={production} 
              items={items} 
              dispatches={dispatches}
              shops={shops}
              onAddProduction={handleAddProduction}
              onSaveBulkProduction={handleSaveBulkProduction}
              onAddDispatch={handleAddDispatch}
              onUpdateDispatch={handleUpdateDispatch}
              onSaveDailyProductionData={handleSaveDailyProductionData}
              userRole={userRole}
            />
          )}

          {activeTab === 'dispatches' && (
            <Dispatches 
              dispatches={dispatches} 
              shops={shops} 
              items={items} 
              onAddDispatch={handleAddDispatch}
              onUpdateDispatch={handleUpdateDispatch}
              userRole={userRole}
              fastEntryMode={fastEntryMode}
            />
          )}

          {activeTab === 'inventory' && (
            <Inventory 
              inventory={inventory} 
              onUpdateInventory={handleUpdateInventory}
              userRole={userRole}
            />
          )}

          {activeTab === 'expenses' && (
            <Expenses 
              expenses={expenses} 
              onAddExpense={handleAddExpense}
              userRole={userRole}
            />
          )}

          {activeTab === 'workers' && (
            <Workers 
              workers={workers} 
              onAddWorker={handleAddWorker}
              onUpdateWorker={handleUpdateWorker}
              userRole={userRole}
            />
          )}

          {activeTab === 'excel' && (
            <ExcelMigration 
              onImportCompleted={handleExcelImportCompleted}
            />
          )}

          {activeTab === 'reports' && (
            <Reports 
              shops={shops} 
              items={items} 
              production={production} 
              dispatches={dispatches} 
              expenses={expenses}
            />
          )}
        </div>

        {/* BOTTOM LEGAL MARGIN CREDITS RAIL (PRINT HIDDEN) */}
        <footer className="pt-6 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-550 text-slate-500 font-mono print:hidden">
          <span>Rajadhani Sweets Enterprise Dashboard</span>
          <span>&copy; 2026. SQLite Local Engine Active</span>
        </footer>

      </div>
    </div>
  );
}
