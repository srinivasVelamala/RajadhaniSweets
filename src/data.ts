import { Shop, SweetItem, ProductionEntry, TripEntry, InventoryItem, Expense, Worker, Notification } from './types';

export const INITIAL_SHOPS: Shop[] = [
  {
    "id": "S_EXCEL_1",
    "name": "7 Rd -Rajadhani",
    "owner": "Local Proprietor",
    "mobile": "98450783729",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 25,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_2",
    "name": "Abhiruchi dept",
    "owner": "Local Proprietor",
    "mobile": "98450138558",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_3",
    "name": "customer",
    "owner": "Local Proprietor",
    "mobile": "98450593661",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_4",
    "name": "D/N - Rajadhani",
    "owner": "Local Proprietor",
    "mobile": "98450299445",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 23,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_5",
    "name": "Amma bakery",
    "owner": "Local Proprietor",
    "mobile": "98450206073",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_6",
    "name": "Varahi sweets 20",
    "owner": "Local Proprietor",
    "mobile": "98450657218",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_7",
    "name": "varahi sweets 25",
    "owner": "Local Proprietor",
    "mobile": "98450830836",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 25,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_8",
    "name": "G/T - Sweet Spot",
    "owner": "Local Proprietor",
    "mobile": "98450896358",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 23,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_9",
    "name": "Indian sweets",
    "owner": "Local Proprietor",
    "mobile": "98450838502",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_10",
    "name": "K/S pedda padu 20",
    "owner": "Local Proprietor",
    "mobile": "98450976045",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_11",
    "name": "K/S pedda padu 25",
    "owner": "Local Proprietor",
    "mobile": "98450252454",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 25,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_12",
    "name": "K/P  - Rajadhani",
    "owner": "Local Proprietor",
    "mobile": "98450310183",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_13",
    "name": "Mr chai",
    "owner": "Local Proprietor",
    "mobile": "98450849072",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_14",
    "name": "Pramodh home foods",
    "owner": "Local Proprietor",
    "mobile": "98450255925",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_15",
    "name": "Nagavali Hotel",
    "owner": "Local Proprietor",
    "mobile": "98450228886",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_16",
    "name": "Nutan - complex",
    "owner": "Local Proprietor",
    "mobile": "98450622595",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_17",
    "name": "Nutan - OBS",
    "owner": "Local Proprietor",
    "mobile": "98450299150",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_18",
    "name": "Hotel Sunrise",
    "owner": "Local Proprietor",
    "mobile": "98450587989",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_19",
    "name": "Raja",
    "owner": "Local Proprietor",
    "mobile": "98450360205",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_20",
    "name": "Sanna Bakery",
    "owner": "Local Proprietor",
    "mobile": "98450275091",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_21",
    "name": "sai tiffines",
    "owner": "Local Proprietor",
    "mobile": "98450220224",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_22",
    "name": "Santosh sweets",
    "owner": "Local Proprietor",
    "mobile": "98450374354",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_23",
    "name": "Snack Central, College Road",
    "owner": "Local Proprietor",
    "mobile": "98450239928",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_24",
    "name": "irani café",
    "owner": "Local Proprietor",
    "mobile": "98450952456",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 10,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_25",
    "name": "Tea time",
    "owner": "Local Proprietor",
    "mobile": "98450415959",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 20,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_26",
    "name": "Varam Residency",
    "owner": "Local Proprietor",
    "mobile": "98450600503",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  },
  {
    "id": "S_EXCEL_27",
    "name": "Meena krishna",
    "owner": "Local Proprietor",
    "mobile": "98450815463",
    "address": "Local Bazaar, Street Section A",
    "discountPercentage": 0,
    "creditDays": 30,
    "outstandingBalance": 0,
    "notes": "Imported from ShopMaster Worksheet Link",
    "active": true
  }
];

