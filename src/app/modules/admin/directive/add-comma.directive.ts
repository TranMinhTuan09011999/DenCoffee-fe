import {Directive, ElementRef, HostListener} from '@angular/core';
import {CommonUtil} from "../../shared/util/common-util";

@Directive({
  selector: '[addCommaDirective]'
})
export class AddCommaDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
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
      this.el.nativeElement.value = x1 + x2;
    } else {
      this.el.nativeElement.value = '';
    }
  }

}
