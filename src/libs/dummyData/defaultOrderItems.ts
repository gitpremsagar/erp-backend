export interface DefaultOrderItem {
  orderIndex: number; // Index of the order in defaultOrders array
  productCode: string; // Product code from defaultProducts
  quantity: number;
  deliveryDate?: Date;
  orderCompleted: boolean;
}

export const defaultOrderItems: DefaultOrderItem[] = [
  // Order 1 - COMPLETED
  {
    orderIndex: 0,
    productCode: "FD012600170734400D",
    quantity: 2,
    deliveryDate: new Date("2024-01-18"),
    orderCompleted: true
  },
  {
    orderIndex: 0,
    productCode: "HD-MDN-PRE-001",
    quantity: 1,
    deliveryDate: new Date("2024-01-18"),
    orderCompleted: true
  },
  {
    orderIndex: 0,
    productCode: "FD092100200768000D",
    quantity: 3,
    deliveryDate: new Date("2024-01-18"),
    orderCompleted: true
  },
  {
    orderIndex: 0,
    productCode: "FD092200170816000D",
    quantity: 1,
    deliveryDate: new Date("2024-01-18"),
    orderCompleted: true
  },
  {
    orderIndex: 0,
    productCode: "FD020400250720000D",
    quantity: 2,
    deliveryDate: new Date("2024-01-18"),
    orderCompleted: true
  },

  // Order 2 - SHIPPING
  {
    orderIndex: 1,
    productCode: "FE020600200864000D",
    quantity: 1,
    deliveryDate: new Date("2024-01-25"),
    orderCompleted: false
  },
  {
    orderIndex: 1,
    productCode: "FD020700221108800D",
    quantity: 2,
    deliveryDate: new Date("2024-01-25"),
    orderCompleted: false
  },
  {
    orderIndex: 1,
    productCode: "FE020800130748800D",
    quantity: 1,
    deliveryDate: new Date("2024-01-25"),
    orderCompleted: false
  },
  {
    orderIndex: 1,
    productCode: "FD028500180540000D",
    quantity: 3,
    deliveryDate: new Date("2024-01-25"),
    orderCompleted: false
  },
  {
    orderIndex: 1,
    productCode: "FD037400200600000D",
    quantity: 1,
    deliveryDate: new Date("2024-01-25"),
    orderCompleted: false
  },

  // Order 3 - PACKING
  {
    orderIndex: 2,
    productCode: "FD045900280924000D",
    quantity: 2,
    deliveryDate: new Date("2024-01-30"),
    orderCompleted: false
  },
  {
    orderIndex: 2,
    productCode: "FD047900220792002D",
    quantity: 1,
    deliveryDate: new Date("2024-01-30"),
    orderCompleted: false
  },
  {
    orderIndex: 2,
    productCode: "FD059900220950400D",
    quantity: 4,
    deliveryDate: new Date("2024-01-30"),
    orderCompleted: false
  },
  {
    orderIndex: 2,
    productCode: "FD060300170958800D",
    quantity: 1,
    deliveryDate: new Date("2024-01-30"),
    orderCompleted: false
  },
  {
    orderIndex: 2,
    productCode: "FE025700170612000D",
    quantity: 2,
    deliveryDate: new Date("2024-01-30"),
    orderCompleted: false
  },

  // Order 4 - PENDING
  {
    orderIndex: 3,
    productCode: "FD073700200480000D",
    quantity: 1,
    orderCompleted: false
  },
  {
    orderIndex: 3,
    productCode: "FD075200220660000D",
    quantity: 2,
    orderCompleted: false
  },
  {
    orderIndex: 3,
    productCode: "FD076600220660000D",
    quantity: 1,
    orderCompleted: false
  },
  {
    orderIndex: 3,
    productCode: "FE077300200864000D",
    quantity: 3,
    orderCompleted: false
  },
  {
    orderIndex: 3,
    productCode: "FE081200160768000D",
    quantity: 1,
    orderCompleted: false
  },

  // Order 5 - MODIFYING
  {
    orderIndex: 4,
    productCode: "FD050200280528000D",
    quantity: 2,
    orderCompleted: false
  },
  {
    orderIndex: 4,
    productCode: "FD084100200480000D",
    quantity: 1,
    orderCompleted: false
  },
  {
    orderIndex: 4,
    productCode: "FD084200200480000D",
    quantity: 3,
    orderCompleted: false
  },
  {
    orderIndex: 4,
    productCode: "FE089200180777600D",
    quantity: 1,
    orderCompleted: false
  },
  {
    orderIndex: 4,
    productCode: "FD012600360864000D",
    quantity: 2,
    orderCompleted: false
  }
];
