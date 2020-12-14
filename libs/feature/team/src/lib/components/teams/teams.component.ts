import { Component, OnInit } from '@angular/core';
import { TeamStoreState } from '../../models/team';
import { TeamFacadeService } from '../../services/team-facade.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'selise-start-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  team$: Observable<TeamStoreState>;

  constructor(private teamFacadeService: TeamFacadeService) {
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamFacadeService.getTeams()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.team$ = this.teamFacadeService.stateChange();
  }
}
