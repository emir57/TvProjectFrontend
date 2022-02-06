import { User } from "./user";
import { UserCreditCard } from "./userCreditCard";

export interface CreditCardWithUser{
  userCreditCard:UserCreditCard;
  user:User;
}
