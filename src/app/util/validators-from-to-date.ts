import {FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {DateUtil} from "../modules/admin/util/date-util";

export function validatorsToDateAfterFromDate(dateFrom: string, dateTo: string, dateFormat = 'YYYY/MM/DD') {
  return (formGroup: FormGroup) => {
    const dateFromControl = formGroup.controls[dateFrom];
    const dateToControl = formGroup.controls[dateTo];


    // set error on dateToControl if validation fails
    if (!dateFromControl.value || !dateToControl.value || (dateFromControl.errors && (dateFromControl.errors['ngbDate'] && dateFromControl.errors['ngbDate'].invalid))) {
      dateToControl.setErrors(null);
    } else {
      let mDateFrom: moment.Moment | null;
      let mDateTo: moment.Moment | null;
      if (dateFromControl.value.trim) {
        mDateFrom = DateUtil.parseStringToMoment(dateFromControl.value, dateFormat);
        mDateTo = DateUtil.parseStringToMoment(dateToControl.value, dateFormat);
      } else {
        mDateFrom = DateUtil.parseInputDateToMoment(dateFromControl.value, dateFormat);
        mDateTo = DateUtil.parseInputDateToMoment(dateToControl.value, dateFormat);
      }
      if (mDateFrom && mDateTo && (mDateTo.isSameOrAfter(mDateFrom))) {
        dateToControl.setErrors(null);
      } else {
        dateToControl.setErrors({ dateToError: true });
      }
    }
  };
}
