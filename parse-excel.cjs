/* CommonJS helper — called by server.ts via child_process */
const XLSX = require('xlsx');
const path = require('path');

const xlsxPath = path.join(process.cwd(), '24MAY26-SWEETS.xlsx');
const wb = XLSX.readFile(xlsxPath);
const EXCEL_DATE = '2026-05-22';

// ── 1. Parse ItemMaster ──────────────────────────────────────────────────────
const itemRows = XLSX.utils.sheet_to_json(wb.Sheets['ItemMaster'], { header: 1 });
const items = [];
for (let i = 2; i < itemRows.length; i++) {
  const row = itemRows[i];
  const name = (row[0] || '').toString().trim();
  const uom  = (row[1] || 'S').toString().trim().toUpperCase();
  const rate = parseFloat(row[2]) || 200;
  if (!name) continue;

  const n = name.toLowerCase();
  let category = 'Ghee Special';
  if (n.includes('ghee') || n.includes('mysore') || n.includes('halwa')) category = 'Ghee Special';
  else if (n.includes('kova') || n.includes('milk') || n.includes('khoya') || n.includes('malai') ||
           n.includes('rabadi') || n.includes('rasmalai') || n.includes('rasmali') ||
           n.includes('angoor') || n.includes('rasgulla') || n.includes('paneer')) category = 'Khoya/Milk';
  else if (n.includes('laddu') || n.includes('jalebi') || n.includes('gulab') ||
           n.includes('jamun') || n.includes('kalajam') || n.includes('raj bog')) category = 'Syrup';
  else if (n.includes('mixture') || n.includes('pakodi') || n.includes('samosa') ||
           n.includes('puff') || n.includes('cutlet') || n.includes('bread') ||
           n.includes('bun') || n.includes('biscuit') || n.includes('cake') || n.includes('rusk')) category = 'Savory';
  else if (n.includes('kaju') || n.includes('cashew') || n.includes('badam') ||
           n.includes('pista') || n.includes('almond') || n.includes('burfi')) category = 'Dry';

  let unit = 'Kg';
  if (uom === 'B') unit = 'Box';
  else if (uom === 'D') unit = 'Piece';

  items.push({
    id: `XI-${name.replace(/\s+/g,'_').toLowerCase().slice(0,20)}-${i}`,
    name, category, unit,
    sellingRate: rate,
    productionCost: Math.round(rate * 0.6),
    ingredients: 'Pure ingredients',
    active: true
  });
}

// ── 2. Parse ShopMaster ───────────────────────────────────────────────────────
const shopRows = XLSX.utils.sheet_to_json(wb.Sheets['ShopMaster'], { header: 1 });
const shops = [];
for (let i = 2; i < shopRows.length; i++) {
  const row = shopRows[i];
  const name = (row[0] || '').toString().trim();
  const disc = parseFloat(row[1]) || 0;
  if (!name) continue;
  shops.push({
    id: `XS-${name.replace(/\s+/g,'_').toLowerCase().slice(0,20)}-${i}`,
    name, owner: 'Local Proprietor', mobile: '', address: '',
    discountPercentage: disc, creditDays: 30, outstandingBalance: 0,
    notes: 'Imported from 24MAY26-SWEETS.xlsx', active: true
  });
}

// ── 3. Parse Daily Disbursement → Production + Dispatches ────────────────────
const disbRows = XLSX.utils.sheet_to_json(wb.Sheets['Daily Disbursement'], { header: 1 });

const prodMap = {};
const tripMap = {};
const itemsLookup = new Map(items.map(it => [it.name.toLowerCase(), it]));
const shopsLookup = new Map(shops.map(s => [s.name.toLowerCase(), s]));

for (let i = 4; i < disbRows.length; i++) {
  const row = disbRows[i];
  const tripName = (row[0] || '').toString().trim();
  const shopName = (row[1] || '').toString().trim();
  const itemName = (row[2] || '').toString().trim();
  const rate     = parseFloat(row[3]) || 0;
  const gross    = parseFloat(row[4]) || 0;
  const tray     = parseFloat(row[5]) || 0;
  const wastPct  = parseFloat(row[6]) || 0;
  const net      = parseFloat(row[7]) || gross;
  const discPct  = parseFloat(row[8]) || 0;
  const amount   = parseFloat(row[9]) || 0;

  if (!tripName || !itemName) continue;

  // Aggregate production
  const pKey = itemName.toLowerCase();
  if (!prodMap[pKey]) prodMap[pKey] = { name: itemName, totalGross: 0, rate };
  prodMap[pKey].totalGross += gross;

  // Build dispatch trips
  const tripKey = `${tripName}__${shopName.toLowerCase()}`;
  const matchedItem = itemsLookup.get(itemName.toLowerCase());
  const itemId = matchedItem ? matchedItem.id : `XI-unk-${pKey.slice(0,10)}`;
  const matchedShop = shopsLookup.get(shopName.toLowerCase());
  const shopId = matchedShop ? matchedShop.id : `XS-unk`;
  const wastage = parseFloat(((wastPct / 100) * (gross - tray)).toFixed(4));

  const tripItem = {
    sweetItemId: itemId, sweetItemName: itemName,
    grossWeight: gross, trayWeight: tray, wastage,
    netWeight: parseFloat(net.toFixed(4)),
    rate, discountPercentage: discPct, amount: Math.round(amount)
  };

  if (!tripMap[tripKey]) {
    tripMap[tripKey] = {
      id: `XD-${tripName}-${shopName.replace(/\s+/g,'_').slice(0,15)}-${i}`,
      tripNumber: tripName, shopId, shopName,
      date: EXCEL_DATE, items: [], totalAmount: 0, status: 'Completed'
    };
  }
  tripMap[tripKey].items.push(tripItem);
  tripMap[tripKey].totalAmount += Math.round(amount);
}

const production = Object.values(prodMap).map((entry, idx) => {
  const match = itemsLookup.get(entry.name.toLowerCase());
  return {
    id: `XP-${Date.now()}-${idx}`,
    date: EXCEL_DATE,
    sweetItemId: match ? match.id : `XI-unk-${idx}`,
    sweetItemName: entry.name,
    quantityPrepared: parseFloat(entry.totalGross.toFixed(3)),
    batchNumber: 'EXCEL-SYNC-22MAY26',
    notes: 'Auto-synced from 24MAY26-SWEETS.xlsx',
    expectedSales: Math.round(entry.totalGross * entry.rate)
  };
});

const dispatches = Object.values(tripMap);

console.log(JSON.stringify({
  success: true,
  date: EXCEL_DATE,
  counts: { items: items.length, shops: shops.length, production: production.length, dispatches: dispatches.length },
  items, shops, production, dispatches
}));
