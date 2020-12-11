import { Injectable } from '@angular/core';
import { TeamApiService } from './team-api.service';
import { Observable } from 'rxjs';
import { Team, TeamStoreState } from '../models/team';
import { tap } from 'rxjs/operators';
import { TeamStateService } from './team-state.service';

@Injectable({
  providedIn: 'root'
})
export class TeamFacadeService {

  constructor(
    private teamApiService: TeamApiService,
    private teamStateService: TeamStateService
  ) {
  }

  stateChange(): Observable<TeamStoreState> {
    return this.teamStateService.stateChanged;
  }

  getTeams(): Observable<Team[]> {
    return this.teamApiService.getTeams().pipe(
      tap(teams => this.teamStateService.updateTeams(teams))
    );
  }

  getTeam(id: number): Observable<Team> {
    return this.teamApiService.getTeam(id).pipe(
      tap(team => this.teamStateService.updateTeam(team))
    )
  }
}
