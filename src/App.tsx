import { useState, useEffect } from 'react';
import { 
  Menu, Bell, UserCheck
} from 'lucide-react';

import { 
  INITIAL_SHOPS, INITIAL_SWEETS, INITIAL_PRODUCTION, INITIAL_TRIPS, INITIAL_INVENTORY, INITIAL_EXPENSES, INITIAL_WORKERS 
} from './data';

import { 
  Shop, SweetItem, ProductionEntry, TripEntry, InventoryItem, Expense, Worker, Notification 
} from './types';

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

const SWEET_PARTICLES = [
  { emoji: '🍬', x: 4,  y: 8,  size: 2.8, dur: 9,  delay: 0 },
  { emoji: '🧁', x: 14, y: 22, size: 2.4, dur: 13, delay: 1.5 },
  { emoji: '🍭', x: 25, y: 55, size: 3.0, dur: 11, delay: 3 },
  { emoji: '🎂', x: 36, y: 10, size: 2.2, dur: 15, delay: 0.8 },
  { emoji: '🍮', x: 48, y: 70, size: 2.6, dur: 10, delay: 2.2 },
  { emoji: '🍬', x: 58, y: 35, size: 3.2, dur: 14, delay: 4 },
  { emoji: '🧁', x: 68, y: 80, size: 2.0, dur: 12, delay: 1 },
  { emoji: '🍭', x: 76, y: 18, size: 2.8, dur: 8,  delay: 3.5 },
  { emoji: '🍩', x: 84, y: 60, size: 2.4, dur: 16, delay: 0.5 },
  { emoji: '🎂', x: 92, y: 42, size: 2.6, dur: 11, delay: 2.8 },
  { emoji: '🍫', x: 8,  y: 75, size: 2.2, dur: 13, delay: 1.8 },
  { emoji: '🍩', x: 20, y: 88, size: 3.0, dur: 9,  delay: 4.5 },
  { emoji: '🍮', x: 44, y: 40, size: 2.4, dur: 12, delay: 0.3 },
  { emoji: '🍫', x: 72, y: 50, size: 2.8, dur: 10, delay: 3.2 },
  { emoji: '🍬', x: 88, y: 88, size: 2.2, dur: 14, delay: 2 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<'Admin' | 'Operator'>('Admin');
  const [fastEntryMode, setFastEntryMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem('rajdhani_shops_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_SHOPS;
  });
  const [items, setItems] = useState<SweetItem[]>(() => {
    const saved = localStorage.getItem('rajdhani_items_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_SWEETS;
  });
  const [production, setProduction] = useState<ProductionEntry[]>(() => {
    const saved = localStorage.getItem('rajdhani_production_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTION;
  });
  const [dispatches, setDispatches] = useState<TripEntry[]>(() => {
    const saved = localStorage.getItem('rajdhani_dispatches_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('rajdhani_inventory_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('rajdhani_expenses_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('rajdhani_workers_v_excel_v5_today');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  useEffect(() => { localStorage.setItem('rajdhani_shops_v_excel_v5_today',      JSON.stringify(shops));      }, [shops]);
  useEffect(() => { localStorage.setItem('rajdhani_items_v_excel_v5_today',      JSON.stringify(items));      }, [items]);
  useEffect(() => { localStorage.setItem('rajdhani_production_v_excel_v5_today', JSON.stringify(production)); }, [production]);
  useEffect(() => { localStorage.setItem('rajdhani_dispatches_v_excel_v5_today', JSON.stringify(dispatches)); }, [dispatches]);
  useEffect(() => { localStorage.setItem('rajdhani_inventory_v_excel_v5_today',  JSON.stringify(inventory));  }, [inventory]);
  useEffect(() => { localStorage.setItem('rajdhani_expenses_v_excel_v5_today',   JSON.stringify(expenses));   }, [expenses]);
  useEffect(() => { localStorage.setItem('rajdhani_workers_v_excel_v5_today',    JSON.stringify(workers));    }, [workers]);

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
          message: `Cumulative credit balances at ₹${sh.outstandingBalance.toLocaleString()}. Limit: ${sh.creditDays || 15} days.`,
          timestamp: '1h ago',
          read: false
        });
      }
    });
    setNotifications(list);
  }, [inventory, shops, dispatches.length]);

  const handleAddShop = (newShop: Omit<Shop, 'id' | 'outstandingBalance'>) => {
    setShops([{ ...newShop, id: `SH-${Date.now()}`, outstandingBalance: 0 }, ...shops]);
  };
  const handleUpdateShop = (updated: Shop) => setShops(shops.map(s => s.id === updated.id ? updated : s));

  const handleAddItem = (newItem: Omit<SweetItem, 'id'>) => {
    setItems([{ ...newItem, id: `SW-${Date.now()}` }, ...items]);
  };
  const handleUpdateItem = (updated: SweetItem) => setItems(items.map(it => it.id === updated.id ? updated : it));

  const handleAddProduction = (newEntry: Omit<ProductionEntry, 'id'>) => {
    setProduction([{ ...newEntry, id: `PR-${Date.now()}` }, ...production]);
  };
  const handleSaveBulkProduction = (date: string, entries: Omit<ProductionEntry, 'id'>[]) => {
    const withoutDate = production.filter(p => p.date !== date);
    const withIds = entries.map((e, idx) => ({ ...e, id: `PR-${date}-${Date.now()}-${idx}` }));
    setProduction([...withIds, ...withoutDate]);
  };

  const handleAddDispatch = (newTrip: Omit<TripEntry, 'id'>) => {
    const created: TripEntry = { ...newTrip, id: `TR-${Date.now()}` };
    setDispatches([created, ...dispatches]);
    setShops(shops.map(sh => sh.id === newTrip.shopId
      ? { ...sh, outstandingBalance: sh.outstandingBalance + newTrip.totalAmount }
      : sh
    ));
  };
  const handleUpdateDispatch = (updated: TripEntry) => setDispatches(dispatches.map(d => d.id === updated.id ? updated : d));
  const handleUpdateInventory = (updated: InventoryItem) => setInventory(inventory.map(inv => inv.id === updated.id ? updated : inv));

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses([{ ...newExpense, id: `EX-${Date.now()}` }, ...expenses]);
  };

  const handleAddWorker = (newWorker: Omit<Worker, 'id' | 'attendance' | 'payments'>) => {
    setWorkers([{ ...newWorker, id: `WK-${Date.now()}`, attendance: {}, payments: [] }, ...workers]);
  };
  const handleUpdateWorker = (updated: Worker) => setWorkers(workers.map(w => w.id === updated.id ? updated : w));

  const handleExcelImportCompleted = (importedShops: Shop[], importedItems: SweetItem[], importedDispatches: TripEntry[]) => {
    const mergedShops = [...shops];
    importedShops.forEach(nSh => { if (!mergedShops.some(s => s.name.toLowerCase() === nSh.name.toLowerCase())) mergedShops.push(nSh); });
    const mergedItems = [...items];
    importedItems.forEach(nIt => { if (!mergedItems.some(i => i.name.toLowerCase() === nIt.name.toLowerCase())) mergedItems.push(nIt); });
    setShops(mergedShops);
    setItems(mergedItems);
    setDispatches([...importedDispatches, ...dispatches]);
  };

  return (
    <div className="min-h-screen font-sans flex antialiased" style={{ background: '#fdf6ee', position: 'relative', overflow: 'hidden' }}>

      {/* ── Decorative sweet background particles ── */}
      <div className="sweet-bg" aria-hidden="true">
        <div className="sweet-bg::before" />
        {SWEET_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="sweet-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-20 shadow-2xl">
        <Sidebar 
          currentTab={activeTab} 
          setCurrentTab={setActiveTab} 
          userRole={userRole} 
          setUserRole={setUserRole}
          fastEntryMode={fastEntryMode}
          setFastEntryMode={setFastEntryMode}
        />
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="w-72 h-screen shadow-2xl overflow-y-auto">
            <div className="p-4 flex items-center justify-end" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono font-bold px-3 py-1 rounded border text-yellow-200 border-yellow-300/30 hover:bg-white/10 transition"
              >
                [CLOSE]
              </button>
            </div>
            <div className="h-[calc(100vh-52px)]">
              <Sidebar 
                currentTab={activeTab} 
                setCurrentTab={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} 
                userRole={userRole} 
                setUserRole={setUserRole}
                fastEntryMode={fastEntryMode}
                setFastEntryMode={setFastEntryMode}
              />
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-grow flex flex-col min-w-0 max-w-7xl mx-auto px-4 lg:px-8 py-5 min-h-screen space-y-5 relative z-10">
        
        {/* ── Top Header ── */}
        <header className="flex items-center justify-between px-5 py-3.5 rounded-2xl print:hidden"
          style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 4px 24px rgba(30,58,138,0.08), 0 1px 4px rgba(0,0,0,0.04)'
          }}
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg transition hover:bg-slate-100 text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1e40af' }}>
                  Live Operations
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping inline-block"></span>
              </div>
              <h1 className="text-base font-bold leading-tight flex items-center gap-1.5" style={{ color: '#1e3a8a' }}>
                Rajdhani Sweets
                <span className="text-[11px] font-mono font-normal" style={{ color: '#94a3b8' }}>(SQLite Active)</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {notifications.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-amber-700"
                style={{ background: 'linear-gradient(135deg,#fef9c3,#fde68a)', border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 2px 8px rgba(245,158,11,0.15)' }}>
                <Bell className="w-3.5 h-3.5 animate-bounce" />
                <span className="font-bold text-[11px]">{notifications.length} Alerts</span>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span style={{ color: '#475569' }}>Auth: <span className="font-bold text-emerald-700 uppercase">{userRole}</span></span>
            </div>
          </div>
        </header>

        {/* ── Alert Ticker ── */}
        {notifications.length > 0 && activeTab === 'dashboard' && (
          <div className="rounded-2xl p-4 space-y-2.5 print:hidden animate-slide-up"
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245,158,11,0.25)',
              boxShadow: '0 2px 12px rgba(245,158,11,0.08)'
            }}>
            <h4 className="text-[10.5px] uppercase font-mono tracking-widest font-bold flex items-center gap-1.5 mb-1.5" style={{ color: '#b45309' }}>
              ⚠️ Operational Alerts ({notifications.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="p-3 rounded-xl text-[11px] leading-relaxed flex gap-2.5"
                  style={{ background: 'linear-gradient(135deg,#fffbeb,#fef3c7)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5"></div>
                  <div>
                    <span className="font-bold block" style={{ color: '#92400e' }}>{n.title}</span>
                    <span className="block mt-0.5" style={{ color: '#78716c' }}>{n.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Active Module Viewport ── */}
        <div className="flex-grow">
          {activeTab === 'dashboard' && (
            <Dashboard shops={shops} items={items} production={production} dispatches={dispatches} expenses={expenses} onNavigate={setActiveTab} />
          )}
          {activeTab === 'shops' && (
            <Shops shops={shops} onAddShop={handleAddShop} onUpdateShop={handleUpdateShop} onSyncShops={setShops} userRole={userRole} />
          )}
          {activeTab === 'items' && (
            <Items items={items} onAddItem={handleAddItem} onUpdateItem={handleUpdateItem} userRole={userRole} />
          )}
          {activeTab === 'production' && (
            <DailyProduction production={production} items={items} dispatches={dispatches} shops={shops} onAddProduction={handleAddProduction} onSaveBulkProduction={handleSaveBulkProduction} onAddDispatch={handleAddDispatch} onUpdateDispatch={handleUpdateDispatch} userRole={userRole} />
          )}
          {activeTab === 'dispatches' && (
            <Dispatches dispatches={dispatches} shops={shops} items={items} onAddDispatch={handleAddDispatch} onUpdateDispatch={handleUpdateDispatch} userRole={userRole} fastEntryMode={fastEntryMode} />
          )}
          {activeTab === 'inventory' && (
            <Inventory inventory={inventory} onUpdateInventory={handleUpdateInventory} userRole={userRole} />
          )}
          {activeTab === 'expenses' && (
            <Expenses expenses={expenses} onAddExpense={handleAddExpense} userRole={userRole} />
          )}
          {activeTab === 'workers' && (
            <Workers workers={workers} onAddWorker={handleAddWorker} onUpdateWorker={handleUpdateWorker} userRole={userRole} />
          )}
          {activeTab === 'excel' && (
            <ExcelMigration onImportCompleted={handleExcelImportCompleted} />
          )}
          {activeTab === 'reports' && (
            <Reports shops={shops} items={items} production={production} dispatches={dispatches} expenses={expenses} />
          )}
        </div>

        {/* ── Footer ── */}
        <footer className="pt-4 flex justify-between items-center text-[10px] font-mono print:hidden"
          style={{ borderTop: '1px solid rgba(30,58,138,0.08)', color: '#94a3b8' }}>
          <span>Rajdhani Sweets Enterprise Dashboard</span>
          <span>© 2026. SQLite Local Engine Active</span>
        </footer>
      </div>
    </div>
  );
}
