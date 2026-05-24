import { 
  LayoutDashboard, Store, Candy, Flame, Truck, 
  FileSpreadsheet, FileBarChart, BrainCircuit, Terminal, Keyboard 
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
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'shops', name: 'Shop Master', icon: Store },
    { id: 'items', name: 'Item Master', icon: Candy },
    { id: 'production', name: 'Daily Production', icon: Flame },
    { id: 'migration', name: 'Excel Migration', icon: FileSpreadsheet },
    { id: 'reports', name: 'Export Reports', icon: FileBarChart },
    { id: 'desktop', name: 'Desktop Dist Kit', icon: Terminal, highlight: true }
  ];

  return (
    <aside className="w-full flex flex-col h-full text-slate-100">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-900 shadow-md shadow-amber-500/10">
            RS
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white mb-0">Rajdhani Sweets</h1>
            <p className="text-[10px] font-mono tracking-wide text-amber-500 uppercase">Manufacturing ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/10' 
                  : item.highlight 
                    ? 'hover:bg-slate-800/80 text-amber-400 border border-amber-500/20 hover:border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <IconComponent className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                isActive ? 'text-slate-950' : item.highlight ? 'text-amber-400' : 'text-slate-400'
              }`} />
              <span className="truncate">{item.name}</span>
              
              {item.badge && (
                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                  isActive ? 'bg-slate-950 text-amber-500' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Controls (Roles and Keys Mode) */}
      <div className="p-4 border-t border-slate-800 space-y-4 bg-slate-950/40">
        {/* Fast Keyboard mode Toggle */}
        <button 
          onClick={() => setFastEntryMode(!fastEntryMode)}
          className={`w-full py-1.5 px-3 rounded text-xs font-mono flex items-center justify-between transition-colors ${
            fastEntryMode 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800/80 border border-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5" />
            FAST KEYBOARD ENTRY
          </span>
          <span className="text-[10px] font-bold">
            {fastEntryMode ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* User Role Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block">
            User Role Privilege
          </label>
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setUserRole('Admin')}
              className={`py-1 text-xs font-medium rounded-md transition-all ${
                userRole === 'Admin'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserRole('Operator')}
              className={`py-1 text-xs font-medium rounded-md transition-all ${
                userRole === 'Operator'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Operator
            </button>
          </div>
        </div>

        {/* Brand System Info */}
        <div className="text-center">
          <p className="text-[9px] font-mono text-slate-600 mb-0">Rajdhani Mobile Sync 1.0.4</p>
          <p className="text-[8px] font-mono text-emerald-500 flex items-center justify-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            OFFLINE DATABASE ONLINE
          </p>
        </div>
      </div>
    </aside>
  );
}
