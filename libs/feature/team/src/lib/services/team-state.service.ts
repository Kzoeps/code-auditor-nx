import { Injectable } from '@angular/core';
import { Team, TeamStoreState } from '../models/team';
import { ObservableStore } from '@codewithdan/observable-store';
import { User } from '../../../../user/src/lib/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamStateService extends ObservableStore<TeamStoreState> {

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
      teamMembers: undefined
    };
    this.setState(initialState, 'INIT_STATE');
  }

  updateTeams(teams: Team[]): void {
    this.setState({ teamsState: teams }, 'UPDATE_TEAMS');
  }

  updateTeam(team: Team): void {
    this.setState({ teamState: team }, 'UPDATE_TEAM');
  }

  addTeamMember(user: User): void {
    const teamStoreState = this.getState();
    if (teamStoreState.teamMembers === undefined) {
      teamStoreState.teamMembers = [user];
      this.setState({ teamMembers: teamStoreState.teamMembers }, 'ADD_TEAM_MEMBER');
    } else {
      teamStoreState.teamMembers.push(user);
      this.setState({ teamMembers: teamStoreState.teamMembers }, 'ADD_TEAM_MEMBER');
    }
  }

  updateTeamLead(user: User): void {
    const teamStoreState = this.getState();
    teamStoreState.teamLead = user;
    this.setState({ teamLead: teamStoreState.teamLead }, 'UPDATE_TEAM_LEAD');
  }

  removeMember(teamMember): void {
    const teamStoreState = this.getState();
    const teamMembersState = teamStoreState.teamMembers;
    teamMembersState.forEach(member => {
      if (member.id === teamMember.id) {
        const memberIndex = teamMembersState.indexOf(member);
        teamMembersState.splice(memberIndex, 1);
      }
    });
    this.setState({ teamMembers: teamMembersState }, 'REMOVE_TEAM_MEMBER');
  }

  getTeamLead(): User {
    const teamStoreState = this.getState();
    return teamStoreState.teamLead;
  }

  getTeamMembers(): User[] {
    const teamStoreState = this.getState();
    return teamStoreState.teamMembers;
  }
  addTeam(team: Team): void {
    const teamState = this.getState();
    teamState.teamsState.push(team);
    this.setState({teamsState: teamState.teamsState}, 'ADD_TEAM');
  }
}
