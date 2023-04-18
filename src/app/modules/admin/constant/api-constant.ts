import {PortalType} from "./portal-type.enum";
import {API} from "../models/api.interface";

export class ApiConstant {
  public static LOGIN: API = {
    module: PortalType.NON_AUTH,
    uri: '/login'
  };

  public static CHECK_TOKEN: API = {
    module: PortalType.NON_AUTH,
    uri: '/check-token/{token}'
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

  public static API_GET_ADMIN_ATTENDANCE_FOR_TODAY: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/get-attendance'
  };

  public static API_CHECK_IP_ADDRESS: API = {
    module: PortalType.USER,
    uri: '/ip/ip-address-attendance'
  };

  public static API_GET_ATTENDANCE_FOR_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/get-attendance-for-employee'
  };

  // ------------------ session ------------------
  public static API_SESSION_ATTR_GET: API = {
    module: PortalType.SESSION,
    uri: '/{attrName}'
  };

  // ------------------ ip address ------------------
  public static API_REGISTER_IP_ADDRESS: API = {
    module: PortalType.ADMIN,
    uri: '/ip-address/register-ip-address'
  };

  public static API_GET_IP_ADDRESS: API = {
    module: PortalType.ADMIN,
    uri: '/ip-address/get-ip-address'
  };

  public static API_UPDATE_IP_ADDRESS: API = {
    module: PortalType.ADMIN,
    uri: '/ip-address/update-ip-address'
  };

  public static API_CHECK_EXIST_IP_ADDRESS: API = {
    module: PortalType.ADMIN,
    uri: '/ip-address/check-exist-ip-address/{ipAddress}'
  };

  public static API_DELETE_IP_ADDRESS: API = {
    module: PortalType.ADMIN,
    uri: '/ip-address/delete-ip-address'
  };

  // ------------------ payroll ------------------
  public static API_GET_PAYROLL_FOR_MONTH_YEAR: API = {
    module: PortalType.ADMIN,
    uri: '/payroll/get-payroll/{month}/{year}'
  };

  public static API_ADD_NEW_SALARY_FOR_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/payroll/new-salary/{employeeId}/{newSalary}'
  };

  public static API_GET_NEW_SALARY_FOR_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/payroll/get-new-salary/{employeeId}'
  };

}
