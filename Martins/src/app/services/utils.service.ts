import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  removeWhitespace(value: string): string {
    return value.trim();
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value == null) return null;

    const trimmedValue = control.value.trim();
    const isWhitespace = trimmedValue.length === 0;

    if (isWhitespace) return { whitespace: true };
    else return null;
  }

  invalidDate(date: Date): boolean {
    if (date == null) return true;

    const currentDate = new Date();
    const selectedDate = new Date(date);

    const past = new Date(currentDate);
    past.setFullYear(currentDate.getFullYear() - 50);

    const future = new Date(currentDate);
    future.setFullYear(currentDate.getFullYear() + 50);

    return selectedDate < past && selectedDate > future;
  }
}
