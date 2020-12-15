import { User } from '@selise-start/user';

export interface TeamStoreState {
  teamsState: Team[];
  teamState: Team;
}

export class Team {
  id: number;
  teamName: string;
  dateEstd: string;
  teamLead: User;
  teamMembers: User[];

  constructor() {
    this.id = undefined;
    this.teamName = undefined;
    this.dateEstd = undefined;
    this.teamLead = new User();
    this.teamMembers = [];
  }

}
