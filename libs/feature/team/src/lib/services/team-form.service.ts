import { Injectable } from '@angular/core';
import { ADD_TEAM_FORM } from '../constants/constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { User } from '@selise-start/user/model/user';
import { TeamStateService } from './team-state.service';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamFormService {

  constructor(private fb: FormBuilder, private teamStateService: TeamStateService) {
  }

  createAddTeamForm() {
    const addTeamForm = this.fb.group({});
    const formValues = ADD_TEAM_FORM;
    formValues.forEach((formValue) => {
      if (formValue === 'teamMembers') {
        addTeamForm.addControl(formValue, new FormControl(''));
      } else {
        addTeamForm.addControl(formValue, new FormControl('', [Validators.required]));
      }
    });
    return addTeamForm;
  }

  setForm(form: FormGroup, team: Team) {
    Object.keys(form.controls).forEach(controlName => {
      if (controlName !== 'teamMembers') {
        form.controls[controlName].setValue(team[controlName]);
      }
    });
  }

  clearForm(form: FormGroup): void {
    form.reset();
  }

  validTeamMember(user: User): boolean {
    const teamState = this.teamStateService.getTeam();
    const teamLead = teamState.teamLead;
    return !(user.id === teamLead.id);
  }

  validateForm(addTeamForm: FormGroup): boolean {
    if (addTeamForm.valid) {
      const teamMembers = this.teamStateService.getTeamMembers();
      return !(teamMembers === undefined || teamMembers.length === 0);
    } else {
      return false;
    }
  }
}
