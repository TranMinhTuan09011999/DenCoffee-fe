import {Pipe, PipeTransform} from '@angular/core';
import {CommonUtil} from "../../shared/util/common-util";
@Pipe({
  name: 'addComma'
})
export class AddCommaPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!CommonUtil.isNull(value)) {
      value += '';
      const comma = /,/g;
      value = value.replace(comma, '');
      const x = value.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? '.' + x[1] : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }
    return '';
  }
}
