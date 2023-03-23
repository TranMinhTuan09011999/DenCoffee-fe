import {FormGroup} from "@angular/forms";

export class CustomHandleValidate {

  private formClone: any = {};
  constructor(private form: FormGroup) {
  }

  isValidForm(isReloadForm = true): boolean {
    if (isReloadForm) {
      this.storeCloneValidateForm();
    }
    return this.form.valid;
  }

  private storeCloneValidateForm() {
    // tslint:disable-next-line: forin
    for (const key in this.form.controls) {
      // @ts-ignore
      this.formClone[key] = {
        invalid: this.form.controls[key].invalid,
        errors: this.form.controls[key].errors,
        value:  this.form.controls[key].value
      };
    }
  }

  hasError(key: string, errorCode: string) {
    if (!this.formClone[key] || !this.formClone[key]['errors'] || !this.formClone[key]['errors'][errorCode]) {
      return false;
    }
    return this.formClone[key]['errors'][errorCode];
  }

}
