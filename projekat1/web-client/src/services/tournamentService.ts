import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip, combineLatest, forkJoin } from 'rxjs';
import { filter, map, toArray, withLatestFrom, delay, flatMap } from 'rxjs/operators';
import { Tournament } from '../models/tournament';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class TournamentService extends dbService<Tournament> {

  constructor() {
    super(environments.tournamentsResourceUrl)
  }

  getByLeague(league: League): Observable<Tournament> {
    return super.get().pipe(filter(x => x.leagueId === league.id));
  }

  get(init: boolean = true): Observable<Tournament> {
    return super.get().pipe(flatMap(async t => {
      let tournament = new Tournament(t as Tournament);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }))
  }

  getById(id: number, init: boolean = true): Observable<Tournament> {
    return super.getById(id).pipe(flatMap(async t => {
      let tournament = new Tournament(t as Tournament);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }));
  }

  add(tournament: Tournament, init: boolean = true): Observable<Tournament> {
    return super.add(tournament).pipe(flatMap(async t => {
      let tournament = new Tournament(t as Tournament);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }));
  }

  updateById(id: number, tournament: Tournament, init: boolean = true, patch: boolean = true): Observable<Tournament> {
    return super.updateById(id, tournament, patch).pipe(flatMap(async t => {
      let tournament = new Tournament(t as Tournament);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }));
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}

export const tournamentService = new TournamentService();