import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { map, filter, delay, flatMap } from 'rxjs/operators';
import { League } from '../models/league';

class LeagueService extends dbService<League> {
  constructor() {
    super(environments.leaguesResourceUrl);
  }

  get(init: boolean = true): Observable<League[]> {
    return super.get().pipe(map(x => x.map(league => {
      let l = new League(league);
      if (init)
        l.init();
      return l;
    })));
  }

  getById(id: number, init: boolean = true): Observable<League> {
    return super.getById(id).pipe(map(x => {
      let l = new League(x);
      if (init)
        l.init();
      return l;
    }));
  }

  add(league: League, init: boolean = true): Observable<League> {
    return super.add(league).pipe(map(x => {
      let l = new League(x);
      if (init)
        l.init();
      return l;
    }));
  }

  updateById(id: number, league: League, init: boolean = true, patch: boolean = true): Observable<League> {
    return super.updateById(id, league, patch).pipe(map(x => {
      let l = new League(x);
      if (init)
        l.init();
      return l;
    }));
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}


export const leagueService = new LeagueService();