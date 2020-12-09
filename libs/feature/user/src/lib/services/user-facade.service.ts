import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { Observable } from 'rxjs';
import { User, UserStoreState } from '../models/user';
import { tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor( private userApiService: UserApiService, private userStateService: UserStateService) { }

  initialize(): void{
    this.userStateService.intialState();
  }

  stateChange(): Observable<UserStoreState> {
    return this.userStateService.stateChanged
  }
  getUsers(): Observable<User[]>{
    return this.userApiService.getUsers().pipe(
      tap(users => {
        this.userStateService.updateUsers(users);
      })
    )
  }
}
