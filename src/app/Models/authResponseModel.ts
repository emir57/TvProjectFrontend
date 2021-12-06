import { ResponseModel } from "./responseModel";
import { TokenResponseModel } from "./tokenResponseModel";
import { User } from "./user";

export interface AuthResponseModel {

  accessToken: TokenResponseModel;
  user: User;

}
