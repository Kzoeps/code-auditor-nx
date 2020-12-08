import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(
    private userApiService: UserApiService,
    private userStateService: UserStateService
  ) { }

  getUsers(): Observable<User[]>{
    return this.userApiService.getUsers().pipe(
      tap(users => {
        this.userStateService.updateUsers(users);
      })
    )
  }
}
