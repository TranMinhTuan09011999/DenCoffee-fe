import {PortalType} from "./portal-type.enum";
import {API} from "../models/api.interface";

export class ApiConstant {
  public static LOGIN: API = {
    module: PortalType.NON_AUTH,
    uri: '/login'
  };

  // ------------------ employee --------------------
  public static API_GET_EMPLOYEE: API = {
    module: PortalType.USER,
    uri: '/{username}'
  };

  public static API_GET_ALL_EMPLOYEE: API = {
    module: PortalType.EMPLOYEE,
    uri: '/all-employee'
  };

  // ------------------ session ------------------
  public static API_SESSION_ATTR_GET: API = {
    module: PortalType.SESSION,
    uri: '/{attrName}'
  };

}
