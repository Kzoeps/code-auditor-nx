import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { User, UserStoreState } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends ObservableStore<UserStoreState> {

  constructor() {
    super({ trackStateHistory: true });
    this.intialState();
  }

  intialState(): void {
    const initialState = {
      usersState: undefined,
      userState: undefined
    };
    this.setState(initialState, 'INIT_STATE');
  }

  updateUsers(users: User[]): void {
    this.setState({ usersState: users }, 'UPDATE_USERS');
  }
}
