import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip, combineLatest, forkJoin } from 'rxjs';
import { filter, map, toArray, withLatestFrom, delay, flatMap, concatMap } from 'rxjs/operators';
import { Tournament } from '../base-models/tournament';
import { League } from '../base-models/league';
import { TournamentCard } from '../models/tournamentCard';

class TournamentService extends dbService<Tournament> {

  constructor(private _tournamentType: typeof Tournament) {
    super(environments.tournamentsResourceUrl)
  }

  getByLeague(league: League): Observable<Tournament> {
    return this.get().pipe(filter<Tournament>(x => x.leagueId === league.id));
  }

  get(init: boolean = true): Observable<Tournament> {
    return super.get().pipe(concatMap(async t => {
      let tournament = new this._tournamentType(t as Tournament, this._tournamentType._template);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }))
  }

  getById(id: number, init: boolean = true): Observable<Tournament> {
    return super.getById(id).pipe(concatMap(async t => {
      let tournament = new this._tournamentType(t as Tournament, this._tournamentType._template);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }));
  }

  add(tournament: Tournament, init: boolean = true): Observable<Tournament> {
    return super.add(tournament).pipe(concatMap(async t => {
      let tournament = new this._tournamentType(t as Tournament, this._tournamentType._template);
      await tournament.populateLeague()
      if (init)
        tournament.init();

      return tournament;
    }));
  }

  updateById(id: number, tournament: Tournament, init: boolean = true, patch: boolean = true): Observable<Tournament> {
    return super.updateById(id, tournament, patch).pipe(concatMap(async t => {
      let tournament = new this._tournamentType(t as Tournament, this._tournamentType._template);
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

export const tournamentCardService = new TournamentService(TournamentCard);
export const tournamentService = new TournamentService(Tournament);