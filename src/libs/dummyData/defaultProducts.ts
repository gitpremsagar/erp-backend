export const defaultProducts = [
  // Snacks & Namkeen - Moong Dal Namkeen
  {
    name: "Haldiram's Moong Dal Namkeen",
    mrp: 45,
    productCode: "HD-MDN-001",
    description: "Traditional moong dal namkeen with perfect blend of spices and crunchiness.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    validity: "12 months",
    stock: 100,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 200,
    grammage: 200,
    tags: ["namkeen", "moong dal", "traditional", "crunchy"],
    imageUrl: "https://example.com/images/moong-dal-namkeen.jpg",
    categoryName: "Snacks & Namkeen",
    groupName: "Standard",
    subCategoryName: "Moong Dal Namkeen"
  },
  {
    name: "Haldiram's Premium Moong Dal Namkeen",
    mrp: 65,
    productCode: "HD-MDN-PRE-001",
    description: "Premium quality moong dal namkeen with extra spices and superior taste.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 75,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 150,
    grammage: 200,
    tags: ["namkeen", "moong dal", "premium", "spicy"],
    imageUrl: "https://example.com/images/premium-moong-dal-namkeen.jpg",
    categoryName: "Snacks & Namkeen",
    groupName: "Premium",
    subCategoryName: "Moong Dal Namkeen"
  },

  // Snacks & Namkeen - Aloo Bhujia
  {
    name: "Haldiram's Aloo Bhujia",
    mrp: 40,
    productCode: "HD-AB-001",
    description: "Classic potato-based bhujia with gram flour and aromatic spices.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 120,
    stockEntryDate: new Date(),
    lowStockLimit: 25,
    overStockLimit: 250,
    grammage: 150,
    tags: ["bhujia", "potato", "traditional", "spicy"],
    imageUrl: "https://example.com/images/aloo-bhujia.jpg",
    categoryName: "Snacks & Namkeen",
    groupName: "Standard",
    subCategoryName: "Aloo Bhujia"
  },

  // Sweets & Desserts - Ladoos
  {
    name: "Haldiram's Besan Ladoo",
    mrp: 55,
    productCode: "HD-BL-001",
    description: "Traditional besan ladoo made with gram flour, ghee, and cardamom.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
    validity: "6 months",
    stock: 80,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 150,
    grammage: 250,
    tags: ["ladoo", "besan", "sweet", "traditional"],
    imageUrl: "https://example.com/images/besan-ladoo.jpg",
    categoryName: "Sweets & Desserts",
    groupName: "Standard",
    subCategoryName: "Ladoos"
  },
  {
    name: "Haldiram's Motichoor Ladoo",
    mrp: 75,
    productCode: "HD-ML-001",
    description: "Premium motichoor ladoo with tiny pearl-like balls in sugar syrup.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    validity: "6 months",
    stock: 60,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 120,
    grammage: 250,
    tags: ["ladoo", "motichoor", "premium", "sweet"],
    imageUrl: "https://example.com/images/motichoor-ladoo.jpg",
    categoryName: "Sweets & Desserts",
    groupName: "Premium",
    subCategoryName: "Ladoos"
  },

  // Sweets & Desserts - Barfis
  {
    name: "Haldiram's Kaju Barfi",
    mrp: 120,
    productCode: "HD-KB-001",
    description: "Rich cashew nut barfi with silver leaf decoration.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    validity: "6 months",
    stock: 50,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["barfi", "kaju", "cashew", "premium"],
    imageUrl: "https://example.com/images/kaju-barfi.jpg",
    categoryName: "Sweets & Desserts",
    groupName: "Premium",
    subCategoryName: "Barfis"
  },

  // Ready to Eat - Curries & Gravies
  {
    name: "Haldiram's Paneer Butter Masala",
    mrp: 85,
    productCode: "HD-PBM-001",
    description: "Ready-to-eat paneer butter masala with rich tomato gravy.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
    validity: "3 months",
    stock: 40,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 80,
    grammage: 300,
    tags: ["paneer", "curry", "ready to eat", "vegetarian"],
    imageUrl: "https://example.com/images/paneer-butter-masala.jpg",
    categoryName: "Ready to Eat",
    groupName: "Standard",
    subCategoryName: "Curries & Gravies"
  },

  // Beverages - Fruit Juices
  {
    name: "Haldiram's Mango Juice",
    mrp: 35,
    productCode: "HD-MJ-001",
    description: "Natural mango juice without artificial preservatives.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    validity: "6 months",
    stock: 90,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 180,
    grammage: 200,
    tags: ["juice", "mango", "natural", "beverage"],
    imageUrl: "https://example.com/images/mango-juice.jpg",
    categoryName: "Beverages",
    groupName: "Standard",
    subCategoryName: "Fruit Juices"
  },

  // Spices & Seasonings - Ground Spices
  {
    name: "Haldiram's Garam Masala",
    mrp: 25,
    productCode: "HD-GM-001",
    description: "Premium blend of ground spices for authentic Indian cooking.",
    expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000), // 2 years
    validity: "24 months",
    stock: 150,
    stockEntryDate: new Date(),
    lowStockLimit: 30,
    overStockLimit: 300,
    grammage: 100,
    tags: ["spices", "garam masala", "cooking", "blend"],
    imageUrl: "https://example.com/images/garam-masala.jpg",
    categoryName: "Spices & Seasonings",
    groupName: "Standard",
    subCategoryName: "Spice Blends"
  },

  // Pickles & Chutneys - Mango Pickles
  {
    name: "Haldiram's Sweet Mango Pickle",
    mrp: 45,
    productCode: "HD-SMP-001",
    description: "Traditional sweet mango pickle with jaggery and spices.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 70,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 140,
    grammage: 200,
    tags: ["pickle", "mango", "sweet", "traditional"],
    imageUrl: "https://example.com/images/sweet-mango-pickle.jpg",
    categoryName: "Pickles & Chutneys",
    groupName: "Standard",
    subCategoryName: "Mango Pickles"
  },

  // Dry Fruits & Nuts - Premium Nuts
  {
    name: "Haldiram's Premium Almonds",
    mrp: 180,
    productCode: "HD-PA-001",
    description: "Premium quality California almonds, roasted and salted.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 45,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 90,
    grammage: 250,
    tags: ["almonds", "premium", "nuts", "roasted"],
    imageUrl: "https://example.com/images/premium-almonds.jpg",
    categoryName: "Dry Fruits & Nuts",
    groupName: "Premium",
    subCategoryName: "Premium Nuts"
  },

  // Grocery & Staples - Rice & Pulses
  {
    name: "Haldiram's Basmati Rice",
    mrp: 95,
    productCode: "HD-BR-001",
    description: "Premium aged basmati rice with long grains and aromatic flavor.",
    expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
    validity: "24 months",
    stock: 200,
    stockEntryDate: new Date(),
    lowStockLimit: 40,
    overStockLimit: 400,
    grammage: 1000,
    tags: ["rice", "basmati", "premium", "long grain"],
    imageUrl: "https://example.com/images/basmati-rice.jpg",
    categoryName: "Grocery & Staples",
    groupName: "Premium",
    subCategoryName: "Rice & Pulses"
  },

  // Festival Special Products
  {
    name: "Haldiram's Diwali Special Mix",
    mrp: 150,
    productCode: "HD-DSM-001",
    description: "Special Diwali assortment with premium sweets and snacks.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    validity: "6 months",
    stock: 30,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 60,
    grammage: 500,
    tags: ["diwali", "special", "assortment", "festival"],
    imageUrl: "https://example.com/images/diwali-special-mix.jpg",
    categoryName: "Snacks & Namkeen",
    groupName: "Festival Special",
    subCategoryName: "Mixed Namkeen"
  },

  // Organic Products
  {
    name: "Haldiram's Organic Mixed Nuts",
    mrp: 220,
    productCode: "HD-OMN-001",
    description: "Certified organic mixed nuts without any artificial additives.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 35,
    stockEntryDate: new Date(),
    lowStockLimit: 8,
    overStockLimit: 70,
    grammage: 300,
    tags: ["organic", "nuts", "mixed", "certified"],
    imageUrl: "https://example.com/images/organic-mixed-nuts.jpg",
    categoryName: "Dry Fruits & Nuts",
    groupName: "Organic",
    subCategoryName: "Mixed Dry Fruits"
  },

  // Diabetic Friendly Products
  {
    name: "Haldiram's Sugar-Free Ladoo",
    mrp: 85,
    productCode: "HD-SFL-001",
    description: "Sugar-free ladoo sweetened with natural sweeteners for diabetic customers.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    validity: "6 months",
    stock: 25,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["sugar-free", "ladoo", "diabetic", "natural"],
    imageUrl: "https://example.com/images/sugar-free-ladoo.jpg",
    categoryName: "Sweets & Desserts",
    groupName: "Diabetic Friendly",
    subCategoryName: "Ladoos"
  },

  // Kids Special Products
  {
    name: "Haldiram's Kids Snack Pack",
    mrp: 65,
    productCode: "HD-KSP-001",
    description: "Colorful snack pack designed especially for children with fun shapes.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    validity: "12 months",
    stock: 55,
    stockEntryDate: new Date(),
    lowStockLimit: 12,
    overStockLimit: 110,
    grammage: 150,
    tags: ["kids", "snacks", "colorful", "fun"],
    imageUrl: "https://example.com/images/kids-snack-pack.jpg",
    categoryName: "Snacks & Namkeen",
    groupName: "Kids Special",
    subCategoryName: "Mixed Namkeen"
  }
];
