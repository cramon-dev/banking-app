import { AbstractControl } from "@angular/forms";

export function validateAmount(control: AbstractControl) {
  if (control.value < 100) {
    return { invalidAmount: true }
  }

  return null;
}