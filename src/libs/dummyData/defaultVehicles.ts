export interface DefaultVehicle {
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: 'TRUCK' | 'PICKUP' | 'OTHER';
  capacity: number;
}

export const defaultVehicles: DefaultVehicle[] = [
  {
    vehicleName: "Delivery Truck 1",
    vehicleNumber: "MH-01-AB-1234",
    vehicleType: "TRUCK",
    capacity: 5000
  },
  {
    vehicleName: "Pickup Van 1",
    vehicleNumber: "DL-02-CD-5678",
    vehicleType: "PICKUP",
    capacity: 1000
  },
  {
    vehicleName: "Delivery Truck 2",
    vehicleNumber: "KA-03-EF-9012",
    vehicleType: "TRUCK",
    capacity: 3000
  }
];
