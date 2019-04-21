import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { map, flatMap, toArray, delay, delayWhen, take, withLatestFrom } from 'rxjs/operators';
import { combineLatest, forkJoin, from, range, interval } from 'rxjs';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';
import { Match } from '../../../models/match';
import { Tournament } from '../../../models/tournament';
import { League } from '../../../models/league';

export class Start extends Partial {

  constructor() {
    super('start.html', '/');

    this.load();

  }

  load() {
    leagueService.get().pipe(delay(100)).subscribe(x => {
      x.forEach(l => {
        l.getFraction().then(html => {
          document.querySelector("#leagues").appendChild(html);
        });
      })
    });

    tournamentService.get().pipe(delay(100)).subscribe(x => {
      x.forEach(t => {
        t.getFraction().then(html => {
          document.querySelector("#tournaments").appendChild(html);
        });
      })
    });

    matchService.get().pipe(delay(100)).subscribe(x => {
      x.forEach(m => {
        m.getFraction().then(html => {
          document.querySelector("#matches").appendChild(html);
        });
      });
    });
  }
}