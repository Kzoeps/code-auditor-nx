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
      teamState: undefined
    };
    this.setState(initialState, 'INIT_STATE');
  }

  initializeTeamState(): void {
    const initializeTeamState = {
        id: undefined,
        teamName: undefined,
        dateEstd: undefined,
        teamLead: undefined,
        teamMembers: undefined
    }
    this.setState({teamState: initializeTeamState}, 'INIT_TEAM_STATE')
  }

  updateTeams(teams: Team[]): void {
    this.setState({ teamsState: teams }, 'UPDATE_TEAMS');
  }

  updateTeam(team: Team): void {
    this.setState({ teamState: team }, 'UPDATE_TEAM');
  }

  addTeamMember(user: User): void {
    const teamStoreState = this.getState();
    if (teamStoreState.teamState.teamMembers === undefined) {
      teamStoreState.teamState.teamMembers = [user];
      this.setState({ teamState: teamStoreState.teamState }, 'ADD_TEAM_MEMBER');
    } else {
      if (!(this.findMember(user, teamStoreState.teamState.teamMembers))) {
        teamStoreState.teamState.teamMembers.push(user);
        this.setState({ teamState: teamStoreState.teamState }, 'ADD_TEAM_MEMBER');
      }
    }
  }

  findMember(user: User, users: User[]): boolean {
    let memberFound = false
    users.forEach(teamMember => {
      if (teamMember.id === user.id) {
        memberFound = true;
      }
    })
    return memberFound;
  }

  updateTeamMembers(teamMembers: User[]): void {
    const teamStoreState = this.getState();
    teamStoreState.teamState.teamMembers = teamMembers;
    this.setState({ teamState: teamStoreState.teamState }, 'UPDATE_TEAM_MEMBERS');
  }

  updateTeamLead(user: User): void {
    const teamStoreState = this.getState();
    teamStoreState.teamState.teamLead = user;
    this.setState({ teamState: teamStoreState.teamState }, 'UPDATE_TEAM_LEAD');
  }

  removeMember(teamMember): void {
    const teamStoreState = this.getState();
    const teamMembersState = teamStoreState.teamState.teamMembers;
    teamMembersState.forEach(member => {
      if (member.id === teamMember.id) {
        const memberIndex = teamMembersState.indexOf(member);
        teamMembersState.splice(memberIndex, 1);
      }
    });
    this.setState({ teamState: teamStoreState.teamState }, 'REMOVE_TEAM_MEMBER');
  }

  getTeamLead(): User {
    const teamStoreState = this.getState();
    return teamStoreState.teamState.teamLead;
  }

  getTeam(): Team {
    const teamStoreState = this.getState();
    return teamStoreState.teamState;
  }
  getTeamMembers(): User[] {
    const teamStoreState = this.getState();
    return teamStoreState.teamState.teamMembers;
  }

  addTeam(team: Team): void {
    const teamState = this.getState();
    teamState.teamsState.push(team);
    this.setState({ teamsState: teamState.teamsState }, 'ADD_TEAM');
  }
}
