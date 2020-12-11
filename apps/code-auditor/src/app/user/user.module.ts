import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserBaseComponent } from './user-base/user-base.component';

@NgModule({
  declarations: [UserBaseComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
