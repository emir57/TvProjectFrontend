import { ResponseModel } from "./responseModel";
import { TokenResponseModel } from "./tokenResponseModel";
import { User } from "./user";

export interface AuthResponseModel extends ResponseModel {

  accessToken: TokenResponseModel;
  user: User;

}
