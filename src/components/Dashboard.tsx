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

const CARD_GLASS = {
  background: 'rgba(255,255,255,0.78)',
  backdropFilter: 'blur(18px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
  border: '1px solid rgba(255,255,255,0.9)',
  boxShadow: '0 2px 16px rgba(30,58,138,0.07), 0 1px 4px rgba(0,0,0,0.04)',
} as React.CSSProperties;

const CARD_HOVER_CLASS = 'transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg';

function MetricCard({ 
  label, value, sub, icon, iconBg, iconColor, onClick 
}: { 
  label: string; value: React.ReactNode; sub: React.ReactNode;
  icon: React.ReactNode; iconBg: string; iconColor: string; onClick?: () => void 
}) {
  return (
    <div onClick={onClick} className={`rounded-2xl p-5 flex items-start justify-between group ${CARD_HOVER_CLASS}`} style={CARD_GLASS}>
      <div className="space-y-1.5 min-w-0 pr-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-widest block" style={{ color: '#64748b' }}>{label}</span>
        <div className="text-[1.45rem] font-bold tracking-tight leading-tight" style={{ color: '#0f172a' }}>{value}</div>
        <div className="text-[11px] leading-snug" style={{ color: '#94a3b8' }}>{sub}</div>
      </div>
      <div className="p-3 rounded-xl shrink-0 shadow-sm" style={{ background: iconBg }}>
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
    </div>
  );
}

