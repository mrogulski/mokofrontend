export class Order {
  id: number;
  status: string;
  createdDate: Date;
  dateFrom: Date;
  dateTo: Date;
  userId: number;
  adultBike: number;
  childBike: number;
  helmet: number;
  lock: number;
  pickup: Boolean;
  pickupFrom: string;
  pickupTo: String;
  pickupDistance: number;
  pickupValue: number;
  initialValue: number;
  finalValue: number;
}
