import React, { useState, useEffect } from 'react';
import { 
  Flame, Plus, Search, Calendar, Award, Receipt, Percent, HelpCircle, Save, RotateCcw, FileSpreadsheet, List, ShieldAlert, CheckCircle2, ShoppingBag, ArrowRight, Copy, Scissors, Trash2, Sliders, CheckSquare, Info
} from 'lucide-react';
import { ProductionEntry, SweetItem, TripEntry, Shop } from '../types';

const SHOP_ITEM_SEQUENCES: Record<string, string[]> = {
  "7 Rd -Rajadhani": [
    "paneer kaaja",
    "orange cream",
    "white angoor",
    "cham cham",
    "sweet bondi",
    "coconut bun",
    "4 piece bun",
    "round cake packet 6pc packet",
    "coconut biscuit pack",
    "cashew kalakand",
    "veg puff",
    "egg puff",
    "panner puff",
    "samosa",
    "butter cream cake 1/2 kg cake",
    "kalajam",
    "pakam (net price)",
    "badam milk (net price)",
    "kova kajjikaya",
    "kova billa small",
    "laddu",
    "cashew halwa",
    "sunnundalu",
    "mixture",
    "cool cake  b scotch   1/2 kg",
    "cool cake  b scotch   pc",
    "cool cake  chocotale   pc",
    "cool cake vanilla pc"
  ],
  "D/N - Rajadhani": [
    "junnu sweet - palakaya",
    "cham cham",
    "kalajam",
    "white angoor",
    "paneer kaaja",
    "sandwich",
    "cashew kalakand",
    "veg puff",
    "egg puff",
    "panner puff",
    "chicken puff",
    "samosa",
    "large bread",
    "coconut bun",
    "dil pasand",
    "fruit bun",
    "4 piece bun",
    "malai chop",
    "malaipuri",
    "moti choor laddu",
    "junnu (net price)",
    "cutlet",
    "rasmalai (1pc box)",
    "cool cake vanilla pc",
    "cool cake  b scotch   pc"
  ],
  "Nutan - OBS": [
    "junnu sweet - palakaya",
    "coconut bun",
    "banglore bun",
    "fruit bun",
    "dil pasand",
    "round cake packet 6pc packet",
    "large bread",
    "spong cake 50/-",
    "spong cake 80/-",
    "veg puff",
    "egg puff",
    "moti choor laddu",
    "donut",
    "square cake packet",
    "ghee cake box (200g)",
    "fruit  slice cake box"
  ],
  "Mr chai": [
    "veg puff",
    "egg puff",
    "panner puff"
  ],
  "Snack Central, College Road": [
    "veg puff",
    "egg puff",
    "dil pasand",
    "butter cream b. forest cake 1/2 kg",
    "butter cream cake 1/2 kg cake"
  ],
  "Santosh sweets": [
    "veg puff",
    "panner puff",
    "cream bun",
    "fruit bun",
    "4 piece bun"
  ],
  "K/S pedda padu 20": [
    "veg puff",
    "egg puff",
    "samosa"
  ],
  "Nutan - complex": [
    "medium bread",
    "coconut bun",
    "fruit bun",
    "banglore bun",
    "super biscuit pack"
  ],
  "K/S pedda padu 25": [
    "large bread",
    "medium bread",
    "small bread",
    "fruit bun"
  ]
};

const SHEET_ITEM_NAMES = new Set(
  Object.values(SHOP_ITEM_SEQUENCES)
    .flat()
    .map(name => name.toLowerCase().trim())
);

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


interface DailyProductionProps {
  production: ProductionEntry[];
  items: SweetItem[];
  dispatches: TripEntry[];
  shops: Shop[];
  onAddProduction: (entry: Omit<ProductionEntry, 'id'>) => void;
  onSaveBulkProduction?: (date: string, entries: Omit<ProductionEntry, 'id'>[]) => void;
  onAddDispatch: (entry: Omit<TripEntry, 'id'>) => void;
  onUpdateDispatch: (entry: TripEntry) => void;
  userRole: 'Admin' | 'Operator';
}

