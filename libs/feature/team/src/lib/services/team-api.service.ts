import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {

  private url = 'http://localhost:3000/teams';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.url)
  }

  getTeam(id: number): Observable<Team> {
    const teamURL = `${this.url}/${id}`;
    return this.http.get<Team>(teamURL);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.url, team, this.httpOptions);
  }

  updateTeam(team: Team): Observable<Team> {
    const url = `${this.url}/${team.id}`;
    return this.http.patch<Team>(url, team, this.httpOptions);
  }
}
