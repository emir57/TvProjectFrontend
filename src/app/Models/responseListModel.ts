import { ResponseModel } from "./responseModel";

export interface ResponseListModel<T> extends ResponseModel{
  data:T[];
}
