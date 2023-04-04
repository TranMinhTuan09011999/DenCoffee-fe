import { Pipe, PipeTransform } from '@angular/core';
import {CommonUtil} from "../../shared/util/common-util";

@Pipe({
  name: 'nullHyphen'
})
export class NullHyphenPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return CommonUtil.getValueWithDefaultHyphen(value);
  }

}
