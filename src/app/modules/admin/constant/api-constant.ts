import {PortalType} from "./portal-type.enum";
import {API} from "../models/api.interface";

export class ApiConstant {
  public static LOGIN: API = {
    module: PortalType.NON_AUTH,
    uri: '/login'
  };

  public static API_GET_EMPLOYEE: API = {
    module: PortalType.USER,
    uri: '/{username}'
  };

  // session
  public static API_SESSION_ATTR_GET: API = {
    module: PortalType.SESSION,
    uri: '/{attrName}'
  };

}
