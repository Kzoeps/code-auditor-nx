import { Component } from '@angular/core';

@Component({
  selector: 'selise-start-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'code-auditor';
  //TODO: remove nav from app and also reroute on logout.
  logout(): void {
    localStorage.removeItem('user');
  }
}
