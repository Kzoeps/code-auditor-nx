import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES } from '../../constants/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '@selise-start/user';

@UntilDestroy()
@Component({
  selector: 'selise-start-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  unAuthenticated: boolean;
  error: string;

  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    if (!(this.authFacadeService.isAuthenticated())) {
      this.createForm();
      this.unAuthenticated = true;
    } else {
      this.authFacadeService.goBack();
    }
  }

  createForm(): void {
    this.loginForm = this.authFacadeService.createForm(FORM_TYPES.LOGINFORM);
  }

  login(): void {
    let tokenPayload, tokenAccess, uid;
    this.authFacadeService.login(this.loginForm)
      .pipe(
        untilDestroyed(this),
        tap((token) => {
          // @ts-ignore
          tokenAccess = token.accessToken;
          // @ts-ignore
          tokenPayload = this.authFacadeService.decodeJWT(token.accessToken);
          uid = +tokenPayload.sub;
        }),
        switchMap(() => this.authFacadeService.getUser(uid))
      )
      .subscribe((user) => {
        this.error = '';
        this.navigateUser(user, tokenAccess);
      }, () => {
        this.error = 'Sorry :( Credentials Dont Match!';
      });
  }

  setUser(user: User, tokenAccess): void {
    const currentUser = {
      token: tokenAccess,
      email: user.email,
      id: user.id,
      admin: user.admin,
      approved: user.approved
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
    this.router.navigate(['users']);
  }
  navigateUser(user: User, tokenAccess): void {
    if (user.approved) {
      this.setUser(user, tokenAccess);
    } else {
      this.router.navigate(['auth/unapproved']);
    }
  }
}
