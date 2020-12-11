import { Injectable } from '@angular/core';
import { Team, TeamStoreState } from '../models/team';
import { ObservableStore } from '@codewithdan/observable-store';

@Injectable({
  providedIn: 'root'
})
export class TeamStateService extends ObservableStore<TeamStoreState>{

  constructor() {
    super({
      trackStateHistory: true
    });
    this.initialState();
  }

  initialState(): void {
    const initialState = {
      teamsState: undefined,
      teamState: undefined,
    }
    this.setState(initialState, 'INIT_STATE');
  }

  updateTeams(teams: Team[]): void {
    this.setState({ teamsState: teams }, 'UPDATE_TEAMS');
  }

  updateTeam(team: Team): void {
    this.setState({ teamState: team}, 'UPDATE_TEAM');
  }
}
