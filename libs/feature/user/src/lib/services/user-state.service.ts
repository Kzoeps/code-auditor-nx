import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { User, UserStoreState } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends ObservableStore<UserStoreState> {

  constructor() {
    super({ trackStateHistory: true });
    this.initialState();
  }

  initialState(): void {
    const initialState = {
      usersState: undefined,
      userState: undefined
    };
    this.setState(initialState, 'INIT_STATE');
  }

  updateUsers(users: User[]): void {
    this.setState({ usersState: users }, 'UPDATE_USERS');
  }

  updateUser(user: User): void{
    this.setState({userState: user}, 'UPDATE_USER');
  }

  removeUser(user: User): void {
    let users = this.getState().usersState;
    users = users.filter((eachUser) => user.id !== eachUser.id);
    this.setState({usersState: users});
  }
}
