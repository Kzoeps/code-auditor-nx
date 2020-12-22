import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES } from '../../constants/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'selise-start-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authFacadeService: AuthFacadeService
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
    this.authFacadeService.login(this.loginForm)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((token) => {
        console.log(token);
      })
  }

}
