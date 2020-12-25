import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacadeService } from '../services/auth-facade.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authFacadeService: AuthFacadeService,
    private _location: Location,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = +route.paramMap.get('id')
    if (this.authFacadeService.isAdmin() || this.authFacadeService.isResourceOwner(id)) {
      return true
    }
    this._location.back();
  }

}
