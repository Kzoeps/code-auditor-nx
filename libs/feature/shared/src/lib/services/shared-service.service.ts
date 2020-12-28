import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@selise-start/user';
import { Team } from '@selise-start/team';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private usersURL = `${this.appConfig.apiURL}/users`;
  private teamsURL = `${this.appConfig.apiURL}/teams`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL);
  }

  getUser(id: number): Observable<User> {
    const usersURL = `${this.usersURL}/${id}`;
    return this.http.get<User>(usersURL);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersURL}/${user.id}`;
    return this.http.patch<User>(url, user);
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsURL}/${id}`;
    return this.http.get<Team>(url);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsURL);
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