export const INITIAL_SWEETS: SweetItem[] = [
  {
    "id": "W_EXCEL_1",
    "name": "4 Piece Bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_2",
    "name": "10 pc bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_3",
    "name": "Agra mango roll",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_4",
    "name": "atta rusk",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_5",
    "name": "Agra Pan",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_6",
    "name": "Agra puri",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_7",
    "name": "Ajmeer kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_8",
    "name": "all mixing sweets",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 440,
    "productionCost": 308,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_9",
    "name": "Almond Dry Fruit Burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1300,
    "productionCost": 910,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_10",
    "name": "Angoor Rasmali",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_11",
    "name": "Aresalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_12",
    "name": "Atukulu Mixture",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_13",
    "name": "Baby vamu rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_14",
    "name": "badam badhan",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_15",
    "name": "Badam Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_16",
    "name": "Badam Burfi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_17",
    "name": "badam choco burfi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_18",
    "name": "Badam Halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_19",
    "name": "Badam Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_20",
    "name": "Badam Milk special (Net Price)",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_21",
    "name": "Badam Milk (Net Price)",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 24,
    "productionCost": 17,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_22",
    "name": "Badam Rolls",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_23",
    "name": "Badam Sandwich",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 380,
    "productionCost": 266,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_24",
    "name": "Badam slp rusk",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_25",
    "name": "badusha",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_26",
    "name": "badam kova burfi",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 540,
    "productionCost": 378,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_27",
    "name": "Bakery biscuits",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_28",
    "name": "Balaji Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_29",
    "name": "Banglore Bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_30",
    "name": "Bellam Sunnundalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 440,
    "productionCost": 308,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_31",
    "name": "Benaras kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_32",
    "name": "besari laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_33",
    "name": "Biscuit box  almond",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 140,
    "productionCost": 98,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_34",
    "name": "Biscuit box  bournavita",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_35",
    "name": "Biscuit box  cashew",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 120,
    "productionCost": 84,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_36",
    "name": "Biscuit box  coconut",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_37",
    "name": "Biscuit box  coconut badam",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_38",
    "name": "Biscuit box  coconut fruit",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_39",
    "name": "Biscuit box  Pista",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 120,
    "productionCost": 84,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_40",
    "name": "Biscuit box  Raagi",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_41",
    "name": "Biscuit box osmania",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_42",
    "name": "Biscuit box  salt",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_43",
    "name": "Biscuit box butter bis",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_44",
    "name": "Biscuit box choco chips",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_45",
    "name": "Biscuit box choco vanilla",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_46",
    "name": "Biscuit box chocolate",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_47",
    "name": "Biscuit box coco choco",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_48",
    "name": "Biscuit box corn flacks",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_49",
    "name": "Biscuit box jam",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_50",
    "name": "Biscuit box moon",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_51",
    "name": "Biscuit box red velvet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 120,
    "productionCost": 84,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_52",
    "name": "Biscuit box soan papidi",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 140,
    "productionCost": 98,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_53",
    "name": "Biscuit packet drop vanilla",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_54",
    "name": "blackforest pudding",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_55",
    "name": "blue berry moose cup",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_56",
    "name": "Bobbattlu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_57",
    "name": "Bombay Abdulla",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_58",
    "name": "boondi chekki",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_59",
    "name": "Bournvita Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_60",
    "name": "Bournvita Soan Papidi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_61",
    "name": "Bread Halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_62",
    "name": "Bread Halwa ( Net price)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_63",
    "name": "Brown bread large",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_64",
    "name": "Brown bread small",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_65",
    "name": "brown rusk",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_66",
    "name": "Brownee",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_67",
    "name": "Burelu (NET PRICE)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_68",
    "name": "burger panner",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_69",
    "name": "burger veg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_70",
    "name": "burger buns 1pie 95gm",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_71",
    "name": "Butter Cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_72",
    "name": "Butter Cream B. forest Cake 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_73",
    "name": "Butter Cream B. forest Cake kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_74",
    "name": "Butter Cream Cake 1/2 kg cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 180,
    "productionCost": 126,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_75",
    "name": "Butter Cream Cake kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 350,
    "productionCost": 245,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_76",
    "name": "Butter Cream Cake model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 450,
    "productionCost": 315,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_77",
    "name": "Butter Cream Cake model&eggless kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_78",
    "name": "Butter Cream Cake Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_79",
    "name": "Butter Cuts",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_80",
    "name": "butter scotch Butter cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_81",
    "name": "Butter Scotch Cake (N) kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_82",
    "name": "Butter Scotch Cake (N) kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_83",
    "name": "Butter Scotch Cake (N) pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_84",
    "name": "Butter Scotch Cake(N) 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_85",
    "name": "Butter Scotch Cake(N) model&eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 550,
    "productionCost": 385,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_86",
    "name": "butter scotch kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_87",
    "name": "butter Slice cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_88",
    "name": "cake box 1.5 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 27,
    "productionCost": 19,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_89",
    "name": "cake box 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 12,
    "productionCost": 8,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_90",
    "name": "cake box 2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 32,
    "productionCost": 22,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_91",
    "name": "cake box 3 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 42,
    "productionCost": 29,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_92",
    "name": "Cake box 5kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 47,
    "productionCost": 33,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_93",
    "name": "cake box kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 17,
    "productionCost": 12,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_94",
    "name": "Cake box vanilla",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_95",
    "name": "Cake box chocolate",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_96",
    "name": "cake Rusk Box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_97",
    "name": "Carrot Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_98",
    "name": "Carrot Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 480,
    "productionCost": 336,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_99",
    "name": "Cashew puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_100",
    "name": "Cashew Anjeer Cuts",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_101",
    "name": "Cashew Anjeer Flower",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_102",
    "name": "Cashew Anjeer rolls",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1100,
    "productionCost": 770,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_103",
    "name": "cashew biscuits( hot)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_104",
    "name": "Cashew bites",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_105",
    "name": "Cashew Burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_106",
    "name": "Cashew cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_107",
    "name": "Cashew Chekki",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_108",
    "name": "Cashew Cuts",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_109",
    "name": "cashew halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 460,
    "productionCost": 322,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_110",
    "name": "cashew dry fruit burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1100,
    "productionCost": 770,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_111",
    "name": "Cashew Dry Fruit Rolls",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1100,
    "productionCost": 770,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_112",
    "name": "Cashew Fry (NET PRICE)",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 950,
    "productionCost": 665,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_113",
    "name": "Cashew Fry (NET PRICE) 150grams box",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 150,
    "productionCost": 105,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_114",
    "name": "Cashew Kalakand",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_115",
    "name": "Cashew roast spl kalakand",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_116",
    "name": "cashew kalambari",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1100,
    "productionCost": 770,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_117",
    "name": "Cashew Milk Mysore Pak Dry Fruits",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_118",
    "name": "Cashew Pakodi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_119",
    "name": "Cashew Pakodi (190 gm)",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_120",
    "name": "Chalimidi (NET PRICE)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_121",
    "name": "Cham Cham",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_122",
    "name": "Chanagapalukulu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_123",
    "name": "Chandini Rolls",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_124",
    "name": "Chandrakala",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_125",
    "name": "Chegodi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_126",
    "name": "Chena Kaja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_127",
    "name": "Chena toast",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_128",
    "name": "chicken 65 puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 45,
    "productionCost": 31,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_129",
    "name": "chicken manchurian",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_130",
    "name": "chicken puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_131",
    "name": "Chocobar candies",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_132",
    "name": "Choco Burfi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_133",
    "name": "Choco vanilla cool cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_134",
    "name": "Chocolate (soan papidi)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_135",
    "name": "Chocolate Ball",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_136",
    "name": "Chocolate butter cake(burfi)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_137",
    "name": "chocolate cake roll",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_138",
    "name": "Chocolate Cashew burfi",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_139",
    "name": "Chocolate Cream Cake 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_140",
    "name": "Chocolate Cream Cake kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_141",
    "name": "Chocolate Cream Cake model &eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 550,
    "productionCost": 385,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_142",
    "name": "Chocolate Cream Cake model orEggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_143",
    "name": "Chocolate Cream Cake Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_144",
    "name": "Chocolate Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 440,
    "productionCost": 308,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_145",
    "name": "chocolate moose cup",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_146",
    "name": "chocolate sandwich",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_147",
    "name": "chocolate moose cup small",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 35,
    "productionCost": 25,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_148",
    "name": "chocolate plam cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_149",
    "name": "chocolate plum cake packet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_150",
    "name": "chocolate punch",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_151",
    "name": "christmas cake 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 230,
    "productionCost": 161,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_152",
    "name": "christmas cake kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 450,
    "productionCost": 315,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_153",
    "name": "Coconut Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_154",
    "name": "Coconut Bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_155",
    "name": "Coconut cake role",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_156",
    "name": "Coconut mysorpak",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_157",
    "name": "Cool Cake   B Forest   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 375,
    "productionCost": 263,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_158",
    "name": "Cool Cake   B Forest   Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 750,
    "productionCost": 525,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_159",
    "name": "Cool Cake   B Forest   Kg eggless & model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_160",
    "name": "Cool Cake   B Forest   Kg model OR eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_161",
    "name": "Cool Cake   Chocotale   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_162",
    "name": "Cool Cake   Chocotale  Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_163",
    "name": "Cool cake choco vanila  kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_164",
    "name": "Cool cake choco vanila 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_165",
    "name": "Cool Cake   Orange   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 350,
    "productionCost": 245,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_166",
    "name": "Cool Cake   Orange   Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_167",
    "name": "Cool Cake   Orange   Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_168",
    "name": "Cool Cake   Orange  1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_169",
    "name": "Cool Cake   PineApple   Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_170",
    "name": "Cool Cake   PineApple  1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_171",
    "name": "Cool Cake   PineApple  1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 350,
    "productionCost": 245,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_172",
    "name": "Cool Cake   PineApple  Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_173",
    "name": "Cool Cake   pista   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 375,
    "productionCost": 263,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_174",
    "name": "Cool Cake   pista   Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 750,
    "productionCost": 525,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_175",
    "name": "Cool Cake   pista  1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_176",
    "name": "Cool Cake   pista  Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_177",
    "name": "Cool Cake   StrawBerry   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 350,
    "productionCost": 245,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_178",
    "name": "Cool Cake   StrawBerry  1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_179",
    "name": "Cool Cake   StrawBerry  Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_180",
    "name": "Cool Cake   StrawBerry  Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_181",
    "name": "Cool Cake   W Forest  Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_182",
    "name": "Cool Cake  B Forest   Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_183",
    "name": "Cool Cake  B Scotch   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 350,
    "productionCost": 245,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_184",
    "name": "Cool Cake  B Scotch   Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_185",
    "name": "Cool Cake  B Scotch   Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_186",
    "name": "Cool Cake  B Scotch   Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_187",
    "name": "Cool Cake  B Scotch 1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_188",
    "name": "Cool Cake  Blue Berry  1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_189",
    "name": "Cool Cake  Blue Berry  kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_190",
    "name": "Cool Cake  Blue Berry  kg  eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 950,
    "productionCost": 665,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_191",
    "name": "Cool Cake  Blue Berry  kg  eggless or model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_192",
    "name": "Cool Cake  Blue Berry  pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_193",
    "name": "Cool Cake  choco chips  Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_194",
    "name": "Cool Cake  Chocotale   Kg eggless or model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_195",
    "name": "Cool Cake  Chocotale   Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 75,
    "productionCost": 53,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_196",
    "name": "Cool Cake  Chocotale  1 Kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 950,
    "productionCost": 665,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_197",
    "name": "Cool Cake  fresh Fruit Cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1000,
    "productionCost": 700,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_198",
    "name": "Cool Cake  milky B Scotch  1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_199",
    "name": "Cool Cake  milky B Scotch  Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_200",
    "name": "Cool Cake  milky butterscotch  Eggless or model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_201",
    "name": "Cool Cake  milky butterscotch  Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_202",
    "name": "Cool Cake  Orange  Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_203",
    "name": "Cool Cake  PineApple   Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_204",
    "name": "Cool Cake  pista   Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_205",
    "name": "Cool Cake  StrawBerry  Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_206",
    "name": "Cool Cake  W Forest    Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_207",
    "name": "Cool Cake  W Forest   1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_208",
    "name": "Cool Cake  W Forest   Kg model & eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 950,
    "productionCost": 665,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_209",
    "name": "Cool Cake apple cake 1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_210",
    "name": "Cool Cake apple cake kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 800,
    "productionCost": 560,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_211",
    "name": "Cool Cake apple cake(mini)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_212",
    "name": "Cool Cake biscop",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_213",
    "name": "Cool Cake choco chips",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 850,
    "productionCost": 595,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_214",
    "name": "Cool Cake chocolate huzelnut",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_215",
    "name": "Cool Cake chocolate honey",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_216",
    "name": "Cool Cake chocolate netroola",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_217",
    "name": "Cool Cake chocolate trouple",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_218",
    "name": "Cool Cake Dry Fruit",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1000,
    "productionCost": 700,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_219",
    "name": "Cool Cake Dry Fruit PC",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_220",
    "name": "Cool Cake gulab jamun cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_221",
    "name": "Cool Cake Honey  Almond 1kg cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_222",
    "name": "cool cake panda (mini)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_223",
    "name": "Cool Cake milk chocolate",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_224",
    "name": "Cool Cake rasmalai cake Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_225",
    "name": "Cool Cake rasmalai cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 900,
    "productionCost": 630,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_226",
    "name": "Cool Cake rasmalai cake   1/2 kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 450,
    "productionCost": 315,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_227",
    "name": "cool cake rasmalai cake  kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1050,
    "productionCost": 735,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_228",
    "name": "cool cake rasmalai cake kg eggless or model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1000,
    "productionCost": 700,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_229",
    "name": "cool cake red velvate  1/2 g",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_230",
    "name": "cool cake red velvate kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1000,
    "productionCost": 700,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_231",
    "name": "cool cake red velvate kg eggless and model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1150,
    "productionCost": 805,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_232",
    "name": "cool cake red velvate kg eggless or model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 1100,
    "productionCost": 770,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_233",
    "name": "Cool Cake Red velvet  Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_234",
    "name": "Cool Cake vanilla  1 Kg eggless  and  model",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 750,
    "productionCost": 525,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_235",
    "name": "Cool Cake vanilla  1/2 Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_236",
    "name": "Cool Cake vanilla  Kg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 600,
    "productionCost": 420,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_237",
    "name": "Cool Cake vanilla  Kg model or eggless",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 700,
    "productionCost": 490,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_238",
    "name": "Cool Cake vanilla Pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_239",
    "name": "Corn Flakes",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_240",
    "name": "Cream Bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_241",
    "name": "cream jam bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_242",
    "name": "Cream Junnu Sweet",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_243",
    "name": "Cream kalajaam",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_244",
    "name": "Cup cake 150/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 150,
    "productionCost": 105,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_245",
    "name": "Cup cake 50/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_246",
    "name": "Cup cake 80/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_247",
    "name": "Cup cake chocolate",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_248",
    "name": "Cup cake vanilla",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_249",
    "name": "Cutlet",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_250",
    "name": "Dal",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_251",
    "name": "Dal More",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_252",
    "name": "Dates Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_253",
    "name": "Dil Pasand",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_254",
    "name": "Dilkkush",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_255",
    "name": "Dilkkush(bakery item)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_256",
    "name": "Donut",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_257",
    "name": "Donut  chocolate",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_258",
    "name": "Donut pink",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_259",
    "name": "Drop biscuit pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_260",
    "name": "dry fruit bangali",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 380,
    "productionCost": 266,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_261",
    "name": "Dry fruit butter cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_262",
    "name": "dry fruit butter cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_263",
    "name": "Dry Fruit Butter Kova",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_264",
    "name": "Dry fruit gee mysorpa",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_265",
    "name": "Dry Fruits Burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_266",
    "name": "Dry Fruits Halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_267",
    "name": "Dry Fruits cashew gujiya",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1300,
    "productionCost": 910,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_268",
    "name": "Dry fruits dates roll",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 600,
    "productionCost": 420,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_269",
    "name": "Dry Fruits Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_270",
    "name": "Dry Ras Mali",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 16,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_271",
    "name": "Dry Ras Mali (badam)",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 18,
    "productionCost": 13,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_272",
    "name": "Egg Puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_273",
    "name": "fruit  Slice cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_274",
    "name": "Fruit Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_275",
    "name": "Fruit Bread",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_276",
    "name": "Fruit Bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_277",
    "name": "fruit cake roll",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_278",
    "name": "Fruit Cuts",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_279",
    "name": "Fruit spl  Rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_280",
    "name": "Geetanjali",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_281",
    "name": "Ghatia",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_282",
    "name": "ghee cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_283",
    "name": "ghee cake box (200g)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_284",
    "name": "Ghee Kesari laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_285",
    "name": "Ghee MysorePa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_286",
    "name": "Goduma gottalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_287",
    "name": "Goru mitai",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 280,
    "productionCost": 196,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_288",
    "name": "Grapes halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_289",
    "name": "Grapes Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_290",
    "name": "Gul kandh kova",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_291",
    "name": "Gulab Jam",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_292",
    "name": "Gulab Jam  (cattering) net price",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 8,
    "productionCost": 6,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_293",
    "name": "Gulab Jam 3(pic) box",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_294",
    "name": "honey cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_295",
    "name": "hot dogs (86gm)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 13,
    "productionCost": 9,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_296",
    "name": "Honey Cuts",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_297",
    "name": "horlicks cake roll",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_298",
    "name": "Horlicks dry rasmalai",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 18,
    "productionCost": 13,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_299",
    "name": "horlicks ghee mysore pak",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_300",
    "name": "Horlicks Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_301",
    "name": "Hot dog   panner",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_302",
    "name": "Hot dog   veg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_303",
    "name": "Ice Cream Burfi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_304",
    "name": "Jaangri",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_305",
    "name": "Jam bun",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_306",
    "name": "Jeera biscuit pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_307",
    "name": "Jilebi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 8,
    "productionCost": 6,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_308",
    "name": "Junnu - Bellam (Net price)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 280,
    "productionCost": 196,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_309",
    "name": "Junnu (NET PRICE)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 230,
    "productionCost": 161,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_310",
    "name": "Junnu Sweet - Idli",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_311",
    "name": "Junnu Sweet - Palakaya",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_312",
    "name": "Kaja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_313",
    "name": "Kakinada Kaja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_314",
    "name": "Kalajam",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_315",
    "name": "Kalakand Babbattu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_316",
    "name": "Kalambari",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_317",
    "name": "Kamala Bog",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_318",
    "name": "Karakajjam",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_319",
    "name": "Karam Boondi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_320",
    "name": "Karam Poosa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_321",
    "name": "Karbooja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_322",
    "name": "Kis miss angoor",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_323",
    "name": "Kova Apple",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_324",
    "name": "Kova Badhan",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_325",
    "name": "Kova Billa large",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_326",
    "name": "Kova Billa small",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_327",
    "name": "Kova rose ball",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_328",
    "name": "Kova Cashew Rolls",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_329",
    "name": "Kova Cuts",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_330",
    "name": "Kova Flower",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_331",
    "name": "Kova Kajjikaya",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_332",
    "name": "Kova Plain (Zero Sugar) (NET PRICE)",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_333",
    "name": "Kova Sunflower",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_334",
    "name": "Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_335",
    "name": "Laddu (ghee)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_336",
    "name": "Large Bread",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_337",
    "name": "Lava cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_338",
    "name": "Lilli Kaja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_339",
    "name": "Loose Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_340",
    "name": "Madhu Burfi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_341",
    "name": "madugula halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_342",
    "name": "Malai Badam  slice(Net Price)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_343",
    "name": "Malai Badam Sandwich (Net price)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_344",
    "name": "Malai Chop",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 380,
    "productionCost": 266,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_345",
    "name": "malai Horlicks roll (cooling)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_346",
    "name": "Malai Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_347",
    "name": "Malai Rolls Cooling",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 18,
    "productionCost": 13,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_348",
    "name": "Malai Rolls Cooling (B/S)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_349",
    "name": "Malai Sandwich",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_350",
    "name": "Malaipuri",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_351",
    "name": "MalaiRolls (kova)",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_352",
    "name": "Mango Bengali",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_353",
    "name": "Mango Butter Cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_354",
    "name": "Mango Dry Fruits Butter Cuts",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_355",
    "name": "Mango moose cups",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_356",
    "name": "Medium Bread",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_357",
    "name": "mini dil pasand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_358",
    "name": "Milk Cake Role",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_359",
    "name": "Milk Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 420,
    "productionCost": 294,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_360",
    "name": "Milk Made cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_361",
    "name": "Mixture",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_362",
    "name": "Moti Choor Laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_363",
    "name": "Moti Kalakanda",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 480,
    "productionCost": 336,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_364",
    "name": "mixing muffin",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_365",
    "name": "muffin cake box (chocolate)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_366",
    "name": "muffin cake box (vanilla)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_367",
    "name": "muffin cake box (orange butter)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_368",
    "name": "muffin cake box (white chocolate)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_369",
    "name": "mutpie",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_370",
    "name": "MysorePa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_371",
    "name": "MysorePak (GHEE)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_372",
    "name": "NanKatha Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_373",
    "name": "nimkis",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 280,
    "productionCost": 196,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_374",
    "name": "nuvvulu aresalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_375",
    "name": "Nice Kova",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_376",
    "name": "oreo cheese dessert",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_377",
    "name": "ongole ghee mysore pak",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_378",
    "name": "Onion Pakodi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_379",
    "name": "Onion rings",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_380",
    "name": "Orange butter slice cake box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_381",
    "name": "Orange cham cham",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_382",
    "name": "orange cream",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_383",
    "name": "Orange Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_384",
    "name": "orange supley",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_385",
    "name": "pakam (net price)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_386",
    "name": "Palli pakodi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_387",
    "name": "pappu chekkalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_388",
    "name": "Pan Biscuit pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_389",
    "name": "Paneer (NET PRICE)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_390",
    "name": "Paneer jam",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_391",
    "name": "Paneer Jilebi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_392",
    "name": "Paneer Kaaja",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_393",
    "name": "panner 65",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_394",
    "name": "panner kabab",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_395",
    "name": "panner puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_396",
    "name": "Papaya Halwa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_397",
    "name": "Peanut Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_398",
    "name": "photo (cake) 200/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 200,
    "productionCost": 140,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_399",
    "name": "photo (cake) 400/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_400",
    "name": "Pineapple Butter Cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_401",
    "name": "pineapple cake role",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_402",
    "name": "Pista Badhan",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_403",
    "name": "Pista Bangali",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_404",
    "name": "Pineapple cuts",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 380,
    "productionCost": 266,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_405",
    "name": "Pista Kova",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_406",
    "name": "pizza panner",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_407",
    "name": "pizza veg",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_408",
    "name": "Pudina Mixture",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_409",
    "name": "Puut…lu Sugar,bellam (Plain) - net price",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 100,
    "productionCost": 70,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_410",
    "name": "Puut…lu Sugar,bellam (D\\F) - net price",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 130,
    "productionCost": 91,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_411",
    "name": "Rabadi Pot",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 40,
    "productionCost": 28,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_412",
    "name": "Raagi laddu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 400,
    "productionCost": 280,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_413",
    "name": "Raagi laddu (bellam)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 440,
    "productionCost": 308,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_414",
    "name": "Raj bog",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_415",
    "name": "Raj bog (1piece box)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 35,
    "productionCost": 25,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_416",
    "name": "Rangoli Badhan",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_417",
    "name": "Rasgulla",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_418",
    "name": "Rasgulla 3(PIC) box",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_419",
    "name": "raskadham",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_420",
    "name": "Rasmalai (1pc box)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 35,
    "productionCost": 25,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_421",
    "name": "Rasmalai(small) net price",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 18,
    "productionCost": 13,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_422",
    "name": "Red velvet & vanilla cake roll",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_423",
    "name": "Roast Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_424",
    "name": "Round Cake  1 pc",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 8,
    "productionCost": 6,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_425",
    "name": "Round Cake Packet 6pc packet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_426",
    "name": "Salt Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 65,
    "productionCost": 46,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_427",
    "name": "Samosa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_428",
    "name": "Sandwich",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_429",
    "name": "Sandwich bread 624gm",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_430",
    "name": "Sandwich (snack item)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_431",
    "name": "Sapota",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_432",
    "name": "sapota angoor",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_433",
    "name": "soft coconut biscuits",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_434",
    "name": "Small Bread",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_435",
    "name": "Soan Papidi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 500,
    "productionCost": 350,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_436",
    "name": "Soan Papidi bites",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 540,
    "productionCost": 378,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_437",
    "name": "Soan Papidi slice",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 620,
    "productionCost": 434,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_438",
    "name": "spl plum cake large (round)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 250,
    "productionCost": 175,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_439",
    "name": "spl plum cake small  (round)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 110,
    "productionCost": 77,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_440",
    "name": "spl plum cake large (rectangle)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 230,
    "productionCost": 161,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_441",
    "name": "spl plum cake small  (rectangle)",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_442",
    "name": "Spl dil pasand",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_443",
    "name": "Spl cutting dil pasand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_444",
    "name": "Special Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_445",
    "name": "Strawberry almond cashew burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1300,
    "productionCost": 910,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_446",
    "name": "Special Loose Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 560,
    "productionCost": 392,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_447",
    "name": "Special Mixture",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_448",
    "name": "Special Rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_449",
    "name": "Special long Rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_450",
    "name": "Spicy nuts",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_451",
    "name": "spl sweet rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_452",
    "name": "Spong cake 150/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 150,
    "productionCost": 105,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_453",
    "name": "Spong cake 50/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_454",
    "name": "Spong cake 80/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 80,
    "productionCost": 56,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_455",
    "name": "Spong cake cup",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_456",
    "name": "Spong Cake Sheet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_457",
    "name": "Spong Chocolate cake  90/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_458",
    "name": "Spong Chocolate cake 160/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 160,
    "productionCost": 112,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_459",
    "name": "Spong Chocolate cake 60/-",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 60,
    "productionCost": 42,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_460",
    "name": "Spong Chocolate cake cup",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 35,
    "productionCost": 25,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_461",
    "name": "Spong Chocolate cake sheet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 340,
    "productionCost": 238,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_462",
    "name": "Square Cake Packet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_463",
    "name": "step cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_464",
    "name": "Straberry Bengali",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 360,
    "productionCost": 252,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_465",
    "name": "Straberry cake role",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 25,
    "productionCost": 18,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_466",
    "name": "Strawberry Butter Cake",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_467",
    "name": "Strawberry cashew Burfi",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1200,
    "productionCost": 840,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_468",
    "name": "Strawberry cashew Bites",
    "category": "Dry",
    "unit": "Kg",
    "sellingRate": 1600,
    "productionCost": 1120,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_469",
    "name": "strawberry center (cup)",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_470",
    "name": "Strawberry Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_471",
    "name": "Strawberry Kova Burfi",
    "category": "Khoya/Milk",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_472",
    "name": "Subi sticks",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_473",
    "name": "suji rusk",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 50,
    "productionCost": 35,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_474",
    "name": "Sunnundalu",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 380,
    "productionCost": 266,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_475",
    "name": "Super Biscuit Pack",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 70,
    "productionCost": 49,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_476",
    "name": "Sweet bondi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 260,
    "productionCost": 182,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_477",
    "name": "Sweet samosa",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 10,
    "productionCost": 7,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_478",
    "name": "sweet box 1 kg",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 12,
    "productionCost": 8,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_479",
    "name": "sweet box 1/2kg",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 7.5,
    "productionCost": 5,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_480",
    "name": "sweet box 1/4 kg",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 6.25,
    "productionCost": 4,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_481",
    "name": "Tri choco moose cups",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 35,
    "productionCost": 25,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_482",
    "name": "vamu biscuit box",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 90,
    "productionCost": 63,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_483",
    "name": "Vamu Pakodi",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_484",
    "name": "veg cutlet",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 15,
    "productionCost": 11,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_485",
    "name": "veg manchurian",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 30,
    "productionCost": 21,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_486",
    "name": "Veg Puff",
    "category": "Savory",
    "unit": "Box",
    "sellingRate": 20,
    "productionCost": 14,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_487",
    "name": "White Angoor",
    "category": "Syrup",
    "unit": "Kg",
    "sellingRate": 320,
    "productionCost": 224,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_488",
    "name": "White Kalakand",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 520,
    "productionCost": 364,
    "ingredients": "Imported premium ingredients",
    "active": true
  },
  {
    "id": "W_EXCEL_489",
    "name": "Yellow bangali",
    "category": "Ghee Special",
    "unit": "Kg",
    "sellingRate": 300,
    "productionCost": 210,
    "ingredients": "Imported premium ingredients",
    "active": true
  }
];

