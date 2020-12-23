import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES } from '../../constants/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { throwUnknownPortalTypeError } from '@angular/cdk/portal/portal-errors';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'selise-start-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.authFacadeService.createForm(FORM_TYPES.LOGINFORM)
  }

  login(): void{
    let tokenPayload;
    let tokenAccess;
    let uid;
    this.authFacadeService.login(this.loginForm)
      .pipe(
        untilDestroyed(this),
        tap ((token) => {
          // @ts-ignore
          tokenAccess = token.accessToken;
          // @ts-ignore
          tokenPayload = this.authFacadeService.decodeJWT(token.accessToken);
          // @ts-ignore
          uid = +tokenPayload.sub;
        }),
        switchMap(() => this.authFacadeService.getUser(uid))
      )
      .subscribe((user) => {
        if (user.approved) {
          const currentUser = {
            token: tokenAccess,
            email: user.email,
            id: user.id,
            admin: user.admin,
            approved: user.approved,
          }
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.router.navigate(['users'])
        } else {
          this.router.navigate(['auth/unapproved'])
        }
      })
  }

}
