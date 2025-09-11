export const defaultProducts = [
  // Snacks & Namkeen - Moong Dal Namkeen
  {
    name: "Moong Dal MRP 5|17GM*7.344KG NGP",
    mrp: 5,
    productCode: "FD012600170734400D",
    description: "Traditional moong dal namkeen with perfect blend of spices and crunchiness.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 20,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 17,
    tags: ["namkeen", "moong dal", "traditional", "crunchy"],
    imageUrl: "https://example.com/images/moong-dal-namkeen.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Moong Dal Namkeen"
  },

  // Snacks & Namkeen - Aloo Bhujia
  {
    name: "Aloo Bhujia MRP 5|20 GM*7.68 KG",
    mrp: 5,
    productCode: "FD092100200768000D",
    description: "Classic potato-based bhujia with gram flour and aromatic spices.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "5 months",
    stock: 156,
    stockEntryDate: new Date(),
    lowStockLimit: 40,
    overStockLimit: 300,
    grammage: 20,
    tags: ["bhujia", "potato", "traditional", "spicy"],
    imageUrl: "https://example.com/images/aloo-bhujia.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Aloo Bhujia"
  },

  // Snacks & Namkeen - Bhujia
  {
    name: "Bhujia MRP 5| 17 GM*8.16 KG",
    mrp: 5,
    productCode: "FD092200170816000D",
    description: "Traditional bhujia with gram flour and aromatic spices.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 387,
    stockEntryDate: new Date(),
    lowStockLimit: 100,
    overStockLimit: 500,
    grammage: 17,
    tags: ["bhujia", "traditional", "spicy", "gram flour"],
    imageUrl: "https://example.com/images/bhujia.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Chana Products
  {
    name: "Chana Jor Garam MRP 5|25 GM*7.2 KG NGP",
    mrp: 5,
    productCode: "FD020400250720000D",
    description: "Spicy roasted chana with traditional masala.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 87,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 200,
    grammage: 25,
    tags: ["chana", "roasted", "spicy", "traditional"],
    imageUrl: "https://example.com/images/chana-jor-garam.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Chana Nuts MRP 5|20 GM*8.64 KG NGP",
    mrp: 5,
    productCode: "FE020600200864000D",
    description: "Premium chana nuts with perfect crunch and taste.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 50,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 20,
    tags: ["chana", "nuts", "premium", "crunchy"],
    imageUrl: "https://example.com/images/chana-nuts.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Chatpata Products
  {
    name: "Chatpata Dal MRP 5|22 GM*11.088 KG",
    mrp: 5,
    productCode: "FD020700221108800D",
    description: "Spicy and tangy dal mix with chatpata masala.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 25,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 22,
    tags: ["chatpata", "dal", "spicy", "tangy"],
    imageUrl: "https://example.com/images/chatpata-dal.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Chatpata Matar MRP 5|13GM*7.488KG NGP",
    mrp: 5,
    productCode: "FE020800130748800D",
    description: "Spicy green peas with traditional chatpata seasoning.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 170,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 300,
    grammage: 13,
    tags: ["chatpata", "matar", "green peas", "spicy"],
    imageUrl: "https://example.com/images/chatpata-matar.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Falahari & Gathiya
  {
    name: "Falahari Chiwda MRP 5|18GM*5.4KG",
    mrp: 5,
    productCode: "FD028500180540000D",
    description: "Traditional falahari chiwda perfect for fasting days.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 41,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 18,
    tags: ["falahari", "chiwda", "fasting", "traditional"],
    imageUrl: "https://example.com/images/falahari-chiwda.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Gathiya MRP 5|20 GM*6 KG NGP",
    mrp: 5,
    productCode: "FD037400200600000D",
    description: "Crispy gathiya with perfect texture and traditional taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 40,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 20,
    tags: ["gathiya", "crispy", "traditional", "snack"],
    imageUrl: "https://example.com/images/gathiya.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Khatta Meetha & Lite
  {
    name: "Khatta Meetha MRP 5|27.5GM*9.24KG NGP",
    mrp: 5,
    productCode: "FD045900280924000D",
    description: "Perfect blend of sweet and sour flavors in traditional namkeen.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 1096,
    stockEntryDate: new Date(),
    lowStockLimit: 200,
    overStockLimit: 1500,
    grammage: 27.5,
    tags: ["khatta meetha", "sweet", "sour", "traditional"],
    imageUrl: "https://example.com/images/khatta-meetha.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Khatta Meetha"
  },
  {
    name: "Lite Chiwda MRP 5|22GM*7.92KG NGP",
    mrp: 5,
    productCode: "FD047900220792002D",
    description: "Light and crispy chiwda perfect for health-conscious consumers.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 476,
    stockEntryDate: new Date(),
    lowStockLimit: 100,
    overStockLimit: 800,
    grammage: 22,
    tags: ["lite", "chiwda", "light", "crispy"],
    imageUrl: "https://example.com/images/lite-chiwda.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Mixture & More
  {
    name: "Mixture MRP 5|22 GM*9.504 KG NGP",
    mrp: 5,
    productCode: "FD059900220950400D",
    description: "Classic mixture with perfect blend of various namkeen items.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 49,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 22,
    tags: ["mixture", "classic", "blend", "traditional"],
    imageUrl: "https://example.com/images/mixture.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Moong Dal MRP 5|17 GM*9.588 KG NGP",
    mrp: 5,
    productCode: "FD060300170958800D",
    description: "Premium moong dal namkeen with extended shelf life.",
    expiryDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000), // 7 months from now
    validity: "7 months",
    stock: 13,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 17,
    tags: ["moong dal", "premium", "extended shelf life"],
    imageUrl: "https://example.com/images/moong-dal-premium.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Moong Dal Namkeen"
  },

  // Snacks & Namkeen - Nutty & Papdi
  {
    name: "Nutty Craze MRP 5|17 GM*6.12 KG",
    mrp: 5,
    productCode: "FE025700170612000D",
    description: "Nutty mix with perfect crunch and traditional taste.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 6,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 17,
    tags: ["nutty", "mix", "crunchy", "traditional"],
    imageUrl: "https://example.com/images/nutty-craze.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Papdi Gathiya MRP 5|20 GM*4.8 KG",
    mrp: 5,
    productCode: "FD073700200480000D",
    description: "Crispy papdi gathiya with perfect texture and taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 147,
    stockEntryDate: new Date(),
    lowStockLimit: 40,
    overStockLimit: 300,
    grammage: 20,
    tags: ["papdi", "gathiya", "crispy", "traditional"],
    imageUrl: "https://example.com/images/papdi-gathiya.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Punjabi & More
  {
    name: "Punjabi Tadka MRP 5|22 GM*6.6 KG NGP",
    mrp: 5,
    productCode: "FD075200220660000D",
    description: "Punjabi style tadka with authentic spices and flavors.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 18,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 22,
    tags: ["punjabi", "tadka", "authentic", "spices"],
    imageUrl: "https://example.com/images/punjabi-tadka.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Ratlami Sev MRP 5|22GM*6.6KG",
    mrp: 5,
    productCode: "FD076600220660000D",
    description: "Traditional Ratlami sev with authentic spices and taste.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 34,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 22,
    tags: ["ratlami", "sev", "traditional", "authentic"],
    imageUrl: "https://example.com/images/ratlami-sev.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Roasted & Salted
  {
    name: "Roasted Chana MRP 5|20 GM*8.64 KG",
    mrp: 5,
    productCode: "FE077300200864000D",
    description: "Premium roasted chana with perfect crunch and taste.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 259,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 400,
    grammage: 20,
    tags: ["roasted", "chana", "premium", "crunchy"],
    imageUrl: "https://example.com/images/roasted-chana.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Salted Peanut MRP 5|16GM*7.68KG NGP",
    mrp: 5,
    productCode: "FE081200160768000D",
    description: "Perfectly salted peanuts with traditional taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 1293,
    stockEntryDate: new Date(),
    lowStockLimit: 200,
    overStockLimit: 2000,
    grammage: 16,
    tags: ["salted", "peanut", "traditional", "snack"],
    imageUrl: "https://example.com/images/salted-peanut.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Sev & Soya
  {
    name: "Sev Murmura MRP 5|27.5 GM*5.28KG",
    mrp: 5,
    productCode: "FD050200280528000D",
    description: "Traditional sev murmura with perfect texture and taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 1620,
    stockEntryDate: new Date(),
    lowStockLimit: 300,
    overStockLimit: 2500,
    grammage: 27.5,
    tags: ["sev", "murmura", "traditional", "texture"],
    imageUrl: "https://example.com/images/sev-murmura.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Soya Chips MRP 5|20 GM*4.8 KG NGP",
    mrp: 5,
    productCode: "FD084100200480000D",
    description: "Healthy soya chips perfect for health-conscious consumers.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 20,
    tags: ["soya", "chips", "healthy", "health-conscious"],
    imageUrl: "https://example.com/images/soya-chips.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },

  // Snacks & Namkeen - Soya & Tasty
  {
    name: "Soya Sticks MRP 5|20 GM*4.8 KG NGP",
    mrp: 5,
    productCode: "FD084200200480000D",
    description: "Crispy soya sticks with perfect crunch and taste.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 262,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 500,
    grammage: 20,
    tags: ["soya", "sticks", "crispy", "crunchy"],
    imageUrl: "https://example.com/images/soya-sticks.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },
  {
    name: "Tasty Nuts MRP 5|18GM*7.776KG NGP",
    mrp: 5,
    productCode: "FE089200180777600D",
    description: "Premium tasty nuts mix with perfect blend of flavors.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 979,
    stockEntryDate: new Date(),
    lowStockLimit: 200,
    overStockLimit: 1500,
    grammage: 18,
    tags: ["tasty", "nuts", "premium", "blend"],
    imageUrl: "https://example.com/images/tasty-nuts.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - 10 Rupee Variants
  {
    name: "All In One 36 GM *8.6KG NGP",
    mrp: 10,
    productCode: "FD012600360864000D",
    description: "Premium all-in-one mix with 36gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 34,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 36,
    tags: ["all in one", "premium", "mix", "36gm"],
    imageUrl: "https://example.com/images/all-in-one-36gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Aloo Bhujia MRP 10|42 GM*10.584 KG",
    mrp: 10,
    productCode: "FD092100421058400D",
    description: "Premium aloo bhujia with 42gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 17,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 42,
    tags: ["aloo bhujia", "premium", "42gm", "potato"],
    imageUrl: "https://example.com/images/aloo-bhujia-42gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Aloo Bhujia"
  },

  // Snacks & Namkeen - More 10 Rupee Variants
  {
    name: "Bhujia 35 GM*9.24 KG NGP",
    mrp: 10,
    productCode: "FD092200350924001D",
    description: "Premium bhujia with 35gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 163,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 300,
    grammage: 35,
    tags: ["bhujia", "premium", "35gm", "traditional"],
    imageUrl: "https://example.com/images/bhujia-35gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Instant Bhel MRP 10|44 GM*8.976 KG",
    mrp: 10,
    productCode: "FD040800440897600D",
    description: "Ready-to-eat instant bhel mix with 44gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 108,
    stockEntryDate: new Date(),
    lowStockLimit: 30,
    overStockLimit: 200,
    grammage: 44,
    tags: ["instant", "bhel", "ready to eat", "44gm"],
    imageUrl: "https://example.com/images/instant-bhel.jpg",
    categoryName: "Ready to Eat",
    subCategoryName: "Snack Mixes"
  },

  // Sweets & Desserts - Gulab Jamun & Rasgulla
  {
    name: "Gulab Jamun 500 GM*16 KG NGP",
    mrp: 125,
    productCode: "FH039005001600000D",
    description: "Soft and spongy gulab jamun soaked in sugar syrup.",
    expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months from now
    validity: "9 months",
    stock: 20,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 50,
    grammage: 500,
    tags: ["gulab jamun", "sweet", "spongy", "sugar syrup"],
    imageUrl: "https://example.com/images/gulab-jamun-500gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Gulab Jamun"
  },
  {
    name: "Gulab Jamun1 KG*18 KG (Box Folding) NGP",
    mrp: 225,
    productCode: "FH039010001800002D",
    description: "Premium 1kg gulab jamun in folding box packaging.",
    expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months from now
    validity: "9 months",
    stock: 17,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 30,
    grammage: 1000,
    tags: ["gulab jamun", "1kg", "premium", "box folding"],
    imageUrl: "https://example.com/images/gulab-jamun-1kg.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Gulab Jamun"
  },

  // Sweets & Desserts - Rasgulla
  {
    name: "Rasgulla 500 GM*16 KG NGP",
    mrp: 125,
    productCode: "FH076105001600000D",
    description: "Soft cottage cheese balls soaked in light sugar syrup.",
    expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months from now
    validity: "9 months",
    stock: 21,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 50,
    grammage: 500,
    tags: ["rasgulla", "cottage cheese", "soft", "sugar syrup"],
    imageUrl: "https://example.com/images/rasgulla-500gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Rasgullas"
  },
  {
    name: "Rasgulla 1 KG*18 KG (Box Folding) NGP",
    mrp: 225,
    productCode: "FH076110001800000D",
    description: "Premium 1kg rasgulla in folding box packaging.",
    expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months from now
    validity: "9 months",
    stock: 12,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 30,
    grammage: 1000,
    tags: ["rasgulla", "1kg", "premium", "box folding"],
    imageUrl: "https://example.com/images/rasgulla-1kg.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Rasgullas"
  },

  // Sweets & Desserts - Soan Papdi
  {
    name: "Soan Papdi Regular 100 GM*7.2 KG NGP",
    mrp: 45,
    productCode: "FH083301000720000D",
    description: "Traditional soan papdi with flaky texture and sweet taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 5,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 100,
    tags: ["soan papdi", "regular", "flaky", "traditional"],
    imageUrl: "https://example.com/images/soan-papdi-100gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },
  {
    name: "Soan Papdi Regular 250 GM*18 KG NGP",
    mrp: 75,
    productCode: "FH083702501800002D",
    description: "Premium soan papdi with 250gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 12,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 250,
    tags: ["soan papdi", "250gm", "premium", "flaky"],
    imageUrl: "https://example.com/images/soan-papdi-250gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },

  // Beverages - Fruit Drinks
  {
    name: "Mango Drink 125 ML (5 L C/S)",
    mrp: 10,
    productCode: "FDRTA1201250500",
    description: "Refreshing mango drink in 125ml bottles.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 271,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 500,
    grammage: 125,
    tags: ["mango", "drink", "refreshing", "125ml"],
    imageUrl: "https://example.com/images/mango-drink.jpg",
    categoryName: "Beverages",
    subCategoryName: "Fruit Juices"
  },
  {
    name: "Litchi Drink 125 ML (5 L C/S)",
    mrp: 10,
    productCode: "FDRTA1801250500",
    description: "Delicious litchi drink in 125ml bottles.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 91,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 200,
    grammage: 125,
    tags: ["litchi", "drink", "delicious", "125ml"],
    imageUrl: "https://example.com/images/litchi-drink.jpg",
    categoryName: "Beverages",
    subCategoryName: "Fruit Juices"
  },

  // Beverages - More Drinks
  {
    name: "MatkaJhatka(MasalaChaas)180Ml(5.400KgCS)",
    mrp: 15,
    productCode: "FDRTA0201800540",
    description: "Spicy buttermilk with traditional masala flavors.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 427,
    stockEntryDate: new Date(),
    lowStockLimit: 100,
    overStockLimit: 800,
    grammage: 180,
    tags: ["matka jhatka", "masala chaas", "spicy", "buttermilk"],
    imageUrl: "https://example.com/images/matka-jhatka.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Classic Lassi 180Ml (5.400 Kg C/S)",
    mrp: 20,
    productCode: "FDRTA0301800540",
    description: "Traditional sweet lassi in 180ml bottles.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 400,
    stockEntryDate: new Date(),
    lowStockLimit: 100,
    overStockLimit: 800,
    grammage: 180,
    tags: ["classic", "lassi", "sweet", "traditional"],
    imageUrl: "https://example.com/images/classic-lassi.jpg",
    categoryName: "Beverages",
    subCategoryName: "Lassi & Shakes"
  },

  // Snacks & Namkeen - Chips & More
  {
    name: "Panga Tangy Tomato MRP 5|16 GM*3.072 KG",
    mrp: 5,
    productCode: "FI063400160307201D",
    description: "Tangy tomato flavored chips with perfect crunch.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 186,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 300,
    grammage: 16,
    tags: ["panga", "tangy tomato", "chips", "crunchy"],
    imageUrl: "https://example.com/images/panga-tangy-tomato.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },
  {
    name: "Panga Teekha Achari MRP 5|16 GM*3.072 KG",
    mrp: 5,
    productCode: "FI350600160307201D",
    description: "Spicy achari flavored chips with traditional taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 55,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 100,
    grammage: 16,
    tags: ["panga", "teekha achari", "spicy", "traditional"],
    imageUrl: "https://example.com/images/panga-teekha-achari.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },

  // Snacks & Namkeen - Halke Fulke & Popcorn
  {
    name: "Halke Fulke 5/-",
    mrp: 5,
    productCode: "HALKE-FULKE-5",
    description: "Light and crispy traditional snack mix.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 582,
    stockEntryDate: new Date(),
    lowStockLimit: 100,
    overStockLimit: 1000,
    grammage: 20,
    tags: ["halke fulke", "light", "crispy", "traditional"],
    imageUrl: "https://example.com/images/halke-fulke-5.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Halke Fulke 10/-",
    mrp: 10,
    productCode: "HALKE-FULKE-10",
    description: "Premium light and crispy traditional snack mix.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 211,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 500,
    grammage: 40,
    tags: ["halke fulke", "premium", "light", "crispy"],
    imageUrl: "https://example.com/images/halke-fulke-10.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Popcorn
  {
    name: "Popcorn Salted MRP 5|11GM*1.716KG",
    mrp: 5,
    productCode: "FI564600110171600D",
    description: "Perfectly salted popcorn with traditional taste.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 731,
    stockEntryDate: new Date(),
    lowStockLimit: 150,
    overStockLimit: 1200,
    grammage: 11,
    tags: ["popcorn", "salted", "traditional", "crunchy"],
    imageUrl: "https://example.com/images/popcorn-salted.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },

  // Snacks & Namkeen - 200gm & 400gm Variants
  {
    name: "Aloo Bhujia 200 GM*10 KG",
    mrp: 55,
    productCode: "FD092102001000000D",
    description: "Premium aloo bhujia in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 31,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["aloo bhujia", "200gm", "premium", "potato"],
    imageUrl: "https://example.com/images/aloo-bhujia-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Aloo Bhujia"
  },
  {
    name: "Bhujia 200 GM*12 KG NGP",
    mrp: 60,
    productCode: "FD092202001200000D",
    description: "Premium bhujia in 200gm pack size.",
    expiryDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000), // 7 months from now
    validity: "7 months",
    stock: 112,
    stockEntryDate: new Date(),
    lowStockLimit: 30,
    overStockLimit: 200,
    grammage: 200,
    tags: ["bhujia", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bhujia-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - 400gm & 1kg Variants
  {
    name: "Bhujia 400 GM*12 KG NGP",
    mrp: 120,
    productCode: "FD092204001200000D",
    description: "Premium bhujia in 400gm pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 209,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 400,
    grammage: 400,
    tags: ["bhujia", "400gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bhujia-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Bhujia 1 KG*12 KG NGP",
    mrp: 290,
    productCode: "FD092210001200002D",
    description: "Premium bhujia in 1kg pack size.",
    expiryDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000), // 7 months from now
    validity: "7 months",
    stock: 295,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 500,
    grammage: 1000,
    tags: ["bhujia", "1kg", "premium", "traditional"],
    imageUrl: "https://example.com/images/bhujia-1kg.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - More Variants
  {
    name: "Khatta Meetha 200GM*10KG NGP",
    mrp: 55,
    productCode: "FD045902001000000D",
    description: "Premium khatta meetha in 200gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 40,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 200,
    tags: ["khatta meetha", "200gm", "premium", "sweet sour"],
    imageUrl: "https://example.com/images/khatta-meetha-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Khatta Meetha"
  },
  {
    name: "Lite Chiwda 200 GM*12 KG NGP",
    mrp: 45,
    productCode: "FD047902001200000D",
    description: "Premium lite chiwda in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 51,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 200,
    tags: ["lite chiwda", "200gm", "premium", "light"],
    imageUrl: "https://example.com/images/lite-chiwda-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Mixture & Moong Dal Variants
  {
    name: "Mixture 200 GM*12 KG NGP",
    mrp: 45,
    productCode: "FD059902001200000D",
    description: "Premium mixture in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 47,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mixture", "200gm", "premium", "blend"],
    imageUrl: "https://example.com/images/mixture-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Moong Dal 200 GM*12.4 KG NGP",
    mrp: 60,
    productCode: "FD060302001240000D",
    description: "Premium moong dal in 200gm pack size.",
    expiryDate: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000), // 8 months from now
    validity: "8 months",
    stock: 41,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 200,
    tags: ["moong dal", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/moong-dal-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Moong Dal Namkeen"
  },

  // Snacks & Namkeen - 400gm Variants
  {
    name: "Mixture 400 GM*12 KG NGP",
    mrp: 88,
    productCode: "FD059904001200000D",
    description: "Premium mixture in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 41,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 400,
    tags: ["mixture", "400gm", "premium", "blend"],
    imageUrl: "https://example.com/images/mixture-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Moong Dal 400 GM*12 KG NGP",
    mrp: 120,
    productCode: "FD060304001200000D",
    description: "Premium moong dal in 400gm pack size.",
    expiryDate: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000), // 8 months from now
    validity: "8 months",
    stock: 56,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 150,
    grammage: 400,
    tags: ["moong dal", "400gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/moong-dal-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Moong Dal Namkeen"
  },

  // Snacks & Namkeen - Other Variants
  {
    name: "Punjabi Tadka 200 GM*12 KG NGP",
    mrp: 55,
    productCode: "FD075202001200000D",
    description: "Premium punjabi tadka in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 20,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["punjabi tadka", "200gm", "premium", "authentic"],
    imageUrl: "https://example.com/images/punjabi-tadka-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Tasty Nuts 200 GM*12 KG NGP",
    mrp: 55,
    productCode: "FE089202001200000D",
    description: "Premium tasty nuts in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 22,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["tasty nuts", "200gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/tasty-nuts-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Variants
  {
    name: "Tasty Nuts 400 GM*12 KG NGP",
    mrp: 105,
    productCode: "FE089204001200000D",
    description: "Premium tasty nuts in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 23,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 400,
    tags: ["tasty nuts", "400gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/tasty-nuts-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Salted Peanut 200 GM*12 KG NGP",
    mrp: 55,
    productCode: "FE081202001200000D",
    description: "Premium salted peanut in 200gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 20,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["salted peanut", "200gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/salted-peanut-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Additional Variants
  {
    name: "Soya Sticks 200 GM*12 KG NGP",
    mrp: 45,
    productCode: "FD084202001200000D",
    description: "Premium soya sticks in 200gm pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 24,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["soya sticks", "200gm", "premium", "healthy"],
    imageUrl: "https://example.com/images/soya-sticks-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },
  {
    name: "Mini Bhakharwadi 200 GM*8 KG",
    mrp: 65,
    productCode: "FD058802000800001D",
    description: "Premium mini bhakharwadi in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 8,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["mini bhakharwadi", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-bhakharwadi-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Variants
  {
    name: "Mini Punjabi Papad MRP10|25GM*3.6KG NGP",
    mrp: 10,
    productCode: "FD059100250360000D",
    description: "Premium mini punjabi papad in 25gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 225,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 400,
    grammage: 25,
    tags: ["mini punjabi papad", "25gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-punjabi-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Panchrattan MRP 10|25 GM*7.5 KG NGP",
    mrp: 10,
    productCode: "FD063100250750001D",
    description: "Premium panchrattan mix in 25gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 172,
    stockEntryDate: new Date(),
    lowStockLimit: 50,
    overStockLimit: 300,
    grammage: 25,
    tags: ["panchrattan", "25gm", "premium", "mix"],
    imageUrl: "https://example.com/images/panchrattan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Last Additional Variants
  {
    name: "Papad Chavanu MRP 10|45GM*7.02KG",
    mrp: 10,
    productCode: "FD063800450702000D",
    description: "Premium papad chavanu in 45gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 325,
    stockEntryDate: new Date(),
    lowStockLimit: 80,
    overStockLimit: 600,
    grammage: 45,
    tags: ["papad chavanu", "45gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/papad-chavanu.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Roasted Chana MRP 10|42 GM*10.08 KG",
    mrp: 10,
    productCode: "FE077300421008000D",
    description: "Premium roasted chana in 42gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 15,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 42,
    tags: ["roasted chana", "42gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/roasted-chana-42gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Roasted Crushed Peanut 35GM*10.5KG",
    mrp: 10,
    productCode: "FE081200351050003D",
    description: "Premium roasted crushed peanut in 35gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 40,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 35,
    tags: ["roasted crushed peanut", "35gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/roasted-crushed-peanut.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Salted Peanut MRP 10|34GM*10.2KG NGP",
    mrp: 10,
    productCode: "FE081200341020002D",
    description: "Premium salted peanut in 34gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 57,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 150,
    grammage: 34,
    tags: ["salted peanut", "34gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/salted-peanut-34gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Last Products
  {
    name: "Soya Chips MRP 10|45 GM*6.48 KG NGP",
    mrp: 10,
    productCode: "FD084100450810000D",
    description: "Premium soya chips in 45gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 47,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 45,
    tags: ["soya chips", "45gm", "premium", "healthy"],
    imageUrl: "https://example.com/images/soya-chips-45gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },
  {
    name: "Soya Sticks MRP 10|42 GM*6.048 KG NGP",
    mrp: 10,
    productCode: "FD084200420604800D",
    description: "Premium soya sticks in 42gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 29,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 42,
    tags: ["soya sticks", "42gm", "premium", "healthy"],
    imageUrl: "https://example.com/images/soya-sticks-42gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Chips & Crisps"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Tasty Nuts MRP 10|38GM*9.12KG NGP",
    mrp: 10,
    productCode: "FE089200380912000D",
    description: "Premium tasty nuts in 38gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 46,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 38,
    tags: ["tasty nuts", "38gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/tasty-nuts-38gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Teekha Meetha 22 GM*7.392 KG",
    mrp: 10,
    productCode: "FD089300220739200D",
    description: "Premium teekha meetha mix in 22gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 22,
    tags: ["teekha meetha", "22gm", "premium", "spicy sweet"],
    imageUrl: "https://example.com/images/teekha-meetha.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Khatta Meetha"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "All In One 200 GM*12 KG NGP",
    mrp: 60,
    productCode: "FD012602001200000D",
    description: "Premium all-in-one mix in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 39,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 200,
    tags: ["all in one", "200gm", "premium", "mix"],
    imageUrl: "https://example.com/images/all-in-one-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "All In One 400 GM*12 KG NGP",
    mrp: 115,
    productCode: "FD012604001200001D",
    description: "Premium all-in-one mix in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 33,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 80,
    grammage: 400,
    tags: ["all in one", "400gm", "premium", "mix"],
    imageUrl: "https://example.com/images/all-in-one-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Aloo Bhujia 400 GM*12.4 KG NGP",
    mrp: 100,
    productCode: "FD092104001240000D",
    description: "Premium aloo bhujia in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 55,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 150,
    grammage: 400,
    tags: ["aloo bhujia", "400gm", "premium", "potato"],
    imageUrl: "https://example.com/images/aloo-bhujia-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Aloo Bhujia"
  },
  {
    name: "Bhujia 600 GM*12 KG NGP",
    mrp: 175,
    productCode: "FD092206001200000D",
    description: "Premium bhujia in 600gm pack size.",
    expiryDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000), // 7 months from now
    validity: "7 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 600,
    tags: ["bhujia", "600gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bhujia-600gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Khatta Meetha 400 GM*12 KG NGP",
    mrp: 95,
    productCode: "FD045904001200000D",
    description: "Premium khatta meetha in 400gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 88,
    stockEntryDate: new Date(),
    lowStockLimit: 25,
    overStockLimit: 150,
    grammage: 400,
    tags: ["khatta meetha", "400gm", "premium", "sweet sour"],
    imageUrl: "https://example.com/images/khatta-meetha-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Khatta Meetha"
  },
  {
    name: "Lite Chiwda 400 GM*12 KG NGP",
    mrp: 88,
    productCode: "FD047904001200000D",
    description: "Premium lite chiwda in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 41,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 400,
    tags: ["lite chiwda", "400gm", "premium", "light"],
    imageUrl: "https://example.com/images/lite-chiwda-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Mini Bhakharwadi 400 GM*12 KG NGP",
    mrp: 88,
    productCode: "FD059904001200000D",
    description: "Premium mini bhakharwadi in 400gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 41,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 400,
    tags: ["mini bhakharwadi", "400gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-bhakharwadi-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Mini Bhakharwadi 200 GM*4.8 KG",
    mrp: 65,
    productCode: "FD058802000480000D",
    description: "Premium mini bhakharwadi in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 12,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["mini bhakharwadi", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-bhakharwadi-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Mini Samosa 200 GM*4 KG NGP",
    mrp: 65,
    productCode: "FD059302000400000D",
    description: "Premium mini samosa in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 18,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mini samosa", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-samosa-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Murukku (Chakoli)200 GM*4.8 KG",
    mrp: 65,
    productCode: "FD019302000800001D",
    description: "Premium murukku chakoli in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 28,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["murukku", "chakoli", "200gm", "premium"],
    imageUrl: "https://example.com/images/murukku-chakoli.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Mathri 200 GM*4 KG NGP",
    mrp: 65,
    productCode: "FD057102000400000D",
    description: "Premium mathri in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 22,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mathri", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mathri-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Gol Kachauri 200 GM*4 KG",
    mrp: 70,
    productCode: "FD038202000400000D",
    description: "Premium gol kachauri in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 24,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["gol kachauri", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/gol-kachauri-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Bread Toast Classic 70 GM * 4.2KG",
    mrp: 10,
    productCode: "FA558800700420000D",
    description: "Classic bread toast in 70gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 37,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 70,
    tags: ["bread toast", "classic", "70gm", "traditional"],
    imageUrl: "https://example.com/images/bread-toast-classic.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Milk Bread Toast 250 GM*5 KG NGP",
    mrp: 40,
    productCode: "FA058602500500001D",
    description: "Premium milk bread toast in 250gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 11,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 250,
    tags: ["milk bread toast", "250gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/milk-bread-toast-250gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Cream Cone Vanilla 30 GM*0.96 KG",
    mrp: 10,
    productCode: "FN090200300096000D",
    description: "Vanilla cream cone in 30gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 30,
    tags: ["cream cone", "vanilla", "30gm", "ice cream"],
    imageUrl: "https://example.com/images/cream-cone-vanilla.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Woka Instant Noodles 52 Gm*7.488KG",
    mrp: 10,
    productCode: "FQ050200520748800D",
    description: "Instant noodles in 52gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 48,
    stockEntryDate: new Date(),
    lowStockLimit: 15,
    overStockLimit: 100,
    grammage: 52,
    tags: ["instant noodles", "woka", "52gm", "ready to eat"],
    imageUrl: "https://example.com/images/woka-instant-noodles.jpg",
    categoryName: "Ready to Eat",
    subCategoryName: "Snack Mixes"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Vermicellirs 10|90 GM*19.8 KG NGP",
    mrp: 10,
    productCode: "FK116100901980000D",
    description: "Premium vermicelli in 90gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 67,
    stockEntryDate: new Date(),
    lowStockLimit: 20,
    overStockLimit: 150,
    grammage: 90,
    tags: ["vermicelli", "90gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-90gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Vermicelli 900 GM*21.6 KG NGP",
    mrp: 85,
    productCode: "FK116109002160000D",
    description: "Premium vermicelli in 900gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 900,
    tags: ["vermicelli", "900gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-900gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Bikaneri Papad 32 GM * 10.24 KG",
    mrp: 10,
    productCode: "FK095300401280000D",
    description: "Premium bikaneri papad in 32gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 32,
    tags: ["bikaneri papad", "32gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Bikaneri Papad200Gm|200 GM*12 KG NGP",
    mrp: 70,
    productCode: "FK095302001200000D",
    description: "Premium bikaneri papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["bikaneri papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Punjabi Medium Papad 200 GM*12 KG NGP",
    mrp: 75,
    productCode: "FK184402001200000D",
    description: "Premium punjabi medium papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["punjabi medium papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/punjabi-medium-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Sneh Bandhan 400 GM*8 KG",
    mrp: 165,
    productCode: "FJ082704000800000D",
    description: "Premium gift pack sneh bandhan in 400gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["gift pack", "sneh bandhan", "400gm", "premium"],
    imageUrl: "https://example.com/images/gp-sneh-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "GP-Madhur Rishtey 600 GM*7.2 KG",
    mrp: 240,
    productCode: "FJ049306000720000D",
    description: "Premium gift pack madhur rishtey in 600gm pack size.",
    expiryDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000), // 0 months from now
    validity: "0 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 600,
    tags: ["gift pack", "madhur rishtey", "600gm", "premium"],
    imageUrl: "https://example.com/images/gp-madhur-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Atoot Rishtey 720 GM*8.64 KG",
    mrp: 290,
    productCode: "FJ014607200864000D",
    description: "Premium gift pack atoot rishtey in 720gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 720,
    tags: ["gift pack", "atoot rishtey", "720gm", "premium"],
    imageUrl: "https://example.com/images/gp-atoot-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "GP-Anmol Bandhan 950 GM*11.4 KG",
    mrp: 335,
    productCode: "FJ013909501140000D",
    description: "Premium gift pack anmol bandhan in 950gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 950,
    tags: ["gift pack", "anmol bandhan", "950gm", "premium"],
    imageUrl: "https://example.com/images/gp-anmol-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Agra Petha 200 GM*9.6 KG NGP",
    mrp: 65,
    productCode: "FH129102000960000D",
    description: "Premium agra petha in 200gm pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["agra petha", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-200gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Agra Petha 350 GM*7 KG NGP",
    mrp: 105,
    productCode: "FH129103500700000D",
    description: "Premium agra petha in 350gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 350,
    tags: ["agra petha", "350gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-350gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },
  {
    name: "Roasted Salted Cashew 35 GM*2.1 KG NGP",
    mrp: 50,
    productCode: "FE077800350210000D",
    description: "Premium roasted salted cashew in 35gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 35,
    tags: ["roasted salted cashew", "35gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/roasted-salted-cashew.jpg",
    categoryName: "Dry Fruits & Nuts",
    subCategoryName: "Premium Nuts"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Mini Samosa 200 GM*4 KG NGP",
    mrp: 65,
    productCode: "FD059302000400000D",
    description: "Premium mini samosa in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 18,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mini samosa", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-samosa-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Keshar Milk 180ml PetBottle (C/s24nos)",
    mrp: 20,
    productCode: "FDPTB0301800432",
    description: "Premium keshar milk in 180ml pet bottle.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 111,
    stockEntryDate: new Date(),
    lowStockLimit: 25,
    overStockLimit: 200,
    grammage: 180,
    tags: ["keshar milk", "180ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/keshar-milk.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Lemon Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB047607500900000D",
    description: "Premium lemon squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["lemon squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/lemon-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Orange Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB062707500900000D",
    description: "Premium orange squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 750,
    tags: ["orange squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/orange-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Rose Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB079907500900000D",
    description: "Premium rose squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 6,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["rose squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/rose-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Pineapple Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB073407500900000D",
    description: "Premium pineapple squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["pineapple squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/pineapple-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Pasta Macroni Elbow 5KG*20KG NGP (Small)",
    mrp: 470,
    productCode: "FK065550002000000D",
    description: "Premium pasta macroni elbow in 5kg pack size.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 8,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 5000,
    tags: ["pasta", "macroni", "elbow", "5kg"],
    imageUrl: "https://example.com/images/pasta-macroni-elbow.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Pellets Trikona 5 KG*20 KG NGP",
    mrp: 450,
    productCode: "FK072350002000000D",
    description: "Premium pellets trikona in 5kg pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 50,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 5000,
    tags: ["pellets", "trikona", "5kg", "premium"],
    imageUrl: "https://example.com/images/pellets-trikona.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Vermicelli400Gm|400 GM*20 KG NGP",
    mrp: 42,
    productCode: "FK116104002000000D",
    description: "Premium vermicelli in 400gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["vermicelli", "400gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Vermicelli 900 GM*21.6 KG NGP",
    mrp: 85,
    productCode: "FK116109002160000D",
    description: "Premium vermicelli in 900gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 900,
    tags: ["vermicelli", "900gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-900gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Bikaneri Papad 32 GM * 10.24 KG",
    mrp: 10,
    productCode: "FK095300401280000D",
    description: "Premium bikaneri papad in 32gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 32,
    tags: ["bikaneri papad", "32gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Bikaneri Papad200Gm|200 GM*12 KG NGP",
    mrp: 70,
    productCode: "FK095302001200000D",
    description: "Premium bikaneri papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["bikaneri papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Punjabi Medium Papad 200 GM*12 KG NGP",
    mrp: 75,
    productCode: "FK184402001200000D",
    description: "Premium punjabi medium papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["punjabi medium papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/punjabi-medium-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Sneh Bandhan 400 GM*8 KG",
    mrp: 165,
    productCode: "FJ082704000800000D",
    description: "Premium gift pack sneh bandhan in 400gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["gift pack", "sneh bandhan", "400gm", "premium"],
    imageUrl: "https://example.com/images/gp-sneh-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "GP-Madhur Rishtey 600 GM*7.2 KG",
    mrp: 240,
    productCode: "FJ049306000720000D",
    description: "Premium gift pack madhur rishtey in 600gm pack size.",
    expiryDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000), // 0 months from now
    validity: "0 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 600,
    tags: ["gift pack", "madhur rishtey", "600gm", "premium"],
    imageUrl: "https://example.com/images/gp-madhur-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Atoot Rishtey 720 GM*8.64 KG",
    mrp: 290,
    productCode: "FJ014607200864000D",
    description: "Premium gift pack atoot rishtey in 720gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 720,
    tags: ["gift pack", "atoot rishtey", "720gm", "premium"],
    imageUrl: "https://example.com/images/gp-atoot-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "GP-Anmol Bandhan 950 GM*11.4 KG",
    mrp: 335,
    productCode: "FJ013909501140000D",
    description: "Premium gift pack anmol bandhan in 950gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 950,
    tags: ["gift pack", "anmol bandhan", "950gm", "premium"],
    imageUrl: "https://example.com/images/gp-anmol-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Agra Petha 200 GM*9.6 KG NGP",
    mrp: 65,
    productCode: "FH129102000960000D",
    description: "Premium agra petha in 200gm pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["agra petha", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-200gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Agra Petha 350 GM*7 KG NGP",
    mrp: 105,
    productCode: "FH129103500700000D",
    description: "Premium agra petha in 350gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 350,
    tags: ["agra petha", "350gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-350gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },
  {
    name: "Roasted Salted Cashew 35 GM*2.1 KG NGP",
    mrp: 50,
    productCode: "FE077800350210000D",
    description: "Premium roasted salted cashew in 35gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 35,
    tags: ["roasted salted cashew", "35gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/roasted-salted-cashew.jpg",
    categoryName: "Dry Fruits & Nuts",
    subCategoryName: "Premium Nuts"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Mini Samosa 200 GM*4 KG NGP",
    mrp: 65,
    productCode: "FD059302000400000D",
    description: "Premium mini samosa in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 18,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mini samosa", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-samosa-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Keshar Milk 180ml PetBottle (C/s24nos)",
    mrp: 20,
    productCode: "FDPTB0301800432",
    description: "Premium keshar milk in 180ml pet bottle.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 111,
    stockEntryDate: new Date(),
    lowStockLimit: 25,
    overStockLimit: 200,
    grammage: 180,
    tags: ["keshar milk", "180ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/keshar-milk.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Lemon Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB047607500900000D",
    description: "Premium lemon squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["lemon squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/lemon-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Orange Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB062707500900000D",
    description: "Premium orange squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 750,
    tags: ["orange squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/orange-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Rose Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB079907500900000D",
    description: "Premium rose squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 6,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["rose squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/rose-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Pineapple Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB073407500900000D",
    description: "Premium pineapple squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["pineapple squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/pineapple-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Pasta Macroni Elbow 5KG*20KG NGP (Small)",
    mrp: 470,
    productCode: "FK065550002000000D",
    description: "Premium pasta macroni elbow in 5kg pack size.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 8,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 5000,
    tags: ["pasta", "macroni", "elbow", "5kg"],
    imageUrl: "https://example.com/images/pasta-macroni-elbow.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Pellets Trikona 5 KG*20 KG NGP",
    mrp: 450,
    productCode: "FK072350002000000D",
    description: "Premium pellets trikona in 5kg pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 50,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 5000,
    tags: ["pellets", "trikona", "5kg", "premium"],
    imageUrl: "https://example.com/images/pellets-trikona.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Vermicelli400Gm|400 GM*20 KG NGP",
    mrp: 42,
    productCode: "FK116104002000000D",
    description: "Premium vermicelli in 400gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["vermicelli", "400gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Vermicelli 900 GM*21.6 KG NGP",
    mrp: 85,
    productCode: "FK116109002160000D",
    description: "Premium vermicelli in 900gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 900,
    tags: ["vermicelli", "900gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-900gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Bikaneri Papad 32 GM * 10.24 KG",
    mrp: 10,
    productCode: "FK095300401280000D",
    description: "Premium bikaneri papad in 32gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 32,
    tags: ["bikaneri papad", "32gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Bikaneri Papad200Gm|200 GM*12 KG NGP",
    mrp: 70,
    productCode: "FK095302001200000D",
    description: "Premium bikaneri papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    validity: "3 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["bikaneri papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/bikaneri-papad-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Punjabi Medium Papad 200 GM*12 KG NGP",
    mrp: 75,
    productCode: "FK184402001200000D",
    description: "Premium punjabi medium papad in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["punjabi medium papad", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/punjabi-medium-papad.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Sneh Bandhan 400 GM*8 KG",
    mrp: 165,
    productCode: "FJ082704000800000D",
    description: "Premium gift pack sneh bandhan in 400gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["gift pack", "sneh bandhan", "400gm", "premium"],
    imageUrl: "https://example.com/images/gp-sneh-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "GP-Madhur Rishtey 600 GM*7.2 KG",
    mrp: 240,
    productCode: "FJ049306000720000D",
    description: "Premium gift pack madhur rishtey in 600gm pack size.",
    expiryDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000), // 0 months from now
    validity: "0 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 600,
    tags: ["gift pack", "madhur rishtey", "600gm", "premium"],
    imageUrl: "https://example.com/images/gp-madhur-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "GP-Atoot Rishtey 720 GM*8.64 KG",
    mrp: 290,
    productCode: "FJ014607200864000D",
    description: "Premium gift pack atoot rishtey in 720gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 720,
    tags: ["gift pack", "atoot rishtey", "720gm", "premium"],
    imageUrl: "https://example.com/images/gp-atoot-rishtey.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "GP-Anmol Bandhan 950 GM*11.4 KG",
    mrp: 335,
    productCode: "FJ013909501140000D",
    description: "Premium gift pack anmol bandhan in 950gm pack size.",
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
    validity: "4 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 950,
    tags: ["gift pack", "anmol bandhan", "950gm", "premium"],
    imageUrl: "https://example.com/images/gp-anmol-bandhan.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Agra Petha 200 GM*9.6 KG NGP",
    mrp: 65,
    productCode: "FH129102000960000D",
    description: "Premium agra petha in 200gm pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 0,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 200,
    tags: ["agra petha", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-200gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Agra Petha 350 GM*7 KG NGP",
    mrp: 105,
    productCode: "FH129103500700000D",
    description: "Premium agra petha in 350gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 9,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 350,
    tags: ["agra petha", "350gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/agra-petha-350gm.jpg",
    categoryName: "Sweets & Desserts",
    subCategoryName: "Barfis"
  },
  {
    name: "Roasted Salted Cashew 35 GM*2.1 KG NGP",
    mrp: 50,
    productCode: "FE077800350210000D",
    description: "Premium roasted salted cashew in 35gm pack size.",
    expiryDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 5 months from now
    validity: "5 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 35,
    tags: ["roasted salted cashew", "35gm", "premium", "nuts"],
    imageUrl: "https://example.com/images/roasted-salted-cashew.jpg",
    categoryName: "Dry Fruits & Nuts",
    subCategoryName: "Premium Nuts"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Mini Samosa 200 GM*4 KG NGP",
    mrp: 65,
    productCode: "FD059302000400000D",
    description: "Premium mini samosa in 200gm pack size.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 18,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 200,
    tags: ["mini samosa", "200gm", "premium", "traditional"],
    imageUrl: "https://example.com/images/mini-samosa-200gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Keshar Milk 180ml PetBottle (C/s24nos)",
    mrp: 20,
    productCode: "FDPTB0301800432",
    description: "Premium keshar milk in 180ml pet bottle.",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    validity: "6 months",
    stock: 111,
    stockEntryDate: new Date(),
    lowStockLimit: 25,
    overStockLimit: 200,
    grammage: 180,
    tags: ["keshar milk", "180ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/keshar-milk.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Lemon Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB047607500900000D",
    description: "Premium lemon squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["lemon squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/lemon-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Orange Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB062707500900000D",
    description: "Premium orange squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 32,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 750,
    tags: ["orange squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/orange-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Rose Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB079907500900000D",
    description: "Premium rose squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 6,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["rose squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/rose-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },
  {
    name: "Pineapple Squash 750 ML*9L NGP",
    mrp: 175,
    productCode: "FB073407500900000D",
    description: "Premium pineapple squash in 750ml bottle.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 2,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 750,
    tags: ["pineapple squash", "750ml", "premium", "beverage"],
    imageUrl: "https://example.com/images/pineapple-squash.jpg",
    categoryName: "Beverages",
    subCategoryName: "Traditional Drinks"
  },

  // Snacks & Namkeen - Final Additional Products
  {
    name: "Pasta Macroni Elbow 5KG*20KG NGP (Small)",
    mrp: 470,
    productCode: "FK065550002000000D",
    description: "Premium pasta macroni elbow in 5kg pack size.",
    expiryDate: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
    validity: "18 months",
    stock: 8,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 5000,
    tags: ["pasta", "macroni", "elbow", "5kg"],
    imageUrl: "https://example.com/images/pasta-macroni-elbow.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Pellets Trikona 5 KG*20 KG NGP",
    mrp: 450,
    productCode: "FK072350002000000D",
    description: "Premium pellets trikona in 5kg pack size.",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 12 months from now
    validity: "12 months",
    stock: 50,
    stockEntryDate: new Date(),
    lowStockLimit: 10,
    overStockLimit: 100,
    grammage: 5000,
    tags: ["pellets", "trikona", "5kg", "premium"],
    imageUrl: "https://example.com/images/pellets-trikona.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },

  // Snacks & Namkeen - Final Products
  {
    name: "Vermicelli400Gm|400 GM*20 KG NGP",
    mrp: 42,
    productCode: "FK116104002000000D",
    description: "Premium vermicelli in 400gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 1,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 400,
    tags: ["vermicelli", "400gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-400gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
  {
    name: "Vermicelli 900 GM*21.6 KG NGP",
    mrp: 85,
    productCode: "FK116109002160000D",
    description: "Premium vermicelli in 900gm pack size.",
    expiryDate: new Date(Date.now() + 720 * 24 * 60 * 60 * 1000), // 24 months from now
    validity: "24 months",
    stock: 10,
    stockEntryDate: new Date(),
    lowStockLimit: 5,
    overStockLimit: 50,
    grammage: 900,
    tags: ["vermicelli", "900gm", "premium", "pasta"],
    imageUrl: "https://example.com/images/vermicelli-900gm.jpg",
    categoryName: "Snacks & Namkeen",
    subCategoryName: "Mixed Namkeen"
  },
];