export const INITIAL_PRODUCTION: ProductionEntry[] = [
  {
    "id": "P_EXCEL_0",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_392",
    "sweetItemName": "Paneer Kaaja",
    "quantityPrepared": 4.252,
    "batchNumber": "BT-EX-1001",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1531
  },
  {
    "id": "P_EXCEL_1",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_382",
    "sweetItemName": "orange cream",
    "quantityPrepared": 1.554,
    "batchNumber": "BT-EX-1002",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 559
  },
  {
    "id": "P_EXCEL_2",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_487",
    "sweetItemName": "White Angoor",
    "quantityPrepared": 2.21,
    "batchNumber": "BT-EX-1003",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 707
  },
  {
    "id": "P_EXCEL_3",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_121",
    "sweetItemName": "Cham Cham",
    "quantityPrepared": 3.211,
    "batchNumber": "BT-EX-1004",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 963
  },
  {
    "id": "P_EXCEL_4",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_476",
    "sweetItemName": "Sweet bondi",
    "quantityPrepared": 2.435,
    "batchNumber": "BT-EX-1005",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 633
  },
  {
    "id": "P_EXCEL_5",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_311",
    "sweetItemName": "Junnu Sweet - Palakaya",
    "quantityPrepared": 4.72,
    "batchNumber": "BT-EX-1006",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1416
  },
  {
    "id": "P_EXCEL_6",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_314",
    "sweetItemName": "Kalajam",
    "quantityPrepared": 10.244,
    "batchNumber": "BT-EX-1007",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 3073
  },
  {
    "id": "P_EXCEL_7",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_428",
    "sweetItemName": "Sandwich",
    "quantityPrepared": 1.205,
    "batchNumber": "BT-EX-1008",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 434
  },
  {
    "id": "P_EXCEL_8",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_114",
    "sweetItemName": "Cashew Kalakand",
    "quantityPrepared": 3.459,
    "batchNumber": "BT-EX-1009",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1799
  },
  {
    "id": "P_EXCEL_9",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_154",
    "sweetItemName": "Coconut Bun",
    "quantityPrepared": 15,
    "batchNumber": "BT-EX-1010",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 900
  },
  {
    "id": "P_EXCEL_10",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_1",
    "sweetItemName": "4 Piece Bun",
    "quantityPrepared": 24,
    "batchNumber": "BT-EX-1011",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 480
  },
  {
    "id": "P_EXCEL_11",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_425",
    "sweetItemName": "Round Cake Packet 6pc packet",
    "quantityPrepared": 9,
    "batchNumber": "BT-EX-1012",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 450
  },
  {
    "id": "P_EXCEL_12",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_153",
    "sweetItemName": "Coconut Biscuit Pack",
    "quantityPrepared": 4,
    "batchNumber": "BT-EX-1013",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 280
  },
  {
    "id": "P_EXCEL_13",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_29",
    "sweetItemName": "Banglore Bun",
    "quantityPrepared": 15,
    "batchNumber": "BT-EX-1014",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 300
  },
  {
    "id": "P_EXCEL_14",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_276",
    "sweetItemName": "Fruit Bun",
    "quantityPrepared": 46,
    "batchNumber": "BT-EX-1015",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 920
  },
  {
    "id": "P_EXCEL_15",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_253",
    "sweetItemName": "Dil Pasand",
    "quantityPrepared": 14,
    "batchNumber": "BT-EX-1016",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 560
  },
  {
    "id": "P_EXCEL_16",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_336",
    "sweetItemName": "Large Bread",
    "quantityPrepared": 13,
    "batchNumber": "BT-EX-1017",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 780
  },
  {
    "id": "P_EXCEL_17",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_453",
    "sweetItemName": "Spong cake 50/-",
    "quantityPrepared": 6,
    "batchNumber": "BT-EX-1018",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 300
  },
  {
    "id": "P_EXCEL_18",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_454",
    "sweetItemName": "Spong cake 80/-",
    "quantityPrepared": 2,
    "batchNumber": "BT-EX-1019",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 160
  },
  {
    "id": "P_EXCEL_19",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_486",
    "sweetItemName": "Veg Puff",
    "quantityPrepared": 58,
    "batchNumber": "BT-EX-1020",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1160
  },
  {
    "id": "P_EXCEL_20",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_272",
    "sweetItemName": "Egg Puff",
    "quantityPrepared": 76,
    "batchNumber": "BT-EX-1021",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1900
  },
  {
    "id": "P_EXCEL_21",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_395",
    "sweetItemName": "panner puff",
    "quantityPrepared": 15,
    "batchNumber": "BT-EX-1022",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 450
  },
  {
    "id": "P_EXCEL_22",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_427",
    "sweetItemName": "Samosa",
    "quantityPrepared": 45,
    "batchNumber": "BT-EX-1023",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 675
  },
  {
    "id": "P_EXCEL_23",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_74",
    "sweetItemName": "Butter Cream Cake 1/2 kg cake",
    "quantityPrepared": 3,
    "batchNumber": "BT-EX-1024",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 540
  },
  {
    "id": "P_EXCEL_24",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_130",
    "sweetItemName": "chicken puff",
    "quantityPrepared": 5,
    "batchNumber": "BT-EX-1025",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 200
  },
  {
    "id": "P_EXCEL_25",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_72",
    "sweetItemName": "Butter Cream B. forest Cake 1/2 kg",
    "quantityPrepared": 1,
    "batchNumber": "BT-EX-1026",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 200
  },
  {
    "id": "P_EXCEL_26",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_240",
    "sweetItemName": "Cream Bun",
    "quantityPrepared": 10,
    "batchNumber": "BT-EX-1027",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 150
  },
  {
    "id": "P_EXCEL_27",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_356",
    "sweetItemName": "Medium Bread",
    "quantityPrepared": 13,
    "batchNumber": "BT-EX-1028",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 520
  },
  {
    "id": "P_EXCEL_28",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_475",
    "sweetItemName": "Super Biscuit Pack",
    "quantityPrepared": 5,
    "batchNumber": "BT-EX-1029",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 350
  },
  {
    "id": "P_EXCEL_29",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_434",
    "sweetItemName": "Small Bread",
    "quantityPrepared": 3,
    "batchNumber": "BT-EX-1030",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 60
  },
  {
    "id": "P_EXCEL_30",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_385",
    "sweetItemName": "pakam (net price)",
    "quantityPrepared": 5.802,
    "batchNumber": "BT-EX-1031",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 290
  },
  {
    "id": "P_EXCEL_31",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_21",
    "sweetItemName": "Badam Milk (Net Price)",
    "quantityPrepared": 135,
    "batchNumber": "BT-EX-1032",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 3240
  },
  {
    "id": "P_EXCEL_32",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_331",
    "sweetItemName": "Kova Kajjikaya",
    "quantityPrepared": 3.377,
    "batchNumber": "BT-EX-1033",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1891
  },
  {
    "id": "P_EXCEL_33",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_326",
    "sweetItemName": "Kova Billa small",
    "quantityPrepared": 11.295,
    "batchNumber": "BT-EX-1034",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 5873
  },
  {
    "id": "P_EXCEL_34",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_334",
    "sweetItemName": "Laddu",
    "quantityPrepared": 2.499,
    "batchNumber": "BT-EX-1035",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 650
  },
  {
    "id": "P_EXCEL_35",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_109",
    "sweetItemName": "cashew halwa",
    "quantityPrepared": 0.695,
    "batchNumber": "BT-EX-1036",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 320
  },
  {
    "id": "P_EXCEL_36",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_474",
    "sweetItemName": "Sunnundalu",
    "quantityPrepared": 3.824,
    "batchNumber": "BT-EX-1037",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1453
  },
  {
    "id": "P_EXCEL_37",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_361",
    "sweetItemName": "Mixture",
    "quantityPrepared": 3.719,
    "batchNumber": "BT-EX-1038",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1116
  },
  {
    "id": "P_EXCEL_38",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_344",
    "sweetItemName": "Malai Chop",
    "quantityPrepared": 1.207,
    "batchNumber": "BT-EX-1039",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 459
  },
  {
    "id": "P_EXCEL_39",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_350",
    "sweetItemName": "Malaipuri",
    "quantityPrepared": 1.009,
    "batchNumber": "BT-EX-1040",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 525
  },
  {
    "id": "P_EXCEL_40",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_362",
    "sweetItemName": "Moti Choor Laddu",
    "quantityPrepared": 4.866,
    "batchNumber": "BT-EX-1041",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 1265
  },
  {
    "id": "P_EXCEL_41",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_309",
    "sweetItemName": "Junnu (NET PRICE)",
    "quantityPrepared": 2.621,
    "batchNumber": "BT-EX-1042",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 603
  },
  {
    "id": "P_EXCEL_42",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_249",
    "sweetItemName": "Cutlet",
    "quantityPrepared": 1.645,
    "batchNumber": "BT-EX-1043",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 494
  },
  {
    "id": "P_EXCEL_43",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_420",
    "sweetItemName": "Rasmalai (1pc box)",
    "quantityPrepared": 15,
    "batchNumber": "BT-EX-1044",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 525
  },
  {
    "id": "P_EXCEL_44",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_183",
    "sweetItemName": "Cool Cake  B Scotch   1/2 Kg",
    "quantityPrepared": 1,
    "batchNumber": "BT-EX-1045",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 350
  },
  {
    "id": "P_EXCEL_45",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_186",
    "sweetItemName": "Cool Cake  B Scotch   Pc",
    "quantityPrepared": 12,
    "batchNumber": "BT-EX-1046",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 780
  },
  {
    "id": "P_EXCEL_46",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_195",
    "sweetItemName": "Cool Cake  Chocotale   Pc",
    "quantityPrepared": 6,
    "batchNumber": "BT-EX-1047",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 450
  },
  {
    "id": "P_EXCEL_47",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_238",
    "sweetItemName": "Cool Cake vanilla Pc",
    "quantityPrepared": 12,
    "batchNumber": "BT-EX-1048",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 600
  },
  {
    "id": "P_EXCEL_48",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_256",
    "sweetItemName": "Donut",
    "quantityPrepared": 31,
    "batchNumber": "BT-EX-1049",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 775
  },
  {
    "id": "P_EXCEL_49",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_462",
    "sweetItemName": "Square Cake Packet",
    "quantityPrepared": 6,
    "batchNumber": "BT-EX-1050",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 300
  },
  {
    "id": "P_EXCEL_50",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_283",
    "sweetItemName": "ghee cake box (200g)",
    "quantityPrepared": 5,
    "batchNumber": "BT-EX-1051",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 350
  },
  {
    "id": "P_EXCEL_51",
    "date": "2026-05-24",
    "sweetItemId": "W_EXCEL_273",
    "sweetItemName": "fruit  Slice cake box",
    "quantityPrepared": 5,
    "batchNumber": "BT-EX-1052",
    "notes": "Parsed from actual Excel dispatches for today",
    "expectedSales": 400
  }
];

