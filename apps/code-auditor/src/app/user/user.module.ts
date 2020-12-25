import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserBaseComponent } from './user-base/user-base.component';
import { SharedModule } from '@selise-start/shared';

@NgModule({
  declarations: [UserBaseComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
