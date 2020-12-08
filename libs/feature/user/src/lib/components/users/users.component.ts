import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../services/user-state.service';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'selise-start-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userFacadeService: UserFacadeService,
    private userStateService: UserStateService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userFacadeService.getUsers();
  }

}
