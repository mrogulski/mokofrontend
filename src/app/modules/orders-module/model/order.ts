import { User } from "../../users-module/model/user";

export class Order {
  id: number;
  status: string;
  createdDate: string;
  dateFrom: string;
  dateTo: string;
  user: number;
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
