import sqlite3 from "sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "rajadhani.db");

// Single persistent connection with serialized queue
let db: sqlite3.Database | null = null;

function getDb(): sqlite3.Database {
  if (!db) {
    db = new sqlite3.Database(DB_PATH);
    db.run("PRAGMA journal_mode = WAL");
    db.run("PRAGMA synchronous = NORMAL");
  }
  return db;
}

function run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
  return new Promise((resolve, reject) => {
    getDb().run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function all<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    getDb().all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

export async function initDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS shops (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner TEXT,
      mobile TEXT,
      address TEXT,
      discountPercentage REAL DEFAULT 0,
      creditDays INTEGER DEFAULT 30,
      outstandingBalance REAL DEFAULT 0,
      notes TEXT,
      active INTEGER DEFAULT 1
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      unit TEXT,
      sellingRate REAL DEFAULT 0,
      productionCost REAL DEFAULT 0,
      ingredients TEXT,
      active INTEGER DEFAULT 1
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS production (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      sweetItemId TEXT,
      sweetItemName TEXT,
      quantityPrepared REAL DEFAULT 0,
      batchNumber TEXT,
      notes TEXT,
      expectedSales INTEGER DEFAULT 0
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS dispatches (
      id TEXT PRIMARY KEY,
      tripNumber TEXT,
      shopId TEXT,
      shopName TEXT,
      date TEXT NOT NULL,
      totalAmount REAL DEFAULT 0,
      status TEXT DEFAULT 'Completed'
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS dispatch_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dispatchId TEXT NOT NULL,
      sweetItemId TEXT,
      sweetItemName TEXT,
      grossWeight REAL DEFAULT 0,
      trayWeight REAL DEFAULT 0,
      wastage REAL DEFAULT 0,
      netWeight REAL DEFAULT 0,
      rate REAL DEFAULT 0,
      discountPercentage REAL DEFAULT 0,
      amount REAL DEFAULT 0
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      name TEXT,
      openingStock REAL DEFAULT 0,
      purchase REAL DEFAULT 0,
      consumption REAL DEFAULT 0,
      remainingStock REAL DEFAULT 0,
      unit TEXT,
      lowStockAlertLevel REAL DEFAULT 0
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      date TEXT,
      category TEXT,
      amount REAL DEFAULT 0,
      description TEXT
    )
  `);
  await run(`
    CREATE TABLE IF NOT EXISTS workers (
      id TEXT PRIMARY KEY,
      name TEXT,
      mobile TEXT,
      dailyWage REAL DEFAULT 0,
      attendance TEXT,
      payments TEXT
    )
  `);
  console.log("SQLite database initialized:", DB_PATH);
}

// ── SHOPS ───────────────────────────────────────────────────────────────
export async function getAllShops() {
  const rows = await all<any>("SELECT * FROM shops");
  return rows.map(r => ({ ...r, active: !!r.active }));
}
export async function setAllShops(shops: any[]) {
  await run("DELETE FROM shops");
  for (const s of shops) {
    await run(
      "INSERT INTO shops (id, name, owner, mobile, address, discountPercentage, creditDays, outstandingBalance, notes, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [s.id, s.name, s.owner, s.mobile, s.address, s.discountPercentage, s.creditDays, s.outstandingBalance, s.notes, s.active ? 1 : 0]
    );
  }
}
export async function addShop(shop: any) {
  await run(
    "INSERT INTO shops (id, name, owner, mobile, address, discountPercentage, creditDays, outstandingBalance, notes, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [shop.id, shop.name, shop.owner, shop.mobile, shop.address, shop.discountPercentage, shop.creditDays, shop.outstandingBalance, shop.notes, shop.active ? 1 : 0]
  );
}
export async function updateShop(shop: any) {
  await run(
    "UPDATE shops SET name=?, owner=?, mobile=?, address=?, discountPercentage=?, creditDays=?, outstandingBalance=?, notes=?, active=? WHERE id=?",
    [shop.name, shop.owner, shop.mobile, shop.address, shop.discountPercentage, shop.creditDays, shop.outstandingBalance, shop.notes, shop.active ? 1 : 0, shop.id]
  );
}

// ── ITEMS ───────────────────────────────────────────────────────────────
export async function getAllItems() {
  const rows = await all<any>("SELECT * FROM items");
  return rows.map(r => ({ ...r, active: !!r.active }));
}
export async function setAllItems(items: any[]) {
  await run("DELETE FROM items");
  for (const i of items) {
    await run(
      "INSERT INTO items (id, name, category, unit, sellingRate, productionCost, ingredients, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [i.id, i.name, i.category, i.unit, i.sellingRate, i.productionCost, i.ingredients, i.active ? 1 : 0]
    );
  }
}
export async function addItem(item: any) {
  await run(
    "INSERT INTO items (id, name, category, unit, sellingRate, productionCost, ingredients, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [item.id, item.name, item.category, item.unit, item.sellingRate, item.productionCost, item.ingredients, item.active ? 1 : 0]
  );
}
export async function updateItem(item: any) {
  await run(
    "UPDATE items SET name=?, category=?, unit=?, sellingRate=?, productionCost=?, ingredients=?, active=? WHERE id=?",
    [item.name, item.category, item.unit, item.sellingRate, item.productionCost, item.ingredients, item.active ? 1 : 0, item.id]
  );
}

// ── PRODUCTION ──────────────────────────────────────────────────────────
export async function getAllProduction() {
  return await all<any>("SELECT * FROM production");
}
export async function setAllProduction(entries: any[]) {
  await run("DELETE FROM production");
  for (const e of entries) {
    await run(
      "INSERT INTO production (id, date, sweetItemId, sweetItemName, quantityPrepared, batchNumber, notes, expectedSales) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [e.id, e.date, e.sweetItemId, e.sweetItemName, e.quantityPrepared, e.batchNumber, e.notes, e.expectedSales]
    );
  }
}
export async function addProduction(entry: any) {
  await run(
    "INSERT INTO production (id, date, sweetItemId, sweetItemName, quantityPrepared, batchNumber, notes, expectedSales) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [entry.id, entry.date, entry.sweetItemId, entry.sweetItemName, entry.quantityPrepared, entry.batchNumber, entry.notes, entry.expectedSales]
  );
}

// ── DISPATCHES ──────────────────────────────────────────────────────────
export async function getAllDispatches() {
  const trips = await all<any>("SELECT * FROM dispatches");
  const items = await all<any>("SELECT * FROM dispatch_items");
  return trips.map((t: any) => ({
    ...t,
    items: items.filter((it: any) => it.dispatchId === t.id).map((it: any) => ({
      sweetItemId: it.sweetItemId,
      sweetItemName: it.sweetItemName,
      grossWeight: it.grossWeight,
      trayWeight: it.trayWeight,
      wastage: it.wastage,
      netWeight: it.netWeight,
      rate: it.rate,
      discountPercentage: it.discountPercentage,
      amount: it.amount
    }))
  }));
}
export async function setAllDispatches(dispatches: any[]) {
  await run("DELETE FROM dispatch_items");
  await run("DELETE FROM dispatches");
  for (const d of dispatches) {
    await run(
      "INSERT INTO dispatches (id, tripNumber, shopId, shopName, date, totalAmount, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [d.id, d.tripNumber, d.shopId, d.shopName, d.date, d.totalAmount, d.status]
    );
    for (const it of d.items || []) {
      await run(
        "INSERT INTO dispatch_items (dispatchId, sweetItemId, sweetItemName, grossWeight, trayWeight, wastage, netWeight, rate, discountPercentage, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [d.id, it.sweetItemId, it.sweetItemName, it.grossWeight, it.trayWeight, it.wastage, it.netWeight, it.rate, it.discountPercentage, it.amount]
      );
    }
  }
}
export async function addDispatch(dispatch: any) {
  await run(
    "INSERT INTO dispatches (id, tripNumber, shopId, shopName, date, totalAmount, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [dispatch.id, dispatch.tripNumber, dispatch.shopId, dispatch.shopName, dispatch.date, dispatch.totalAmount, dispatch.status]
  );
  for (const it of dispatch.items || []) {
    await run(
      "INSERT INTO dispatch_items (dispatchId, sweetItemId, sweetItemName, grossWeight, trayWeight, wastage, netWeight, rate, discountPercentage, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [dispatch.id, it.sweetItemId, it.sweetItemName, it.grossWeight, it.trayWeight, it.wastage, it.netWeight, it.rate, it.discountPercentage, it.amount]
    );
  }
}
export async function updateDispatch(dispatch: any) {
  await run(
    "UPDATE dispatches SET tripNumber=?, shopId=?, shopName=?, date=?, totalAmount=?, status=? WHERE id=?",
    [dispatch.tripNumber, dispatch.shopId, dispatch.shopName, dispatch.date, dispatch.totalAmount, dispatch.status, dispatch.id]
  );
  await run("DELETE FROM dispatch_items WHERE dispatchId=?", [dispatch.id]);
  for (const it of dispatch.items || []) {
    await run(
      "INSERT INTO dispatch_items (dispatchId, sweetItemId, sweetItemName, grossWeight, trayWeight, wastage, netWeight, rate, discountPercentage, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [dispatch.id, it.sweetItemId, it.sweetItemName, it.grossWeight, it.trayWeight, it.wastage, it.netWeight, it.rate, it.discountPercentage, it.amount]
    );
  }
}

// ── INVENTORY ───────────────────────────────────────────────────────────
export async function getAllInventory() {
  return await all<any>("SELECT * FROM inventory");
}
export async function setAllInventory(items: any[]) {
  await run("DELETE FROM inventory");
  for (const i of items) {
    await run(
      "INSERT INTO inventory (id, name, openingStock, purchase, consumption, remainingStock, unit, lowStockAlertLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [i.id, i.name, i.openingStock, i.purchase, i.consumption, i.remainingStock, i.unit, i.lowStockAlertLevel]
    );
  }
}
export async function updateInventory(item: any) {
  await run(
    "UPDATE inventory SET name=?, openingStock=?, purchase=?, consumption=?, remainingStock=?, unit=?, lowStockAlertLevel=? WHERE id=?",
    [item.name, item.openingStock, item.purchase, item.consumption, item.remainingStock, item.unit, item.lowStockAlertLevel, item.id]
  );
}

// ── EXPENSES ──────────────────────────────────────────────────────────
export async function getAllExpenses() {
  return await all<any>("SELECT * FROM expenses");
}
export async function setAllExpenses(expenses: any[]) {
  await run("DELETE FROM expenses");
  for (const e of expenses) {
    await run(
      "INSERT INTO expenses (id, date, category, amount, description) VALUES (?, ?, ?, ?, ?)",
      [e.id, e.date, e.category, e.amount, e.description]
    );
  }
}
export async function addExpense(expense: any) {
  await run(
    "INSERT INTO expenses (id, date, category, amount, description) VALUES (?, ?, ?, ?, ?)",
    [expense.id, expense.date, expense.category, expense.amount, expense.description]
  );
}

// ── WORKERS ─────────────────────────────────────────────────────────────
export async function getAllWorkers() {
  const rows = await all<any>("SELECT * FROM workers");
  return rows.map((r: any) => ({
    ...r,
    attendance: r.attendance ? JSON.parse(r.attendance) : {},
    payments: r.payments ? JSON.parse(r.payments) : []
  }));
}
export async function setAllWorkers(workers: any[]) {
  await run("DELETE FROM workers");
  for (const w of workers) {
    await run(
      "INSERT INTO workers (id, name, mobile, dailyWage, attendance, payments) VALUES (?, ?, ?, ?, ?, ?)",
      [w.id, w.name, w.mobile, w.dailyWage, JSON.stringify(w.attendance || {}), JSON.stringify(w.payments || [])]
    );
  }
}
export async function addWorker(worker: any) {
  await run(
    "INSERT INTO workers (id, name, mobile, dailyWage, attendance, payments) VALUES (?, ?, ?, ?, ?, ?)",
    [worker.id, worker.name, worker.mobile, worker.dailyWage, JSON.stringify(worker.attendance || {}), JSON.stringify(worker.payments || [])]
  );
}
export async function updateWorker(worker: any) {
  await run(
    "UPDATE workers SET name=?, mobile=?, dailyWage=?, attendance=?, payments=? WHERE id=?",
    [worker.name, worker.mobile, worker.dailyWage, JSON.stringify(worker.attendance || {}), JSON.stringify(worker.payments || []), worker.id]
  );
}
