import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[alpha]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AlphaDirective, multi: true },
  ],
})
export class AlphaDirective implements Validator {
  @Input() alpha: any;

  validate(control: AbstractControl): ValidationErrors {
    const str: string = control.value;

    const regexp = new RegExp(/\d/g);
    return regexp.test(str) ? { hasDigit: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {}
}
