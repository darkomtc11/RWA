import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  static matchPassword(control: AbstractControl): { [key: string]: any } | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.pristine || confirmPassword.pristine) return null;
    let ret = (password && confirmPassword && password.value !== confirmPassword.value) ? { passwordMismatch: true } : null;
    confirmPassword.setErrors(ret);
    console.log(ret);
    return ret;
  }
}
