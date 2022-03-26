import { ResponseModel } from "./responseModel";

export interface ResponseSingleModel<T> extends ResponseModel{
  data:T
}
