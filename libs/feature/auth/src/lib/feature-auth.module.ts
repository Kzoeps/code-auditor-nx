import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UnapprovedUserComponent } from './components/unapproved-user/unapproved-user.component';
import { SharedModule } from '@selise-start/shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ['localhost:4200']
      }
    }),
    RouterModule
  ],
  declarations: [SignupComponent, LoginComponent, UnapprovedUserComponent],
  exports: [SignupComponent, LoginComponent, UnapprovedUserComponent]
})
export class FeatureAuthModule {
}