export default function DailyProduction({
  production,
  items,
  dispatches,
  shops,
  onAddProduction,
  onSaveBulkProduction,
  onAddDispatch,
  onUpdateDispatch,
  userRole
}: DailyProductionProps) {
  const [selectedDate, setSelectedDate] = useState('2026-05-24');
  
  // Selected tab: 'all' is Consolidated Kitchen Summary, others are shopIds
  const [selectedShopId, setSelectedShopId] = useState<string>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [shopFilterQuery, setShopFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // High-performance nested allotment structure
  // Key 1: Shop ID, Key 2: Sweet Item ID
  const [allotments, setAllotments] = useState<Record<string, Record<string, {
    grossWeight: string;
    trayWeight: string;
    wastage: string;
    rate: string;
    discountPercentage: string;
  }>>>({});
  
  // Bulk shortcuts configurations
  const [bulkTrayWeight, setBulkTrayWeight] = useState('0.688');
  const [bulkWastage, setBulkWastage] = useState('3');
  
  // Alert flags
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Synchronize state from dispatches on date change
  useEffect(() => {
    const initialAllotments: Record<string, Record<string, {
      grossWeight: string;
      trayWeight: string;
      wastage: string;
      rate: string;
      discountPercentage: string;
    }>> = {};
    
    // 1. Initialise all shops with empty dictionary structures
    shops.forEach(sh => {
      initialAllotments[sh.id] = {};
    });
    
    // 2. Load already recorded dispatches for this date if present
    const dailyDispatches = dispatches.filter(d => d.date === selectedDate);
    
    dailyDispatches.forEach(disp => {
      const shopAllots = { ...(initialAllotments[disp.shopId] || {}) };
      disp.items.forEach(itm => {
        shopAllots[itm.sweetItemId] = {
          grossWeight: String(itm.grossWeight || ''),
          trayWeight: String(itm.trayWeight || ''),
          wastage: String(itm.wastage !== undefined ? itm.wastage : '0'),
          rate: String(itm.rate || ''),
          discountPercentage: String(itm.discountPercentage !== undefined ? itm.discountPercentage : '0')
        };
      });
      initialAllotments[disp.shopId] = shopAllots;
    });
    
    setAllotments(initialAllotments);
    setSaveSuccess(false);
    setValidationErrors([]);
  }, [selectedDate, dispatches, shops]);

  const categories = ['All', 'Dry', 'Khoya/Milk', 'Syrup', 'Savory', 'Ghee Special'];

  // Helper calculation matching exactly user sheets: 
  // Net weight = (Gross - Tare Tray Weight) reduced by wastage % percentage
  const computeNetAndAmount = (
    grossStr: string,
    trayStr: string,
    wastageStr: string,
    rateStr: string,
    discPercentStr: string
  ) => {
    const gross = parseFloat(grossStr) || 0;
    const tray = parseFloat(trayStr) || 0;
    const wastage = parseFloat(wastageStr) || 0;
    const rate = parseFloat(rateStr) || 0;
    const discount = parseFloat(discPercentStr) || 0;
    
    const netWeight = Math.max(0, (gross - tray) * (1 - wastage / 100));
    const amount = Math.round(netWeight * rate * (1 - discount / 100));
    
    return { netWeight, amount };
  };

  // Safe accessor reading custom inputs with lazy fallbacks to master rate + shop discount 
  const getAllotmentValues = (shopId: string, item: SweetItem) => {
    const shopAllots = allotments[shopId] || {};
    const itemAllot = shopAllots[item.id] || {};
    
    const shopObj = shops.find(s => s.id === shopId);
    const defaultDiscount = shopObj ? shopObj.discountPercentage : 0;
    
    return {
      grossWeight: itemAllot.grossWeight ?? '',
      trayWeight: itemAllot.trayWeight ?? '',
      wastage: itemAllot.wastage ?? '0',
      rate: itemAllot.rate !== undefined && itemAllot.rate !== '' ? itemAllot.rate : String(item.sellingRate),
      discountPercentage: itemAllot.discountPercentage !== undefined && itemAllot.discountPercentage !== '' ? itemAllot.discountPercentage : String(defaultDiscount)
    };
  };

  const handleAllotmentChange = (
    shopId: string,
    itemId: string,
    field: 'grossWeight' | 'trayWeight' | 'wastage' | 'rate' | 'discountPercentage',
    value: string
  ) => {
    setAllotments(prev => {
      const shopAllots = { ...(prev[shopId] || {}) };
      const itemAllot = { ...(shopAllots[itemId] || { grossWeight: '', trayWeight: '', wastage: '0', rate: '', discountPercentage: '' }) };
      
      itemAllot[field] = value;
      shopAllots[itemId] = itemAllot;
      
      return {
        ...prev,
        [shopId]: shopAllots
      };
    });
    if (saveSuccess) setSaveSuccess(false);
  };

  // Get aggregated stats of a single shop entered on screen
  const getShopTotals = (shopId: string) => {
    let totalNet = 0;
    let totalAmount = 0;
    let itemsCount = 0;
    
    const shopAllots = allotments[shopId] || {};
    items.forEach(itm => {
      const allot = shopAllots[itm.id];
      if (allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0) {
        const vals = getAllotmentValues(shopId, itm);
        const { netWeight, amount } = computeNetAndAmount(
          vals.grossWeight,
          vals.trayWeight,
          vals.wastage,
          vals.rate,
          vals.discountPercentage
        );
        if (netWeight > 0) {
          totalNet += netWeight;
          totalAmount += amount;
          itemsCount += 1;
        }
      }
    });
    
    return { totalNet, totalAmount, itemsCount };
  };

  // Compile overall Kitchen production summary live from all active shop grids
  const getKitchenSummary = () => {
    const consolidated: Record<string, {
      item: SweetItem;
      totalGross: number;
      totalTray: number;
      totalNet: number;
      totalAmount: number;
      shopsUsed: { shopName: string; netWeight: number; amount: number }[];
    }> = {};
    
    shops.forEach(sh => {
      const shopAllots = allotments[sh.id] || {};
      items.forEach(itm => {
        const allot = shopAllots[itm.id];
        if (allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0) {
          const vals = getAllotmentValues(sh.id, itm);
          const { netWeight, amount } = computeNetAndAmount(
            vals.grossWeight,
            vals.trayWeight,
            vals.wastage,
            vals.rate,
            vals.discountPercentage
          );
          
          if (netWeight > 0) {
            if (!consolidated[itm.id]) {
              consolidated[itm.id] = {
                item: itm,
                totalGross: 0,
                totalTray: 0,
                totalNet: 0,
                totalAmount: 0,
                shopsUsed: []
              };
            }
            
            const record = consolidated[itm.id];
            record.totalGross += parseFloat(vals.grossWeight) || 0;
            record.totalTray += parseFloat(vals.trayWeight) || 0;
            record.totalNet += netWeight;
            record.totalAmount += amount;
            record.shopsUsed.push({
              shopName: sh.name,
              netWeight,
              amount
            });
          }
        }
      });
    });
    
    return Object.values(consolidated);
  };

  const activeKitchenItems = getKitchenSummary();

  // Search filter shops, specifically synchronized with the 9 shops in the daily disbursement excel sheet
  const filteredShopsList = shops.filter(sh => {
    const nameLower = sh.name.toLowerCase().trim();
    const isExcelDailyShop = EXCEL_SHOP_ORDER.includes(nameLower);
    const matchesSearch = sh.name.toLowerCase().includes(shopFilterQuery.toLowerCase());
    return sh.active && isExcelDailyShop && matchesSearch;
  }).sort((a, b) => {
    const nameA = a.name.toLowerCase().trim();
    const nameB = b.name.toLowerCase().trim();
    const indexA = EXCEL_SHOP_ORDER.indexOf(nameA);
    const indexB = EXCEL_SHOP_ORDER.indexOf(nameB);
    return indexA - indexB;
  });

  // Filter sweet items catalog on display
  const filteredItems = items.filter(val => {
    const matchesSearch = val.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || val.category === selectedCategory;
    return val.active && matchesSearch && matchesCategory;
  });

  const isSheetItem = (item: SweetItem) => {
    const nameLower = item.name.toLowerCase().trim();
    // Also consider as sheet item if it actually has current allotment entries recorded on screen!
    const allotmentsForShops = Object.values(allotments).some(shopAllots => {
      const allot = shopAllots[item.id];
      return allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0;
    });
    return SHEET_ITEM_NAMES.has(nameLower) || allotmentsForShops;
  };

  // Sort: spreadsheet items at the top in the exact Excel order per shop, others at bottom.
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    const nameA = a.name.toLowerCase().trim();
    const nameB = b.name.toLowerCase().trim();

    const selectedShop = shops.find(s => s.id === selectedShopId);
    const selectedShopName = selectedShop ? selectedShop.name : '';
    const sequenceList = selectedShopName ? SHOP_ITEM_SEQUENCES[selectedShopName] : undefined;

    if (sequenceList) {
      const indexA = sequenceList.indexOf(nameA);
      const indexB = sequenceList.indexOf(nameB);
      const aInSeq = indexA >= 0;
      const bInSeq = indexB >= 0;

      if (aInSeq && !bInSeq) {
        return -1;
      }
      if (!aInSeq && bInSeq) {
        return 1;
      }
      if (aInSeq && bInSeq) {
        return indexA - indexB;
      }
    }

    // fallback to general sheet item vs non-sheet item
    const aIsSheet = isSheetItem(a);
    const bIsSheet = isSheetItem(b);

    if (aIsSheet && !bIsSheet) return -1;
    if (!aIsSheet && bIsSheet) return 1;

    return a.name.localeCompare(b.name);
  });


  // Bulk shortcut: apply common tray weights to active row entries that have values but no tare weight
  const handleApplyCommonTrayWeight = () => {
    if (selectedShopId === 'all') return;
    setAllotments(prev => {
      const shopAllots = { ...(prev[selectedShopId] || {}) };
      items.forEach(itm => {
        const allot = shopAllots[itm.id];
        if (allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0) {
          if (!allot.trayWeight || allot.trayWeight === '0' || allot.trayWeight.trim() === '') {
            allot.trayWeight = bulkTrayWeight;
          }
        }
      });
      return { ...prev, [selectedShopId]: shopAllots };
    });
  };

  // Bulk shortcut: apply common wastage % across active row entries
  const handleApplyCommonWastage = () => {
    if (selectedShopId === 'all') return;
    setAllotments(prev => {
      const shopAllots = { ...(prev[selectedShopId] || {}) };
      items.forEach(itm => {
        const allot = shopAllots[itm.id];
        if (allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0) {
          if (!allot.wastage || allot.wastage === '0' || allot.wastage.trim() === '') {
            allot.wastage = bulkWastage;
          }
        }
      });
      return { ...prev, [selectedShopId]: shopAllots };
    });
  };

  // Duplicate previous day's inputs for active shop
  const handleCopyPreviousDayAllotments = () => {
    if (selectedShopId === 'all') return;
    
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    const prevDateStr = currentDate.toISOString().slice(0, 10);
    
    const prevDisp = dispatches.find(d => d.date === prevDateStr && d.shopId === selectedShopId);
    if (!prevDisp || prevDisp.items.length === 0) {
      alert(`No preceding allotments found for this shop on specified previous date: ${prevDateStr}`);
      return;
    }
    
    if (window.confirm(`Copy all ${prevDisp.items.length} shipment records for this shop from previous day (${prevDateStr})? This will replace active rows.`)) {
      setAllotments(prev => {
        const shopAllots = { ...(prev[selectedShopId] || {}) };
        
        prevDisp.items.forEach(itm => {
          shopAllots[itm.sweetItemId] = {
            grossWeight: String(itm.grossWeight),
            trayWeight: String(itm.trayWeight),
            wastage: String(itm.wastage),
            rate: String(itm.rate),
            discountPercentage: String(itm.discountPercentage)
          };
        });
        
        return {
          ...prev,
          [selectedShopId]: shopAllots
        };
      });
    }
  };

  const handleClearShopSheet = () => {
    if (selectedShopId === 'all') return;
    if (window.confirm("Are you sure you want to clear this shop's active grid entry rows? This won't save until you click Save Daily Production.")) {
      setAllotments(prev => ({
        ...prev,
        [selectedShopId]: {}
      }));
    }
  };

  // Global save synchronized ledger
  const handleSaveAllAllotments = () => {
    const errors: string[] = [];
    const dispatchesToUpdate: { shopId: string; items: any[]; totalAmount: number }[] = [];
    
    // 1. Audit and formulate trip items for each shop
    shops.forEach(sh => {
      const shopAllots = allotments[sh.id] || {};
      const tripItems: any[] = [];
      let totalShopAmount = 0;
      
      items.forEach(itm => {
        const allot = shopAllots[itm.id];
        if (allot && allot.grossWeight && parseFloat(allot.grossWeight) > 0) {
          const vals = getAllotmentValues(sh.id, itm);
          const gross = parseFloat(vals.grossWeight);
          const tray = parseFloat(vals.trayWeight) || 0;
          const wastage = parseFloat(vals.wastage) || 0;
          const rate = parseFloat(vals.rate) || itm.sellingRate;
          const discount = parseFloat(vals.discountPercentage) || 0;
          
          if (isNaN(gross) || gross < 0) {
            errors.push(`Shop "${sh.name}": ${itm.name} has invalid gross weight`);
            return;
          }
          if (isNaN(tray) || tray < 0) {
            errors.push(`Shop "${sh.name}": ${itm.name} has invalid tray tare`);
            return;
          }
          if (isNaN(wastage) || wastage < 0 || wastage > 100) {
            errors.push(`Shop "${sh.name}": ${itm.name} has invalid wastage %`);
            return;
          }

          const { netWeight, amount } = computeNetAndAmount(
            vals.grossWeight,
            vals.trayWeight,
            vals.wastage,
            vals.rate,
            vals.discountPercentage
          );

          if (netWeight > 0) {
            tripItems.push({
              sweetItemId: itm.id,
              sweetItemName: itm.name,
              grossWeight: gross,
              trayWeight: tray,
              wastage,
              netWeight,
              rate,
              discountPercentage: discount,
              amount
            });
            totalShopAmount += amount;
          }
        }
      });

      if (tripItems.length > 0) {
        dispatchesToUpdate.push({
          shopId: sh.id,
          items: tripItems,
          totalAmount: totalShopAmount
        });
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveSuccess(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Perform updates to Dispatches database
    dispatchesToUpdate.forEach(dispUpdate => {
      const existingDisp = dispatches.find(d => d.date === selectedDate && d.shopId === dispUpdate.shopId);
      const shopObj = shops.find(s => s.id === dispUpdate.shopId);
      
      if (existingDisp) {
        onUpdateDispatch({
          ...existingDisp,
          items: dispUpdate.items,
          totalAmount: dispUpdate.totalAmount
        });
      } else {
        onAddDispatch({
          tripNumber: 'S1', // default route sequence
          shopId: dispUpdate.shopId,
          shopName: shopObj ? shopObj.name : 'Unknown Retailer',
          date: selectedDate,
          items: dispUpdate.items,
          totalAmount: dispUpdate.totalAmount,
          status: 'Completed'
        });
      }
    });

    // Handle cleared shops: set dispatches to empty if they used to have entries
    const activeShopIdsObj = new Set(dispatchesToUpdate.map(d => d.shopId));
    const previouslyExistingDispatchesOnDate = dispatches.filter(d => d.date === selectedDate && !activeShopIdsObj.has(d.shopId));
    
    previouslyExistingDispatchesOnDate.forEach(old => {
      if (old.items.length > 0) {
        onUpdateDispatch({
          ...old,
          items: [],
          totalAmount: 0,
          status: 'Completed'
        });
      }
    });

    // 3. Assemble and overwrite Consolidated Production Ledger batches
    const consolidatedKitchenData = getKitchenSummary();
    const productionEntriesToSave: Omit<ProductionEntry, 'id'>[] = [];
    
    consolidatedKitchenData.forEach((c, idx) => {
      const existingProd = production.find(p => p.date === selectedDate && p.sweetItemId === c.item.id);
      const batchNum = existingProd ? existingProd.batchNumber : `BT-SHOP-${c.item.id.replace(/[^0-9]/g, '') || idx}-${selectedDate.replace(/-/g, '').slice(4)}`;
      
      productionEntriesToSave.push({
        date: selectedDate,
        sweetItemId: c.item.id,
        sweetItemName: c.item.name,
        quantityPrepared: Number(c.totalGross.toFixed(3)),
        batchNumber: batchNum,
        notes: `Batch compiled from ${c.shopsUsed.length} retail shop shipments.`,
        expectedSales: Math.round(c.totalAmount)
      });
    });

    if (onSaveBulkProduction) {
      onSaveBulkProduction(selectedDate, productionEntriesToSave);
    }

    setSaveSuccess(true);
    setValidationErrors([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSaveSuccess(false), 5000);
  };

  // Live totals of consolidate
  const grandCalculatedNetVolume = activeKitchenItems.reduce((s, c) => s + c.totalNet, 0);
  const grandForecastedAmount = activeKitchenItems.reduce((s, c) => s + c.totalAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* LEDGER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Flame className="text-amber-500 w-6 h-6 shrink-0" />
            Shopwise Daily Production & Disbursement
          </h2>
          <p className="text-sm text-slate-400">
            Allocate and log morning bakery shipments shop-by-shop. System sums active items into master cook kitchen checklists.
          </p>
        </div>

        {/* ACTION BUTTON & DATE SELECTOR */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleSaveAllAllotments}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:shadow-amber-500/15 transition-all flex items-center justify-center gap-1.5 font-sans tracking-wide shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save All Sheets</span>
          </button>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 shadow-inner">
            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-950 border border-slate-850 px-3 py-1 rounded text-sm text-amber-500 font-mono font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SUCCESS ALERTS */}
      {saveSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl flex items-start gap-3 animate-slide-up shadow">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-emerald-100 text-sm">Ledger Synchronized and Saved Successfully!</h4>
            <p className="text-xs text-emerald-400 mt-1">
              Shop dispatches and master production batches for {selectedDate} are stored. Sum totals: {grandCalculatedNetVolume.toFixed(1)} Kg dispatched over {activeKitchenItems.length} sweets. Estimated wholesale revenue: ₹ {grandForecastedAmount.toLocaleString()}.
            </p>
          </div>
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="bg-rose-950/80 border border-rose-850 p-4 rounded-xl space-y-2 animate-slide-up font-mono text-slate-200">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">Verification Warning - Correct Row Issues</span>
          </div>
          <ul className="list-disc pl-5 text-xs text-rose-300 space-y-1">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* LAYOUT CONTAINER: TABS SIDEBAR (LEFT) + DISBURSEMENT SHEET (RIGHT) */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        
        {/* SHOP CHANNELS NAVIGATION (LEFT SIDEBAR) */}
        <div className="xl:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="space-y-1 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-400" />
              Shop Outlets
            </h3>
            <p className="text-xs text-slate-500">Pick any shop tab below to fill its daily sweets dispatch order.</p>
          </div>

          {/* Tab Filter Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search outlets..."
              value={shopFilterQuery}
              onChange={(e) => setShopFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-850 rounded-md text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
            />
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-600" />
          </div>

          {/* Scrollable list of Outlets */}
          <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
            
            {/* CONSOLIDATED KITCHEN TAB */}
            <button
              onClick={() => setSelectedShopId('all')}
              className={`w-full py-3 px-3 rounded-lg text-left transition-all flex items-center justify-between border ${
                selectedShopId === 'all'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                  : 'bg-slate-950/40 border-slate-850/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850/30'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold block flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                  Kitchen production sum
                </span>
                <span className="text-[10px] text-slate-500 block">All-shop batch aggregator</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-slate-350 font-bold shrink-0">
                {activeKitchenItems.length}
              </span>
            </button>

            {/* REGISTERED INDIVIDUAL SHOPS */}
            {filteredShopsList.map((sh) => {
              const { totalNet, totalAmount, itemsCount } = getShopTotals(sh.id);
              const isActive = selectedShopId === sh.id;
              
              return (
                <button
                  key={sh.id}
                  onClick={() => setSelectedShopId(sh.id)}
                  className={`w-full py-2.5 px-3 rounded-lg text-left transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-slate-800 border-slate-700 text-slate-100 shadow'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/30'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <span className="text-xs font-bold block truncate">{sh.name}</span>
                    <span className="text-[10px] text-slate-500 block">Default disc: {sh.discountPercentage}%</span>
                  </div>
                  
                  {itemsCount > 0 ? (
                    <div className="text-right shrink-0 space-y-0.5 font-mono">
                      <span className="text-[9px] px-1.5 py-0.5 bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold rounded-lg block text-center">
                        {totalNet.toFixed(1)} Kg
                      </span>
                      <span className="text-[8px] text-slate-500 block">
                        ₹ {Math.round(totalAmount).toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-700 px-1 hover:text-slate-500 duration-100 shrink-0">Empty</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILS PANEL ROW (RIGHT GRID COMPONENT) */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* RENDER KITCHEN AGGREGATED SUMMARY */}
          {selectedShopId === 'all' ? (
            <div className="space-y-5 animate-slide-up">
              
              {/* SUMMARY STATS BAR */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-5 border border-slate-800 rounded-xl select-none">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">Items to Prepare</span>
                  <span className="text-2xl font-bold text-slate-150">
                    {activeKitchenItems.length} Sweets Batch
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">Concurring Daily Volume</span>
                  <span className="text-2xl font-bold font-mono text-amber-500">
                    {grandCalculatedNetVolume.toFixed(2)} Kg / Units
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">Sum Wholesale Worth</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    ₹ {grandForecastedAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CONSOLIDATED LIST */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
                <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">Production Checklist for Master Cook (Halwai)</h3>
                    <p className="text-xs text-slate-500">Calculates overall sweets quantities needed for daily dispatches to our outlet networks.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none font-mono">
                        <th className="py-2.5 px-4 font-sans">Sweet Sweet Item</th>
                        <th className="py-2.5 px-4 text-center">Unit Category</th>
                        <th className="py-2.5 px-4 text-center">Wholesale Rate</th>
                        <th className="py-2.5 px-4 text-center">Total Net weight needed</th>
                        <th className="py-2.5 px-4 text-right">Outlets to receive</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-xs">
                      {activeKitchenItems.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-slate-500 space-y-2">
                            <Flame className="w-10 h-10 text-slate-700 mx-auto animate-pulse" />
                            <p className="font-semibold text-sm">Kitchen is clear for specified date!</p>
                            <p className="text-xs text-slate-600">Select any shop outlet in the sidebar on the left and input sweet quantities to populate this kitchen checklist.</p>
                          </td>
                        </tr>
                      ) : (
                        activeKitchenItems.map(c => (
                          <tr key={c.item.id} className="hover:bg-slate-850/40 transition-colors">
                            <td className="py-2.5 px-4">
                              <span className="font-bold text-slate-100 text-sm block">{c.item.name}</span>
                              <span className="text-[9px] font-mono font-bold text-amber-500 uppercase">{c.item.category} Type</span>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span className="px-1.5 py-0.5 bg-slate-950 rounded text-[10px] text-slate-500 font-bold border border-slate-850">
                                {c.item.unit}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-center font-mono">₹{c.item.sellingRate}</td>
                            <td className="py-2.5 px-4 text-center">
                              <span className="text-base font-bold font-mono text-amber-500 block">
                                {c.totalNet.toFixed(2)} {c.item.unit}
                              </span>
                              <span className="text-[9px] text-slate-500 font-mono block">Gross Scale: {c.totalGross.toFixed(1)} Kg</span>
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex flex-col gap-1 items-end">
                                {c.shopsUsed.map((su, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-[10px]">
                                    <span className="text-slate-400 font-semibold">{su.shopName}:</span>
                                    <span className="font-mono font-bold text-emerald-400 bg-slate-950 px-1 py-0.5 rounded border border-slate-850">{su.netWeight.toFixed(1)} {c.item.unit}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            
            /* RENDER INDIVIDUAL SHOPWISE GRID ENTRY */
            <div className="space-y-5 animate-slide-up">
              
              {/* OUTLET BILLING HEADER DETAILS */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 px-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-500 font-bold text-xs uppercase tracking-wide">
                      Active Outlet
                    </span>
                    <span className="text-slate-500 font-mono text-xs">ID: {selectedShopId}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mt-1">
                    {shops.find(s => s.id === selectedShopId)?.name}
                  </h3>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>Proprietor: <strong className="text-slate-300">{shops.find(s => s.id === selectedShopId)?.owner}</strong></span>
                    <span>Discount: <strong className="text-emerald-400">{shops.find(s => s.id === selectedShopId)?.discountPercentage}%</strong></span>
                    <span>Address: <span className="text-slate-500 font-mono">{shops.find(s => s.id === selectedShopId)?.address}</span></span>
                  </div>
                </div>

                {/* COPY PREVIOUS BUTTON */}
                <button
                  onClick={handleCopyPreviousDayAllotments}
                  className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-350 hover:text-slate-200 border border-slate-850 hover:border-slate-700 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto font-mono"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Dup Yesterday's Allotment
                </button>
              </div>

              {/* FAST ENTRY UTILITIES & BULK ASSIGNMENTS */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  Frictionless Grid Entry Shortcuts
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Common Tray Weight Shortcut */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 space-y-0.5">
                      <span className="text-xs text-slate-350 font-semibold block">Set Common Tray Weight:</span>
                      <span className="text-[10px] text-slate-600 block">Applies to active rows with unfilled tray weights.</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        step="0.001"
                        value={bulkTrayWeight}
                        onChange={(e) => setBulkTrayWeight(e.target.value)}
                        className="w-16 px-1.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-center text-xs font-bold text-amber-400"
                      />
                      <button
                        onClick={handleApplyCommonTrayWeight}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold transition-all shrink-0"
                      >
                        Apply Tray (tare)
                      </button>
                    </div>
                  </div>

                  {/* Common Wastage % Shortcut */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 space-y-0.5">
                      <span className="text-xs text-slate-350 font-semibold block">Set Common Wastage %:</span>
                      <span className="text-[10px] text-slate-600 block">Defaults wastage % to rows to calculate Net scale.</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={bulkWastage}
                        onChange={(e) => setBulkWastage(e.target.value)}
                        className="w-14 px-1.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-center text-xs font-bold text-amber-400"
                      />
                      <button
                        onClick={handleApplyCommonWastage}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold transition-all shrink-0"
                      >
                        Apply Waste %
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* SEARCH FILTERS */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search sweets inside master catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Categorisations */}
                <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850 shrink-0 select-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                        selectedCategory === cat
                          ? 'bg-slate-800 text-slate-100 shadow-sm'
                          : 'text-slate-500 hover:text-slate-350'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SPREADSHEET GRID SHEET TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse table-auto text-slate-200">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-bold text-slate-405 uppercase tracking-wider select-none font-mono">
                        <th className="py-2.5 px-3 w-48 font-sans">Sweet Sweet Name</th>
                        <th className="py-2.5 px-3 w-28 text-center bg-slate-900/30">Gross Weight</th>
                        <th className="py-2.5 px-3 w-28 text-center bg-slate-900/30">Tare Trays</th>
                        <th className="py-2.5 px-3 w-20 text-center bg-slate-900/30">Wastage %</th>
                        <th className="py-2.5 px-3 w-32 text-center text-amber-500 border-l border-r border-slate-850 font-bold bg-amber-500/5">
                          Net Weight
                        </th>
                        <th className="py-2.5 px-3 w-24 text-center">Price Rate</th>
                        <th className="py-2.5 px-3 w-20 text-center">Disc %</th>
                        <th className="py-2.5 px-3 w-32 text-right text-emerald-400 font-bold">Bill Amt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-xs">
                      {sortedAndFilteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-16 text-center text-slate-600">
                            No sweet items match the criteria in active master list.
                          </td>
                        </tr>
                      ) : (
                        sortedAndFilteredItems.map(item => {
                          const v = getAllotmentValues(selectedShopId, item);
                          const { netWeight, amount } = computeNetAndAmount(
                            v.grossWeight,
                            v.trayWeight,
                            v.wastage,
                            v.rate,
                            v.discountPercentage
                          );
                          const hasGrossValue = v.grossWeight !== '' && parseFloat(v.grossWeight) > 0;
                          const isFromSheet = isSheetItem(item);
                          
                          return (
                            <tr 
                              key={item.id} 
                              className={`hover:bg-slate-850/30 transition-colors ${
                                hasGrossValue ? 'bg-amber-950/10' : ''
                              }`}
                            >
                              
                              {/* Name & Category */}
                              <td className="py-2 px-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-150 text-xs block">{item.name}</span>
                                  {isFromSheet && (
                                    <span className="px-1 py-0.2 text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold rounded shrink-0 leading-none select-none">
                                      Sheet Item
                                    </span>
                                  )}
                                </div>
                                <span className="text-[9px] font-mono font-semibold text-slate-500">{item.category} Type</span>
                              </td>
                              
                              {/* Gross scales */}
                              <td className="py-2 px-3 bg-slate-900/10">
                                <div className="relative rounded">
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="0"
                                    value={v.grossWeight}
                                    onChange={(e) => handleAllotmentChange(selectedShopId, item.id, 'grossWeight', e.target.value)}
                                    className={`w-full text-center px-1.5 py-1 bg-slate-950 border text-xs font-bold text-white rounded focus:outline-none focus:border-amber-500 font-mono ${
                                      hasGrossValue ? 'border-amber-500/50' : 'border-slate-800'
                                    }`}
                                  />
                                </div>
                              </td>

                              {/* Tare weigh check */}
                              <td className="py-2 px-3 bg-slate-900/10">
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  placeholder="Tare"
                                  value={v.trayWeight}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, item.id, 'trayWeight', e.target.value)}
                                  className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Wastage */}
                              <td className="py-2 px-3 bg-slate-900/10">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="%"
                                  value={v.wastage}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, item.id, 'wastage', e.target.value)}
                                  className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-400 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Net Weight Display Box */}
                              <td className="py-2 px-3 bg-amber-500/5 border-l border-r border-slate-850/80 text-center font-mono font-bold select-none">
                                {netWeight > 0 ? (
                                  <span className="text-amber-500 text-sm">
                                    {netWeight.toFixed(2)} <span className="text-[9px] text-slate-600 uppercase inline">{item.unit}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-700">-</span>
                                )}
                              </td>

                              {/* Customized rate */}
                              <td className="py-2 px-3">
                                <div className="relative rounded">
                                  <span className="absolute inset-y-0 left-0 pl-1.5 flex items-center pointer-events-none text-[10px] text-slate-650 font-bold select-none">₹</span>
                                  <input
                                    type="number"
                                    min="0"
                                    value={v.rate}
                                    onChange={(e) => handleAllotmentChange(selectedShopId, item.id, 'rate', e.target.value)}
                                    className="w-full text-right pr-1.5 pl-4 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-350 rounded focus:outline-none font-mono"
                                  />
                                </div>
                              </td>

                              {/* Customized discount % */}
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={v.discountPercentage}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, item.id, 'discountPercentage', e.target.value)}
                                  className="w-full text-center px-1 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Live Amount sum */}
                              <td className="py-2 px-3 text-right font-mono font-bold text-sm">
                                {amount > 0 ? (
                                  <span className="text-emerald-400">
                                    ₹ {amount.toLocaleString()}
                                  </span>
                                ) : (
                                  <span className="text-slate-700">-</span>
                                )}
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* CURRENT OUTLET BOTTOM STATS */}
                <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 font-mono text-xs text-slate-500">
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                    <span>Current outlet summary: </span>
                    <strong className="text-slate-350 font-bold">{getShopTotals(selectedShopId).itemsCount} items</strong>
                    <span>|</span>
                    <span>Dispatched net: <strong className="text-slate-350">{getShopTotals(selectedShopId).totalNet.toFixed(1)} Kg</strong></span>
                    <span>|</span>
                    <span>Bill total: <strong className="text-emerald-400">₹ {Math.round(getShopTotals(selectedShopId).totalAmount).toLocaleString()}</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearShopSheet}
                    className="px-4 py-1.5 bg-rose-950/40 hover:bg-rose-950 border border-rose-900/60 text-rose-300 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 self-end md:self-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                    Clear Shop Row Values
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* MASTER ACTIONS PANEL (VISIBLE AT VERY BOTTOM ON SINGLE SCREEN ENTRY) */}
          <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 rounded-lg shrink-0">
                <Info className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs text-slate-400 max-w-lg m-0 leading-normal">
                <strong>Attention:</strong> Click the button to the right to save all changed shop worksheets. The system automatically recalculates outstanding balances, updates dispatch maps (Trips), and saves matching kitchen cooking batches.
              </p>
            </div>

            <button
              onClick={handleSaveAllAllotments}
              className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 font-sans tracking-wide shrink-0 font-bold"
            >
              <Save className="w-5 h-5" />
              Save All Shopwise Production Sheets
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
