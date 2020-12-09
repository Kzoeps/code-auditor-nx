import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatGridListModule, RouterModule],
  declarations: [UserDetailComponent, UsersComponent],
  exports: [UserDetailComponent, UsersComponent],
})
export class FeatureUserModule {}
