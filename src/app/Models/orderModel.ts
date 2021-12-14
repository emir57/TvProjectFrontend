import { Product } from "./product";
import { ProductAndPhoto } from "./productAndPhoto";
import { User } from "./user";

export interface OrderModel{
  id:number;
  user:User;
  tv:ProductAndPhoto;
  shippedDate:Date;
  totalPrice:number;
  addressText:string;
  city:string;
}
