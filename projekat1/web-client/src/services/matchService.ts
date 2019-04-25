import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip, combineLatest, from } from 'rxjs';
import { map, filter, toArray, withLatestFrom, delay, combineAll, flatMap, concatMap } from 'rxjs/operators';
import { Match } from '../models/match';
import { Tournament } from '../models/tournament';
import { tournamentService } from './tournamentService';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class MatchService extends dbService<Match> {

  constructor() {
    super(environments.matchesResourceUrl);
  }

  getByTournament(tournament: Tournament): Observable<Match> {
    return this.get().pipe(filter<Match>(x => x.tournamentId === tournament.id));
  }

  getByLeague(league: League): Observable<Match> {
    return this.get().pipe(filter<Match>(x => x.tournament.leagueId === league.id));
  }

  get(init: boolean = true): Observable<Match> {
    return super.get().pipe(concatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  getById(id: number, init: boolean = true): Observable<Match> {
    return super.getById(id).pipe(concatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  add(match: Match, init: boolean = true): Observable<Match> {
    return super.add(match).pipe(concatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  updateById(id: number, match: Match, init: boolean = true, patch: boolean = true): Observable<Match> {
    return super.updateById(id, match, patch).pipe(concatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}

export const matchService = new MatchService();