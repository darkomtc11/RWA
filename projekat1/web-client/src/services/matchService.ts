import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip, combineLatest, from } from 'rxjs';
import { map, filter, toArray, withLatestFrom, delay, combineAll, flatMap } from 'rxjs/operators';
import { Match } from '../models/match';
import { Tournament } from '../models/tournament';
import { tournamentService } from './tournamentService';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class MatchService extends dbService<Match> {

  constructor() {
    super(environments.matchesResourceUrl);
  }

  getByTournament(tournament: Tournament, init: boolean = true): Observable<Match> {
    return super.get().pipe(filter(x => x.tournamentId === tournament.id), flatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  getByLeague(league: League, init: boolean = true): Observable<Match> {
    return super.get().pipe(filter(x => x.leagueId === league.id), flatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  get(init: boolean = true): Observable<Match> {
    return super.get().pipe(flatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  getById(id: number, init: boolean = true): Observable<Match> {
    return super.getById(id).pipe(flatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  add(match: Match, init: boolean = true): Observable<Match> {
    return super.add(match).pipe(flatMap(async m => {
      let match = new Match(m as Match);
      await match.populateTournament();
      if (init)
        match.init();
      return match;
    }));
  }

  updateById(id: number, match: Match, init: boolean = true, patch: boolean = true): Observable<Match> {
    return super.updateById(id, match, patch).pipe(flatMap(async m => {
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