import React, { useState } from 'react';
import { 
  Store, User, Phone, MapPin, Percent, CalendarDays, Wallet, Notebook, Plus, Search, Edit2, CheckCircle, XCircle, FileSpreadsheet, RefreshCw
} from 'lucide-react';
import { Shop } from '../types';
import { INITIAL_SHOPS } from '../data';

interface ShopsProps {
  shops: Shop[];
  onAddShop: (shop: Omit<Shop, 'id'>) => void;
  onUpdateShop: (shop: Shop) => void;
  onSyncShops?: (shops: Shop[]) => void;
  userRole: 'Admin' | 'Operator';
}

export default function Shops({ shops, onAddShop, onUpdateShop, onSyncShops, userRole }: ShopsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success'>('idle');

  const handleSyncExcel = () => {
    if (!onSyncShops) return;
    if (window.confirm(`Are you sure you want to update/sync the Shop Master registry?\n\nThis will load all ${INITIAL_SHOPS.length} certified retail shops from 22MAY26-SWEETS.xlsx (including exact discount percentages) and register them. Any existing shops will be replaced with clean master data.`)) {
      onSyncShops(INITIAL_SHOPS);
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 4000);
    }
  };

  // New Shop form fields State
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [creditDays, setCreditDays] = useState(15);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [notes, setNotes] = useState('');

  // Search filter
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.mobile.includes(searchTerm) ||
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setName('');
    setOwner('');
    setMobile('');
    setAddress('');
    setDiscountPercentage(0);
    setCreditDays(15);
    setOutstandingBalance(0);
    setNotes('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !owner || !mobile) {
      alert("Please fill in high-priority fields: Shop Name, Owner, and Contact Mobile");
      return;
    }
    onAddShop({
      name,
      owner,
      mobile,
      address,
      discountPercentage: Number(discountPercentage),
      creditDays: Number(creditDays),
      outstandingBalance: Number(outstandingBalance),
      notes,
      active: true
    });
    resetForm();
    setShowAddForm(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingShop) {
      onUpdateShop(editingShop);
      setEditingShop(null);
    }
  };

  const toggleShopActive = (shop: Shop) => {
    onUpdateShop({
      ...shop,
      active: !shop.active
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Store className="text-amber-500 w-6 h-6 shrink-0" />
            Shop Master Registry
          </h2>
          <p className="text-sm text-slate-400">Add, edit, check metrics, and search retail shop partner credentials</p>
        </div>
        
        {userRole === 'Admin' && !showAddForm && (
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {onSyncShops && (
              <button
                type="button"
                onClick={handleSyncExcel}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-705 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2 font-sans"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                Sync Sheets Shops ({INITIAL_SHOPS.length})
              </button>
            )}
            <button
              onClick={() => { resetForm(); setShowAddForm(true); }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Register New Shop
            </button>
          </div>
        )}
      </div>

      {syncStatus === 'success' && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-slide-up text-slate-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-bold text-emerald-100 text-sm">Shop Registry Synchronized Successfully!</h4>
            <p className="text-xs text-emerald-400">
              Loaded {INITIAL_SHOPS.length} certified shops directly from 22MAY26-SWEETS.xlsx (ShopMaster tab). Discount values are synchronized.
            </p>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-4 gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search workshops / shop name, owner or mobile number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* CREATE SHOP FORM */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-100 text-base">Registering New Customer</h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="text-slate-400 hover:text-slate-200 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Shop Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Sweet Stall"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Owner Contact Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Kumar"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Mobile Number *</label>
              <input
                type="text"
                required
                placeholder="10 digit mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs text-slate-400 font-semibold">Address Details</label>
              <input
                type="text"
                placeholder="Full delivery coordinates"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Default Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Allowed Credit (Days)</label>
              <input
                type="number"
                min="0"
                value={creditDays}
                onChange={(e) => setCreditDays(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Opening Outstanding Balance (₹)</label>
              <input
                type="number"
                min="0"
                value={outstandingBalance}
                onChange={(e) => setOutstandingBalance(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="text-xs text-slate-400 font-semibold">Special Delivery Notes</label>
              <textarea
                rows={2}
                placeholder="Specify sweet preference, timing details, tray replacement rules..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-600 text-sm font-semibold rounded-lg"
            >
              Save Customer Record
            </button>
          </div>
        </form>
      )}

      {/* EDITING DIALOG / WIDGET */}
      {editingShop && (
        <form onSubmit={handleUpdate} className="bg-slate-900 border border-amber-500/20 rounded-xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-amber-400 text-base">Modifying `{editingShop.name}`</h3>
            <button 
              type="button" 
              onClick={() => setEditingShop(null)} 
              className="text-slate-400 hover:text-slate-200 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Shop Name</label>
              <input
                type="text"
                required
                value={editingShop.name}
                onChange={(e) => setEditingShop({ ...editingShop, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Owner Name</label>
              <input
                type="text"
                required
                value={editingShop.owner}
                onChange={(e) => setEditingShop({ ...editingShop, owner: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Mobile Number</label>
              <input
                type="text"
                required
                value={editingShop.mobile}
                onChange={(e) => setEditingShop({ ...editingShop, mobile: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs text-slate-400 font-semibold">Delivery Address</label>
              <input
                type="text"
                value={editingShop.address}
                onChange={(e) => setEditingShop({ ...editingShop, address: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Default Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editingShop.discountPercentage}
                onChange={(e) => setEditingShop({ ...editingShop, discountPercentage: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Credit Allowance (Days)</label>
              <input
                type="number"
                min="0"
                value={editingShop.creditDays}
                onChange={(e) => setEditingShop({ ...editingShop, creditDays: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Outstanding Balance (₹)</label>
              <input
                type="number"
                min="0"
                value={editingShop.outstandingBalance}
                onChange={(e) => setEditingShop({ ...editingShop, outstandingBalance: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="text-xs text-slate-400 font-semibold">Delivery Notes</label>
              <textarea
                rows={2}
                value={editingShop.notes}
                onChange={(e) => setEditingShop({ ...editingShop, notes: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingShop(null)}
              className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-600 text-sm font-semibold rounded-lg"
            >
              Apply Updates
            </button>
          </div>
        </form>
      )}

      {/* SHOPS GRID LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredShops.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <Store className="w-12 h-12 text-slate-700 mx-auto" />
            <p className="text-slate-400 font-medium">No customers match your search criteria</p>
          </div>
        ) : (
          filteredShops.map((shop) => (
            <div 
              key={shop.id} 
              className={`bg-slate-900 border rounded-xl overflow-hidden shadow-sm transition-all relative ${
                shop.active ? 'border-slate-805 border-slate-800' : 'border-slate-900 opacity-60'
              }`}
            >
              {/* Top Banner Accent */}
              <div className={`h-1.5 ${shop.active ? 'bg-amber-500/80' : 'bg-slate-800'}`} />
              
              <div className="p-5 space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 tracking-wider">CODE: {shop.id}</span>
                    <h4 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                      {shop.name}
                      {!shop.active && (
                        <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-mono font-medium">
                          INACTIVE
                        </span>
                      )}
                    </h4>
                  </div>
                  
                  {userRole === 'Admin' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleShopActive(shop)}
                        title={shop.active ? "Deactivate Customer" : "Activate Customer"}
                        className={`p-1.5 rounded transition-all ${
                          shop.active 
                            ? 'text-emerald-400 hover:bg-slate-800/80 bg-slate-950' 
                            : 'text-slate-500 hover:bg-slate-850'
                        }`}
                      >
                        {shop.active ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditingShop(shop)}
                        className="p-1.5 bg-slate-950 rounded text-slate-300 hover:text-amber-400 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Details list */}
                <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-800 pb-3 font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{shop.owner}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{shop.mobile}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate" title={shop.address}>{shop.address || 'No address specified'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">DISCOUNT</span>
                    <span className="text-slate-200 font-bold flex items-center justify-center gap-0.5">
                      {shop.discountPercentage}
                      <Percent className="w-3 h-3 text-slate-400" />
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">CREDIT LIMIT</span>
                    <span className="text-slate-205 font-bold flex items-center justify-center gap-0.5">
                      {shop.creditDays}
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">DUE DEBT</span>
                    <span className={`font-bold block ${shop.outstandingBalance > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                      ₹ {shop.outstandingBalance.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* notes */}
                {shop.notes && (
                  <div className="bg-slate-950/30 p-2.5 rounded border border-slate-800/60 text-xs text-slate-400 flex gap-2">
                    <Notebook className="w-4 h-4 text-slate-500 shrink-0" />
                    <p className="line-clamp-2 leading-relaxed italic m-0">{shop.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
