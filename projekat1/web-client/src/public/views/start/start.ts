import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { map, flatMap, toArray, delay, delayWhen, take, withLatestFrom } from 'rxjs/operators';
import { combineLatest, forkJoin, from, range, interval } from 'rxjs';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';
import { Match } from '../../../models/match';
import { Tournament } from '../../../models/tournament';
import { League } from '../../../models/league';
import { loader } from '../../../../framework/loader';

export class Start extends Partial {

  constructor() {
    super('start.html', '/');

    this.load();

  }

  load() {
    leagueService.get().pipe(delay(100)).subscribe(x => {
      let divLeagues = document.querySelector("#leagues");
      x.forEach(l => {
        l.getFraction().then(html => {
          divLeagues.appendChild(html);
          loader.execAfterLoad(l, html)
        });
      })
    });

    tournamentService.get().pipe(delay(100)).subscribe(x => {
      let divTournaments = document.querySelector("#tournaments")
      x.forEach(t => {
        t.getFraction().then(html => {
          divTournaments.appendChild(html);
          loader.execAfterLoad(t, html)
        });
      })
    });

    matchService.get().pipe(delay(100)).subscribe(x => {
      let divMatches = document.querySelector("#matches");
      x.forEach(m => {
        m.getFraction().then(html => {
          divMatches.appendChild(html);
          loader.execAfterLoad(m, html)
        });
      });
    });
  }
}