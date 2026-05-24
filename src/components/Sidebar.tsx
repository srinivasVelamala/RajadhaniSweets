import { 
  LayoutDashboard, Store, Candy, Flame, Truck, 
  FileSpreadsheet, FileBarChart, Terminal, Keyboard,
  Package, Receipt, Users
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'Admin' | 'Operator';
  setUserRole: (role: 'Admin' | 'Operator') => void;
  fastEntryMode: boolean;
  setFastEntryMode: (mode: boolean) => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole,
  fastEntryMode,
  setFastEntryMode
}: SidebarProps) {
  
  const menuItems: Array<{ id: string; name: string; icon: any; highlight?: boolean; badge?: string }> = [
    { id: 'dashboard',  name: 'Dashboard',        icon: LayoutDashboard },
    { id: 'shops',      name: 'Shop Master',       icon: Store },
    { id: 'items',      name: 'Item Master',       icon: Candy },
    { id: 'production', name: 'Daily Production',  icon: Flame },
    { id: 'dispatches', name: 'Dispatches',        icon: Truck },
    { id: 'inventory',  name: 'Inventory',         icon: Package },
    { id: 'expenses',   name: 'Expenses',          icon: Receipt },
    { id: 'workers',    name: 'Workers',           icon: Users },
    { id: 'excel',      name: 'Excel Migration',   icon: FileSpreadsheet },
    { id: 'reports',    name: 'Export Reports',    icon: FileBarChart },
    { id: 'desktop',    name: 'Desktop Dist Kit',  icon: Terminal, highlight: true },
  ];

  return (
    <aside className="w-full flex flex-col h-full" style={{ background: 'linear-gradient(180deg,#1a3363 0%,#1e3a8a 40%,#1e40af 100%)' }}>
      
      {/* Brand Header */}
      <div className="px-5 py-5 flex flex-col justify-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-blue-900 shadow-lg text-sm"
            style={{ background: 'linear-gradient(135deg,#fde68a,#f59e0b)', boxShadow: '0 4px 14px rgba(245,158,11,0.4)' }}>
            🍬
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight">Rajdhani Sweets</h1>
            <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'rgba(253,230,138,0.85)' }}>
              Manufacturing ERP
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? 'text-blue-900 shadow-md font-semibold'
                  : item.highlight 
                    ? 'hover:bg-white/10 border border-yellow-300/25 hover:border-yellow-300/50'
                    : 'hover:bg-white/10'
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg,#fde68a,#fbbf24)',
                boxShadow: '0 4px 14px rgba(251,191,36,0.35)'
              } : {
                color: isActive ? undefined : item.highlight ? 'rgba(253,230,138,0.9)' : 'rgba(255,255,255,0.72)'
              }}
            >
              <IconComponent className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                isActive ? 'text-blue-900' : ''
              }`} />
              <span className="truncate">{item.name}</span>
              
              {item.badge && (
                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                  isActive ? 'bg-blue-900/20 text-blue-900' : 'bg-yellow-300/20 text-yellow-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Controls */}
      <div className="p-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.15)' }}>
        <button 
          onClick={() => setFastEntryMode(!fastEntryMode)}
          className={`w-full py-2 px-3 rounded-lg text-xs font-mono flex items-center justify-between transition-all ${
            fastEntryMode 
              ? 'text-emerald-200 border border-emerald-400/40' 
              : 'text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20'
          }`}
          style={fastEntryMode ? { background: 'rgba(52,211,153,0.15)' } : { background: 'rgba(255,255,255,0.06)' }}
        >
          <span className="flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5" />
            FAST KEYBOARD ENTRY
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${fastEntryMode ? 'bg-emerald-500/30 text-emerald-300' : 'bg-white/10 text-white/40'}`}>
            {fastEntryMode ? 'ON' : 'OFF'}
          </span>
        </button>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            User Role Privilege
          </label>
          <div className="grid grid-cols-2 gap-1 p-0.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {(['Admin','Operator'] as const).map(role => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  userRole === role ? 'text-blue-900 shadow-sm' : 'text-white/50 hover:text-white/80'
                }`}
                style={userRole === role ? { background: 'linear-gradient(135deg,#fde68a,#fbbf24)' } : {}}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-1">
          <p className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>Rajdhani Mobile Sync 1.0.4</p>
          <p className="text-[8px] font-mono flex items-center justify-center gap-1 mt-0.5" style={{ color: 'rgba(52,211,153,0.8)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            OFFLINE DATABASE ONLINE
          </p>
        </div>
      </div>
    </aside>
  );
}
