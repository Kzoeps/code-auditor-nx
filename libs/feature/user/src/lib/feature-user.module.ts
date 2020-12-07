import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserDetailComponent, UsersComponent],
  exports: [UserDetailComponent, UsersComponent],
})
export class FeatureUserModule {}
