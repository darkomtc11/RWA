import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { filter, map, toArray, flatMap, withLatestFrom, delay } from 'rxjs/operators';
import { Tournament } from '../models/tournament';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class TournamentService extends dbService<Tournament> {

  constructor() {
    super(environments.tournamentsResourceUrl)
  }

  getByLeague(league: League): Observable<Tournament> {
    return super.get().pipe(filter<Tournament>(x => x.leagueId === league.id), map<Tournament, Tournament>(y => { y.league = league; return new Tournament(y); }));
  }

  get(): Observable<Tournament> {
    return super.get().pipe(
      withLatestFrom(leagueService.get().pipe(toArray())),
      map(([t, l]) => {
        let tournament = new Tournament(t as Tournament);
        tournament.populateLeague(l as League[]);
        return tournament;
      })
    );
  }

  getById(id: number): Observable<Tournament> {
    return super.getById(id).pipe(
      withLatestFrom(leagueService.get().pipe(toArray())),
      map(([t, l]) => {
        let tournament = new Tournament(t as Tournament);
        tournament.populateLeague(l as League[]);
        return tournament;
      })
    );
  }

  add(tournament: Tournament): Observable<Tournament> {
    return super.add(tournament).pipe(
      withLatestFrom(leagueService.get().pipe(toArray())),
      map(([t, l]) => {
        let tournament = new Tournament(t as Tournament);
        tournament.populateLeague(l as League[]);
        return tournament;
      })
    );
  }

  updateById(id: number, tournament: Tournament, patch: boolean = true): Observable<Tournament> {
    return super.updateById(id, tournament, patch).pipe(
      withLatestFrom(leagueService.get().pipe(toArray())),
      map(([t, l]) => {
        let tournament = new Tournament(t as Tournament);
        tournament.populateLeague(l as League[]);
        return tournament;
      })
    );
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}

export const tournamentService = new TournamentService();