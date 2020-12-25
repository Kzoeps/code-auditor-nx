import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES, ROLES } from '../../constants/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'selise-start-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  roles = ROLES;
  returnUrl = '/auth/login';
  unAuthenticated: boolean;

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
    this.signUpForm = this.authFacadeService.createForm(FORM_TYPES.SIGNUPFORM);
  }

  register(): void {
    if (this.signUpForm.valid) {
      this.authFacadeService.register(this.signUpForm)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe(
          () => {
            this.authFacadeService.snackBar('registered successfully');
            this.router.navigate([this.returnUrl]);
          }
        );
    }
  }
}
