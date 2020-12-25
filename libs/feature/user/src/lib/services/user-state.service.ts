import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { User, UserStoreState } from '../models/user';
import { Team } from '@selise-start/team';

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
      usersState: [],
      userState: new User(),
      teams: []
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

  addTeam(team: Team): void {
    const teams = this.getState().teams;
    teams.push(team);
    this.setState({teams: teams});
  }

  setTeam(teams: Team[]): void {
    let teams$ = this.getState().teams;
    teams$ = teams;
    this.setState({teams: teams$});
  }
}
