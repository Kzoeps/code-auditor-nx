import { Team } from '@selise-start/team';

export class Audit {
  id: number;
  auditee: Team;
  auditors: Team[];
  auditStartDate: string;
  status: "on-going" | "cancelled" | "closed";

  constructor() {
    this.id = undefined;
    this.auditee = new Team();
    this.auditors = [];
    this.auditStartDate = undefined;
    this.status = undefined
  }

}
export interface AuditStoreState {
  auditsState: Audit[];
  auditState: Audit;
  teamsState: Team[];
}
