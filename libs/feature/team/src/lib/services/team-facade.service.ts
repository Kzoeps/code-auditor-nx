import { Injectable } from '@angular/core';
import { TeamApiService } from './team-api.service';
import { TeamStateService } from './team-state.service';
import { TeamFormService } from './team-form.service';
import { forkJoin, Observable, of } from 'rxjs';
import { Team, TeamStoreState } from '../models/team';
import { switchMap, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
// @ts-ignore
import { User } from '@selise-start/user';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedServiceService } from '@selise-start/shared';

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
    private sharedServiceService: SharedServiceService
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

  initialState(): void {
    this.teamStateService.initialState();
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
        this.teamStateService.setPreviousTeamMembers(team.allMembers);
      })
    );
  }

  createAddTeamForm(): FormGroup {
    return this.teamFormService.createAddTeamForm();
  }

  createTeam(team: Team): Observable<Team> {
    team.teamMembers = this.getTeamMembers();
    team.allMembers = [...team.teamMembers];
    team.allMembers.push(team.teamLead);
    return this.teamApiService.createTeam(team).pipe(
      tap(() => this.initialState()),
      switchMap((updatedTeam: Team) => this.updateUsers(updatedTeam))
    );
  }

  updateUsers(team: Team): Observable<any> {
    return forkJoin(
      team.allMembers.map((user: User) => {
        user.memberOnTeams.push(team.id);
        return this.updateUser(user);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.sharedServiceService.updateUser(user);
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

  getPreviousMembersState(): User[] {
    return this.teamStateService.getPreviousMembers();
  }

  updateTeam(team: Team): Observable<Team> {
    const teamState = this.getTeamState();
    const previousMembers = this.getPreviousMembersState();
    team.teamMembers = teamState.teamMembers;
    team.allMembers = [...teamState.teamMembers];
    team.allMembers.push(teamState.teamLead);
    team.id = teamState.id;
    const nonMembers = this.findConflicts(previousMembers, team.allMembers);
    const newMembers = this.findConflicts(team.allMembers, previousMembers);
    return this.teamApiService.updateTeam(team)
      .pipe(
        tap(updatedTeamState => {
          this.teamStateService.updateTeam(updatedTeamState);
          this.teamStateService.setPreviousTeamMembers(updatedTeamState.allMembers);
        }),
        switchMap(() => this.updateNewMembers(team.id, newMembers)),
        switchMap(() => this.removeTeamFromUsers(nonMembers, team.id))
      );
  }

  updateNewMembers(id: number, newMembers: User[]): Observable<any> {
    if (newMembers.length > 0) {
      return forkJoin(
        newMembers.map((eachNewMember: User) => {
          eachNewMember.memberOnTeams.push(id);
          return this.updateUser(eachNewMember);
        })
      );
    } else {
      return of([]);
    }
  }

  removeTeamFromUsers(nonMembers: User[], id): Observable<any> {
    return forkJoin(
      nonMembers.map((eachNonMember: User) => {
        eachNonMember.memberOnTeams.filter((eachTeamId) => id !== eachTeamId);
        return this.updateUser(eachNonMember);
      })
    );
  }

  findConflicts(teamMembers: User[], teamMembers2: User[]): User[] {
    const nonMembers = [];
    teamMembers.forEach((eachPreviousMember) => {
      const isCurrentMember = teamMembers2.filter((eachCurrentMember) => eachCurrentMember.id === eachPreviousMember.id);
      if (isCurrentMember.length === 0) {
        nonMembers.push(eachPreviousMember);
      }
    });
    return nonMembers;
  }

  getUsers(): Observable<User[]> {
    return this.sharedServiceService.getUsers();
  }
}
