import { Product } from "./product";
import { User } from "./user";

export interface OrderModel{
  user:User;
  tv:Product;
  shippedDate:Date;
  totalPrice:number;
  addressText:string;
  city:string;
}
