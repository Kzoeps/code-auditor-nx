import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { User } from '../models/user';
import { UserStoreState } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends ObservableStore<UserStoreState>{

  constructor() {
    const initialState = {
      users: undefined,
      user: undefined
    }
    super({trackStateHistory: true})
    this.setState(initialState, 'INIT_STATE')
  }

  getUsers(): User[]{
    const users = this.getState().users;
    return users;
  }

  updateUsers(users: User[]): void{
    this.setState({users: users}, 'SET_USERS');
  }
}
