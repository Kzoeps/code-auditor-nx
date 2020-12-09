import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'selise-start-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  constructor( private route: ActivatedRoute ) { }
  id: number;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
  }

}
