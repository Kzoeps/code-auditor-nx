import { Team } from '@selise-start/team';
import { Memo } from './memo';

export class Audit {
  id: number;
  auditee: Team;
  auditors: Team[];
  auditStartDate: string;
  status: "on-going" | "cancelled" | "closed";
  memos: Memo[];
  resolved: Memo[];
  tbd: Memo[];

  constructor() {
    this.id = undefined;
    this.auditee = new Team();
    this.auditors = [];
    this.auditStartDate = undefined;
    this.status = undefined;
    this.memos = [];
    this.resolved = [];
    this.tbd = [];
  }

}
export interface AuditStoreState {
  auditsState: Audit[];
  auditState: Audit;
  teamsState: Team[];
}
