import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(
  ) { }

  canActivate(): boolean {
    
    let token = sessionStorage.getItem('token');
    let id = sessionStorage.getItem('id')
    let email = sessionStorage.getItem('email')

    if (!token || !id || !email) {
      return false;
    } else {
      return true;
    }

  }
}
