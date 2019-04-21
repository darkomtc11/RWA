import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { map, filter, delay } from 'rxjs/operators';
import { League } from '../models/league';

class LeagueService extends dbService<League> {
  constructor() {
    super(environments.leaguesResourceUrl);
  }

  get():Observable<League>{
    return super.get().pipe(map(x => new League(x)));
  }

  getById(id: number): Observable<League> {
    return super.getById(id).pipe(map(x => new League(x)));
  }

  add(league:League):Observable<League>{
    return super.add(league).pipe(map(x => new League(x)));
  }

  updateById(id:number, league: League, patch: boolean=true):Observable<League>{
    return super.updateById(id, league, patch).pipe(map(x => new League(x)));
  }

  removeById(id:number):Observable<any>{
    return super.removeById(id);
  }
}


export const leagueService = new LeagueService();