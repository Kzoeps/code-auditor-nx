import { Component, OnInit } from '@angular/core';
import { ROLES } from '../../constants/constants';
import { FormGroup } from '@angular/forms';
import { UserFacadeService } from '@selise-start/user/service';
import { FORM_TYPES } from '../../constants/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'selise-start-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  roles = ROLES;

  constructor(
    private userFacadeService: UserFacadeService
  ) { }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void{
    this.createForm();
  }

  createForm(): void{
    this.addUserForm = this.userFacadeService.createForm(FORM_TYPES.ADDUSERFORM);
  }

  addUser(): void{
    if (this.addUserForm.valid) {
      this.userFacadeService.addUser(this.addUserForm)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe(
          {
            complete: () => {
              this.userFacadeService.snackBar('Successfully added user!');
              this.addUserForm.reset();
            }
          }
        )
    }
  }
}
