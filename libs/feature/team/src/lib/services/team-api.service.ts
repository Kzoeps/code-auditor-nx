import { Inject, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {

  private url = `${this.appConfig.apiURL}/teams`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.url)
  }

  getTeam(id: number): Observable<Team> {
    const teamURL = `${this.url}/${id}`;
    return this.http.get<Team>(teamURL);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.url, team);
  }

  updateTeam(team: Team): Observable<Team> {
    const url = `${this.url}/${team.id}`;
    return this.http.patch<Team>(url, team);
  }
}
