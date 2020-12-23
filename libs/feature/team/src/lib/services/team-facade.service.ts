import { Injectable } from '@angular/core';
import { TeamApiService } from './team-api.service';
import { TeamStateService } from './team-state.service';
import { TeamFormService } from './team-form.service';
import { Observable } from 'rxjs';
import { Team, TeamStoreState } from '../models/team';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
// @ts-ignore
import { User } from '@selise-start/user';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { UserFacadeService } from '@selise-start/user/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class TeamFacadeService {

  //TODO: fix the validation of team lead and team member, has to go both ways.
  constructor(
    private teamApiService: TeamApiService,
    private teamStateService: TeamStateService,
    private teamFormService: TeamFormService,
    private _snackBar: MatSnackBar,
    private userFacadeService: UserFacadeService
  ) {
  }

  stateChange(): Observable<TeamStoreState> {
    return this.teamStateService.stateChanged;
  }

  snackBar(message): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, '', {
      duration: 2000
    });
  }

  getTeams(): Observable<Team[]> {
    return this.teamApiService.getTeams().pipe(
      tap(teams => this.teamStateService.updateTeams(teams))
    );
  }

  getTeam(id: number): Observable<Team> {
    return this.teamApiService.getTeam(id).pipe(
      tap(team => {
        this.teamStateService.updateTeam(team);
        this.teamStateService.updateTeamMembers(team.teamMembers);
        this.teamStateService.updateTeamLead(team.teamLead);
      })
    );
  }

  createAddTeamForm(): FormGroup {
    return this.teamFormService.createAddTeamForm();
  }

  createTeam(team: Team): Observable<Team> {
    team.teamMembers = this.getTeamMembers();
    team.teamMembers.push(team.teamLead);
    return this.teamApiService.createTeam(team).pipe(
      tap((teamState)=> {
        // TODO: Subscription within subscription!
        this.addTeamToUsers(team.teamMembers, teamState.id)
        team.teamMembers.forEach((eachMember) => {
          this.userFacadeService.updateUser(eachMember)
            .pipe(untilDestroyed(this))
            .subscribe()
        })
      }),
    );
  }

  addTeamToUsers(users: User[], teamID: number): void{
    users.map((eachUser) => {
      eachUser.memberOnTeams.push(teamID);
    })
  }

  clearForm(form: FormGroup): void {
    this.teamFormService.clearForm(form);
  }

  setForm(form: FormGroup, team: Team) {
    this.teamFormService.setForm(form, team);
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

  getTeamState(): Team {
    return this.teamStateService.getTeam();
  }

  updateTeam(team: Team): Observable<Team> {
    const teamState = this.getTeamState();
    team.teamMembers = teamState.teamMembers;
    team.id = teamState.id;
    return this.teamApiService.updateTeam(team)
      .pipe(
        tap(updatedTeamState => {
          this.teamStateService.updateTeam(updatedTeamState);
        })
      );
  }
}
