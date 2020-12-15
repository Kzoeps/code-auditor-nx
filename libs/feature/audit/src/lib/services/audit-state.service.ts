import { Injectable } from '@angular/core';
import { Audit, AuditStoreState } from '../models/audit';
import { ObservableStore } from '@codewithdan/observable-store';
import { Team } from '@selise-start/team';

@Injectable({
  providedIn: 'root'
})
export class AuditStateService extends ObservableStore<AuditStoreState>{

  constructor() {
    super({ trackStateHistory: true})
    this.initialState();
  }

  initialState(): void{
    const initialState = {
      auditsState: undefined,
      auditState: new Audit(),
      teamsState: undefined
    }
    this.setState(initialState,'INIT_STATE');
  }

  updateTeamsState(teams: Team[]) {
    const currentState = this.getState()
    currentState.teamsState = teams;
    this.setState({teamsState: currentState.teamsState}, 'UPDATE_TEAMS_STATE')
  }

  getAuditors(): Team[] {
    const auditStoreState = this.getState();
    return auditStoreState.auditState.auditors;
  }

  getAuditee(): Team {
    const auditStoreState = this.getState();
    return auditStoreState.auditState.auditee;
  }

  addAuditor(team: Team): void{
    const storeState = this.getState();
    if (storeState.auditState.auditors === undefined) {
      storeState.auditState.auditors = [team]
    } else {
      if (!(this.findAuditor(team))) storeState.auditState.auditors.push(team);
    }
    this.setState({auditState: storeState.auditState}, 'UPDATE_AUDITORS')
  }

  findAuditor(auditor: Team): boolean {
    let found = false;
    const auditors = this.getAuditors()
    auditors.forEach( eachAuditor => {
      if (eachAuditor.id === auditor.id) found=true;
    })
    return found
  }

  updateAuditee(auditee: Team): void {
    const auditStoreState = this.getState();
    auditStoreState.auditState.auditee = auditee;
    this.setState({auditState: auditStoreState.auditState},'UPDATE_AUDITEE')
  }

  removeAuditor(auditor: Team): void {
    const auditStoreState = this.getState();
    auditStoreState.auditState.auditors.forEach( eachAuditor => {
      if (eachAuditor.id === auditor.id) {
        const auditorIndex = auditStoreState.auditState.auditors.indexOf(eachAuditor);
        auditStoreState.auditState.auditors.splice(auditorIndex, 1);
      }
    })
    this.setState({auditState: auditStoreState.auditState}, 'REMOVE_AUDITOR')
  }

  updateAudits(audits: Audit[]): void {
    const auditStoreState = this.getState();
    auditStoreState.auditsState = audits;
    this.setState({auditsState: auditStoreState.auditsState}, 'UPDATE_AUDITS')
  }

  updateAudit(audit: Audit): void{
    const auditStoreState = this.getState();
    auditStoreState.auditState = audit;
    this.setState({auditState: audit},'UPDATE_AUDIT');
  }
}
