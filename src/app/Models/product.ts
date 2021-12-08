import { Photo } from "./photo";

export interface Product{
  id:number;
  productName:string;
  productCode:string;
  screenType:string;
  screenInch:string;
  extras:string;
  brandId:number;
  unitPrice:number;
  discount:number;
  isDiscount:boolean;
  photos:Photo[]
}
