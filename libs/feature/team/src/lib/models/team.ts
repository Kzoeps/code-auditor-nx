import { User } from '@selise-start/user';

export interface TeamStoreState {
  teamsState: Team[];
  teamState: Team;
  previousTeamMembers: User[];
}

export class Team {
  id: number;
  teamName: string;
  dateEstd: string;
  teamLead: User;
  teamMembers: User[];
  allMembers: User[]; // includes the team lead as well

  constructor() {
    this.id = undefined;
    this.teamName = undefined;
    this.dateEstd = undefined;
    this.teamLead = new User();
    this.teamMembers = [];
    this.allMembers = [];
  }

}
