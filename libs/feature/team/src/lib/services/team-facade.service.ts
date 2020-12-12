import { Injectable } from '@angular/core';
import { TeamApiService } from './team-api.service';
import { TeamStateService } from './team-state.service';
import { TeamFormService } from './team-form.service';
import { Observable } from 'rxjs';
import { Team, TeamStoreState } from '../models/team';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
// @ts-ignore
import { User } from '@selise-start/user/model/user';


@Injectable({
  providedIn: 'root'
})
export class TeamFacadeService {

  constructor(
    private teamApiService: TeamApiService,
    private teamStateService: TeamStateService,
    private teamFormService: TeamFormService
  ) {
  }

  stateChange(): Observable<TeamStoreState> {
    return this.teamStateService.stateChanged;
  }

  getTeams(): Observable<Team[]> {
    return this.teamApiService.getTeams().pipe(
      tap(teams => this.teamStateService.updateTeams(teams))
    );
  }

  getTeam(id: number): Observable<Team> {
    return this.teamApiService.getTeam(id).pipe(
      tap(team => this.teamStateService.updateTeam(team))
    );
  }

  createAddTeamForm(): FormGroup {
    return this.teamFormService.createAddTeamForm();
  }

  createTeam(team: Team): Observable<Team> {
    team.teamMembers = this.getTeamMembers();
      return this.teamApiService.createTeam(team).pipe(
        tap(teamState => {
          this.teamStateService.updateTeam(teamState);
        })
      );
  }

  clearForm(form: FormGroup): void {
    this.teamFormService.clearForm(form);
  }

  addMember(user: User): boolean {
    if (user) {
      if (this.teamFormService.validTeamMember(user)) {
        this.teamStateService.addTeamMember(user);
        return true;
      } else {
        return false;
      }
    }
  }

  getTeamLead(): User {
    return this.teamStateService.getTeamLead();
  }

  updateTeamLead(user: User): void {
    this.teamStateService.updateTeamLead(user);
  }

  validateForm(form: FormGroup): boolean {
    return this.teamFormService.validateForm(form);
  }

  getTeamMembers(): User[] {
    return this.teamStateService.getTeamMembers();
  }

  removeMember(teamMember): void {
    this.teamStateService.removeMember(teamMember);
  }
}
