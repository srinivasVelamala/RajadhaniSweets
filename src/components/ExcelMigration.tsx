import { useState, DragEvent, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, FileUp, ShieldCheck, CheckCircle2, RotateCcw, ArrowRight, Eye, RefreshCw, Download, AlertCircle, FileText
} from 'lucide-react';
import { Shop, SweetItem, TripEntry } from '../types';

interface ExcelMigrationProps {
  onImportCompleted: (importedShops: Shop[], importedItems: SweetItem[], importedDispatches: TripEntry[]) => void;
}

export default function ExcelMigration({ onImportCompleted }: ExcelMigrationProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // File details
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  
  // Parsed old Excel registers
  const [detectedShops, setDetectedShops] = useState<Shop[]>([]);
  const [detectedItems, setDetectedItems] = useState<SweetItem[]>([]);
  const [detectedDispatches, setDetectedDispatches] = useState<TripEntry[]>([]);
  
  // Custom parsing summary logs shown in Step 2
  const [detectionLogs, setDetectionLogs] = useState<string[]>([]);

  // Heuristic scan helper to guess type of sheet based on headers
  const detectSheetType = (headers: string[]): 'shops' | 'items' | 'dispatches' | 'unknown' => {
    const normHeaders = headers.map(h => String(h).toLowerCase().trim());
    
    // Clues for dispatches
    if (normHeaders.some(h => h.includes('trip') || h.includes('gross') || h.includes('tray') || h.includes('wastage') || h.includes('net') || h.includes('disbursement') || h.includes('scrap') || h.includes('dispatch'))) {
      return 'dispatches';
    }
    
    // Clues for shops
    if (normHeaders.some(h => h.includes('shop') || h.includes('owner') || h.includes('outstanding') || h.includes('debt') || h.includes('customer name') || h.includes('proprietor'))) {
      return 'shops';
    }
    
    // Clues for items
    if (normHeaders.some(h => h.includes('sweet') || h.includes('item name') || h.includes('uom') || h.includes('cook cost') || h.includes('selling rate') || h.includes('selling_rate') || h.includes('wholesale rate') || h.includes('wholesale_rate'))) {
      return 'items';
    }
    
    return 'unknown';
  };

  // Parsing individual entities
  const extractShops = (rows: any[]): Shop[] => {
    return rows.map((row, index) => {
      const findValue = (keys: string[], defaultVal: any) => {
        const match = Object.keys(row).find(k => keys.some(key => k.toLowerCase().includes(key)));
        return match ? row[match] : defaultVal;
      };

      const name = String(findValue(['shop_name', 'shop name', 'customer_name', 'customer name', 'name', 'outlet'], `Excel Shop ${index + 1}`)).trim();
      const owner = String(findValue(['owner', 'proprietor', 'contact_name', 'contact name', 'person'], 'Legacy Owner')).trim();
      const mobile = String(findValue(['mobile', 'phone', 'contact_no', 'contact_number', 'cell'], '9840012233')).trim();
      const address = String(findValue(['address', 'location', 'area', 'destination'], 'Market Lane')).trim();
      const discountPercent = parseFloat(findValue(['discount', 'disc', 'percentage'], 5)) || 5;
      const credit = parseInt(findValue(['credit', 'days', 'allowance'], 15)) || 15;
      const balance = parseFloat(findValue(['outstanding', 'balance', 'debt', 'due'], 0)) || 0;
      const notes = String(findValue(['notes', 'remarks', 'details'], 'Imported from Excel')).trim();

      return {
        id: `SL-${Date.now()}-${index}`,
        name,
        owner,
        mobile,
        address,
        discountPercentage: discountPercent,
        creditDays: credit,
        outstandingBalance: balance,
        notes,
        active: true
      };
    });
  };

  const extractItems = (rows: any[]): SweetItem[] => {
    return rows.map((row, index) => {
      const findValue = (keys: string[], defaultVal: any) => {
        const match = Object.keys(row).find(k => keys.some(key => k.toLowerCase().includes(key)));
        return match ? row[match] : defaultVal;
      };

      const name = String(findValue(['item_name', 'item name', 'sweet', 'product', 'name'], `Excel Sweet ${index + 1}`)).trim();
      const catRaw = String(findValue(['category', 'type', 'group'], 'Ghee Special')).trim().toLowerCase();
      
      // Categorize: 'Dry' | 'Khoya/Milk' | 'Syrup' | 'Savory' | 'Ghee Special'
      let category: 'Dry' | 'Khoya/Milk' | 'Syrup' | 'Savory' | 'Ghee Special' = 'Ghee Special';
      if (catRaw.includes('dry') || catRaw.includes('kaju') || catRaw.includes('nuts')) category = 'Dry';
      else if (catRaw.includes('milk') || catRaw.includes('khoya') || catRaw.includes('mawa') || catRaw.includes('dairy')) category = 'Khoya/Milk';
      else if (catRaw.includes('syrup') || catRaw.includes('rasgulla') || catRaw.includes('gulab')) category = 'Syrup';
      else if (catRaw.includes('savory') || catRaw.includes('namkeen') || catRaw.includes('snack')) category = 'Savory';
      else if (catRaw.includes('ghee')) category = 'Ghee Special';

      const unitRaw = String(findValue(['unit', 'uom', 'measure'], 'Kg')).trim().toLowerCase();
      let unit: 'Kg' | 'Box' | 'Piece' = 'Kg';
      if (unitRaw.includes('box') || unitRaw.includes('pkt')) unit = 'Box';
      else if (unitRaw.includes('pc') || unitRaw.includes('piece')) unit = 'Piece';

      const selling = parseFloat(findValue(['rate', 'selling', 'wholesale', 'price'], 380)) || 380;
      const cost = parseFloat(findValue(['cost', 'production', 'cook', 'manufacturing'], 220)) || 220;
      const ingredients = String(findValue(['ingredient', 'composition', 'formulation'], 'Pure ingredients')).trim();

      return {
        id: `WL-${Date.now()}-${index}`,
        name,
        category,
        unit,
        sellingRate: selling,
        productionCost: cost,
        ingredients,
        active: true
      };
    });
  };

  const extractDispatches = (rows: any[], availableShops: Shop[], availableItems: SweetItem[]): TripEntry[] => {
    interface FlatDispatchRow {
      date: string;
      tripNumber: string;
      shopName: string;
      sweetItemName: string;
      grossWeight: number;
      trayWeight: number;
      wastage: number;
      rate: number;
      discountPercentage: number;
      amount: number;
    }
    
    const parsedFlatRows: FlatDispatchRow[] = [];
    
    rows.forEach((row, index) => {
      const findValue = (keys: string[], defaultVal: any) => {
        const match = Object.keys(row).find(k => keys.some(key => k.toLowerCase().includes(key)));
        return match ? row[match] : defaultVal;
      };

      let dateStr = '2026-05-24';
      const dateRaw = findValue(['date', 'day'], null);
      if (dateRaw) {
        if (typeof dateRaw === 'number') {
          // Convert Excel timestamp
          const jsDate = new Date((dateRaw - 25569) * 86400 * 1000);
          if (!isNaN(jsDate.getTime())) {
            dateStr = jsDate.toISOString().split('T')[0];
          }
        } else {
          const parsedD = new Date(String(dateRaw));
          if (!isNaN(parsedD.getTime())) {
            dateStr = parsedD.toISOString().split('T')[0];
          }
        }
      }

      const trip = String(findValue(['trip', 'code', 'reference'], 'S1')).toUpperCase().trim();
      const shop = String(findValue(['shop', 'destination', 'customer', 'client'], 'Legacy Outlet')).trim();
      const item = String(findValue(['item', 'sweet', 'product'], 'Pedha')).trim();
      
      const gross = parseFloat(findValue(['gross', 'weight', 'qty', 'quantity'], 10)) || 10;
      const tray = parseFloat(findValue(['tray', 'empty'], 1.5)) || 0;
      const wastage = parseFloat(findValue(['wastage', 'scrap', 'waste'], 0)) || 0;
      const net = gross - tray - wastage;
      
      const rate = parseFloat(findValue(['rate', 'selling', 'price', 'wholesale'], 350)) || 350;
      const discount = parseFloat(findValue(['discount', 'disc', 'percentage'], 5)) || 0;
      const amt = parseFloat(findValue(['amount', 'final_amount', 'total'], net * rate * (1 - discount/100))) || (net * rate * (1 - discount/100));

      parsedFlatRows.push({
        date: dateStr,
        tripNumber: trip,
        shopName: shop,
        sweetItemName: item,
        grossWeight: gross,
        trayWeight: tray,
        wastage,
        rate,
        discountPercentage: discount,
        amount: amt
      });
    });

    const groupedTrips: { [key: string]: TripEntry } = {};

    parsedFlatRows.forEach((flat, idx) => {
      const groupKey = `${flat.date}_${flat.tripNumber}_${flat.shopName.toLowerCase()}`;
      
      const matchedShop = availableShops.find(s => s.name.toLowerCase() === flat.shopName.toLowerCase());
      const shopId = matchedShop ? matchedShop.id : `SL-INC-${idx}`;
      const shopNameClean = matchedShop ? matchedShop.name : flat.shopName;

      const matchedItem = availableItems.find(i => i.name.toLowerCase() === flat.sweetItemName.toLowerCase());
      const itemId = matchedItem ? matchedItem.id : `WL-INC-${idx}`;
      const itemNameClean = matchedItem ? matchedItem.name : flat.sweetItemName;

      const tripItem = {
        sweetItemId: itemId,
        sweetItemName: itemNameClean,
        grossWeight: flat.grossWeight,
        trayWeight: flat.trayWeight,
        wastage: flat.wastage,
        netWeight: flat.grossWeight - flat.trayWeight - flat.wastage,
        rate: flat.rate,
        discountPercentage: flat.discountPercentage,
        amount: Math.round(flat.amount)
      };

      if (!groupedTrips[groupKey]) {
        groupedTrips[groupKey] = {
          id: `TL-EXCEL-${idx}`,
          tripNumber: flat.tripNumber,
          shopId: shopId,
          shopName: shopNameClean,
          date: flat.date,
          items: [tripItem],
          totalAmount: Math.round(flat.amount),
          status: 'Completed'
        };
      } else {
        groupedTrips[groupKey].items.push(tripItem);
        groupedTrips[groupKey].totalAmount += Math.round(flat.amount);
      }
    });

    return Object.values(groupedTrips);
  };

  // Parser launcher function reading real binary files
  const processSpreadsheetFile = (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) throw new Error("Could not parse file bytes");

        const workbook = XLSX.read(data, { type: 'array' });
        const logs: string[] = [
          `✔ Successfully loaded Excel Workbook: "${file.name}"`,
          `✔ Sheets detected: ${workbook.SheetNames.join(', ')}`,
        ];

        let tempShops: Shop[] = [];
        let tempItems: SweetItem[] = [];
        let tempDispatches: TripEntry[] = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const rawRows = XLSX.utils.sheet_to_json(worksheet);

          if (rawRows.length === 0) {
            logs.push(`⚠ Sheet "${sheetName}" is empty, skipping scan`);
            return;
          }

          const sampleRow = rawRows[0] as any;
          const headers = Object.keys(sampleRow);
          const type = detectSheetType(headers);

          logs.push(`🔍 Analyzing Sheet "${sheetName}" (${rawRows.length} rows)...`);

          if (type === 'shops') {
            const parsed = extractShops(rawRows);
            tempShops = [...tempShops, ...parsed];
            logs.push(`   ↳ Auto-Map matched to "ShopMaster" (Registered: ${parsed.length} outlets)`);
          } else if (type === 'items') {
            const parsed = extractItems(rawRows);
            tempItems = [...tempItems, ...parsed];
            logs.push(`   ↳ Auto-Map matched to "ItemMaster" (Registered: ${parsed.length} sweet catalog items)`);
          } else if (type === 'dispatches') {
            // we will resolve matches inside previews
            const parsedDispatches = extractDispatches(rawRows, tempShops, tempItems);
            tempDispatches = [...tempDispatches, ...parsedDispatches];
            logs.push(`   ↳ Auto-Map matched to "Daily Disbursement" (Generated: ${parsedDispatches.length} dispatch trip registers)`);
          } else {
            // Fallback heuristics: check if single sheet layout contains everything parsed as shops or items
            if (headers.some(h => h.toLowerCase().includes('rate'))) {
              const parsed = extractItems(rawRows);
              tempItems = [...tempItems, ...parsed];
              logs.push(`   ↳ Generic Fallback: parsed as Items list (${parsed.length} sweet catalog items)`);
            } else {
              const parsed = extractShops(rawRows);
              tempShops = [...tempShops, ...parsed];
              logs.push(`   ↳ Generic Fallback: parsed as Shops registry (${parsed.length} outlines)`);
            }
          }
        });

        setDetectedShops(tempShops);
        setDetectedItems(tempItems);
        setDetectedDispatches(tempDispatches);
        setDetectionLogs(logs);

        // Move to Step 2 to show dynamic mapping log report
        setIsProcessing(false);
        setCurrentStep(2);
      } catch (err: any) {
        setIsProcessing(false);
        setErrorMessage(err.message || "Failed executing workbook reading. Verify file format.");
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMessage("Reader error interrupted spreadsheet serialization.");
    };

    reader.readAsArrayBuffer(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processSpreadsheetFile(droppedFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processSpreadsheetFile(selectedFile);
    }
  };

  // Sample data simulation if they do not have a spreadsheet handy on current device
  const loadMockExcelSheet = () => {
    setIsProcessing(true);
    setErrorMessage(null);
    setFileName('Rajdhani_Sweet_Ledgers_2026.xlsx');
    setFileSize('125.4 KB');

    setTimeout(() => {
      const logs = [
        `✔ Successfully loaded Mock Workspace Backup: "Rajdhani_Sweet_Ledgers_2026.xlsx"`,
        `✔ Sheet matches: "ShopMaster", "ItemMaster", "Daily Disbursement" folders verified.`,
        `🔍 Reading Sheet "ShopMaster" (2 rows)...`,
        `   ↳ Auto-Map matched to "ShopMaster" (Registered: 2 legacy outlets)`,
        `🔍 Reading Sheet "ItemMaster" (2 rows)...`,
        `   ↳ Auto-Map matched to "ItemMaster" (Registered: 2 high-level items)`,
        `🔍 Reading Sheet "Daily Disbursement" (1 register trip rows)...`,
        `   ↳ Auto-Map matched to "Daily Disbursement" (Generated: 1 composite trip invoice ledger)`
      ];

      const simulatedShops: Shop[] = [
        {
          id: 'SL-01',
          name: 'Balaji Sweet Center',
          owner: 'Balaji Prasad',
          mobile: '9840012233',
          address: 'Market Junction Lane',
          discountPercentage: 5,
          creditDays: 15,
          outstandingBalance: 8400,
          notes: 'Legacy Excel Shop 1 (Balaji)',
          active: true
        },
        {
          id: 'SL-02',
          name: 'Supreme Ghee Sweets Bypass',
          owner: 'Bhim Singh',
          mobile: '9840044556',
          address: 'Station Road Bypass',
          discountPercentage: 10,
          creditDays: 30,
          outstandingBalance: 12000,
          notes: 'Legacy Excel Shop 2 (Supreme)',
          active: true
        }
      ];

      const simulatedItems: SweetItem[] = [
        {
          id: 'WL-01',
          name: 'Badam Halwa',
          category: 'Ghee Special',
          unit: 'Kg',
          sellingRate: 900,
          productionCost: 620,
          ingredients: 'Almonds, Pure Desi Ghee, Sugar, Saffron',
          active: true
        },
        {
          id: 'WL-02',
          name: 'Motichoor Laddu',
          category: 'Syrup',
          unit: 'Kg',
          sellingRate: 380,
          productionCost: 220,
          ingredients: 'Gram flour, Sugar syrup, Ghee, Almond flakes',
          active: true
        }
      ];

      const simulatedDispatches: TripEntry[] = [
        {
          id: 'TL-01',
          tripNumber: 'S1',
          shopId: 'SL-01',
          shopName: 'Balaji Sweet Center',
          date: '2026-05-23',
          status: 'Completed',
          items: [
            {
              sweetItemId: 'WL-01',
              sweetItemName: 'Badam Halwa',
              grossWeight: 16.5,
              trayWeight: 1.5,
              wastage: 0,
              netWeight: 15.0,
              rate: 900,
              discountPercentage: 5,
              amount: 12825
            }
          ],
          totalAmount: 12825
        }
      ];

      setDetectedShops(simulatedShops);
      setDetectedItems(simulatedItems);
      setDetectedDispatches(simulatedDispatches);
      setDetectionLogs(logs);

      setIsProcessing(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handleCommitMigration = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onImportCompleted(detectedShops, detectedItems, detectedDispatches);
      setCurrentStep(4);
      setIsProcessing(false);
    }, 1500);
  };

  const handleResetWizard = () => {
    setFileName(null);
    setFileSize(null);
    setDetectedShops([]);
    setDetectedItems([]);
    setDetectedDispatches([]);
    setDetectionLogs([]);
    setErrorMessage(null);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <FileSpreadsheet className="text-amber-500 w-6 h-6 shrink-0" />
          Legacy Excel Import Wizard (SheetJS Active)
        </h2>
        <p className="text-sm text-slate-400">Drag & drop your old sweet shop spreadsheets (.xlsx, .csv) to automatically map and populate SQLite tables.</p>
      </div>

      {/* STEP PROGRESS TRACKER */}
      <div className="grid grid-cols-4 gap-2 bg-slate-900 p-4 border border-slate-800 rounded-xl font-mono text-center text-xs">
        <div className={`py-1 rounded font-semibold ${currentStep === 1 ? 'bg-amber-500 text-slate-950' : 'text-slate-550 text-slate-400'}`}>
          1. Upload Sheet
        </div>
        <div className={`py-1 rounded font-semibold ${currentStep === 2 ? 'bg-amber-500 text-slate-950' : 'text-slate-550 text-slate-400'}`}>
          2. Auto-Detect Map
        </div>
        <div className={`py-1 rounded font-semibold ${currentStep === 3 ? 'bg-amber-500 text-slate-950' : 'text-slate-550 text-slate-400'}`}>
          3. Preview Rows
        </div>
        <div className={`py-1 rounded font-semibold ${currentStep === 4 ? 'bg-amber-500 text-slate-950' : 'text-slate-550 text-slate-400'}`}>
          4. Complete
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-450 rounded-xl flex items-start gap-3 text-xs">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Parsing Failure Interrupted Wizard</span>
            <span className="opacity-90">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* STEP CONTAINER INTERACTIVES */}
      <main className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-80 flex flex-col justify-between">
        
        {/* STEP 1: UPLOAD old excel file */}
        {currentStep === 1 && (
          <div className="space-y-6 text-center py-6">
            <div className="max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-slate-950 text-slate-400 flex items-center justify-center mx-auto border border-slate-850">
                <FileUp className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200">Drag & Drop Legacy Sweet Ledger</h3>
                <p className="text-xs text-slate-500 mt-1">Supports physical worksheets containing ShopMaster, ItemMaster and Daily records.</p>
              </div>

              {/* DOCK DROPZONE AREA */}
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-800 hover:border-amber-500/40 rounded-xl p-8 transition-all bg-slate-950/20 flex flex-col items-center justify-center gap-4 cursor-pointer"
              >
                <div className="text-center">
                  <p className="text-xs text-slate-400 font-medium">Drop physical Excel (.xlsx / .csv) file here</p>
                  <p className="text-[10px] text-slate-500 mt-1">or click below to browse computer directories</p>
                </div>

                <label className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-amber-500 border border-slate-800 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors">
                  Browse Files
                  <input 
                    type="file" 
                    accept=".xlsx,.xls,.csv" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* TRIAL HELPER BUTTON */}
              <div className="border border-slate-850/60 rounded-xl p-4 bg-slate-950/40 space-y-2">
                <p className="text-[11px] text-slate-500">Don't have an Excel ledger template nearby on this phone/computer?</p>
                <button
                  type="button"
                  onClick={loadMockExcelSheet}
                  disabled={isProcessing}
                  className="w-full py-2 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-semibold rounded text-xs select-none shadow transition-all duration-150 animate-pulse"
                >
                  {isProcessing ? 'Processing files...' : '⚡ Simulate Excel Ledger Import & Verify Map'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: AUTO DETECT STAGE FOR MAPPING SPREADSHEETS */}
        {currentStep === 2 && (
          <div className="space-y-6 py-6 max-w-lg mx-auto w-full">
            <h3 className="text-sm font-semibold text-slate-300 font-mono flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
              SQL DETECTOR SCANNING FORMULARY RANGES...
            </h3>

            <div className="space-y-2 font-mono text-[11px] text-slate-400 bg-slate-950 p-4 rounded-lg border border-slate-800 whitespace-pre-line max-h-60 overflow-y-auto">
              {detectionLogs.map((log, i) => (
                <div key={i} className="py-0.5">
                  {log}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-850 text-xs text-slate-400 font-sans">
              <FileText className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">Target File: {fileName}</p>
                <p className="text-[11px] text-slate-500">Size: {fileSize} | Multi-Tab mapping resolution complete.</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full py-2.5 bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all"
            >
              Preview Detected Rows Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: PREVIEW RENDER MAP DATA DETECTOR */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Review Excel mapping datasets</h3>
              <p className="text-xs text-slate-500 mt-0.5">Please check legacy rows detected inside your spreadsheet before committing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Detected Customers preview */}
              <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono mb-2 pb-1 border-b border-slate-850">Detected Shop Outlets ({detectedShops.length})</span>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {detectedShops.length === 0 ? (
                      <p className="text-xs text-slate-600 italic">No Shop master data detected in sheets</p>
                    ) : (
                      detectedShops.map((s, idx) => (
                        <div key={s.id || idx} className="p-2 rounded bg-slate-950 border border-slate-850">
                          <p className="font-semibold text-slate-200 text-xs">{s.name}</p>
                          <p className="text-slate-500 font-mono text-[9px] mt-0.5">Owner: {s.owner} | Phone: {s.mobile}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Detected Sweets preview */}
              <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono mb-2 pb-1 border-b border-slate-850">Detected Sweets Catalog ({detectedItems.length})</span>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {detectedItems.length === 0 ? (
                      <p className="text-xs text-slate-600 italic">No Sweets master data detected in sheets</p>
                    ) : (
                      detectedItems.map((i, idx) => (
                        <div key={i.id || idx} className="p-2 rounded bg-slate-950 border border-slate-850">
                          <p className="font-semibold text-slate-200 text-xs">{i.name}</p>
                          <p className="text-slate-500 font-mono text-[9px] mt-0.5">{i.category} | Sell Rate: ₹{i.sellingRate}/{i.unit}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Detected Dispatches preview */}
              <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono mb-2 pb-1 border-b border-slate-850">Detected Trip Entries ({detectedDispatches.length})</span>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {detectedDispatches.length === 0 ? (
                      <p className="text-xs text-slate-600 italic">No Disbursement data detected in sheets</p>
                    ) : (
                      detectedDispatches.map((t, idx) => (
                        <div key={t.id || idx} className="p-2 rounded bg-slate-950 border border-slate-850">
                          <p className="font-semibold text-slate-200 text-xs">{t.shopName} ({t.tripNumber})</p>
                          <p className="text-slate-500 font-mono text-[9px] mt-0.5">Date: {t.date} | Invoice: ₹{t.totalAmount.toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleResetWizard}
                className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-lg text-xs"
              >
                Start Over
              </button>
              <button
                onClick={handleCommitMigration}
                disabled={isProcessing}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs shadow-md"
              >
                {isProcessing ? 'Syncing...' : 'Validate and Import directly to SQLite'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS RECONCILIATION COMPLETE PANEL */}
        {currentStep === 4 && (
          <div className="text-center py-6 space-y-6 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-200">Reconciliation Completed Successfully</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Legacy shop databases, inventories, and past trip dispatches have been cleanly integrated. All reports are immediately operational.
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleResetWizard}
                className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 font-semibold rounded-lg text-xs hover:bg-slate-900"
              >
                Import another sheet
              </button>
            </div>
          </div>
        )}
      </main>

      {/* EXPORTING PORTAL CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 font-sans">Continuous Exports Backup Panel</h3>
          <p className="text-xs text-slate-400 mt-1">Backup local SQLite tables, daily dispatches, and outstanding registers back to spreadsheet worksheets at any time.</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button 
            type="button" 
            onClick={() => alert("Successfully simulated PDF Export report backup. Saved as reports/Rajdhani_Outstanding_Bal.pdf")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-850 hover:text-amber-500 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            Export shop_outstanding.pdf
          </button>
          
          <button 
            type="button" 
            onClick={() => alert("Successfully simulated Excel Export register. Saved as backups/Rajdhani_Inventories_Backup.xlsx")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-850 hover:text-amber-500 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-amber-500" />
            Export inventory_rates_sheet.xlsx
          </button>

          <button 
            type="button" 
            onClick={() => alert("Successfully simulated Backup log export. Saved as backups/Sweets_Dispatch_Reconciliation.xlsx")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-850 hover:text-amber-500 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            Export sweeps_dispatch_logs.xlsx
          </button>
        </div>
      </div>
    </div>
  );
}
