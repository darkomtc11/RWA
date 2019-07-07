import { Partial } from '../../../../framework/partial';
import { leagueCardService } from '../../../services/leagueService';
import { toArray, map, delay } from 'rxjs/operators';
import { matchCardService } from '../../../services/matchService';
import { tournamentCardService } from '../../../services/tournamentService';

import { zip, Observable, interval, timer } from 'rxjs';

import { TournamentCard } from '../../../models/tournamentCard';
import { MatchCard } from '../../../models/matchCard';
import { LeagueCard } from '../../../models/leagueCard';

export class Start extends Partial {

  divMatches;
  divLeagues;
  divTournaments;

  constructor() {
    super(Start._template.cloneNode(true) as HTMLElement, '/');
    this.load();
  }

  async load() {
    zip(leagueCardService.get().pipe(map(x => x as LeagueCard), toArray()),
      tournamentCardService.get().pipe(map(x => x as TournamentCard), toArray()),
      matchCardService.get().pipe(map(x => x as MatchCard), toArray()))
      .subscribe(([L, T, M]) => {

        this.divLeagues = this.$("#leagues");
        this.divTournaments = this.$("#tournaments");
        this.divMatches = this.$("#matches");

        this.divLeagues.innerHTML = "";
        this.divTournaments.innerHTML = "";
        this.divMatches.innerHTML = "";


        L.forEach(x => {
            x.events.loadTournaments = (event) => {
              this.loadTournaments(x.getTournaments().pipe(map(x=>x as TournamentCard)));
              this.loadMatches(x.getMatches().pipe(map(x=>x as MatchCard)));
            }

          x.loadAttrEvClick();
          x.render(this.divLeagues);
        });

        T.forEach(x => {
          x.events.loadMatches = (event) => {
            this.loadMatches(x.getMatches().pipe(map(x=>x as MatchCard)));
          }

          x.loadAttrEvClick();
          x.render(this.divTournaments);
        });

        M.forEach(x => {
          x.render(this.divMatches);
        });
      })
  }

  loadTournaments(tournaments: Observable<TournamentCard>) {
    this.divTournaments.innerHTML = "";
    tournaments.subscribe(x => {
      x.events.loadMatches = (event) => {
        this.loadMatches(x.getMatches().pipe(map(x=>x as MatchCard)));
      }

      x.loadAttrEvClick();
      x.render(this.divTournaments);
    })
  }

  loadMatches(matches: Observable<MatchCard>) {
    this.divMatches.innerHTML = "";
    matches.subscribe(x => {
      x.render(this.divMatches);
    })
  }


}