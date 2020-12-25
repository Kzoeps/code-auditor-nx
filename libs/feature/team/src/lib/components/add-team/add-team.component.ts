import { Component, OnInit } from '@angular/core';
import { TeamFacadeService } from '../../services/team-facade.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
// @ts-ignore
import { UserStoreState } from '@selise-start/user/model/user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TeamStoreState } from '../../models/team';
import { User } from '@selise-start/user';

@UntilDestroy()
@Component({
  selector: 'selise-start-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(
    private teamFacadeService: TeamFacadeService,
  ) {
  }

  addTeamForm: FormGroup;
  users: User[];
  teamState$: Observable<TeamStoreState>;
  addMemberSuccess: boolean;
  createTeamSuccess: boolean;

  ngOnInit(): void {
    this.teamFacadeService.initialState();
    this.createForm();
    this.getUsers();
  }

  createForm(): void {
    this.addTeamForm = this.teamFacadeService.createAddTeamForm();
    this.teamState$ = this.teamFacadeService.stateChange();
  }

  getUsers(): void {
    this.teamFacadeService.getUsers()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(
        (users) => {
          this.users = users;
        }
      );
  }

  addMember(): void {
    this.addMemberSuccess = this.teamFacadeService.addMember(this.addTeamForm.controls.teamMembers.value);
  }

  addTeam() {
    if (this.teamFacadeService.validateForm(this.addTeamForm)) {
      this.teamFacadeService.createTeam(this.addTeamForm.value)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          complete: () => {
            this.teamFacadeService.snackBar('Created Team');
            this.teamFacadeService.clearForm(this.addTeamForm);
            this.createTeamSuccess = true;
          }
        })
    } else {
      this.createTeamSuccess = false;
    }
  }

  removeMember(teamMember) {
    this.teamFacadeService.removeMember(teamMember);
  }

  updateTeamLead() {
    this.teamFacadeService.updateTeamLead(this.addTeamForm.controls.teamLead.value);
  }
}
