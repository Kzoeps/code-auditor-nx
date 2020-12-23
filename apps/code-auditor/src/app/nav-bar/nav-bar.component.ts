import { Component } from '@angular/core';

@Component({
  selector: 'selise-start-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor() {}

  logout(): void{
    localStorage.removeItem('user');
  }
}
