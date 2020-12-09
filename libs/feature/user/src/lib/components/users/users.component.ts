import { Component, OnInit } from '@angular/core';
import { User, UserStoreState } from '../../models/user';
import "@angular/compiler"
import { UserFacadeService } from '../../services/user-facade.service';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'selise-start-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  storeState$: Observable<UserStoreState>

  constructor(
    private userFacadeService: UserFacadeService
  ) {
    this.userFacadeService.initialize();
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void{
    this.userFacadeService.getUsers().subscribe();
    this.storeState$ = this.userFacadeService.stateChange();
  }
}
