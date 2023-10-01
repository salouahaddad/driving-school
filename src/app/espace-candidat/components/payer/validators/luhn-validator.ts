import { AbstractControl } from "@angular/forms";

export function luhnValidator(control: AbstractControl): { [key: string]: any } | null {
    const cardNumber = control.value;
    if (cardNumber && !luhnCheck(cardNumber)) {
      return { 'invalidCardNumber': true };
    }
    return null;
  }
  
 
  function luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let alternate = false;
  
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
  
      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      alternate = !alternate;
    }
  
    return sum % 10 === 0;
  }
  
  
  
  
  
  
  
  