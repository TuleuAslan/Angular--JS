import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function alpha(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const str: string = control.value;

    const regexp = new RegExp(/\d/g);
    return regexp.test(str) ? { hasDigit: true } : null;
  };
}
