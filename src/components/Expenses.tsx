import React, { useState } from 'react';
import { 
  Banknote, Plus, Search, Calendar, Landmark, HelpCircle, Receipt, Trash2, PieChart 
} from 'lucide-react';
import { Expense } from '../types';

interface ExpensesProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  userRole: 'Admin' | 'Operator';
}

export default function Expenses({ expenses, onAddExpense, userRole }: ExpensesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-05-24');

  // Form Fields state
  const [category, setCategory] = useState<'Milk Purchase' | 'Transport' | 'Gas' | 'Electricity' | 'Salary' | 'Miscellaneous'>('Milk Purchase');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  // Sorter / search queries
  const filteredExpenses = expenses.filter(e => e.date === selectedDate);
  const totalAmountOnDate = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Compute category wise aggregate for visual representation
  const categorySummary: { [cat: string]: number } = {
    'Milk Purchase': 0,
    'Transport': 0,
    'Gas': 0,
    'Electricity': 0,
    'Salary': 0,
    'Miscellaneous': 0
  };

  expenses.forEach(e => {
    if (categorySummary[e.category] !== undefined) {
      categorySummary[e.category] += e.amount;
    } else {
      categorySummary['Miscellaneous'] += e.amount;
    }
  });

  const aggregateData = Object.entries(categorySummary).map(([cat, val]) => ({
    category: cat,
    amount: val
  })).sort((a,b) => b.amount - a.amount);

  const grandTotalAllTime = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !description) {
      alert("Please specify expense amount greater than zero and write a description notes.");
      return;
    }

    onAddExpense({
      date: selectedDate,
      category,
      amount: Number(amount),
      description
    });

    setAmount(0);
    setDescription('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Banknote className="text-amber-500 w-6 h-6 shrink-0" />
            Expenses Ledger
          </h2>
          <p className="text-sm text-slate-400">Track industrial milk barrels purchase, logistics transport, LP Gas cylinders, wages and utility bills</p>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Record Expense
          </button>
        )}
      </div>

      {/* OVERVIEW BREAKDOWNS COGNITIVE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Aggregate Category Breakdown List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-slate-350 uppercase block mb-0.5">Expenses Sourcing Breakdown</h4>
              <p className="text-xs text-slate-500">Cumulative expenditures tracked in ledger</p>
            </div>
            <span className="text-xs font-semibold text-amber-500 font-mono">
              Total: ₹ {grandTotalAllTime.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3 Pt-2">
            {aggregateData.map((item, idx) => {
              const maxVal = aggregateData[0]?.amount || 1;
              const widthPct = Math.max(5, (item.amount / maxVal) * 100);
              const colors = ['bg-rose-500', 'bg-amber-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-slate-700'];
              const colorClass = colors[idx] || 'bg-slate-500';

              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{item.category}</span>
                    <span className="font-mono text-slate-400 font-bold">₹ {item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
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

        {/* LOG DATE SELECTOR AND SUMMARY CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-455 text-slate-300 uppercase block">Selected Date Ledger</h4>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono text-center"
            />
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg text-center border border-slate-800/80 font-mono select-none">
            <span className="text-[10px] text-slate-500 block uppercase mb-1">Expenses Registered Today</span>
            <span className="text-xl font-bold text-white block">
              ₹ {totalAmountOnDate.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* EXPENSE LOG WIZARD FORM */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-100 text-base">Logging Cash / Account Outflow</h3>
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
              <label className="text-xs text-slate-400 font-semibold">Expense Date</label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Ledger Category *</label>
              <select
                required
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Milk Purchase">Milk Sourcing Procurement</option>
                <option value="Transport">Diesel Sourcing / Vehicle Repair</option>
                <option value="Gas">Industrial LP Gas Cylinder</option>
                <option value="Electricity">Electricity / Phase Power Bills</option>
                <option value="Salary">Staff Payouts / Helper Wages</option>
                <option value="Miscellaneous">Miscellaneous / Cleaning / General</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Amount Paid (₹) *</label>
              <input
                type="number"
                min="1"
                required
                placeholder="₹ cash amount"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1 lg:col-span-3">
              <label className="text-xs text-slate-400 font-semibold">Debit Details / Sourcing description *</label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Paid Mother Dairy operator for 200 Litres milk procurement barrels, billing invoice recpt #402..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              className="px-4 py-2 bg-rose-500 text-slate-950 hover:bg-rose-600 font-bold text-sm rounded-lg"
            >
              Confirm Expenses Log
            </button>
          </div>
        </form>
      )}

      {/* LEDGER ENTRIES LIST */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-350 uppercase">Ledger Entries on {selectedDate}</h3>

        {filteredExpenses.length === 0 ? (
          <div className="py-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2 select-none">
            <Banknote className="w-12 h-12 text-slate-700 mx-auto" />
            <p className="text-slate-400 font-medium">No expenses logged for selected date: {selectedDate}</p>
            <p className="text-xs text-slate-650">Commit any materials procurement or diesel spending above to adjust net daily profit forecast sheets.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left text-slate-300 font-mono">
              <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Paid Category</th>
                  <th className="p-4">Explanation Details</th>
                  <th className="p-4 text-right">Debit amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredExpenses.map((e, index) => (
                  <tr key={e.id} className="hover:bg-slate-950/40">
                    <td className="p-4 font-semibold text-slate-200">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-rose-400 border border-slate-800 text-[10.5px]">
                        {e.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 leading-normal font-sans text-sm">{e.description}</td>
                    <td className="p-4 text-right font-bold text-rose-400 text-sm">₹ {e.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
