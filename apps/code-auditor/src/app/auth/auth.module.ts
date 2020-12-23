import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthBaseComponent } from './auth-base/auth-base.component';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [AuthBaseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
