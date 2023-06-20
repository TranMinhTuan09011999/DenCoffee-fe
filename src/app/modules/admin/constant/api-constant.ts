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

  public static LOGOUT: API = {
    module: PortalType.NON_AUTH,
    uri: '/logout'
  };

  public static HAS_AUTHORIZE: API = {
    module: PortalType.NON_AUTH,
    uri: '/hasAuthorize/{role}'
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

  public static API_GET_ATTENDANCE_FOR_EMPLOYEE: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/get-attendance-for-employee'
  };

  public static API_DOWNLOAD_EXCEL_FOR_MONTH_YEAR: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/download-excel/{month}/{year}'
  };

  public static API_DOWNLOAD_EXCEL_FOR_ALL: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/download-excel-all'
  };

  public static API_UPDATE_PAYROLL_STATUS: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/update-payroll-status/{payrollId}'
  };

  public static API_UPDATE_ATTENDANCE: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/update-attendance'
  };

  public static API_DELETE_ATTENDANCE: API = {
    module: PortalType.ADMIN,
    uri: '/attendance/delete-attendance/{attendanceId}'
  };

  // ------------------ session ------------------
  public static API_SESSION_ATTR_GET: API = {
    module: PortalType.SESSION,
    uri: '/{attrName}'
  };

  // ------------------ payroll ------------------
  public static API_GET_PAYROLL_FOR_MONTH_YEAR: API = {
    module: PortalType.ADMIN,
    uri: '/payroll/get-payroll/{month}/{year}'
  };

  public static API_UPDATE_BONUS_PAYROLL: API = {
    module: PortalType.ADMIN,
    uri: '/payroll/update-bonus/{payrollId}/{bonus}'
  };

  // ------------- Position ----------------
  public static API_GET_ALL_POSITION: API = {
    module: PortalType.ADMIN,
    uri: '/position/get-all-position'
  };

  // ------------ Salary Advance -------------
  public static API_SAVE_SALARY_ADVANCE: API = {
    module: PortalType.ADMIN,
    uri: '/salary-advance/save-salary-advance'
  };

  public static API_GET_SALARY_ADVANCE: API = {
    module: PortalType.ADMIN,
    uri: '/salary-advance/get-salary-advance/{payrollId}'
  };

  // ------------- Salary Detail ---------------
  public static API_GET_ALL_CURRENT_SALARY_DETAIL: API = {
    module: PortalType.ADMIN,
    uri: '/salary-detail/get-all-salary-detail'
  };

  public static API_UPDATE_CURRENT_SALARY_DETAIL: API = {
    module: PortalType.ADMIN,
    uri: '/salary-detail/update-salary-detail'
  };

}
