import React, { useState } from 'react';
import { 
  Candy, Flame, Scale, Wallet, Receipt, Compass, Settings2, Plus, Search, Edit2, Filter 
} from 'lucide-react';
import { SweetItem } from '../types';

interface ItemsProps {
  items: SweetItem[];
  onAddItem: (item: Omit<SweetItem, 'id'>) => void;
  onUpdateItem: (item: SweetItem) => void;
  userRole: 'Admin' | 'Operator';
}

export default function Items({ items, onAddItem, onUpdateItem, userRole }: ItemsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<SweetItem | null>(null);

  // New Sweet Item form fields state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Dry' | 'Khoya/Milk' | 'Syrup' | 'Savory' | 'Ghee Special'>('Dry');
  const [unit, setUnit] = useState<'Kg' | 'Box' | 'Piece'>('Kg');
  const [sellingRate, setSellingRate] = useState(0);
  const [productionCost, setProductionCost] = useState(0);
  const [ingredients, setIngredients] = useState('');

  const categories = ['All', 'Dry', 'Khoya/Milk', 'Syrup', 'Savory', 'Ghee Special'];

  // Search and filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setName('');
    setCategory('Dry');
    setUnit('Kg');
    setSellingRate(0);
    setProductionCost(0);
    setIngredients('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || sellingRate <= 0 || productionCost <= 0) {
      alert("Please fill in high-priority fields correctly: Sweet name, prices must be greater than zero.");
      return;
    }
    onAddItem({
      name,
      category,
      unit,
      sellingRate: Number(sellingRate),
      productionCost: Number(productionCost),
      ingredients,
      active: true
    });
    resetForm();
    setShowAddForm(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateItem(editingItem);
      setEditingItem(null);
    }
  };

  const toggleItemActive = (item: SweetItem) => {
    onUpdateItem({
      ...item,
      active: !item.active
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Candy className="text-amber-500 w-6 h-6 shrink-0" />
            Item Master List (Sweets)
          </h2>
          <p className="text-sm text-slate-400">Configure sweet names, production rates, ingredient requirements and profit thresholds</p>
        </div>

        {userRole === 'Admin' && !showAddForm && (
          <button
            onClick={() => { resetForm(); setShowAddForm(true); }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sweet Item
          </button>
        )}
      </div>

      {/* FILTER BUTTONS AND SEARCH BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search sweets by name, ingredients details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors cursor-text"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-250 hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ADD NEW SWEET ITEM FORM */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-100 text-base">Creating New Sweet Product</h3>
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
              <label className="text-xs text-slate-400 font-semibold">Sweet Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Special Mysore Pak"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Broad Category</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Dry">Dry Sweets (Kaju, Badam etc)</option>
                <option value="Khoya/Milk">Khoya & Milk Based</option>
                <option value="Syrup">Syrup Dunked Items</option>
                <option value="Savory">Savory / Spicy Snacks</option>
                <option value="Ghee Special">Ghee Specials (Mysore Pak, Laddu)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Production Billing Unit</label>
              <select
                value={unit}
                onChange={(e: any) => setUnit(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Kg">By Weight (Kilograms)</option>
                <option value="Box">By Box Package</option>
                <option value="Piece">By Single Piece Unit</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Base Production Cost (₹ per Unit) *</label>
              <input
                type="number"
                min="0"
                required
                placeholder="₹ cost rate"
                value={productionCost}
                onChange={(e) => setProductionCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Standard Selling Rate (₹ per Unit) *</label>
              <input
                type="number"
                min="0"
                required
                placeholder="₹ selling rate to shop"
                value={sellingRate}
                onChange={(e) => setSellingRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="text-xs text-slate-400 font-semibold">Key Ingredient Composition (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Gram flour, Pure ghee, Refined sugar, Cardamom extract"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
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
              Add Sweet to Master
            </button>
          </div>
        </form>
      )}

      {/* EDIT DETAILED SWEET ITEM DIALOG */}
      {editingItem && (
        <form onSubmit={handleUpdate} className="bg-slate-900 border border-amber-500/20 rounded-xl p-6 space-y-4 animate-slide-up animate-slide-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-amber-500 text-base">Editing Item: `{editingItem.name}`</h3>
            <button 
              type="button" 
              onClick={() => setEditingItem(null)} 
              className="text-slate-400 hover:text-slate-200 text-sm font-semibold hover:border-b"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Sweet Product Name</label>
              <input
                type="text"
                required
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Broad Category</label>
              <select
                value={editingItem.category}
                onChange={(e: any) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Dry">Dry Sweets (Kaju, Badam etc)</option>
                <option value="Khoya/Milk">Khoya & Milk Based</option>
                <option value="Syrup">Syrup Dunked Items</option>
                <option value="Savory">Savory / Spicy Snacks</option>
                <option value="Ghee Special">Ghee Specials (Mysore Pak, Laddu)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Production Unit</label>
              <select
                value={editingItem.unit}
                onChange={(e: any) => setEditingItem({ ...editingItem, unit: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Kg">By Weight (Kilograms)</option>
                <option value="Box">By Box Package</option>
                <option value="Piece">By Single Piece Unit</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Production Cost (₹ per Unit)</label>
              <input
                type="number"
                min="0"
                value={editingItem.productionCost}
                onChange={(e) => setEditingItem({ ...editingItem, productionCost: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Standard Selling Rate (₹ per Unit)</label>
              <input
                type="number"
                min="0"
                value={editingItem.sellingRate}
                onChange={(e) => setEditingItem({ ...editingItem, sellingRate: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="text-xs text-slate-400 font-semibold">Key Ingredient Composition</label>
              <input
                type="text"
                value={editingItem.ingredients}
                onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-600 text-sm font-semibold rounded-lg"
            >
              Update product
            </button>
          </div>
        </form>
      )}

      {/* ITEMS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <Candy className="w-12 h-12 text-slate-700 mx-auto" />
            <p className="text-slate-400 font-medium col-span-1 border-b">No sweets match this category or name criteria</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const rawMargin = item.sellingRate - item.productionCost;
            const marginPct = ((rawMargin / item.sellingRate) * 100).toFixed(0);

            return (
              <div 
                key={item.id}
                className={`bg-slate-900 border rounded-xl p-5 shadow-sm space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between ${
                  item.active ? 'border-slate-805 border-slate-800' : 'border-slate-900 opacity-60'
                }`}
              >
                {/* Header item */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-amber-500 bg-amber-500/15 py-0.5 px-2 rounded-full uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">ID: {item.id}</span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-2 pt-1">
                    <h4 className="text-base font-bold text-slate-200 line-clamp-1">{item.name}</h4>
                    {userRole === 'Admin' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleItemActive(item)}
                          title={item.active ? "Set Unavailable" : "Set Available"}
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            item.active ? 'text-emerald-400 bg-slate-950' : 'text-slate-500 hover:bg-slate-850'
                          }`}
                        >
                          ●
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-slate-500 hover:text-amber-400 transition-colors"
                          title="Edit Product Parameters"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rates metrics */}
                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-500 block uppercase">COOK COST</span>
                    <span className="text-slate-300 font-bold flex items-center gap-0.5">
                      <Receipt className="w-3.5 h-3.5 text-slate-500" />
                      ₹ {item.productionCost} / {item.unit}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-500 block uppercase">WHLESALE RATE</span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Wallet className="w-3.5 h-3.5 text-amber-500/80" />
                      ₹ {item.sellingRate} / {item.unit}
                    </span>
                  </div>

                  <div className="col-span-2 border-t border-slate-800/40 pt-2 flex items-center justify-between text-[10px] font-semibold">
                    <span className="text-slate-500 uppercase">PROFITS ESTIMATED PER {item.unit}</span>
                    <span className="text-emerald-400">
                      ₹ {rawMargin} ({marginPct}%)
                    </span>
                  </div>
                </div>

                {/* Ingredients list */}
                <div className="text-xs text-slate-400 font-medium">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Raw Materials Needed</span>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients ? (
                      item.ingredients.split(',').map((ing, i) => (
                        <span key={i} className="bg-slate-950 px-2 py-0.5 rounded text-[10.5px] text-slate-400 border border-slate-800/40">
                          {ing.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600 italic">No formulation logged</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
