import {DatePipe} from '@angular/common';
import * as _ from 'underscore';
import * as moment from 'moment';
import {addMinutes, format, parse, subMinutes} from 'date-fns';

export class DateUtil {

  public static FULL_TIME = 'HH:mm:ss';
  public static SHORT_TIME = 'HH:mm';

  public static ADD_METHOD = 'ADD';
  public static SUB_METHOD = 'SUB';

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

  public static formatDateToStrWithFormat(date: Date, format = 'yyyy/MM/dd HH:mm:ss'): string {
    const pipe = new DatePipe('en-US'); // Use your own locale
    return <string>pipe.transform(date, format);
  }

  public static getHour(startDateTime: any, endDateTime: any) {
    if (endDateTime != null) {
      let start = new Date(startDateTime);
      let end = new Date(endDateTime);
      let diff = end.getTime() - start.getTime();
      let hours = diff / (1000 * 60 * 60);
      const integerPart = Math.floor(hours);
      const decimalPart = (hours - integerPart) * 60;
      if (decimalPart >= 25 && decimalPart <= 55) {
        return integerPart + 0.5;
      } else if (decimalPart > 55) {
        return integerPart + 1;
      }
      return integerPart;
    }
    return null;
  }

  public static parseStringToMoment(dateString: string, pattern = 'YYYY/MM/DD'): moment.Moment {
    return moment(dateString, pattern, true);
  }

  public static parseInputDateToMoment(dateInput: any, format = 'YYYY-MM-DD'): moment.Moment | null {
    try {
      const date = new Date(dateInput.year, dateInput.month - 1, dateInput.day);
      if (!moment(date, format).isValid()) {
        return null;
      }
      return moment(date, format, true);
    } catch (error) {
      return null;
    }
  }

  public static isBeforeMonthYear(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() < date2.getFullYear()) {
      return true;
    } else if (date1.getFullYear() === date2.getFullYear()) {
      return date1.getMonth() < date2.getMonth();
    } else {
      return false;
    }
  }

  public static changeTimeByMinutes(time: string, minutesChange: number, method: string | null): string {
    const parsedTime = parse(time, this.FULL_TIME, new Date());
    if (method == this.SUB_METHOD) {
      return format(subMinutes(parsedTime, minutesChange), this.SHORT_TIME);
    } else if (method == this.ADD_METHOD) {
      return format(addMinutes(parsedTime, minutesChange), this.SHORT_TIME);
    } else {
      return format(parsedTime, this.SHORT_TIME);
    }
  }

  public static setNewDate(date: Date, day: any, month: any, year: any,
                           hour: any, minute: any, second: any) {
    date.setDate(day !== null ? day : date.getDate());
    date.setMonth(month !== null ? month : date.getMonth());
    date.setFullYear(year !== null ? year : date.getFullYear());
    date.setHours(hour !== null ? hour : date.getHours());
    date.setMinutes(minute !== null ? minute : date.getMinutes());
    date.setSeconds(second !== null ? second : date.getSeconds());
    return date;
  }

  public static compare2DateTime(date1: Date, date2: Date) {
    if (date1 > date2) {
      return 1;
    } else if (date1 < date2) {
      return -1;
    } else {
      return 0;
    }
  }

  public static between2DateTime(startDate: Date, endDate: Date, targetDate: Date) {
    return targetDate >= startDate && targetDate <= endDate;
  }

}