export const INITIAL_TRIPS: TripEntry[] = [
  {
    "id": "T_EXCEL_0",
    "tripNumber": "S1",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_392",
        "sweetItemName": "Paneer Kaaja",
        "grossWeight": 3.136,
        "trayWeight": 0.688,
        "wastage": 3,
        "netWeight": 2.3746,
        "rate": 360,
        "discountPercentage": 25,
        "amount": 641
      },
      {
        "sweetItemId": "W_EXCEL_382",
        "sweetItemName": "orange cream",
        "grossWeight": 2.026,
        "trayWeight": 0.424,
        "wastage": 3,
        "netWeight": 1.5539,
        "rate": 360,
        "discountPercentage": 25,
        "amount": 420
      },
      {
        "sweetItemId": "W_EXCEL_487",
        "sweetItemName": "White Angoor",
        "grossWeight": 2.026,
        "trayWeight": 0.74,
        "wastage": 3,
        "netWeight": 1.2474,
        "rate": 320,
        "discountPercentage": 25,
        "amount": 299
      },
      {
        "sweetItemId": "W_EXCEL_121",
        "sweetItemName": "Cham Cham",
        "grossWeight": 2.568,
        "trayWeight": 0.728,
        "wastage": 3,
        "netWeight": 1.7848,
        "rate": 300,
        "discountPercentage": 25,
        "amount": 402
      },
      {
        "sweetItemId": "W_EXCEL_476",
        "sweetItemName": "Sweet bondi",
        "grossWeight": 3.34,
        "trayWeight": 0.83,
        "wastage": 3,
        "netWeight": 2.4347,
        "rate": 260,
        "discountPercentage": 25,
        "amount": 475
      }
    ],
    "totalAmount": 2237,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_1",
    "tripNumber": "S2",
    "shopId": "S_EXCEL_4",
    "shopName": "D/N - Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_311",
        "sweetItemName": "Junnu Sweet - Palakaya",
        "grossWeight": 3.33,
        "trayWeight": 0.792,
        "wastage": 3,
        "netWeight": 2.4619,
        "rate": 300,
        "discountPercentage": 23,
        "amount": 569
      },
      {
        "sweetItemId": "W_EXCEL_121",
        "sweetItemName": "Cham Cham",
        "grossWeight": 2.21,
        "trayWeight": 0.74,
        "wastage": 3,
        "netWeight": 1.4259,
        "rate": 300,
        "discountPercentage": 23,
        "amount": 329
      },
      {
        "sweetItemId": "W_EXCEL_314",
        "sweetItemName": "Kalajam",
        "grossWeight": 3.276,
        "trayWeight": 0.738,
        "wastage": 3,
        "netWeight": 2.4619,
        "rate": 300,
        "discountPercentage": 23,
        "amount": 569
      },
      {
        "sweetItemId": "W_EXCEL_487",
        "sweetItemName": "White Angoor",
        "grossWeight": 1.682,
        "trayWeight": 0.69,
        "wastage": 3,
        "netWeight": 0.9622,
        "rate": 320,
        "discountPercentage": 23,
        "amount": 237
      },
      {
        "sweetItemId": "W_EXCEL_392",
        "sweetItemName": "Paneer Kaaja",
        "grossWeight": 2.536,
        "trayWeight": 0.6,
        "wastage": 3,
        "netWeight": 1.8779,
        "rate": 360,
        "discountPercentage": 23,
        "amount": 521
      },
      {
        "sweetItemId": "W_EXCEL_428",
        "sweetItemName": "Sandwich",
        "grossWeight": 1.774,
        "trayWeight": 0.532,
        "wastage": 3,
        "netWeight": 1.2047,
        "rate": 360,
        "discountPercentage": 23,
        "amount": 334
      },
      {
        "sweetItemId": "W_EXCEL_114",
        "sweetItemName": "Cashew Kalakand",
        "grossWeight": 2.102,
        "trayWeight": 0.548,
        "wastage": 3,
        "netWeight": 1.5074,
        "rate": 520,
        "discountPercentage": 23,
        "amount": 604
      }
    ],
    "totalAmount": 3163,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_2",
    "tripNumber": "S1",
    "shopId": "S_EXCEL_17",
    "shopName": "Nutan - OBS",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_311",
        "sweetItemName": "Junnu Sweet - Palakaya",
        "grossWeight": 3.068,
        "trayWeight": 0.81,
        "wastage": 0,
        "netWeight": 2.258,
        "rate": 300,
        "discountPercentage": 20,
        "amount": 542
      }
    ],
    "totalAmount": 542,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_3",
    "tripNumber": "B1",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_154",
        "sweetItemName": "Coconut Bun",
        "grossWeight": 2,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 2,
        "rate": 60,
        "discountPercentage": 25,
        "amount": 90
      },
      {
        "sweetItemId": "W_EXCEL_1",
        "sweetItemName": "4 Piece Bun",
        "grossWeight": 8,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 8,
        "rate": 20,
        "discountPercentage": 25,
        "amount": 120
      },
      {
        "sweetItemId": "W_EXCEL_425",
        "sweetItemName": "Round Cake Packet 6pc packet",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 50,
        "discountPercentage": 25,
        "amount": 113
      },
      {
        "sweetItemId": "W_EXCEL_153",
        "sweetItemName": "Coconut Biscuit Pack",
        "grossWeight": 4,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 4,
        "rate": 70,
        "discountPercentage": 25,
        "amount": 210
      }
    ],
    "totalAmount": 533,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_4",
    "tripNumber": "B1",
    "shopId": "S_EXCEL_17",
    "shopName": "Nutan - OBS",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_154",
        "sweetItemName": "Coconut Bun",
        "grossWeight": 8,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 8,
        "rate": 60,
        "discountPercentage": 20,
        "amount": 384
      },
      {
        "sweetItemId": "W_EXCEL_29",
        "sweetItemName": "Banglore Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_276",
        "sweetItemName": "Fruit Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_253",
        "sweetItemName": "Dil Pasand",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 40,
        "discountPercentage": 20,
        "amount": 192
      },
      {
        "sweetItemId": "W_EXCEL_425",
        "sweetItemName": "Round Cake Packet 6pc packet",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 50,
        "discountPercentage": 20,
        "amount": 240
      },
      {
        "sweetItemId": "W_EXCEL_336",
        "sweetItemName": "Large Bread",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 60,
        "discountPercentage": 20,
        "amount": 288
      },
      {
        "sweetItemId": "W_EXCEL_453",
        "sweetItemName": "Spong cake 50/-",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 50,
        "discountPercentage": 20,
        "amount": 240
      },
      {
        "sweetItemId": "W_EXCEL_454",
        "sweetItemName": "Spong cake 80/-",
        "grossWeight": 2,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 2,
        "rate": 80,
        "discountPercentage": 20,
        "amount": 128
      }
    ],
    "totalAmount": 1792,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_5",
    "tripNumber": "S2",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_114",
        "sweetItemName": "Cashew Kalakand",
        "grossWeight": 2.644,
        "trayWeight": 0.632,
        "wastage": 3,
        "netWeight": 1.9516,
        "rate": 520,
        "discountPercentage": 25,
        "amount": 761
      }
    ],
    "totalAmount": 761,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_6",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_17",
    "shopName": "Nutan - OBS",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 20,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 20,
        "rate": 25,
        "discountPercentage": 20,
        "amount": 400
      }
    ],
    "totalAmount": 560,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_7",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_13",
    "shopName": "Mr chai",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 8,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 8,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 128
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 25,
        "discountPercentage": 20,
        "amount": 120
      },
      {
        "sweetItemId": "W_EXCEL_395",
        "sweetItemName": "panner puff",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 30,
        "discountPercentage": 20,
        "amount": 72
      }
    ],
    "totalAmount": 320,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_8",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 20,
        "discountPercentage": 25,
        "amount": 75
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 25,
        "discountPercentage": 25,
        "amount": 94
      },
      {
        "sweetItemId": "W_EXCEL_395",
        "sweetItemName": "panner puff",
        "grossWeight": 2,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 2,
        "rate": 30,
        "discountPercentage": 25,
        "amount": 45
      },
      {
        "sweetItemId": "W_EXCEL_427",
        "sweetItemName": "Samosa",
        "grossWeight": 25,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 25,
        "rate": 15,
        "discountPercentage": 25,
        "amount": 281
      },
      {
        "sweetItemId": "W_EXCEL_74",
        "sweetItemName": "Butter Cream Cake 1/2 kg cake",
        "grossWeight": 2,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 2,
        "rate": 180,
        "discountPercentage": 25,
        "amount": 270
      }
    ],
    "totalAmount": 765,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_9",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_4",
    "shopName": "D/N - Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 20,
        "discountPercentage": 23,
        "amount": 77
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 25,
        "discountPercentage": 23,
        "amount": 193
      },
      {
        "sweetItemId": "W_EXCEL_395",
        "sweetItemName": "panner puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 30,
        "discountPercentage": 23,
        "amount": 116
      },
      {
        "sweetItemId": "W_EXCEL_130",
        "sweetItemName": "chicken puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 40,
        "discountPercentage": 23,
        "amount": 154
      },
      {
        "sweetItemId": "W_EXCEL_427",
        "sweetItemName": "Samosa",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 15,
        "discountPercentage": 23,
        "amount": 116
      },
      {
        "sweetItemId": "W_EXCEL_336",
        "sweetItemName": "Large Bread",
        "grossWeight": 4,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 4,
        "rate": 60,
        "discountPercentage": 23,
        "amount": 185
      },
      {
        "sweetItemId": "W_EXCEL_154",
        "sweetItemName": "Coconut Bun",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 60,
        "discountPercentage": 23,
        "amount": 139
      },
      {
        "sweetItemId": "W_EXCEL_253",
        "sweetItemName": "Dil Pasand",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 40,
        "discountPercentage": 23,
        "amount": 92
      },
      {
        "sweetItemId": "W_EXCEL_276",
        "sweetItemName": "Fruit Bun",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 20,
        "discountPercentage": 23,
        "amount": 92
      },
      {
        "sweetItemId": "W_EXCEL_1",
        "sweetItemName": "4 Piece Bun",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 20,
        "discountPercentage": 23,
        "amount": 92
      }
    ],
    "totalAmount": 1256,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_10",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_23",
    "shopName": "Snack Central, College Road",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 20,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 20,
        "rate": 25,
        "discountPercentage": 20,
        "amount": 400
      },
      {
        "sweetItemId": "W_EXCEL_253",
        "sweetItemName": "Dil Pasand",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 40,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_72",
        "sweetItemName": "Butter Cream B. forest Cake 1/2 kg",
        "grossWeight": 1,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 1,
        "rate": 200,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_74",
        "sweetItemName": "Butter Cream Cake 1/2 kg cake",
        "grossWeight": 1,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 1,
        "rate": 180,
        "discountPercentage": 20,
        "amount": 144
      }
    ],
    "totalAmount": 1024,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_11",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_22",
    "shopName": "Santosh sweets",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_395",
        "sweetItemName": "panner puff",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 30,
        "discountPercentage": 20,
        "amount": 120
      },
      {
        "sweetItemId": "W_EXCEL_240",
        "sweetItemName": "Cream Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 15,
        "discountPercentage": 20,
        "amount": 120
      },
      {
        "sweetItemId": "W_EXCEL_276",
        "sweetItemName": "Fruit Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_1",
        "sweetItemName": "4 Piece Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      }
    ],
    "totalAmount": 720,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_12",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_10",
    "shopName": "K/S pedda padu 20",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_486",
        "sweetItemName": "Veg Puff",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_272",
        "sweetItemName": "Egg Puff",
        "grossWeight": 15,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 15,
        "rate": 25,
        "discountPercentage": 20,
        "amount": 300
      },
      {
        "sweetItemId": "W_EXCEL_427",
        "sweetItemName": "Samosa",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 15,
        "discountPercentage": 20,
        "amount": 120
      }
    ],
    "totalAmount": 580,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_13",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_16",
    "shopName": "Nutan - complex",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_356",
        "sweetItemName": "Medium Bread",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 40,
        "discountPercentage": 20,
        "amount": 320
      },
      {
        "sweetItemId": "W_EXCEL_154",
        "sweetItemName": "Coconut Bun",
        "grossWeight": 2,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 2,
        "rate": 60,
        "discountPercentage": 20,
        "amount": 96
      },
      {
        "sweetItemId": "W_EXCEL_276",
        "sweetItemName": "Fruit Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 160
      },
      {
        "sweetItemId": "W_EXCEL_29",
        "sweetItemName": "Banglore Bun",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 20,
        "discountPercentage": 20,
        "amount": 80
      },
      {
        "sweetItemId": "W_EXCEL_475",
        "sweetItemName": "Super Biscuit Pack",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 70,
        "discountPercentage": 20,
        "amount": 280
      }
    ],
    "totalAmount": 936,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_14",
    "tripNumber": "B2",
    "shopId": "S_EXCEL_11",
    "shopName": "K/S pedda padu 25",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_336",
        "sweetItemName": "Large Bread",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 60,
        "discountPercentage": 25,
        "amount": 135
      },
      {
        "sweetItemId": "W_EXCEL_356",
        "sweetItemName": "Medium Bread",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 40,
        "discountPercentage": 25,
        "amount": 90
      },
      {
        "sweetItemId": "W_EXCEL_434",
        "sweetItemName": "Small Bread",
        "grossWeight": 3,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 3,
        "rate": 20,
        "discountPercentage": 25,
        "amount": 45
      },
      {
        "sweetItemId": "W_EXCEL_276",
        "sweetItemName": "Fruit Bun",
        "grossWeight": 10,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 10,
        "rate": 20,
        "discountPercentage": 25,
        "amount": 150
      }
    ],
    "totalAmount": 420,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_15",
    "tripNumber": "S3",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_314",
        "sweetItemName": "Kalajam",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 300,
        "discountPercentage": 25,
        "amount": 1125
      },
      {
        "sweetItemId": "W_EXCEL_385",
        "sweetItemName": "pakam (net price)",
        "grossWeight": 5.882,
        "trayWeight": 0.08,
        "wastage": 0,
        "netWeight": 5.802,
        "rate": 50,
        "discountPercentage": 0,
        "amount": 290
      },
      {
        "sweetItemId": "W_EXCEL_21",
        "sweetItemName": "Badam Milk (Net Price)",
        "grossWeight": 135,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 135,
        "rate": 24,
        "discountPercentage": 0,
        "amount": 3240
      },
      {
        "sweetItemId": "W_EXCEL_331",
        "sweetItemName": "Kova Kajjikaya",
        "grossWeight": 1.33,
        "trayWeight": 0.316,
        "wastage": 0,
        "netWeight": 1.014,
        "rate": 560,
        "discountPercentage": 25,
        "amount": 426
      },
      {
        "sweetItemId": "W_EXCEL_326",
        "sweetItemName": "Kova Billa small",
        "grossWeight": 4.022,
        "trayWeight": 0.628,
        "wastage": 3,
        "netWeight": 3.2922,
        "rate": 520,
        "discountPercentage": 25,
        "amount": 1284
      },
      {
        "sweetItemId": "W_EXCEL_314",
        "sweetItemName": "Kalajam",
        "grossWeight": 3.516,
        "trayWeight": 0.648,
        "wastage": 3,
        "netWeight": 2.782,
        "rate": 300,
        "discountPercentage": 25,
        "amount": 626
      },
      {
        "sweetItemId": "W_EXCEL_334",
        "sweetItemName": "Laddu",
        "grossWeight": 3.222,
        "trayWeight": 0.646,
        "wastage": 3,
        "netWeight": 2.4987,
        "rate": 260,
        "discountPercentage": 25,
        "amount": 487
      },
      {
        "sweetItemId": "W_EXCEL_326",
        "sweetItemName": "Kova Billa small",
        "grossWeight": 4.036,
        "trayWeight": 0.674,
        "wastage": 3,
        "netWeight": 3.2611,
        "rate": 520,
        "discountPercentage": 25,
        "amount": 1272
      },
      {
        "sweetItemId": "W_EXCEL_326",
        "sweetItemName": "Kova Billa small",
        "grossWeight": 3.572,
        "trayWeight": 0.77,
        "wastage": 3,
        "netWeight": 2.7179,
        "rate": 520,
        "discountPercentage": 25,
        "amount": 1060
      },
      {
        "sweetItemId": "W_EXCEL_331",
        "sweetItemName": "Kova Kajjikaya",
        "grossWeight": 3.106,
        "trayWeight": 0.67,
        "wastage": 3,
        "netWeight": 2.3629,
        "rate": 560,
        "discountPercentage": 25,
        "amount": 992
      },
      {
        "sweetItemId": "W_EXCEL_326",
        "sweetItemName": "Kova Billa small",
        "grossWeight": 2.72,
        "trayWeight": 0.634,
        "wastage": 3,
        "netWeight": 2.0234,
        "rate": 520,
        "discountPercentage": 25,
        "amount": 789
      },
      {
        "sweetItemId": "W_EXCEL_109",
        "sweetItemName": "cashew halwa",
        "grossWeight": 1.144,
        "trayWeight": 0.428,
        "wastage": 3,
        "netWeight": 0.6945,
        "rate": 460,
        "discountPercentage": 25,
        "amount": 240
      },
      {
        "sweetItemId": "W_EXCEL_474",
        "sweetItemName": "Sunnundalu",
        "grossWeight": 4.43,
        "trayWeight": 0.488,
        "wastage": 3,
        "netWeight": 3.8237,
        "rate": 380,
        "discountPercentage": 25,
        "amount": 1090
      },
      {
        "sweetItemId": "W_EXCEL_361",
        "sweetItemName": "Mixture",
        "grossWeight": 3.834,
        "trayWeight": 0,
        "wastage": 3,
        "netWeight": 3.719,
        "rate": 300,
        "discountPercentage": 25,
        "amount": 837
      }
    ],
    "totalAmount": 13758,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_16",
    "tripNumber": "S3",
    "shopId": "S_EXCEL_4",
    "shopName": "D/N - Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_344",
        "sweetItemName": "Malai Chop",
        "grossWeight": 1.898,
        "trayWeight": 0.654,
        "wastage": 3,
        "netWeight": 1.2067,
        "rate": 380,
        "discountPercentage": 23,
        "amount": 353
      },
      {
        "sweetItemId": "W_EXCEL_350",
        "sweetItemName": "Malaipuri",
        "grossWeight": 1.548,
        "trayWeight": 0.508,
        "wastage": 3,
        "netWeight": 1.0088,
        "rate": 520,
        "discountPercentage": 23,
        "amount": 404
      },
      {
        "sweetItemId": "W_EXCEL_362",
        "sweetItemName": "Moti Choor Laddu",
        "grossWeight": 3.14,
        "trayWeight": 0.68,
        "wastage": 3,
        "netWeight": 2.3862,
        "rate": 260,
        "discountPercentage": 23,
        "amount": 478
      },
      {
        "sweetItemId": "W_EXCEL_309",
        "sweetItemName": "Junnu (NET PRICE)",
        "grossWeight": 3.346,
        "trayWeight": 0.644,
        "wastage": 3,
        "netWeight": 2.6209,
        "rate": 230,
        "discountPercentage": 0,
        "amount": 603
      },
      {
        "sweetItemId": "W_EXCEL_249",
        "sweetItemName": "Cutlet",
        "grossWeight": 2.306,
        "trayWeight": 0.61,
        "wastage": 3,
        "netWeight": 1.6451,
        "rate": 300,
        "discountPercentage": 23,
        "amount": 380
      },
      {
        "sweetItemId": "W_EXCEL_420",
        "sweetItemName": "Rasmalai (1pc box)",
        "grossWeight": 15,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 15,
        "rate": 35,
        "discountPercentage": 23,
        "amount": 404
      }
    ],
    "totalAmount": 2622,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_17",
    "tripNumber": "S3",
    "shopId": "S_EXCEL_17",
    "shopName": "Nutan - OBS",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_362",
        "sweetItemName": "Moti Choor Laddu",
        "grossWeight": 3.13,
        "trayWeight": 0.65,
        "wastage": 0,
        "netWeight": 2.48,
        "rate": 260,
        "discountPercentage": 20,
        "amount": 516
      }
    ],
    "totalAmount": 516,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_18",
    "tripNumber": "B3",
    "shopId": "S_EXCEL_1",
    "shopName": "7 Rd -Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_183",
        "sweetItemName": "Cool Cake  B Scotch   1/2 Kg",
        "grossWeight": 1,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 1,
        "rate": 350,
        "discountPercentage": 25,
        "amount": 263
      },
      {
        "sweetItemId": "W_EXCEL_186",
        "sweetItemName": "Cool Cake  B Scotch   Pc",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 65,
        "discountPercentage": 25,
        "amount": 293
      },
      {
        "sweetItemId": "W_EXCEL_195",
        "sweetItemName": "Cool Cake  Chocotale   Pc",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 75,
        "discountPercentage": 25,
        "amount": 338
      },
      {
        "sweetItemId": "W_EXCEL_238",
        "sweetItemName": "Cool Cake vanilla Pc",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 50,
        "discountPercentage": 25,
        "amount": 225
      }
    ],
    "totalAmount": 1119,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_19",
    "tripNumber": "B3",
    "shopId": "S_EXCEL_4",
    "shopName": "D/N - Rajadhani",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_238",
        "sweetItemName": "Cool Cake vanilla Pc",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 50,
        "discountPercentage": 23,
        "amount": 231
      },
      {
        "sweetItemId": "W_EXCEL_186",
        "sweetItemName": "Cool Cake  B Scotch   Pc",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 65,
        "discountPercentage": 23,
        "amount": 300
      }
    ],
    "totalAmount": 531,
    "status": "Completed"
  },
  {
    "id": "T_EXCEL_20",
    "tripNumber": "B3",
    "shopId": "S_EXCEL_17",
    "shopName": "Nutan - OBS",
    "date": "2026-05-24",
    "items": [
      {
        "sweetItemId": "W_EXCEL_256",
        "sweetItemName": "Donut",
        "grossWeight": 31,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 31,
        "rate": 25,
        "discountPercentage": 20,
        "amount": 620
      },
      {
        "sweetItemId": "W_EXCEL_462",
        "sweetItemName": "Square Cake Packet",
        "grossWeight": 6,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 6,
        "rate": 50,
        "discountPercentage": 20,
        "amount": 240
      },
      {
        "sweetItemId": "W_EXCEL_283",
        "sweetItemName": "ghee cake box (200g)",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 70,
        "discountPercentage": 20,
        "amount": 280
      },
      {
        "sweetItemId": "W_EXCEL_273",
        "sweetItemName": "fruit  Slice cake box",
        "grossWeight": 5,
        "trayWeight": 0,
        "wastage": 0,
        "netWeight": 5,
        "rate": 80,
        "discountPercentage": 20,
        "amount": 320
      }
    ],
    "totalAmount": 1460,
    "status": "Completed"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    "id": "I01",
    "name": "Sugar",
    "openingStock": 800,
    "purchase": 400,
    "consumption": 210,
    "remainingStock": 990,
    "unit": "Kg",
    "lowStockAlertLevel": 150
  },
  {
    "id": "I02",
    "name": "Ghee",
    "openingStock": 300,
    "purchase": 150,
    "consumption": 112,
    "remainingStock": 338,
    "unit": "Litre",
    "lowStockAlertLevel": 80
  },
  {
    "id": "I03",
    "name": "Full Cream Milk",
    "openingStock": 600,
    "purchase": 1000,
    "consumption": 880,
    "remainingStock": 720,
    "unit": "Litre",
    "lowStockAlertLevel": 200
  },
  {
    "id": "I04",
    "name": "Gram Flour (Besan)",
    "openingStock": 400,
    "purchase": 200,
    "consumption": 145,
    "remainingStock": 455,
    "unit": "Kg",
    "lowStockAlertLevel": 100
  },
  {
    "id": "I05",
    "name": "Premium Cashews",
    "openingStock": 250,
    "purchase": 300,
    "consumption": 135,
    "remainingStock": 415,
    "unit": "Kg",
    "lowStockAlertLevel": 80
  },
  {
    "id": "I06",
    "name": "Maida & Flour",
    "openingStock": 300,
    "purchase": 150,
    "consumption": 90,
    "remainingStock": 360,
    "unit": "Kg",
    "lowStockAlertLevel": 100
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    "id": "E01",
    "date": "2026-05-24",
    "category": "Milk Purchase",
    "amount": 9500,
    "description": "Direct purchase of fresh dairy herd milk"
  },
  {
    "id": "E02",
    "date": "2026-05-24",
    "category": "Transport",
    "amount": 1800,
    "description": "Fuel/Diesel for dispatch transport auto-rickshaws"
  },
  {
    "id": "E04",
    "date": "2026-05-24",
    "category": "Salary",
    "amount": 3500,
    "description": "Helpers and baking staff wage payouts"
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    "id": "W01",
    "name": "Ramu Master Cooks",
    "mobile": "9845511223",
    "attendance": {
      "2026-05-24": "Present"
    },
    "dailyWage": 1200,
    "payments": [
      {
        "id": "WP01",
        "date": "2026-05-24",
        "amount": 1200,
        "description": "Paid in cash"
      }
    ]
  },
  {
    "id": "W02",
    "name": "Krishna Helper",
    "mobile": "9845522334",
    "attendance": {
      "2026-05-24": "Present"
    },
    "dailyWage": 800,
    "payments": [
      {
        "id": "WP02",
        "date": "2026-05-24",
        "amount": 800,
        "description": "Paid in cash"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    "id": "N01",
    "timestamp": "2026-05-24T05:00:00Z",
    "type": "success",
    "title": "Spreadsheet Loaded Successfully",
    "message": "24MAY26-SWEETS.xlsx registers verified. Total revenue is ₹35,615.",
    "read": false
  }
];

export const HISTORIC_DAILY_TRENDS = [
  {
    "date": "05-18",
    "prepared": 210,
    "dispatched": 194,
    "revenue": 24000,
    "profit": 8000
  },
  {
    "date": "05-19",
    "prepared": 240,
    "dispatched": 220,
    "revenue": 28500,
    "profit": 9100
  },
  {
    "date": "05-20",
    "prepared": 180,
    "dispatched": 168,
    "revenue": 21200,
    "profit": 5900
  },
  {
    "date": "05-21",
    "prepared": 300,
    "dispatched": 285,
    "revenue": 35000,
    "profit": 14000
  },
  {
    "date": "05-22",
    "prepared": 280,
    "dispatched": 272,
    "revenue": 32500,
    "profit": 12900
  },
  {
    "date": "05-23",
    "prepared": 310,
    "dispatched": 298,
    "revenue": 34900,
    "profit": 13400
  },
  {
    "date": "05-24",
    "prepared": 687,
    "dispatched": 686,
    "revenue": 35615,
    "profit": -11204
  }
];

export const HISTORIC_MONTHLY_TRENDS = [
  {
    "month": "Jan",
    "sales": 650000,
    "prepared": 1800
  },
  {
    "month": "Feb",
    "sales": 720000,
    "prepared": 2000
  },
  {
    "month": "Mar",
    "sales": 810000,
    "prepared": 2200
  },
  {
    "month": "Apr",
    "sales": 780000,
    "prepared": 2100
  },
  {
    "month": "May",
    "sales": 1120000,
    "prepared": 3100
  }
];

