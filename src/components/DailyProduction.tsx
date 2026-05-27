import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Plus, Search, Calendar, Award, Receipt, Percent, HelpCircle, Save, RotateCcw, FileSpreadsheet, List, ShieldAlert, CheckCircle2, ShoppingBag, ArrowRight, Copy, Scissors, Trash2, Sliders, CheckSquare, Info, Loader2
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
  onSaveDailyProductionData?: (
    date: string,
    allDateTrips: TripEntry[],
    productionEntries: Omit<ProductionEntry, 'id'>[]
  ) => void;
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
  onSaveDailyProductionData,
  userRole
}: DailyProductionProps) {
  const [selectedDate, setSelectedDate] = useState('2026-05-24');

  // Get yesterday's date relative to any string date
  const getYesterday = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const tempDate = new Date(year, month, day);
      tempDate.setDate(tempDate.getDate() - 1);
      const y = tempDate.getFullYear();
      const m = String(tempDate.getMonth() + 1).padStart(2, '0');
      const d = String(tempDate.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    } catch (e) {
      return dateStr;
    }
  };

  const [cloneSrcDate, setCloneSrcDate] = useState('2026-05-23');
  const [cloneDestDate, setCloneDestDate] = useState('2026-05-24');

  // Sync cloneDestDate and cloneSrcDate with selectedDate when active date changes
  useEffect(() => {
    setCloneDestDate(selectedDate);
    setCloneSrcDate(getYesterday(selectedDate));
  }, [selectedDate]);
  
  // Selected tab: 'all' is Consolidated Kitchen Summary, others are shopIds
  const [selectedShopId, setSelectedShopId] = useState<string>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [shopFilterQuery, setShopFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // States for dynamic add row at bottom
  const [newItemId, setNewItemId] = useState<string>('');
  const [newGrossWeight, setNewGrossWeight] = useState<string>('');
  const [newTrayWeight, setNewTrayWeight] = useState<string>('0.688');
  const [newWastage, setNewWastage] = useState<string>('3');
  const [newRate, setNewRate] = useState<string>('');
  const [newDiscountPercentage, setNewDiscountPercentage] = useState<string>('');
  
  interface AllotmentRow {
    id: string;
    sweetItemId: string;
    sweetItemName: string;
    grossWeight: string;
    trayWeight: string;
    wastage: string;
    rate: string;
    discountPercentage: string;
    tripNumber?: string;
    isFromSheet?: boolean;
  }

  // High-performance nested allotment structure
  // Key 1: Shop ID, Values: Array of individual allotment rows
  const [allotments, setAllotments] = useState<Record<string, AllotmentRow[]>>({});
  const clonedDataRef = useRef<{ date: string; allotments: Record<string, AllotmentRow[]> } | null>(null);
  
  // Bulk shortcuts configurations
  const [bulkTrayWeight, setBulkTrayWeight] = useState('0.688');
  const [bulkWastage, setBulkWastage] = useState('3');
  
  // Alert flags
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isCloningLoading, setIsCloningLoading] = useState(false);
  
  // Helper to generate the complete predefined worksheet item list for a shop
  const getPredefinedAllotmentsForShop = (shopId: string, copyFromDispatches?: TripEntry[]): AllotmentRow[] => {
    const shopObj = shops.find(s => s.id === shopId);
    if (!shopObj) return [];
    
    // Find matching shop name sequence in SHOP_ITEM_SEQUENCES
    const shopNameKey = Object.keys(SHOP_ITEM_SEQUENCES).find(
      key => key.toLowerCase().trim() === shopObj.name.toLowerCase().trim()
    );
    // FALLBACK: If shop doesn't have a customized sequence, load ALL active items in the sweets catalog!
    const sequenceNames = shopNameKey ? SHOP_ITEM_SEQUENCES[shopNameKey] : items.filter(itm => itm.active).map(itm => itm.name);
    
    const rows: AllotmentRow[] = [];
    const processedItemIds = new Set<string>();

    const shopTrips = copyFromDispatches ? copyFromDispatches.filter(d => d.shopId === shopId) : [];

    // 1. Build row structures for each name in predefined template sequence
    sequenceNames.forEach((seqName, idx) => {
      const masterItem = items.find(i => i.name.toLowerCase().trim() === seqName.toLowerCase().trim());
      if (!masterItem) return;

      // Find if we have a saved value for this item in existing dispatches
      let foundItm: any = null;
      let foundTripNum = shopObj.id === 'S_EXCEL_4' ? 'S2' : 'S1'; // D/N - Rajadhani default S2, others S1

      for (const trip of shopTrips) {
        if (!trip.items) continue;
        const match = trip.items.find(itm => itm.sweetItemId === masterItem.id);
        if (match) {
          foundItm = match;
          foundTripNum = trip.tripNumber || foundTripNum;
          break;
        }
      }

      const defaultTray = '0.688';
      const defaultWastage = '3';
      const defaultRate = String(masterItem.sellingRate);
      const defaultDiscount = String(shopObj.discountPercentage || 0);

      rows.push({
        id: `${shopId}_${masterItem.id}_seq_${idx}_${Math.random()}`,
        sweetItemId: masterItem.id,
        sweetItemName: masterItem.name,
        grossWeight: foundItm ? String(foundItm.grossWeight !== undefined ? foundItm.grossWeight : '') : '',
        trayWeight: foundItm ? String(foundItm.trayWeight !== undefined ? foundItm.trayWeight : defaultTray) : defaultTray,
        wastage: foundItm ? String(foundItm.wastage !== undefined ? foundItm.wastage : defaultWastage) : defaultWastage,
        rate: foundItm ? String(foundItm.rate !== undefined ? foundItm.rate : defaultRate) : defaultRate,
        discountPercentage: foundItm ? String(foundItm.discountPercentage !== undefined ? foundItm.discountPercentage : defaultDiscount) : defaultDiscount,
        tripNumber: foundTripNum,
        isFromSheet: true
      });

      processedItemIds.add(masterItem.id);
    });

    // 2. Also append any extra item records present in the dispatches
    shopTrips.forEach(trip => {
      if (!trip.items) return;
      trip.items.forEach((itm, idx) => {
        if (processedItemIds.has(itm.sweetItemId)) return;

        const masterItem = items.find(i => i.id === itm.sweetItemId);
        const defaultRate = masterItem ? String(masterItem.sellingRate) : '';
        const defaultDiscount = String(shopObj.discountPercentage || 0);

        rows.push({
          id: `${shopId}_${itm.sweetItemId}_extra_${idx}_${Math.random()}`,
          sweetItemId: itm.sweetItemId,
          sweetItemName: itm.sweetItemName,
          grossWeight: String(itm.grossWeight !== undefined ? itm.grossWeight : ''),
          trayWeight: String(itm.trayWeight !== undefined ? itm.trayWeight : '0.688'),
          wastage: String(itm.wastage !== undefined ? itm.wastage : '3'),
          rate: String(itm.rate !== undefined ? itm.rate : defaultRate),
          discountPercentage: String(itm.discountPercentage !== undefined ? itm.discountPercentage : defaultDiscount),
          tripNumber: trip.tripNumber || (shopObj.id === 'S_EXCEL_4' ? 'S2' : 'S1'),
          isFromSheet: true
        });

        processedItemIds.add(itm.sweetItemId);
      });
    });

    return rows;
  };

  // Synchronize state from dispatches on date change
  useEffect(() => {
    if (clonedDataRef.current) {
      if (clonedDataRef.current.date === selectedDate) {
        // Correctly bypass overwriting with empty DB dispatches since the allotments are cloned in memory!
        // We explicitly set the allotments state here containing the cloned values to guarantee rendering
        setAllotments(clonedDataRef.current.allotments);
        return;
      }
    }
    const initialAllotments: Record<string, AllotmentRow[]> = {};
    const dailyDispatches = dispatches.filter(d => d.date === selectedDate);
    
    shops.forEach(sh => {
      initialAllotments[sh.id] = getPredefinedAllotmentsForShop(sh.id, dailyDispatches);
    });
    
    setAllotments(initialAllotments);
    setSaveSuccess(false);
    setValidationErrors([]);
  }, [selectedDate, dispatches, shops]);

  const categories = ['All', 'Dry', 'Khoya/Milk', 'Syrup', 'Savory', 'Ghee Special'];

  // Helper calculation matching exactly user sheets: 
  // Net weight = (Gross - Tare Tray Weight) * (1 - Wastage% / 100)
  const computeNetAndAmount = (
    grossStr: string,
    trayStr: string,
    wastageStr: string,
    rateStr: string,
    discPercentStr: string,
    itemId?: string
  ) => {
    const gross = parseFloat(grossStr) || 0;
    const tray = parseFloat(trayStr) || 0;
    const wastage = parseFloat(wastageStr) || 0;
    
    let rate = parseFloat(rateStr);
    if (isNaN(rate) || rate === 0) {
      if (itemId) {
        const masterItem = items.find(i => i.id === itemId);
        rate = masterItem ? masterItem.sellingRate : 0;
      } else {
        rate = 0;
      }
    }
    
    const discount = parseFloat(discPercentStr) || 0;
    
    // Net weight = (Gross - Tray Weight) * (1 - Wastage / 100)
    const netWeight = Math.max(0, (gross - tray) * (1 - wastage / 100));
    
    // In Rajadhani, the discount percentage represents the direct billing rate multiplier
    // (e.g. 25% discount field means they are charged 25% of the rate, equivalent to a 75% discount off the price).
    // If the discount is 0, they are billed 100% of the price.
    const billingMultiplier = discount > 0 ? (discount / 100) : 1;
    const amount = Number((netWeight * rate * billingMultiplier).toFixed(2));
    
    return { netWeight, amount };
  };

  const handleAllotmentChange = (
    shopId: string,
    rowId: string,
    field: 'grossWeight' | 'trayWeight' | 'wastage' | 'rate' | 'discountPercentage',
    value: string
  ) => {
    setAllotments(prev => {
      const shopAllots = (prev[shopId] || []).map(row => {
        if (row.id === rowId) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return {
        ...prev,
        [shopId]: shopAllots
      };
    });
    if (saveSuccess) setSaveSuccess(false);
  };

  const handleNewItemSelect = (itemId: string) => {
    setNewItemId(itemId);
    const item = items.find(i => i.id === itemId);
    if (item) {
      setNewRate(String(item.sellingRate));
      const shopObj = shops.find(s => s.id === selectedShopId);
      const defaultDiscount = shopObj ? shopObj.discountPercentage : 0;
      setNewDiscountPercentage(String(defaultDiscount));
      setNewTrayWeight(bulkTrayWeight);
      setNewWastage(bulkWastage);
    } else {
      setNewRate('');
      setNewDiscountPercentage('');
      setNewTrayWeight('0.688');
      setNewWastage('3');
    }
  };

  const handleAddNewItemRow = () => {
    if (!newItemId) return;
    const item = items.find(i => i.id === newItemId);
    if (!item) return;

    setAllotments(prev => {
      const shopAllots = [...(prev[selectedShopId] || [])];
      shopAllots.push({
        id: `NEW_${Date.now()}_${Math.random()}`,
        sweetItemId: newItemId,
        sweetItemName: item.name,
        grossWeight: newGrossWeight,
        trayWeight: newTrayWeight || '0',
        wastage: newWastage || '0',
        rate: newRate,
        discountPercentage: newDiscountPercentage,
        tripNumber: 'S1', // default trip
        isFromSheet: false
      });
      return {
        ...prev,
        [selectedShopId]: shopAllots
      };
    });

    setNewItemId('');
    setNewGrossWeight('');
    setNewTrayWeight(bulkTrayWeight);
    setNewWastage(bulkWastage);
    setNewRate('');
    setNewDiscountPercentage('');
    if (saveSuccess) setSaveSuccess(false);
  };

  const handleRemoveAllotmentRow = (rowId: string) => {
    setAllotments(prev => {
      const shopAllots = (prev[selectedShopId] || []).filter(row => row.id !== rowId);
      return {
        ...prev,
        [selectedShopId]: shopAllots
      };
    });
    if (saveSuccess) setSaveSuccess(false);
  };

  // Get aggregated stats of a single shop entered on screen
  const getShopTotals = (shopId: string) => {
    let totalNet = 0;
    let totalAmount = 0;
    let itemsCount = 0;
    let totalDiscountVal = 0;
    
    const activeAllots = allotments[shopId] || [];
    activeAllots.forEach(allot => {
      const gross = parseFloat(allot.grossWeight) || 0;
      if (gross > 0) {
        const { netWeight, amount } = computeNetAndAmount(
          allot.grossWeight,
          allot.trayWeight,
          allot.wastage,
          allot.rate,
          allot.discountPercentage,
          allot.sweetItemId
        );
        
        if (netWeight > 0) {
          totalNet += netWeight;
          totalAmount += amount;
          itemsCount += 1;
          
          const masterItem = items.find(i => i.id === allot.sweetItemId);
          const rateVal = parseFloat(allot.rate) || (masterItem ? masterItem.sellingRate : 0);
          const rawTotal = netWeight * rateVal;
          const disc = Math.max(0, rawTotal - amount);
          totalDiscountVal += disc;
        }
      }
    });
    
    return { totalNet, totalAmount, itemsCount, totalDiscountVal };
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
      const shopAllots = allotments[sh.id] || [];
      shopAllots.forEach(allot => {
        const gross = parseFloat(allot.grossWeight) || 0;
        if (gross > 0) {
          const masterItem = items.find(i => i.id === allot.sweetItemId);
          if (!masterItem) return;

          const { netWeight, amount } = computeNetAndAmount(
            allot.grossWeight,
            allot.trayWeight,
            allot.wastage,
            allot.rate,
            allot.discountPercentage,
            allot.sweetItemId
          );
          
          if (netWeight > 0) {
            if (!consolidated[allot.sweetItemId]) {
              consolidated[allot.sweetItemId] = {
                item: masterItem,
                totalGross: 0,
                totalTray: 0,
                totalNet: 0,
                totalAmount: 0,
                shopsUsed: []
              };
            }
            
            const record = consolidated[allot.sweetItemId];
            record.totalGross += gross;
            record.totalTray += parseFloat(allot.trayWeight) || 0;
            record.totalNet += netWeight;
            record.totalAmount += amount;
            
            const existingShop = record.shopsUsed.find(su => su.shopName === sh.name);
            if (existingShop) {
              existingShop.netWeight += netWeight;
              existingShop.amount += amount;
            } else {
              record.shopsUsed.push({
                shopName: sh.name,
                netWeight,
                amount
              });
            }
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
  const activeAllotments = selectedShopId !== 'all' ? (allotments[selectedShopId] || []) : [];
  
  const filteredAllotments = activeAllotments.filter(row => {
    const matchesSearch = row.sweetItemName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const masterItem = items.find(i => i.id === row.sweetItemId);
    const category = masterItem ? masterItem.category : 'Ghee Special';
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Bulk shortcut: apply common tray weights to active row entries that have values but no tare weight
  const handleApplyCommonTrayWeight = () => {
    if (selectedShopId === 'all') return;
    setAllotments(prev => {
      const shopAllots = (prev[selectedShopId] || []).map(row => {
        const gross = parseFloat(row.grossWeight) || 0;
        if (gross > 0 && (!row.trayWeight || row.trayWeight === '0' || row.trayWeight.trim() === '')) {
          return { ...row, trayWeight: bulkTrayWeight };
        }
        return row;
      });
      return { ...prev, [selectedShopId]: shopAllots };
    });
  };

  // Bulk shortcut: apply common wastage % across active row entries
  const handleApplyCommonWastage = () => {
    if (selectedShopId === 'all') return;
    setAllotments(prev => {
      const shopAllots = (prev[selectedShopId] || []).map(row => {
        const gross = parseFloat(row.grossWeight) || 0;
        if (gross > 0 && (!row.wastage || row.wastage === '0' || row.wastage.trim() === '')) {
          return { ...row, wastage: bulkWastage };
        }
        return row;
      });
      return { ...prev, [selectedShopId]: shopAllots };
    });
  };

  // Clone worksheet entries and saved allotments from cloneSrcDate to cloneDestDate
  const handleCloneAllotments = () => {
    if (isCloningLoading) return;
    if (!cloneSrcDate || !cloneDestDate) {
      alert("Please select both a valid From Date and To Date.");
      return;
    }

    if (cloneSrcDate === cloneDestDate) {
      alert("From Date and To Date cannot be identical. Please choose a different target date.");
      return;
    }

    let newAllots: Record<string, AllotmentRow[]> = {};
    const isSrcActiveEditor = cloneSrcDate === selectedDate;

    if (isSrcActiveEditor) {
      // 1. Check if there is active data entered in memory allotments first
      let hasAnyEnteredData = false;
      shops.forEach(sh => {
        const shopAllots = allotments[sh.id] || [];
        if (shopAllots.some(row => row.grossWeight && row.grossWeight.trim() !== '')) {
          hasAnyEnteredData = true;
        }
      });

      if (hasAnyEnteredData) {
        // Clone directly from active allotments memory, keeping the values but regenerating unique row IDs
        shops.forEach(sh => {
          const activeRows = allotments[sh.id] || [];
          newAllots[sh.id] = activeRows.map((row, idx) => ({
            ...row,
            id: `${sh.id}_${row.sweetItemId}_cloned_${idx}_${Math.random()}`
          }));
        });
      } else {
        // Current active editor is empty, fall back to checking dispatches database
        const srcDispatches = dispatches.filter(d => d.date === cloneSrcDate);
        if (srcDispatches.length === 0) {
          alert(`No active entered weights on screen or saved dispatches were found for the source date: ${cloneSrcDate}.\n\nPlease ensure you have entered or saved data before cloning.`);
          return;
        }
        shops.forEach(sh => {
          newAllots[sh.id] = getPredefinedAllotmentsForShop(sh.id, srcDispatches);
        });
      }
    } else {
      // 2. Clone from database for historical cloneSrcDate
      const srcDispatches = dispatches.filter(d => d.date === cloneSrcDate);

      if (srcDispatches.length === 0) {
        alert(`No saved dispatches or allotments were found in the database for the source date: ${cloneSrcDate}.\n\nPlease ensure you have saved allotments/dispatches on that day before cloning.`);
        return;
      }

      shops.forEach(sh => {
        newAllots[sh.id] = getPredefinedAllotmentsForShop(sh.id, srcDispatches);
      });
    }

    const countShops = shops.length;
    const confirmMessage = `Are you sure you want to clone ALL worksheet allotments from ${cloneSrcDate} to ${cloneDestDate} for all ${countShops} shops?\n\nThis will copy all exact values (gross weight, tare, wastage, rates, discounts) into your active editor under target date ${cloneDestDate}.\n\nNote: You will need to click the "Save All Sheets" button to permanently save these cloned sheets under the new date.`;

    if (window.confirm(confirmMessage)) {
      setIsCloningLoading(true);

      // Simulating a minor load delay so the user clearly registers the operation running and succeeding
      setTimeout(() => {
        // Save to ref first to lock the cloned data from being overwritten by the useEffect date sync
        clonedDataRef.current = {
          date: cloneDestDate,
          allotments: newAllots
        };

        setAllotments(newAllots);

        // Switch active Selected Date to the cloned destination date
        setSelectedDate(cloneDestDate);

        // Reset shop view to 'all' to show the fresh overall metrics first
        setSelectedShopId('all');

        setIsCloningLoading(false);

        // Defer alert so React render cycles can complete and show the interface transition
        setTimeout(() => {
          alert(`Successfully loaded cloned worksheets from ${cloneSrcDate} into active editor for ${cloneDestDate}!\n\nYou can now tweak allotments or click "Save All Sheets" directly to save them to ${cloneDestDate}.`);
        }, 100);
      }, 800);
    }
  };

  const handleClearShopSheet = () => {
    if (selectedShopId === 'all') return;
    if (window.confirm("Are you sure you want to clear this shop's active grid entry rows? This won't save until you click Save Daily Production.")) {
      setAllotments(prev => ({
        ...prev,
        [selectedShopId]: []
      }));
    }
  };

  // Global save synchronized ledger
  const handleSaveAllAllotments = () => {
    const errors: string[] = [];
    
    // 1. Audit and formulate trip items for each shop
    shops.forEach(sh => {
      const shopAllots = allotments[sh.id] || [];
      shopAllots.forEach(row => {
        const gross = parseFloat(row.grossWeight);
        if (!row.grossWeight || isNaN(gross)) {
          if (row.grossWeight && row.grossWeight.trim() !== '') {
            errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has invalid gross weight`);
          }
          return;
        }
        if (gross < 0) {
          errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has negative gross weight`);
        }
        
        const tray = parseFloat(row.trayWeight || '0');
        if (isNaN(tray) || tray < 0) {
          errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has invalid tray weight`);
        }
        
        const wastage = parseFloat(row.wastage || '0');
        if (isNaN(wastage) || wastage < 0 || wastage > 100) {
          errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has invalid wastage percentage`);
        }
        
        const rate = parseFloat(row.rate || '0');
        if (isNaN(rate) || rate < 0) {
          errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has invalid price rate`);
        }
        
        const discount = parseFloat(row.discountPercentage || '0');
        if (isNaN(discount) || discount < 0 || discount > 100) {
          errors.push(`Shop "${sh.name}": "${row.sweetItemName}" has invalid discount percentage`);
        }
      });
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveSuccess(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Perform updates to Dispatches database, grouping allotment rows by tripNumber
    const existingDateDispatches = dispatches.filter(d => d.date === selectedDate);
    const compiledDateTrips: TripEntry[] = [];
    
    shops.forEach(sh => {
      const shopAllots = allotments[sh.id] || [];
      const existingShopTrips = existingDateDispatches.filter(d => d.shopId === sh.id);
      
      // Group valid, positive-weight allotment rows by trip number
      const activeRowsByTrip: Record<string, AllotmentRow[]> = {};
      shopAllots.forEach(row => {
        const gross = parseFloat(row.grossWeight) || 0;
        if (gross > 0) {
          const tNum = (row.tripNumber || 'S1').trim().toUpperCase() || 'S1';
          if (!activeRowsByTrip[tNum]) {
            activeRowsByTrip[tNum] = [];
          }
          activeRowsByTrip[tNum].push(row);
        }
      });
      
      // Update or Add trips for active groups
      Object.entries(activeRowsByTrip).forEach(([tNum, rows]) => {
        const tripItems = rows.map(row => {
          const masterItem = items.find(i => i.id === row.sweetItemId);
          const gross = parseFloat(row.grossWeight) || 0;
          const tray = parseFloat(row.trayWeight) || 0;
          const wastage = parseFloat(row.wastage) || 0;
          const rate = parseFloat(row.rate) || (masterItem ? masterItem.sellingRate : 0);
          const discount = parseFloat(row.discountPercentage) || 0;
          
          const { netWeight, amount } = computeNetAndAmount(
            row.grossWeight,
            row.trayWeight,
            row.wastage,
            row.rate,
            row.discountPercentage,
            row.sweetItemId
          );
          
          return {
            sweetItemId: row.sweetItemId,
            sweetItemName: row.sweetItemName,
            grossWeight: gross,
            trayWeight: tray,
            wastage,
            netWeight,
            rate,
            discountPercentage: discount,
            amount
          };
        });
        
        const totalAmount = Number(tripItems.reduce((sum, itm) => sum + itm.amount, 0).toFixed(2));
        const matchedTrip = existingShopTrips.find(t => t.tripNumber.toUpperCase().trim() === tNum.toUpperCase().trim());
        
        if (matchedTrip) {
          compiledDateTrips.push({
            ...matchedTrip,
            items: tripItems,
            totalAmount
          });
        } else {
          compiledDateTrips.push({
            id: `TR-${Date.now()}-${sh.id}-${tNum}-${Math.random()}`,
            tripNumber: tNum,
            shopId: sh.id,
            shopName: sh.name,
            date: selectedDate,
            items: tripItems,
            totalAmount,
            status: 'Completed'
          });
        }
      });
      
      // Clear old trips or convert them to empty if no active rows exist anymore
      existingShopTrips.forEach(oldTrip => {
        const tNumUpper = oldTrip.tripNumber.toUpperCase().trim();
        if (!activeRowsByTrip[tNumUpper]) {
          compiledDateTrips.push({
            ...oldTrip,
            items: [],
            totalAmount: 0,
            status: 'Completed'
          });
        }
      });
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
        expectedSales: Number(c.totalAmount.toFixed(2))
      });
    });

    if (onSaveDailyProductionData) {
      onSaveDailyProductionData(selectedDate, compiledDateTrips, productionEntriesToSave);
    } else {
      if (onSaveBulkProduction) {
        onSaveBulkProduction(selectedDate, productionEntriesToSave);
      }
    }

    clonedDataRef.current = null;
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
              onChange={(e) => {
                clonedDataRef.current = null;
                setSelectedDate(e.target.value);
              }}
              className="bg-slate-950 border border-slate-850 px-3 py-1 rounded text-sm text-amber-500 font-mono font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* CLONE ALLOTMENTS BAR */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 shrink-0 border border-blue-500/10">
            <Copy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Clone Production Sheets</h3>
            <p className="text-[11px] text-slate-400">
              Duplicate complete sequence of quantities, prices and discounts from search date to target date.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-2 rounded-xl border border-slate-800/60 grow lg:grow-0 justify-between lg:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono pl-1 font-sans">From:</span>
            <input
              type="date"
              value={cloneSrcDate}
              onChange={(e) => setCloneSrcDate(e.target.value)}
              className="bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded text-xs text-blue-400 font-mono font-bold focus:outline-none focus:border-blue-500/55 transition-colors"
            />
          </div>

          <div className="text-slate-600 select-none hidden sm:block">➔</div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono font-sans">To:</span>
            <input
              type="date"
              value={cloneDestDate}
              onChange={(e) => setCloneDestDate(e.target.value)}
              className="bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500/55 transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleCloneAllotments}
            disabled={isCloningLoading}
            className={`px-4 py-1.5 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shrink-0 ${isCloningLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isCloningLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-200" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-blue-100" />
            )}
            <span>{isCloningLoading ? 'Cloning...' : 'Clone & Edit'}</span>
          </button>
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
              const { totalNet, totalAmount, itemsCount, totalDiscountVal } = getShopTotals(sh.id);
              const isActive = selectedShopId === sh.id;
              
              return (
                <button
                  key={sh.id}
                  onClick={() => setSelectedShopId(sh.id)}
                  className={`w-full py-2 px-2.5 rounded-lg text-left transition-all border ${
                    isActive
                      ? 'bg-blue-50 border-blue-200 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <span className={`text-xs font-bold block truncate ${isActive ? 'text-blue-800' : 'text-slate-705'}`}>
                        {sh.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                        <span>Disc: {sh.discountPercentage}%</span>
                        {itemsCount > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-bold text-slate-500">{itemsCount} items</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {itemsCount > 0 ? (
                      <div className="text-right shrink-0 space-y-0.5 font-mono select-none">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50/10 block leading-none">
                          {totalNet.toFixed(1)} Kg
                        </span>
                        <span className="text-[9px] text-slate-600 font-bold block">
                          ₹{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        {totalDiscountVal > 0 && (
                          <span className="text-[8px] text-rare-red text-rose-600 block" title="Total Discount Amount">
                            -₹{totalDiscountVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-400 px-1 shrink-0">Empty</span>
                    )}
                  </div>
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
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 px-2 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md font-bold text-[10px] uppercase tracking-wider font-sans">
                      Active Outlet
                    </span>
                    <span className="text-slate-500 font-mono text-xs">ID: {selectedShopId}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mt-1">
                    {shops.find(s => s.id === selectedShopId)?.name}
                  </h3>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Proprietor: <strong className="text-slate-700">{shops.find(s => s.id === selectedShopId)?.owner}</strong></span>
                    <span>Discount: <strong className="text-blue-600">{shops.find(s => s.id === selectedShopId)?.discountPercentage}%</strong></span>
                    <span>Address: <span className="text-slate-500 font-mono">{shops.find(s => s.id === selectedShopId)?.address}</span></span>
                  </div>
                </div>
              </div>

              {/* ON-TOP SUMMARY METRICS FOR ACTIVE OUTLET */}
              {(() => {
                const { totalNet, totalAmount, itemsCount, totalDiscountVal } = getShopTotals(selectedShopId);
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3 border border-blue-105 rounded-xl shadow-xs select-none">
                    <div className="space-y-0.5 border-r border-slate-100 pr-2">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Total Items</span>
                      <span className="text-base font-bold text-slate-800 flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                        {itemsCount} sweets
                      </span>
                    </div>
                    <div className="space-y-0.5 border-r border-slate-100 pr-2 md:pl-2">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Dispatched Net</span>
                      <span className="text-base font-bold text-blue-600 font-mono">
                        {totalNet.toFixed(2)} Kg
                      </span>
                    </div>
                    <div className="space-y-0.5 border-r border-slate-100 pr-2 md:pl-2">
                      <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">Discount Given</span>
                      <span className="text-base font-bold text-rose-600 font-mono">
                        ₹ {totalDiscountVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="space-y-0.5 md:pl-2">
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block">Bill Total (Post-Disc)</span>
                      <span className="text-base font-bold text-emerald-600 font-mono">
                        ₹ {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* COMPACT FAST ENTRY SHORTCUTS */}
              <div className="bg-white p-2.5 px-4 border border-blue-100 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2 text-slate-750">
                  <Sliders className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold font-sans tracking-wide">Frictionless Defaults:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  {/* Common Tray Weight Shortcut */}
                  <div className="flex items-center gap-1.5 pl-2">
                    <span className="text-slate-500 font-semibold text-[11px]">Default Tray (Kg):</span>
                    <input
                      type="number"
                      step="0.001"
                      value={bulkTrayWeight}
                      onChange={(e) => setBulkTrayWeight(e.target.value)}
                      className="w-14 px-1 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono font-bold text-center"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCommonTrayWeight}
                      className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[11px] font-bold transition-all"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Common Wastage % Shortcut */}
                  <div className="flex items-center gap-1.5 pl-3 border-l border-slate-100">
                    <span className="text-slate-500 font-semibold text-[11px]">Default Waste %:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={bulkWastage}
                      onChange={(e) => setBulkWastage(e.target.value)}
                      className="w-10 px-1 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono font-bold text-center"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCommonWastage}
                      className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[11px] font-bold transition-all"
                    >
                      Apply
                    </button>
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
                    <tbody className="divide-y divide-slate-805/45 text-xs">
                      {filteredAllotments.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-10 text-center text-slate-500 font-medium">
                            No dispatch items are currently added for this shop. Select a sweet below to begin.
                          </td>
                        </tr>
                      ) : (
                        filteredAllotments.map(allot => {
                          const item = items.find(i => i.id === allot.sweetItemId);
                          const unit = item ? item.unit : 'Kg';
                          const category = item ? item.category : 'Special';
                          
                          const { netWeight, amount } = computeNetAndAmount(
                            allot.grossWeight,
                            allot.trayWeight,
                            allot.wastage,
                            allot.rate,
                            allot.discountPercentage,
                            allot.sweetItemId
                          );
                          const hasGrossValue = allot.grossWeight !== '' && parseFloat(allot.grossWeight) > 0;
                          const isFromSheet = !!allot.isFromSheet;
                          const tripSuffix = allot.tripNumber ? ` (${allot.tripNumber})` : '';
                          
                          return (
                            <tr 
                              key={allot.id} 
                              className={`hover:bg-slate-850/30 transition-colors ${
                                hasGrossValue ? 'bg-amber-950/10' : ''
                              }`}
                            >
                              
                              {/* Name & Category / Delete action */}
                              <td className="py-2 px-3">
                                <div className="flex items-center justify-between gap-2.5">
                                  <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-slate-150 text-xs block truncate" title={allot.sweetItemName}>{allot.sweetItemName}</span>
                                    <span className="text-[9px] font-mono font-semibold text-slate-500">{category} Type{tripSuffix}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {isFromSheet && (
                                      <span className="px-1 py-0.5 text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold rounded shrink-0 leading-none select-none">
                                        Sheet
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveAllotmentRow(allot.id)}
                                      className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-rose-400 transition-colors"
                                      title="Remove from dispatch checklist"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                              
                              {/* Gross scales */}
                              <td className="py-2 px-3 bg-slate-900/10">
                                <div className="relative rounded">
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="0"
                                    value={allot.grossWeight}
                                    onChange={(e) => handleAllotmentChange(selectedShopId, allot.id, 'grossWeight', e.target.value)}
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
                                  value={allot.trayWeight}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, allot.id, 'trayWeight', e.target.value)}
                                  className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Wastage */}
                              <td className="py-2 px-3 bg-slate-905/30 bg-slate-900/10">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="%"
                                  value={allot.wastage}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, allot.id, 'wastage', e.target.value)}
                                  className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-400 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Net Weight Display Box */}
                              <td className="py-2 px-3 bg-amber-500/5 border-l border-r border-slate-850/80 text-center font-mono font-bold select-none">
                                {netWeight > 0 ? (
                                  <span className="text-amber-500 text-sm">
                                    {netWeight.toFixed(2)} <span className="text-[9px] text-slate-600 uppercase inline">{unit}</span>
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
                                    value={allot.rate !== undefined && allot.rate !== '' ? allot.rate : (item ? String(item.sellingRate) : '')}
                                    onChange={(e) => handleAllotmentChange(selectedShopId, allot.id, 'rate', e.target.value)}
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
                                  value={allot.discountPercentage !== undefined && allot.discountPercentage !== '' ? allot.discountPercentage : String(shops.find(s => s.id === selectedShopId)?.discountPercentage || 0)}
                                  onChange={(e) => handleAllotmentChange(selectedShopId, allot.id, 'discountPercentage', e.target.value)}
                                  className="w-full text-center px-1 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded focus:outline-none font-mono"
                                />
                              </td>

                              {/* Live Amount sum */}
                              <td className="py-2 px-3 text-right font-mono font-bold text-sm">
                                {amount > 0 ? (
                                  <span className="text-emerald-400">
                                    ₹ {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                ) : (
                                  <span className="text-slate-700">-</span>
                                )}
                              </td>

                            </tr>
                          );
                        })
                      )}

                      {/* ADD ROW DYNAMIC FIELD GROUP */}
                      <tr className="bg-slate-950/50 border-t border-slate-850 focus-within:bg-slate-900/60 transition-colors">
                        
                        {/* Dropdown cell */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <Plus className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                            <select
                              id="add-item-select"
                              value={newItemId}
                              onChange={(e) => handleNewItemSelect(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 rounded p-1.5 focus:outline-none focus:border-amber-500 font-sans cursor-pointer"
                            >
                              <option value="" className="text-slate-500">-- Choose Sweets to Add --</option>
                              {items
                                .filter(itm => itm.active && !(allotments[selectedShopId] || []).some(row => row.sweetItemId === itm.id))
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(itm => (
                                  <option key={itm.id} value={itm.id} className="text-slate-200 bg-slate-950">
                                    {itm.name} ({itm.unit})
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </td>

                        {/* Gross weight input */}
                        <td className="py-3 px-3 bg-slate-905/30">
                          <input
                            id="add-item-gross"
                            type="number"
                            min="0"
                            step="any"
                            placeholder="0"
                            value={newGrossWeight}
                            onChange={(e) => setNewGrossWeight(e.target.value)}
                            className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs font-bold text-white rounded focus:outline-none focus:border-emerald-500 font-mono"
                          />
                        </td>

                        {/* Tray weight input */}
                        <td className="py-3 px-3 bg-slate-905/30">
                          <input
                            id="add-item-tray"
                            type="number"
                            min="0"
                            step="any"
                            placeholder="Tare"
                            value={newTrayWeight}
                            onChange={(e) => setNewTrayWeight(e.target.value)}
                            className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 rounded focus:outline-none font-mono"
                          />
                        </td>

                        {/* Wastage % input */}
                        <td className="py-3 px-3 bg-slate-905/30">
                          <input
                            id="add-item-wastage"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="%"
                            value={newWastage}
                            onChange={(e) => setNewWastage(e.target.value)}
                            className="w-full text-center px-1.5 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-400 rounded focus:outline-none font-mono"
                          />
                        </td>

                        {/* Calculative Net indicator */}
                        <td className="py-3 px-3 bg-amber-500/5 border-l border-r border-slate-850 text-center font-mono font-bold select-none">
                          {(() => {
                            const gross = parseFloat(newGrossWeight) || 0;
                            const tray = parseFloat(newTrayWeight) || 0;
                            const waste = parseFloat(newWastage) || 0;
                            if (gross > 0) {
                              const net = Math.max(0, (gross - tray) * (1 - waste / 100));
                              return (
                                <span className="text-amber-400 text-xs font-bold">
                                  {net.toFixed(2)} Kg
                                </span>
                              );
                            }
                            return <span className="text-slate-650">-</span>;
                          })()}
                        </td>

                        {/* Price rate customization */}
                        <td className="py-3 px-3">
                          <div className="relative rounded">
                            <span className="absolute inset-y-0 left-0 pl-1.5 flex items-center pointer-events-none text-[10px] text-slate-600 font-bold select-none">₹</span>
                            <input
                              id="add-item-rate"
                              type="number"
                              min="0"
                              value={newRate}
                              onChange={(e) => setNewRate(e.target.value)}
                              className="w-full text-right pr-1.5 pl-4 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded focus:outline-none font-mono"
                            />
                          </div>
                        </td>

                        {/* Discount customization */}
                        <td className="py-3 px-3">
                          <input
                            id="add-item-discount"
                            type="number"
                            min="0"
                            max="100"
                            value={newDiscountPercentage}
                            onChange={(e) => setNewDiscountPercentage(e.target.value)}
                            className="w-full text-center px-1 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-350 rounded focus:outline-none font-mono"
                          />
                        </td>

                        {/* Action buttons and calculated sum bills */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {(() => {
                              const gross = parseFloat(newGrossWeight) || 0;
                              const tray = parseFloat(newTrayWeight) || 0;
                              const waste = parseFloat(newWastage) || 0;
                              const rate = parseFloat(newRate) || 0;
                              const disc = parseFloat(newDiscountPercentage) || 0;
                              if (gross > 0) {
                                const net = Math.max(0, (gross - tray) * (1 - waste / 100));
                                const billingMultiplier = disc > 0 ? (disc / 100) : 1;
                                const amt = net * rate * billingMultiplier;
                                return (
                                  <span className="font-mono font-bold text-emerald-400 text-xs truncate max-w-[80px]">
                                    ₹ {amt.toFixed(1)}
                                  </span>
                                );
                              }
                              return null;
                            })()}
                            <button
                              type="button"
                              onClick={handleAddNewItemRow}
                              disabled={!newItemId || !newGrossWeight || parseFloat(newGrossWeight) <= 0}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-605 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 text-[11px] font-bold rounded flex items-center gap-1 transition-all shrink-0 active:scale-95 shadow-sm"
                              title="Add to daily active sheet"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                              <span>Add</span>
                            </button>
                          </div>
                        </td>
                      </tr>
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
                    <span>Bill total: <strong className="text-emerald-400">₹ {getShopTotals(selectedShopId).totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span>
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
          <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-xl flex items-center gap-3 shadow-lg backdrop-blur-md">
            <div className="p-2.5 bg-amber-500/10 rounded-lg shrink-0">
              <Info className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xs text-slate-400 max-w-2xl m-0 leading-normal">
              <strong>Daily Synchronization:</strong> All shop worksheets automatically consolidate here. Saving your changes synchronizes outstanding ledger balances, active dispatch routes, and kitchen baking batches. Use the primary <strong>Save All Sheets</strong> button in the top menu.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
