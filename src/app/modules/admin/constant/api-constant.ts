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

  public static API_GET_ALL_EMPLOYEE_BY_STATUS: API = {
    module: PortalType.ADMIN,
    uri: '/employee/all-employee/{status}'
  };

  public static API_REGISTER_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/employee/register-employee'
  };

  public static API_UPDATE_STATUS_FOR_EMPLOYEE_ID: API = {
    module: PortalType.ADMIN,
    uri: '/employee/update-status/{employeeId}/{status}'
  };

  public static API_UPDATE_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/employee/update-employee'
  };

  public static API_GET_ALL_EMPLOYEE_NAME_BY_STATUS: API = {
    module: PortalType.USER,
    uri: '/employee/employee-name/{status}'
  };

  // ------------------ work history --------------------

  public static API_GET_WORK_HISTORY_BY_EMPLOYEE_ID: API = {
    module: PortalType.ADMIN,
    uri: '/work-history/{employeeId}'
  };

  // ------------------ attendance --------------------

  public static API_SAVE_ATTENDANCE: API = {
    module: PortalType.USER,
    uri: '/attendance/save-attendance'
  };

  public static API_GET_ATTENDANCE_FOR_TODAY: API = {
    module: PortalType.USER,
    uri: '/attendance/get-attendance'
  };

  public static API_UPDATE_END_TIME_DATE: API = {
    module: PortalType.USER,
    uri: '/attendance/update-end-date-time'
  };

  // ------------------ session ------------------
  public static API_SESSION_ATTR_GET: API = {
    module: PortalType.SESSION,
    uri: '/{attrName}'
  };

}
