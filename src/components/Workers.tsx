import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Calendar, Phone, DollarSign, Wallet, Save, Coins, CheckSquare, Plus 
} from 'lucide-react';
import { Worker, WorkerPayment } from '../types';

interface WorkersProps {
  workers: Worker[];
  onAddWorker: (worker: Omit<Worker, 'id' | 'attendance' | 'payments'>) => void;
  onUpdateWorker: (worker: Worker) => void;
  userRole: 'Admin' | 'Operator';
}

export default function Workers({ workers, onAddWorker, onUpdateWorker, userRole }: WorkersProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-05-24');

  // New worker details
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [wage, setWage] = useState(600);

  // Payments logging
  const [activeWorkerForWage, setActiveWorkerForWage] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDesc, setPaymentDesc] = useState('Wage payment cleared');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || wage <= 0) {
      alert("Please specify worker name, phone number, and a correct daily wage rate.");
      return;
    }
    onAddWorker({
      name,
      mobile,
      dailyWage: Number(wage)
    });
    setName('');
    setMobile('');
    setWage(600);
    setShowAddForm(false);
  };

  const handleAttendanceChange = (workerId: string, status: 'Present' | 'Absent' | 'Half Day') => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    const updatedAttendance = { ...worker.attendance };
    updatedAttendance[selectedDate] = status;

    onUpdateWorker({
      ...worker,
      attendance: updatedAttendance
    });
  };

  const handlePayWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorkerForWage || paymentAmount <= 0) {
      alert("Please select worker and enter a payout amount greater than zero.");
      return;
    }

    const worker = workers.find(w => w.id === activeWorkerForWage);
    if (!worker) return;

    const newPayment: WorkerPayment = {
      id: `WP-${Date.now()}`,
      date: selectedDate,
      amount: Number(paymentAmount),
      description: paymentDesc
    };

    onUpdateWorker({
      ...worker,
      payments: [...worker.payments, newPayment]
    });

    setActiveWorkerForWage(null);
    setPaymentAmount(0);
    setPaymentDesc('Wage payment cleared');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="text-amber-500 w-6 h-6 shrink-0" />
            Worker Registry & Attendance
          </h2>
          <p className="text-sm text-slate-400">Log halwais cook attendance roster, wage allocations, and record daily payouts receipts</p>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-md shrink-0 text-sm transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Register Cook/Helper Staff
          </button>
        )}
      </div>

      {/* CHOOSE REGISTER DATE FOR ATTENDANCE RECORDING */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-4 gap-4 items-center justify-between">
        <div className="flex items-center gap-2 font-mono">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-450 text-slate-400 uppercase tracking-wider block">ATTENDANCE ROSTER SHEET REFC DAY:</span>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
        />
      </div>

      {/* QUICK WORKER REGISTRATION WIDGET */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 animate-slide-up animate-slide-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-100 text-base">Register Worker Sourcing Details</h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="text-slate-400 hover:text-slate-200 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Worker Roster Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Gowda"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Standard Daily Wage (₹/day) *</label>
              <input
                type="number"
                min="100"
                required
                value={wage || ''}
                placeholder="Wage rate"
                onChange={(e) => setWage(Number(e.target.value))}
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
              className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-600 text-sm font-bold rounded-lg"
            >
              Save Register File
            </button>
          </div>
        </form>
      )}

      {/* QUICK PAYMENTS ENTRY DIALOG PANEL */}
      {activeWorkerForWage && (
        <form onSubmit={handlePayWorker} className="bg-slate-900 border border-amber-500/20 rounded-xl p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-semibold text-amber-400 text-sm">
              Logging Cash Payout to `{workers.find(w => w.id === activeWorkerForWage)?.name}`
            </h4>
            <button type="button" onClick={() => setActiveWorkerForWage(null)} className="text-slate-400 hover:text-slate-200 text-xs">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Clearance Value Paid (₹) *</label>
              <input
                type="number"
                min="1"
                required
                value={paymentAmount || ''}
                placeholder="₹ payout cash amount"
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Description Label</label>
              <input
                type="text"
                value={paymentDesc}
                onChange={(e) => setPaymentDesc(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveWorkerForWage(null)}
              className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-600 font-bold text-xs rounded"
            >
              Log Payout Clearance
            </button>
          </div>
        </form>
      )}

      {/* CORE ATTENDANCE REGISTER TABLE GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] border-b border-slate-800 font-mono">
              <tr>
                <th className="p-4">Name / Contact</th>
                <th className="p-4 text-center">Daily rate</th>
                <th className="p-4 text-center">Attendance Logs on this Date</th>
                <th className="p-4 text-center">Accumulated Debts</th>
                <th className="p-4 text-right">Commit payout actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-805 divide-slate-800 font-medium">
              {workers.map((wrk) => {
                const currentDayAttendance = wrk.attendance[selectedDate] || 'Absent';
                
                // Calculate outstanding payable wages
                // (Total Present * DailyWage) + (Total HalfDay * DailyWage/2) - (Total Payments cleared)
                let workingDaysCount = 0;
                let halfDaysCount = 0;
                Object.values(wrk.attendance).forEach(status => {
                  if (status === 'Present') workingDaysCount++;
                  if (status === 'Half Day') halfDaysCount++;
                });

                const grossWagesEarned = (workingDaysCount * wrk.dailyWage) + (halfDaysCount * (wrk.dailyWage / 2));
                const totalClearedWages = wrk.payments.reduce((sum, p) => sum + p.amount, 0);
                const netDebtedWages = Math.max(0, grossWagesEarned - totalClearedWages);

                return (
                  <tr key={wrk.id} className="hover:bg-slate-950/40">
                    <td className="p-4">
                      <h4 className="text-sm font-bold text-slate-205 text-slate-200">{wrk.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5" />
                        {wrk.mobile}
                      </p>
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-slate-300">
                      ₹ {wrk.dailyWage} / day
                    </td>

                    {/* Attendance state button sector */}
                    <td className="p-4 text-center">
                      <div className="inline-grid grid-cols-3 gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded font-mono text-[10.5px]">
                        <button
                          onClick={() => handleAttendanceChange(wrk.id, 'Present')}
                          className={`py-1 px-3 rounded text-center transition-all ${
                            currentDayAttendance === 'Present' 
                              ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' 
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(wrk.id, 'Half Day')}
                          className={`py-1 px-3 rounded text-center transition-all ${
                            currentDayAttendance === 'Half Day' 
                              ? 'bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/30' 
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Half Duty
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(wrk.id, 'Absent')}
                          className={`py-1 px-3 rounded text-center transition-all ${
                            currentDayAttendance === 'Absent' 
                              ? 'bg-rose-500/10 text-rose-450 text-rose-400 font-bold border border-rose-500/20' 
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-center font-mono font-semibold">
                      <div className="space-y-0.5">
                        <span className="text-[10.5px] text-slate-500 block">TOTAL DUE DEBT</span>
                        <span className={`block font-bold ${netDebtedWages > 0 ? 'text-amber-500' : 'text-slate-500'}`}>
                          ₹ {netDebtedWages.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentAmount(netDebtedWages);
                          setActiveWorkerForWage(wrk.id);
                        }}
                        className="py-1 px-3 bg-slate-950 hover:bg-slate-850 hover:text-amber-400 text-slate-400 border border-slate-800 rounded text-[11px] font-mono select-none"
                      >
                        Log Wage Clear
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
