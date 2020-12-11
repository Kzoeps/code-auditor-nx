import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamFacadeService } from '../../services/team-facade.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TeamStoreState } from '../../models/team';

@UntilDestroy()
@Component({
  selector: 'selise-start-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  team$: Observable<TeamStoreState>;

  constructor(
    private route: ActivatedRoute,
    private teamFacadeService: TeamFacadeService
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTeam(id);
  }

  getTeam(id: number): void {
    this.teamFacadeService.getTeam(id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
    this.team$ = this.teamFacadeService.stateChange();
  }

}
