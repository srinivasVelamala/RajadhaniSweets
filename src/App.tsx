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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<'Admin' | 'Operator'>('Admin');
  const [fastEntryMode, setFastEntryMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core local states database with persistent LocalStorage mirrors
  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem('rajadhani_shops_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_SHOPS;
  });
  const [items, setItems] = useState<SweetItem[]>(() => {
    const saved = localStorage.getItem('rajadhani_items_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_SWEETS;
  });
  const [production, setProduction] = useState<ProductionEntry[]>(() => {
    const saved = localStorage.getItem('rajadhani_production_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTION;
  });
  const [dispatches, setDispatches] = useState<TripEntry[]>(() => {
    const saved = localStorage.getItem('rajadhani_dispatches_v_excel_24may_v4');
    let loaded: TripEntry[] = saved ? JSON.parse(saved) : INITIAL_TRIPS;
    
    // Auto-backfill May 23 dispatches if they don't exist, to support "dupe yesterday" out-of-the-box on first load
    const hasMay23 = loaded.some((d: TripEntry) => d.date === '2026-05-23');
    if (!hasMay23) {
      const may24trips = loaded.filter((d: TripEntry) => d.date === '2026-05-24');
      const may23trips = may24trips.map((trip: TripEntry) => ({
        ...trip,
        id: `${trip.id}_may23_${Math.random()}`,
        date: '2026-05-23'
      }));
      loaded = [...loaded, ...may23trips];
    }
    return loaded;
  });
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('rajadhani_inventory_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('rajadhani_expenses_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('rajadhani_workers_v_excel_24may_v4');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  // Keep LocalStorage databases fully persistent
  useEffect(() => {
    localStorage.setItem('rajadhani_shops_v_excel_24may_v4', JSON.stringify(shops));
  }, [shops]);
  useEffect(() => {
    localStorage.setItem('rajadhani_items_v_excel_24may_v4', JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem('rajadhani_production_v_excel_24may_v4', JSON.stringify(production));
  }, [production]);
  useEffect(() => {
    localStorage.setItem('rajadhani_dispatches_v_excel_24may_v4', JSON.stringify(dispatches));
  }, [dispatches]);
  useEffect(() => {
    localStorage.setItem('rajadhani_inventory_v_excel_24may_v4', JSON.stringify(inventory));
  }, [inventory]);
  useEffect(() => {
    localStorage.setItem('rajadhani_expenses_v_excel_24may_v4', JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('rajadhani_workers_v_excel_24may_v4', JSON.stringify(workers));
  }, [workers]);

  // System alert notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Periodically generate notifications for realism (low stock, debtors and pending dispatches)
  useEffect(() => {
    const list: Notification[] = [];
    
    // Low stock checks
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

    // Outstanding dues checks
    shops.forEach(sh => {
      if (sh.outstandingBalance > 5000) {
        list.push({
          id: `notif-shop-${sh.id}`,
          type: 'warning',
          title: `High Outstanding Balance: ${sh.name}`,
          message: `Cumulative credit balances at ₹${sh.outstandingBalance.toLocaleString()}. Limit: ${sh.creditDays || 15} days.`,
          timestamp: '1h ago',
          read: false
        });
      }
    });

    setNotifications(list);
  }, [inventory, shops, dispatches.length]);

  // STATE MANIPULATORS
  
  // Shops Master manipulation
  const handleAddShop = (newShop: Omit<Shop, 'id' | 'outstandingBalance'>) => {
    const created: Shop = {
      ...newShop,
      id: `SH-${Date.now()}`,
      outstandingBalance: 0
    };
    setShops([created, ...shops]);
  };

  const handleUpdateShop = (updated: Shop) => {
    setShops(shops.map(s => s.id === updated.id ? updated : s));
  };

  // Sweets Catalog manipulation
  const handleAddItem = (newItem: Omit<SweetItem, 'id'>) => {
    const created: SweetItem = {
      ...newItem,
      id: `SW-${Date.now()}`
    };
    setItems([created, ...items]);
  };

  const handleUpdateItem = (updated: SweetItem) => {
    setItems(items.map(it => it.id === updated.id ? updated : it));
  };

  // Morning production entry
  const handleAddProduction = (newEntry: Omit<ProductionEntry, 'id'>) => {
    const created: ProductionEntry = {
      ...newEntry,
      id: `PR-${Date.now()}`
    };
    setProduction([created, ...production]);
  };

  const handleSaveBulkProduction = (date: string, entries: Omit<ProductionEntry, 'id'>[]) => {
    const withoutDate = production.filter(p => p.date !== date);
    const withIds = entries.map((e, idx) => ({
      ...e,
      id: `PR-${date}-${Date.now()}-${idx}`
    }));
    setProduction([...withIds, ...withoutDate]);
  };

  // Core Dispatch Trip entry & adjusting Shop outstanding balances automatically!
  const handleAddDispatch = (newTrip: Omit<TripEntry, 'id'>) => {
    const created: TripEntry = {
      ...newTrip,
      id: `TR-${Date.now()}`
    };

    setDispatches([created, ...dispatches]);

    // Automatically increase outstanding balance of the receiving shop
    setShops(shops.map(sh => {
      if (sh.id === newTrip.shopId) {
        return {
          ...sh,
          outstandingBalance: sh.outstandingBalance + newTrip.totalAmount
        };
      }
      return sh;
    }));
  };

  const handleUpdateDispatch = (updated: TripEntry) => {
    setDispatches(dispatches.map(d => d.id === updated.id ? updated : d));
  };

  const handleSaveDailyProductionData = (
    date: string,
    allDateTrips: TripEntry[],
    productionEntries: Omit<ProductionEntry, 'id'>[]
  ) => {
    // 1. Calculate the outstanding balance differences for each shop
    const oldDateDispatches = dispatches.filter(d => d.date === date);
    const balanceMap: Record<string, number> = {};

    // Subtract old total amounts
    oldDateDispatches.forEach(d => {
      balanceMap[d.shopId] = (balanceMap[d.shopId] || 0) - d.totalAmount;
    });

    // Add new total amounts
    allDateTrips.forEach(d => {
      balanceMap[d.shopId] = (balanceMap[d.shopId] || 0) + d.totalAmount;
    });

    // 2. Update shops outstandingBalance
    setShops(prevShops =>
      prevShops.map(sh => {
        const diff = balanceMap[sh.id] || 0;
        if (diff !== 0) {
          const newBal = Math.max(0, sh.outstandingBalance + diff);
          return {
            ...sh,
            outstandingBalance: Number(newBal.toFixed(2))
          };
        }
        return sh;
      })
    );

    // 3. Update dispatches: filter out this date and add the new trips
    setDispatches(prevDispatches => {
      const distinctOtherTrips = prevDispatches.filter(d => d.date !== date);
      return [...allDateTrips, ...distinctOtherTrips];
    });

    // 4. Update production ledger
    setProduction(prevProduction => {
      const otherLedger = prevProduction.filter(p => p.date !== date);
      const withIds = productionEntries.map((pe, idx) => ({
        ...pe,
        id: `PR-${date}-${Date.now()}-${idx}-${Math.random()}`
      }));
      return [...withIds, ...otherLedger];
    });
  };

  // Inventory adjustment
  const handleUpdateInventory = (updated: InventoryItem) => {
    setInventory(inventory.map(inv => inv.id === updated.id ? updated : inv));
  };

  // Expense Logger
  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const created: Expense = {
      ...newExpense,
      id: `EX-${Date.now()}`
    };
    setExpenses([created, ...expenses]);
  };

  // Workers registration
  const handleAddWorker = (newWorker: Omit<Worker, 'id' | 'attendance' | 'payments'>) => {
    const created: Worker = {
      ...newWorker,
      id: `WK-${Date.now()}`,
      attendance: {},
      payments: []
    };
    setWorkers([created, ...workers]);
  };

  const handleUpdateWorker = (updated: Worker) => {
    setWorkers(workers.map(w => w.id === updated.id ? updated : w));
  };

  // Legacy Excel Sheet import reconciliations
  const handleExcelImportCompleted = (importedShops: Shop[], importedItems: SweetItem[], importedDispatches: TripEntry[]) => {
    // Merge and update without duplication based on names
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

    setShops(mergedShops);
    setItems(mergedItems);
    setDispatches(mergedDispatches);
  };

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
              onSyncShops={setShops}
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
          <span>© 2026. SQLite Local Engine Active</span>
        </footer>

      </div>
    </div>
  );
}
