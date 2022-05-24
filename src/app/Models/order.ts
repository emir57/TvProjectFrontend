export interface Order{
  id?:number;
  userId:number;
  tvId:number;
  shippedDate?:Date;
  totalPrice:number;
  addressId:number;
}
