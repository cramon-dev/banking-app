import { AbstractControl } from "@angular/forms";

export function validateAmount(control: AbstractControl) {
  if (control.value < 100) {
    return { deposit: { notEnough: true }};
  } else if (control.value > 10000) {
    return { deposit: { tooMuch: true }};
  }

  return null;
}