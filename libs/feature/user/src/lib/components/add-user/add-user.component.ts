import { Component, OnInit } from '@angular/core';
import { ROLES } from '../../constants/constants';
import { FormGroup } from '@angular/forms';
import { UserFacadeService } from '@selise-start/user/service';
import { FORM_TYPES } from '../../constants/constants';

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
    console.log(this.addUserForm.value);
  }

}
