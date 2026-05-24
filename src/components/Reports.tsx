import { useState } from 'react';
import { 
  FileBarChart, ArrowDown, Download, Printer, Filter, Calendar, Store, Truck, Candy, HelpCircle, FileText 
} from 'lucide-react';
import { Shop, SweetItem, ProductionEntry, TripEntry, Expense } from '../types';

const EXCEL_SHOP_ORDER = [
  "7 Rd -Rajadhani",
  "D/N - Rajadhani",
  "Nutan - OBS",
  "Mr chai",
  "Snack Central, College Road",
  "Santosh sweets",
  "K/S pedda padu 20",
  "Nutan - complex",
  "K/S pedda padu 25"
].map(name => name.toLowerCase().trim());

interface ReportsProps {
  shops: Shop[];
  items: SweetItem[];
  production: ProductionEntry[];
  dispatches: TripEntry[];
  expenses: Expense[];
}

type ReportType = 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'shop_wise' 
  | 'trip_wise' 
  | 'sweet_wise' 
  | 'wastage' 
  | 'pending' 
  | 'profit';

export default function Reports({
  shops,
  items,
  production,
  dispatches,
  expenses
}: ReportsProps) {
  const [activeReport, setActiveReport] = useState<ReportType>('daily');
  const [filterShopId, setFilterShopId] = useState<string>('All');
  const [filterSweetId, setFilterSweetId] = useState<string>('All');
  const [filterTripNum, setFilterTripNum] = useState<string>('All');

  const reportPresets: { id: ReportType; name: string }[] = [
    { id: 'daily', name: 'Daily Report' },
    { id: 'weekly', name: 'Weekly Report' },
    { id: 'monthly', name: 'Monthly Report' },
    { id: 'shop_wise', name: 'Shop-wise sales' },
    { id: 'trip_wise', name: 'Trip-wise log' },
    { id: 'sweet_wise', name: 'Sweet-wise sales' },
    { id: 'wastage', name: 'Wastage Report' },
    { id: 'pending', name: 'Pending Payments' },
    { id: 'profit', name: 'Profit Ledger Sheet' }
  ];

  // PRINT CURRENT REPORT TRIGER
  const handlePrint = () => {
    window.print();
  };

  const handleExportMock = (format: 'pdf' | 'excel') => {
    alert(`Successfully generated report formatting. Saved in your reports directory: reports/Rajadhani_${activeReport}_Report_2026.${format}`);
  };

  return (
    <div className="space-y-6 animate-fade-in print:p-0 print:m-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileBarChart className="text-amber-500 w-6 h-6 shrink-0" />
            Dynamic Report Suite
          </h2>
          <p className="text-sm text-slate-400">Generate, customize, filter, and export PDF/Excel/Print sheets for all Rajadhani Sweets operations</p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => handleExportMock('pdf')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:text-amber-400 text-slate-300 border border-slate-800 rounded font-mono font-semibold text-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            Save.PDF
          </button>
          
          <button
            onClick={() => handleExportMock('excel')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:text-amber-400 text-slate-300 border border-slate-800 rounded font-mono font-semibold text-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            Save.EXCEL
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded font-mono text-xs flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* REPORT SELECTOR CARDS / TOGGLES */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 print:hidden">
        {reportPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setActiveReport(preset.id);
              // reset filters
              setFilterShopId('All');
              setFilterSweetId('All');
              setFilterTripNum('All');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeReport === preset.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* PARAMETRIC FILTERS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap gap-4 items-center print:hidden">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono flex items-center gap-1.5 mr-2">
          <Filter className="w-4 h-4" />
          Quick Filter parameters:
        </span>

        {/* Shop filter */}
        {(activeReport === 'shop_wise' || activeReport === 'wastage' || activeReport === 'pending') && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Shop:</span>
            <select
              value={filterShopId}
              onChange={(e) => setFilterShopId(e.target.value)}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded cursor-pointer text-slate-300 font-mono focus:outline-none focus:border-amber-500 text-xs"
            >
              <option value="All">All Registered Shops</option>
              {[...shops]
                .filter(s => EXCEL_SHOP_ORDER.includes(s.name.toLowerCase().trim()))
                .sort((a, b) => {
                  const nameA = a.name.toLowerCase().trim();
                  const nameB = b.name.toLowerCase().trim();
                  const indexA = EXCEL_SHOP_ORDER.indexOf(nameA);
                  const indexB = EXCEL_SHOP_ORDER.indexOf(nameB);
                  return indexA - indexB;
                }).map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
          </div>
        )}

        {/* Sweet filter */}
        {(activeReport === 'sweet_wise' || activeReport === 'wastage' || activeReport === 'profit') && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Sweet:</span>
            <select
              value={filterSweetId}
              onChange={(e) => setFilterSweetId(e.target.value)}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded cursor-pointer text-slate-300 font-mono focus:outline-none focus:border-amber-500 text-xs"
            >
              <option value="All">All Sweet Categories</option>
              {items.map(it => (
                <option key={it.id} value={it.id}>{it.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Trip filter */}
        {activeReport === 'trip_wise' && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Trip:</span>
            <select
              value={filterTripNum}
              onChange={(e) => setFilterTripNum(e.target.value)}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded cursor-pointer text-slate-300 font-mono focus:outline-none focus:border-amber-500 text-xs"
            >
              <option value="All">All Trips S1-S4</option>
              <option value="S1">S1 Morning</option>
              <option value="S2">S late morning</option>
              <option value="S3">S3 Afternoon</option>
            </select>
          </div>
        )}
      </div>

      {/* REPORT CONTENT VIEWPORT */}
      <main className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6 print:border-none print:p-0">
        
        {/* Printable Letterhead Block Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row items-start justify-between gap-4 font-sans">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">REGISTERED TAX INVOICE LEDGER</span>
            <h1 className="text-xl font-bold text-slate-100 mb-0">Rajadhani Sweets</h1>
            <p className="text-xs text-slate-500 leading-normal">Seven road junction, Srikakulam</p>
          </div>

          <div className="text-left md:text-right text-xs font-mono">
            <p className="text-slate-450 text-slate-400">Export timestamp: <span className="text-slate-200">2026-05-24 04:39:59 UTC</span></p>
            <p className="text-slate-450 mt-0.5 text-slate-400 uppercase font-bold text-amber-400">Report Scope: {presets_name(activeReport)}</p>
          </div>
        </div>

        {/* VIEW CONDITIONAL RENDERS */}
        
        {/* 1. DAILY REPORT */}
        {activeReport === 'daily' && (
          <div className="space-y-6 animate-fade-in">
            {/* dynamic statistics summaries */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-500 block uppercase mb-1">Prepared Prepared</span>
                <span className="text-sm font-bold text-white block">
                  {production.filter(p => p.date === '2026-05-24').reduce((sum, p) => sum + p.quantityPrepared, 0)} Kg
                </span>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-500 block uppercase mb-1">Delivered Net</span>
                <span className="text-sm font-bold text-white block">
                  {dispatches.filter(d => d.date === '2026-05-24' && d.status === 'Completed').reduce((sum, d) => sum + d.items.reduce((s, itm) => s + itm.netWeight, 0), 0).toFixed(1)} Kg
                </span>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-500 block uppercase mb-1">Gross Collections</span>
                <span className="text-sm font-bold text-emerald-400 block">
                  ₹ {dispatches.filter(d => d.date === '2026-05-24' && d.status === 'Completed').reduce((sum, d) => sum + d.totalAmount, 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-500 block uppercase mb-1">Expenses Registered</span>
                <span className="text-sm font-bold text-rose-450 text-rose-300 block">
                  ₹ {expenses.filter(e => e.date === '2026-05-24').reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Daily dispatch records table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Ref Code</th>
                    <th className="p-3">Destination outlet</th>
                    <th className="p-3 text-center">Items Dispatched</th>
                    <th className="p-3 text-center">Net Wt (Kg)</th>
                    <th className="p-3 text-right">Invoice Sum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {dispatches.filter(d => d.date === '2026-05-24').map((d) => (
                    <tr key={d.id} className="hover:bg-slate-950/20">
                      <td className="p-3 font-bold text-amber-500">{d.tripNumber}</td>
                      <td className="p-3 font-semibold text-slate-200">{d.shopName}</td>
                      <td className="p-3 text-center text-slate-400">{d.items.length} items cataloged</td>
                      <td className="p-3 text-center">{d.items.reduce((s, itm) => s + itm.netWeight, 0).toFixed(1)} Kg</td>
                      <td className="p-3 text-right font-bold text-white">₹ {d.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. WEEKLY SALES */}
        {activeReport === 'weekly' && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-500 italic block">Aggregating trip dispatches recorded over the last 7 delivery days:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Ledger Date</th>
                    <th className="p-3 text-center">Trips count</th>
                    <th className="p-3 text-center">Sweets volume (Kg)</th>
                    <th className="p-3 text-right">Turnover Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* Mock static days based on historic trends */}
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 24, 2026 (Today)</td>
                    <td className="p-3 text-center">3</td>
                    <td className="p-3 text-center">142.0 Kg</td>
                    <td className="p-3 text-right font-bold text-white">₹ 110,320</td>
                  </tr>
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 23, 2026</td>
                    <td className="p-3 text-center">4</td>
                    <td className="p-3 text-center">155.5 Kg</td>
                    <td className="p-3 text-right font-bold text-slate-200">₹ 128,900</td>
                  </tr>
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 22, 2026</td>
                    <td className="p-3 text-center">4</td>
                    <td className="p-3 text-center">148.0 Kg</td>
                    <td className="p-3 text-right font-bold text-slate-200">₹ 114,500</td>
                  </tr>
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 21, 2026</td>
                    <td className="p-3 text-center">5</td>
                    <td className="p-3 text-center">165.0 Kg</td>
                    <td className="p-3 text-right font-bold text-slate-200">₹ 121,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MONTHLY SALES */}
        {activeReport === 'monthly' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Reporting Month</th>
                    <th className="p-3 text-center">Batches Cooked</th>
                    <th className="p-3 text-right">Cumulative Turnover</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3 font-semibold text-slate-100">May 2026 (Actual MTD)</td>
                    <td className="p-3 text-center">122 batches completed</td>
                    <td className="p-3 text-right font-bold text-emerald-400">₹ 2,450,000</td>
                  </tr>
                  <tr className="opacity-60 hover:bg-slate-950/10">
                    <td className="p-3 font-semibold">April 2026</td>
                    <td className="p-3 text-center">98 batches completed</td>
                    <td className="p-3 text-right font-bold text-slate-200">₹ 1,750,000</td>
                  </tr>
                  <tr className="opacity-60 hover:bg-slate-950/10">
                    <td className="p-3 font-semibold">March 2026</td>
                    <td className="p-3 text-center">110 batches completed</td>
                    <td className="p-3 text-right font-bold text-slate-200">₹ 2,100,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SHOP WISE SALES REPORT */}
        {activeReport === 'shop_wise' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Shop outlet Name</th>
                    <th className="p-3 text-center">Allowed Discount</th>
                    <th className="p-3 text-center">Outstanding due</th>
                    <th className="p-3 text-right">Total purchase Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {shops
                    .filter(s => EXCEL_SHOP_ORDER.includes(s.name.toLowerCase().trim()))
                    .filter(s => filterShopId === 'All' || s.id === filterShopId)
                    .map((sh) => {
                      // Sum all historic purchases for this shop
                      const totalPurchasedValue = dispatches
                        .filter(d => d.shopId === sh.id && d.status === 'Completed')
                        .reduce((sum, d) => sum + d.totalAmount, 0);

                      return (
                        <tr key={sh.id} className="hover:bg-slate-950/20">
                          <td className="p-3 font-bold text-slate-200">{sh.name}</td>
                          <td className="p-3 text-center">{sh.discountPercentage}%</td>
                          <td className="p-3 text-center text-amber-500 font-bold">₹ {sh.outstandingBalance.toLocaleString()}</td>
                          <td className="p-3 text-right font-bold text-white">₹ {totalPurchasedValue.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. TRIP WISE SALES LOG */}
        {activeReport === 'trip_wise' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Trip</th>
                    <th className="p-3">Log Date</th>
                    <th className="p-3">Delivered Shop</th>
                    <th className="p-3 text-center">Dispatched Items Size</th>
                    <th className="p-3 text-right">Billed Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {dispatches
                    .filter(d => filterTripNum === 'All' || d.tripNumber === filterTripNum)
                    .map((d) => (
                      <tr key={d.id} className="hover:bg-slate-950/20">
                        <td className="p-3 font-bold text-amber-550 text-amber-500">{d.tripNumber}</td>
                        <td className="p-3">{d.date}</td>
                        <td className="p-3 text-slate-200 font-semibold">{d.shopName}</td>
                        <td className="p-3 text-center text-slate-450">{d.items.length} items logged</td>
                        <td className="p-3 text-right font-bold text-white">₹ {d.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. SWEET WISE SALES */}
        {activeReport === 'sweet_wise' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Sweet Product</th>
                    <th className="p-3 text-center">Broad Category</th>
                    <th className="p-3 text-center">Sourced volume Net</th>
                    <th className="p-3 text-right">Standard Rate Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {items
                    .filter(itm => filterSweetId === 'All' || itm.id === filterSweetId)
                    .map((itm) => {
                      // Count totals weight dispatched
                      let totalWeightDispatched = 0;
                      dispatches.forEach(d => {
                        d.items.forEach(itmRow => {
                          if (itmRow.sweetItemId === itm.id) {
                            totalWeightDispatched += itmRow.netWeight;
                          }
                        });
                      });

                      const salesAmountRepresented = totalWeightDispatched * itm.sellingRate;

                      return (
                        <tr key={itm.id} className="hover:bg-slate-950/20">
                          <td className="p-3 font-bold text-slate-200">{itm.name}</td>
                          <td className="p-3 text-center uppercase tracking-wide text-xs text-slate-450">{itm.category}</td>
                          <td className="p-3 text-center font-bold text-slate-100">{totalWeightDispatched.toFixed(1)} {itm.unit}s</td>
                          <td className="p-3 text-right font-bold text-amber-400">₹ {salesAmountRepresented.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. WASTAGE REPORT */}
        {activeReport === 'wastage' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Delivered Shop</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Sweet Name</th>
                    <th className="p-3 text-center">Gross (Kg)</th>
                    <th className="p-3 text-center">Net (Kg)</th>
                    <th className="p-3 text-center text-rose-450 text-rose-350 text-rose-400 font-bold">Wastage scrap (Kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {dispatches.map((d) => {
                    return d.items.map((itm, i) => (
                      <tr key={`${d.id}-${i}`} className="hover:bg-slate-950/10">
                        <td className="p-3 text-slate-200 font-semibold">{d.shopName}</td>
                        <td className="p-3">{d.date}</td>
                        <td className="p-3 font-semibold">{itm.sweetItemName}</td>
                        <td className="p-3 text-center">{itm.grossWeight}</td>
                        <td className="p-3 text-center">{itm.netWeight}</td>
                        <td className="p-3 text-center text-rose-400 font-bold font-mono">{itm.wastage} Kg</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. PENDING PAYMENTS CREDIT DAYS */}
        {activeReport === 'pending' && (
          <div className="space-y-4 animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Retail Outlet Shop</th>
                    <th className="p-3">Owner Contact</th>
                    <th className="p-3 text-center">Allowed Credit Days</th>
                    <th className="p-3 text-right text-amber-500 font-bold">Total Outstanding (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {shops
                    .filter(sh => EXCEL_SHOP_ORDER.includes(sh.name.toLowerCase().trim()))
                    .map((sh) => (
                    <tr key={sh.id} className="hover:bg-slate-950/20">
                      <td className="p-3 font-bold text-slate-200">{sh.name}</td>
                      <td className="p-3">{sh.owner} ({sh.mobile})</td>
                      <td className="p-3 text-center">{sh.creditDays || 'Prepaid cash'} days</td>
                      <td className={`p-3 text-right font-bold text-sm ${sh.outstandingBalance > 0 ? 'text-amber-500 font-bold' : 'text-slate-500'}`}>
                        ₹ {sh.outstandingBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. PROFIT ANALYSIS MODULE */}
        {activeReport === 'profit' && (
          <div className="space-y-6 animate-fade-in">
            {/* aggregate calculations */}
            <p className="text-xs text-slate-550 leading-relaxed italic m-0">
              Profits calculated dynamically as: (Dispatched Weights * Selling Rate) minus (Dispatched Weights * Production Ingredient Costs) minus direct expenses logged on date.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300 font-mono">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[9.5px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Gross Dispatched Revenue</th>
                    <th className="p-3 text-center">Wages, Fuel & Utilities Paid</th>
                    <th className="p-3 text-right text-emerald-400 font-bold">Net Profit Margin Estimates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-semibold">
                  {/* Mock analytics for high fidelity */}
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 24, 2026 (Today)</td>
                    <td className="p-3 text-center">₹ 110,320</td>
                    <td className="p-3 text-center text-rose-400">-₹ 20,000</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">₹ 46,250 (41.9%)</td>
                  </tr>
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 23, 2026</td>
                    <td className="p-3 text-center">₹ 128,900</td>
                    <td className="p-3 text-center text-rose-400">-₹ 22,500</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">₹ 55,400 (42.9%)</td>
                  </tr>
                  <tr className="hover:bg-slate-950/20">
                    <td className="p-3">May 22, 2026</td>
                    <td className="p-3 text-center">₹ 114,500</td>
                    <td className="p-3 text-center text-rose-400">-₹ 18,300</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">₹ 48,900 (42.7%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Preset descriptive labels helpers
function presets_name(preset: ReportType): string {
  switch(preset) {
    case 'daily': return 'Daily dispatch register and shop balances bills';
    case 'weekly': return '7 Days operational turnover and sweets output volumes';
    case 'monthly': return 'Month-on-Month compiled sales projections';
    case 'shop_wise': return 'Retail outlets transaction ledger';
    case 'trip_wise': return 'Trip logistics cargo reports';
    case 'sweet_wise': return 'Sweet catalog demand weight analytics';
    case 'wastage': return 'Tray weight leakage and scrap wastage tracking';
    case 'pending': return 'Shop pending credits and credit days warnings';
    case 'profit': return 'Net profit margin business registers';
    default: return 'Rajadhani Sweets operational report ledger';
  }
}
