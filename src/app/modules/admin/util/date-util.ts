import * as moment from 'moment';

export class DateUtil {
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
}
