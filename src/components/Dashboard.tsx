import { 
  Flame, Truck, Store, CircleDollarSign, Coins, TrendingUp, AlertTriangle, Scale 
} from 'lucide-react';
import { Shop, SweetItem, ProductionEntry, TripEntry, Expense } from '../types';
import { HISTORIC_DAILY_TRENDS } from '../data';

interface DashboardProps {
  shops: Shop[];
  items: SweetItem[];
  production: ProductionEntry[];
  dispatches: TripEntry[];
  expenses: Expense[];
  onNavigate: (tab: string) => void;
}

export default function Dashboard({
  shops,
  items,
  production,
  dispatches,
  expenses,
  onNavigate
}: DashboardProps) {
  
  // 1. COMPUTE KEY METRICS FOR TODAY (2026-05-24)
  const todayStr = '2026-05-24';
  
  // Prepared Today
  const preparedToday = production
    .filter(p => p.date === todayStr)
    .reduce((sum, item) => sum + item.quantityPrepared, 0);

  // Dispatch entries today
  const dispatchesToday = dispatches.filter(d => d.date === todayStr);
  const totalTripsCount = dispatchesToday.length;

  // Shops supplied today (unique shops supplied)
  const uniqueShopsSupplied = Array.from(
    new Set(dispatchesToday.filter(d => d.status === 'Completed').map(d => d.shopId))
  ).length;

  // Revenue Today
  const revenueToday = dispatchesToday
    .filter(d => d.status === 'Completed')
    .reduce((sum, d) => sum + d.totalAmount, 0);

  // Expenses Today
  const expensesToday = expenses
    .filter(e => e.date === todayStr)
    .reduce((sum, e) => sum + e.amount, 0);

  // Outstanding / Pending collection (Total collective balance from Shop Master)
  const totalOutstandingBalance = shops.reduce((sum, s) => sum + (s.outstandingBalance || 0), 0);

  // Wastage tracking today
  let wastageToday = 0;
  dispatchesToday.forEach(d => {
    d.items.forEach(itm => {
      wastageToday += itm.wastage || 0;
    });
  });

  // Profit estimation today
  // Let's compute actual sales net costs for all dispatched items today
  let productionCostForDispatched = 0;
  dispatchesToday.forEach(td => {
    td.items.forEach(item => {
      const match = items.find(i => i.id === item.sweetItemId);
      const costRate = match ? match.productionCost : 0;
      productionCostForDispatched += item.netWeight * costRate;
    });
  });
  const profitEstimateToday = Math.max(0, revenueToday - productionCostForDispatched - expensesToday);

  // 2. DATA FOR CHARTS
  // Sweet-wise volumes
  const sweetVolumesMap: { [name: string]: number } = {};
  dispatches.forEach(d => {
    d.items.forEach(itm => {
      sweetVolumesMap[itm.sweetItemName] = (sweetVolumesMap[itm.sweetItemName] || 0) + itm.netWeight;
    });
  });
  const sweetVolumeChartData = Object.entries(sweetVolumesMap)
    .map(([name, weight]) => ({ name, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  // Customer performance (Revenue generated per customer)
  const customerRevenueMap: { [name: string]: number } = {};
  dispatches.forEach(d => {
    customerRevenueMap[d.shopName] = (customerRevenueMap[d.shopName] || 0) + d.totalAmount;
  });
  const topCustomerChartData = Object.entries(customerRevenueMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Workspace Dashboard
          </h2>
          <p className="text-sm text-slate-400">
            Real-time manufacturing register & shop dispatch logs for today: <span className="font-mono text-amber-400">2026-05-24</span>
          </p>
        </div>
        <button 
          onClick={() => onNavigate('dispatches')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2"
        >
          <Truck className="w-4 h-4" />
          Log Morning Trip
        </button>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total prepared */}
        <div 
          onClick={() => onNavigate('production')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Sweets Prepared (Today)</span>
            <span className="text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              {preparedToday} <span className="text-sm font-normal text-slate-500">Kg/Units</span>
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              Active ledger entries this morning
            </span>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
            <Flame className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Dispatch & supplied */}
        <div 
          onClick={() => onNavigate('dispatches')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Trips Supplied (Today)</span>
            <span className="text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              {totalTripsCount} <span className="text-sm font-normal text-slate-500">Log entries</span>
            </span>
            <span className="text-[11px] text-slate-400 font-semibold text-amber-400/80">
              {uniqueShopsSupplied} shops successfully served
            </span>
          </div>
          <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold">
            <Truck className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Revenue today */}
        <div 
          onClick={() => onNavigate('reports')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Gross Revenue (Today)</span>
            <span className="text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              ₹ {revenueToday.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Trip sales net of shop discounts
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CircleDollarSign className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Daily Profit Estimate */}
        <div 
          onClick={() => onNavigate('reports')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Profit Estimate (Today)</span>
            <span className="text-2xl font-bold tracking-tight text-emerald-400 block group-hover:text-emerald-300 transition-colors">
              ₹ {profitEstimateToday.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500">
              Excluding raw ingredients costs
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Expenses */}
        <div 
          onClick={() => onNavigate('expenses')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between z-1"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Expenses (Today)</span>
            <span className="text-2xl font-bold tracking-tight text-white block group-hover:text-rose-400 transition-colors">
              ₹ {expensesToday.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block">
              Direct materials procuring & fuel
            </span>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-400">
            <Coins className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Outstanding credit */}
        <div 
          onClick={() => onNavigate('shops')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Total Pending Credit</span>
            <span className="text-2xl font-bold tracking-tight text-amber-500 block group-hover:text-amber-400 transition-colors">
              ₹ {totalOutstandingBalance.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block">
              Outstanding shop balances total
            </span>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
            <AlertTriangle className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Wastage today */}
        <div 
          onClick={() => onNavigate('reports')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Tray Wastage Today</span>
            <span className="text-2xl font-bold tracking-tight text-white block">
              {wastageToday.toFixed(1)} <span className="text-sm font-normal text-slate-500">Kg</span>
            </span>
            <span className="text-[11px] text-slate-400 text-amber-400">
              About {((wastageToday / Math.max(1, preparedToday)) * 100).toFixed(1)}% of processed weight
            </span>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 text-red-400">
            <Scale className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Shops master */}
        <div 
          onClick={() => onNavigate('shops')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Active Customers</span>
            <span className="text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              {shops.filter(s => s.active).length} / {shops.length}
            </span>
            <span className="text-[11px] text-slate-500">
              Registered retail outlets
            </span>
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Store className="w-5 h-5 shrink-0" />
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. SALES WEEKLY TREND CHART */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-slate-300 uppercase block mb-1">
              Sales & Profits Daily Trend
            </h4>
            <p className="text-xs text-slate-500">Last 7 days daily performance in Rupees</p>
          </div>
          
          <div className="h-64 flex flex-col justify-between">
            {/* SVG Bars / Chart */}
            <div className="flex-1 flex items-end justify-between gap-4 pt-4 border-b border-slate-800 pb-1">
              {HISTORIC_DAILY_TRENDS.map((item, index) => {
                // max is 130000
                const percentHeight = Math.max(10, (item.revenue / 130000) * 100);
                const percentProfit = Math.max(10, (item.profit / 130000) * 100);
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-slate-100 text-[10px] p-2 rounded shadow-xl border border-slate-800 font-mono hidden group-hover:block whitespace-nowrap z-30">
                      <p className="text-amber-400 font-semibold">Date: 2026-{item.date}</p>
                      <p className="mb-0.5">Sales: ₹ {item.revenue.toLocaleString()}</p>
                      <p className="text-emerald-400">Profit: ₹ {item.profit.toLocaleString()}</p>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-36">
                      {/* Revenue Bar */}
                      <div 
                        style={{ height: `${percentHeight}%` }} 
                        className="w-1/2 bg-amber-500/70 group-hover:bg-amber-500 rounded-t transition-all"
                      />
                      {/* Profit Bar */}
                      <div 
                        style={{ height: `${percentProfit}%` }} 
                        className="w-1/2 bg-emerald-500/70 group-hover:bg-emerald-500 rounded-t transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Axis labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
              {HISTORIC_DAILY_TRENDS.map((item, i) => (
                <span key={i} className="flex-1 text-center">{item.date}</span>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 inline-block rounded"></span>
                Revenue
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 inline-block rounded"></span>
                Estimated Profit
              </span>
            </div>
          </div>
        </div>

        {/* 2. TOP SELLING SWEETS IN WEIGHT */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-slate-300 uppercase block mb-1">
              Top Selling Sweets
            </h4>
            <p className="text-xs text-slate-500">Cumulative dispatch weights (Kg) from trip registers</p>
          </div>

          <div className="space-y-4 pt-4 h-64 flex flex-col justify-center">
            {sweetVolumeChartData.map((sweet, index) => {
              // Share of max weight
              const maxWeight = sweetVolumeChartData[0]?.weight || 100;
              const widthPct = Math.max(10, (sweet.weight / maxWeight) * 100);
              const colorClass = index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-cyan-500' : index === 2 ? 'bg-indigo-500' : 'bg-slate-700';

              return (
                <div key={sweet.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{sweet.name}</span>
                    <span className="font-mono text-slate-400">{sweet.weight.toFixed(1)} Kg</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      style={{ width: `${widthPct}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SHIELDING PERFORMANCE: CUSTOMER RANKING */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-slate-300 uppercase block mb-1">
              Top Customer Outlets
            </h4>
            <p className="text-xs text-slate-500">Revenue contribution rankings</p>
          </div>

          <div className="space-y-3 pt-2">
            {topCustomerChartData.map((cust, idx) => (
              <div 
                key={cust.name} 
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-slate-800 text-amber-500 font-mono font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{cust.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-white block">
                    ₹ {cust.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. REAL-TIME OFF-SITE WORKBENCH HEALTH & ALERT FEED */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-slate-300 uppercase block mb-1">
              ERP System Diagnostics
            </h4>
            <p className="text-xs text-slate-500 mb-4">Offline engine logs and database health indicators</p>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-slate-400 bg-slate-950/80 p-4 rounded-lg border border-slate-800/80 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5 overflow-y-auto">
              <p className="text-slate-500">[2026-05-24 02:15:00] Initialized local storage SQLite mirror.</p>
              <p className="text-emerald-500">[2026-05-24 04:00:00] OK: Loaded shop_master table schema. rowcount=5</p>
              <p className="text-emerald-500">[2026-05-24 04:00:00] OK: Loaded item_master table schema. rowcount=7</p>
              <p className="text-yellow-400">[2026-05-24 04:10:00] ALERT: Ghee stock below target threshold limit.</p>
              <p className="text-emerald-500">[2026-05-24 04:30:11] LOG: S1 Trip dispatch transaction saved successfully.</p>
              <p className="text-slate-500">[2026-05-24 04:39:59] SYNC: Local updates queued for cloud cloud backup sync.</p>
            </div>
            
            <div className="border-t border-slate-800/60 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <span>SQL ENGINE: sqlite-wasm v3.45.0</span>
              <span className="text-emerald-400 flex items-center gap-1 shrink-0 font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                STABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
