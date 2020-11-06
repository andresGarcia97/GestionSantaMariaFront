import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TKSTORAGE } from 'src/app/consts/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = JSON.parse(localStorage.getItem(TKSTORAGE));
    if (token === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
