import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamFacadeService } from '../../services/team-facade.service';
// @ts-ignore
import { UserFacadeService } from '@selise-start/user/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TeamStoreState } from '../../models/team';
import { FormGroup } from '@angular/forms';
import { User } from '@selise-start/user';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'selise-start-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  team$: Observable<TeamStoreState>;
  users: User[];
  editTeamForm: FormGroup;
  addMemberSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private teamFacadeService: TeamFacadeService,
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.editTeamForm = this.teamFacadeService.createAddTeamForm();
    this.getTeam(id);
    this.getUsers();
  }

  getUsers(): void {
    this.teamFacadeService.getUsers()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( (users) => this.users = users);
  }

  getTeam(id: number): void {
    this.teamFacadeService.getTeam(id)
      .pipe(
        untilDestroyed(this),
        tap(team => {
            this.teamFacadeService.setForm(this.editTeamForm, team);
          }
        )
      )
      .subscribe();
    this.team$ = this.teamFacadeService.stateChange();
  }

  byId(teamLead: User, user: User): boolean {
    return teamLead.id === user.id;
  }

  removeMember(teamMember: User): void {
    this.teamFacadeService.removeMember(teamMember);
  }

  addMember(): void {
    this.addMemberSuccess = this.teamFacadeService.addMember(this.editTeamForm.controls.teamMembers.value);
  }

  updateTeamLead(): void {
    this.teamFacadeService.updateTeamLead(this.editTeamForm.controls.teamLead.value);
  }

  updateTeam(): void {
    if (this.teamFacadeService.validateForm(this.editTeamForm)){
      this.teamFacadeService.updateTeam(this.editTeamForm.value)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          complete: () => {
            this.teamFacadeService.snackBar('Updated Team');
          }
        })
    }
  }
}