export default function Dashboard({
  shops, items, production, dispatches, expenses, onNavigate
}: DashboardProps) {
  
  const todayStr = '2026-05-24';
  
  const preparedToday = production.filter(p => p.date === todayStr).reduce((s, i) => s + i.quantityPrepared, 0);
  const dispatchesToday = dispatches.filter(d => d.date === todayStr);
  const totalTripsCount = dispatchesToday.length;
  const uniqueShopsSupplied = Array.from(new Set(dispatchesToday.filter(d => d.status === 'Completed').map(d => d.shopId))).length;
  const revenueToday = dispatchesToday.filter(d => d.status === 'Completed').reduce((s, d) => s + d.totalAmount, 0);
  const expensesToday = expenses.filter(e => e.date === todayStr).reduce((s, e) => s + e.amount, 0);
  const totalOutstandingBalance = shops.reduce((s, sh) => s + (sh.outstandingBalance || 0), 0);

  let wastageToday = 0;
  dispatchesToday.forEach(d => d.items.forEach(itm => { wastageToday += itm.wastage || 0; }));

  let productionCostForDispatched = 0;
  dispatchesToday.forEach(td => {
    td.items.forEach(item => {
      const match = items.find(i => i.id === item.sweetItemId);
      productionCostForDispatched += item.netWeight * (match ? match.productionCost : 0);
    });
  });
  const profitEstimateToday = Math.max(0, revenueToday - productionCostForDispatched - expensesToday);

  const sweetVolumesMap: { [name: string]: number } = {};
  dispatches.forEach(d => d.items.forEach(itm => {
    sweetVolumesMap[itm.sweetItemName] = (sweetVolumesMap[itm.sweetItemName] || 0) + itm.netWeight;
  }));
  const sweetVolumeChartData = Object.entries(sweetVolumesMap)
    .map(([name, weight]) => ({ name, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  const customerRevenueMap: { [name: string]: number } = {};
  dispatches.forEach(d => { customerRevenueMap[d.shopName] = (customerRevenueMap[d.shopName] || 0) + d.totalAmount; });
  const topCustomerChartData = Object.entries(customerRevenueMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const BAR_COLORS = ['#2563eb', '#0891b2', '#7c3aed', '#059669', '#d97706'];

  return (
    <div className="space-y-7 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#1e3a8a' }}>
            🍬 Workspace Dashboard
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>
            Real-time manufacturing register & shop dispatch logs for today:{' '}
            <span className="font-mono font-semibold" style={{ color: '#2563eb' }}>2026-05-24</span>
          </p>
        </div>
        <button 
          onClick={() => onNavigate('dispatches')}
          className="px-5 py-2.5 font-semibold rounded-xl shadow-lg shrink-0 text-sm transition-all flex items-center gap-2 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(37,99,235,0.35)'
          }}
        >
          <Truck className="w-4 h-4" />
          Log Morning Trip
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Sweets Prepared (Today)"
          value={<>{preparedToday} <span className="text-sm font-normal" style={{ color: '#94a3b8' }}>Kg/Units</span></>}
          sub="Active ledger entries this morning"
          icon={<Flame className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#fef3c7,#fde68a)"
          iconColor="#d97706"
          onClick={() => onNavigate('production')}
        />
        <MetricCard
          label="Trips Supplied (Today)"
          value={<>{totalTripsCount} <span className="text-sm font-normal" style={{ color: '#94a3b8' }}>Log entries</span></>}
          sub={<span style={{ color: '#2563eb', fontWeight: 600 }}>{uniqueShopsSupplied} shops successfully served</span>}
          icon={<Truck className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#e0e7ff,#c7d2fe)"
          iconColor="#4f46e5"
          onClick={() => onNavigate('dispatches')}
        />
        <MetricCard
          label="Gross Revenue (Today)"
          value={<>₹ {revenueToday.toLocaleString()}</>}
          sub="Trip sales net of shop discounts"
          icon={<CircleDollarSign className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#d1fae5,#a7f3d0)"
          iconColor="#059669"
          onClick={() => onNavigate('reports')}
        />
        <MetricCard
          label="Profit Estimate (Today)"
          value={<span style={{ color: '#059669' }}>₹ {profitEstimateToday.toLocaleString()}</span>}
          sub="Excluding raw ingredients costs"
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#d1fae5,#bbf7d0)"
          iconColor="#16a34a"
          onClick={() => onNavigate('reports')}
        />
        <MetricCard
          label="Expenses (Today)"
          value={<>₹ {expensesToday.toLocaleString()}</>}
          sub="Direct materials procuring & fuel"
          icon={<Coins className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#ffe4e6,#fecdd3)"
          iconColor="#e11d48"
          onClick={() => onNavigate('expenses')}
        />
        <MetricCard
          label="Total Pending Credit"
          value={<span style={{ color: '#d97706' }}>₹ {totalOutstandingBalance.toLocaleString()}</span>}
          sub="Outstanding shop balances total"
          icon={<AlertTriangle className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#fef9c3,#fef08a)"
          iconColor="#ca8a04"
          onClick={() => onNavigate('shops')}
        />
        <MetricCard
          label="Tray Wastage Today"
          value={<>{wastageToday.toFixed(1)} <span className="text-sm font-normal" style={{ color: '#94a3b8' }}>Kg</span></>}
          sub={<span style={{ color: '#ef4444' }}>{((wastageToday / Math.max(1, preparedToday)) * 100).toFixed(1)}% of processed weight</span>}
          icon={<Scale className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#fee2e2,#fecaca)"
          iconColor="#dc2626"
          onClick={() => onNavigate('reports')}
        />
        <MetricCard
          label="Active Customers"
          value={<>{shops.filter(s => s.active).length} <span className="text-sm font-normal" style={{ color: '#94a3b8' }}>/ {shops.length}</span></>}
          sub="Registered retail outlets"
          icon={<Store className="w-5 h-5" />}
          iconBg="linear-gradient(135deg,#cffafe,#a5f3fc)"
          iconColor="#0891b2"
          onClick={() => onNavigate('shops')}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sales Trend */}
        <div className="rounded-2xl p-5 space-y-4" style={CARD_GLASS}>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1e3a8a' }}>
              📈 Sales & Profits Daily Trend
            </h4>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Last 7 days daily performance in Rupees</p>
          </div>
          
          <div className="h-64 flex flex-col justify-between">
            <div className="flex-1 flex items-end justify-between gap-3 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
              {HISTORIC_DAILY_TRENDS.map((item, index) => {
                const percentHeight = Math.max(10, (item.revenue / 130000) * 100);
                const percentProfit = Math.max(10, (item.profit / 130000) * 100);
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[10px] p-2.5 rounded-xl shadow-xl border hidden group-hover:block whitespace-nowrap z-30 font-mono"
                      style={{ background: '#1e3a8a', color: '#fff', borderColor: '#2563eb', boxShadow: '0 4px 16px rgba(30,58,138,0.3)' }}>
                      <p className="font-semibold" style={{ color: '#fde68a' }}>2026-{item.date}</p>
                      <p>Sales: ₹{item.revenue.toLocaleString()}</p>
                      <p style={{ color: '#6ee7b7' }}>Profit: ₹{item.profit.toLocaleString()}</p>
                    </div>
                    <div className="w-full flex items-end justify-center gap-1 h-36">
                      <div style={{ height: `${percentHeight}%`, background: 'linear-gradient(to top,#2563eb,#60a5fa)', borderRadius: '4px 4px 0 0' }}
                        className="w-1/2 group-hover:opacity-90 transition-all" />
                      <div style={{ height: `${percentProfit}%`, background: 'linear-gradient(to top,#059669,#34d399)', borderRadius: '4px 4px 0 0' }}
                        className="w-1/2 group-hover:opacity-90 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] font-mono mt-2" style={{ color: '#94a3b8' }}>
              {HISTORIC_DAILY_TRENDS.map((item, i) => (
                <span key={i} className="flex-1 text-center">{item.date}</span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs font-mono" style={{ color: '#64748b' }}>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 inline-block rounded" style={{ background: 'linear-gradient(135deg,#2563eb,#60a5fa)' }}></span>
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 inline-block rounded" style={{ background: 'linear-gradient(135deg,#059669,#34d399)' }}></span>
                Estimated Profit
              </span>
            </div>
          </div>
        </div>

        {/* Top Selling Sweets */}
        <div className="rounded-2xl p-5 space-y-4" style={CARD_GLASS}>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1e3a8a' }}>
              🍬 Top Selling Sweets
            </h4>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Cumulative dispatch weights (Kg) from trip registers</p>
          </div>
          <div className="space-y-4 pt-2 h-64 flex flex-col justify-center">
            {sweetVolumeChartData.map((sweet, index) => {
              const maxWeight = sweetVolumeChartData[0]?.weight || 100;
              const widthPct = Math.max(8, (sweet.weight / maxWeight) * 100);
              return (
                <div key={sweet.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold" style={{ color: '#1e293b' }}>{sweet.name}</span>
                    <span className="font-mono font-bold" style={{ color: BAR_COLORS[index] || '#64748b' }}>{sweet.weight.toFixed(1)} Kg</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <div 
                      style={{ width: `${widthPct}%`, background: `linear-gradient(90deg,${BAR_COLORS[index] || '#94a3b8'},${BAR_COLORS[index] || '#94a3b8'}88)`, transition: 'width 0.6s ease' }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Customer Outlets */}
        <div className="rounded-2xl p-5 space-y-4" style={CARD_GLASS}>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1e3a8a' }}>
              🏪 Top Customer Outlets
            </h4>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Revenue contribution rankings</p>
          </div>
          <div className="space-y-2.5 pt-1">
            {topCustomerChartData.map((cust, idx) => (
              <div key={cust.name} className="flex items-center justify-between p-3.5 rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: idx === 0 ? 'linear-gradient(135deg,#eff6ff,#dbeafe)' : '#f8fafc', border: `1px solid ${idx === 0 ? 'rgba(37,99,235,0.2)' : '#e2e8f0'}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg font-mono font-bold flex items-center justify-center text-xs shadow-sm"
                    style={{ background: idx === 0 ? 'linear-gradient(135deg,#2563eb,#1d4ed8)' : 'linear-gradient(135deg,#e2e8f0,#cbd5e1)', color: idx === 0 ? '#fff' : '#64748b' }}>
                    #{idx + 1}
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#1e293b' }}>{cust.name}</span>
                </div>
                <span className="text-sm font-mono font-bold" style={{ color: idx === 0 ? '#2563eb' : '#334155' }}>
                  ₹ {cust.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ERP System Diagnostics */}
        <div className="rounded-2xl p-5 flex flex-col" style={CARD_GLASS}>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1e3a8a' }}>
              🖥️ ERP System Diagnostics
            </h4>
            <p className="text-xs mt-0.5 mb-4" style={{ color: '#94a3b8' }}>Offline engine logs and database health indicators</p>
          </div>
          <div className="font-mono text-[11px] p-4 rounded-xl flex-1 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="space-y-1.5">
              <p style={{ color: '#475569' }}>[2026-05-24 02:15] Initialized local storage SQLite mirror.</p>
              <p style={{ color: '#34d399' }}>[2026-05-24 04:00] OK: Loaded shop_master table. rowcount=5</p>
              <p style={{ color: '#34d399' }}>[2026-05-24 04:00] OK: Loaded item_master table. rowcount=7</p>
              <p style={{ color: '#fbbf24' }}>[2026-05-24 04:10] ALERT: Ghee stock below threshold limit.</p>
              <p style={{ color: '#34d399' }}>[2026-05-24 04:30] LOG: S1 Trip dispatch transaction saved.</p>
              <p style={{ color: '#475569' }}>[2026-05-24 04:39] SYNC: Local updates queued for cloud backup.</p>
            </div>
            <div className="flex items-center justify-between text-[10px] mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: '#475569' }}>
              <span>SQL ENGINE: sqlite-wasm v3.45.0</span>
              <span className="flex items-center gap-1.5 font-semibold animate-pulse" style={{ color: '#34d399' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                STABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
