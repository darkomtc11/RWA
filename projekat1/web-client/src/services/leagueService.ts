import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { map, filter, delay, flatMap } from 'rxjs/operators';
import { League } from '../base-models/league';
import { MatchCard } from '../models/matchCard';
import { type } from 'os';
import { LeagueCard } from '../models/leagueCard';

declare type Klasa = LeagueCard;

class LeagueService extends dbService<League>{
  constructor(private _leagueType: typeof League) {
    super(environments.leaguesResourceUrl);
  }

  get(init: boolean = true): Observable<League> {
    return super.get().pipe(map(x => {
      let l = new this._leagueType(x as League, this._leagueType._template);
      if (init)
        l.init();
      return l;
    }));
  }

  getById(id: number, init: boolean = true): Observable<League> {
    return super.getById(id).pipe(map(x => {
      let l = new this._leagueType(x as League, this._leagueType._template);
      if (init)
        l.init();
      return l;
    }));
  }

  add(league: League, init: boolean = true): Observable<League> {
    return super.add(league).pipe(map(x => {
      let l = new this._leagueType(x as League, this._leagueType._template);
      if (init)
        l.init();
      return l;
    }));
  }

  updateById(id: number, league: League, init: boolean = true, patch: boolean = true): Observable<League> {
    return super.updateById(id, league, patch).pipe(map(x => {
      let l = new this._leagueType(x as League, this._leagueType._template);
      if (init)
        l.init();
      return l;
    }));
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}


export const leagueCardService = new LeagueService(LeagueCard);
export const leagueService = new LeagueService(League);