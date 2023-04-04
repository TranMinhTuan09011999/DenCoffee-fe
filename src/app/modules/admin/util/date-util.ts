import * as _ from 'underscore';

export class DateUtil {

  public static formatStr2ObjectDate(dtStr: string): any {
    let arrDt = [];
    if (!_.isEmpty(dtStr)) {
      arrDt = dtStr.split('/');
      return {
        day: arrDt[0].length == 1 ? '0' + arrDt[0] : arrDt[0],
        month: arrDt[1].length == 1 ? '0' + arrDt[1] : arrDt[1],
        year: arrDt[2],
      };
    }
  }

}
