import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { delay, map, toArray } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';
import { League } from '../../../models/league';
import { zip, Observable } from 'rxjs';
import { Match } from '../../../models/match';
import { Tournament } from '../../../models/tournament';


export class Start extends Partial {

  divMatches;
  divLeagues;
  divTournaments;

  constructor() {
    super(Start._template.cloneNode(true) as HTMLElement, '/');
    this.load();
  }

  load() {
    zip(leagueService.get().pipe(toArray()), tournamentService.get().pipe(toArray()), matchService.get().pipe(toArray())).subscribe(([L, T, M]) => {

      this.divMatches = this.$("#matches");
      this.divLeagues = this.$("#leagues");
      this.divTournaments = this.$("#tournaments");

      L.forEach(x => {
        x.events.loadTournaments = (event) => {
          this.loadTournaments(x.getTournaments());
          this.loadMatches(x.getMatches());
        }

        x.loadAttrEvClick();
        x.render(this.divLeagues);
      });

      T.forEach(x => {
        x.events.loadMatches = (event) => {
          this.loadMatches(x.getMatches());
        }

        x.loadAttrEvClick();
        x.render(this.divTournaments);
      });

      M.forEach(x => {
        x.render(this.divMatches);
      });
    })
  }

  loadTournaments(tournaments: Observable<Tournament>) {
    this.divTournaments.innerHTML = "";
    tournaments.subscribe(x => {
      x.events.loadMatches = (event) => {
        event.target.innerHTML = x.id;
        this.loadMatches(x.getMatches());
      }

      x.loadAttrEvClick();
      x.render(this.divTournaments);
    })
  }

  loadMatches(matches: Observable<Match>) {
    this.divMatches.innerHTML = "";
    matches.subscribe(x => {
      x.render(this.divMatches);
    })
  }


}