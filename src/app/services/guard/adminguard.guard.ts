import { User } from 'src/app/model/user/user';
import { TIPOSTORAGE } from './../../consts/StorageKeys';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario: User = JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (usuario.tipoUsuario === 'ADMINISTRADOR') {
      return true;
    }
    this.router.navigate(['/menu']);
    return false;
  }
}
