import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, combineLatest, zip } from 'rxjs';
import { User } from '../models/user';
import { filter, map, flatMap, toArray, last, finalize, mergeMap, switchMap, switchAll, combineAll, withLatestFrom, delay } from 'rxjs/operators';
import { Match } from '../models/match';
import { Tournament } from '../models/tournament';
import { tournamentService } from './tournamentService';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class MatchService extends dbService<Match> {

  constructor() {
    super(environments.matchesResourceUrl);
  }

  getByTournament(tournament: Tournament): Observable<Match[]> {
    return super.get().pipe(map<Match[], Match[]>(x => {
      return x.filter(t => t.tournamentId == tournament.id).map(t => {
        t.tournament = tournament;
        return t;
      })
    }));
  }

  getByLeague(league: League): Observable<Match[]> {
    return super.get().pipe(map<Match[], Match[]>(x => {
      return x.filter(t => t.leagueId == league.id).map(t => {
        t.league = league;
        return t;
      })
    }));
  }

  get(): Observable<Match[]> {
    return zip(super.get(), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      return m.map(x => {
        let match = new Match(x as Match);
        match.populateTournament(t as Tournament[]);
        match.populateLeague(l as League[]);
        return match;
      });
    }));
  }

  getById(id: number): Observable<Match> {
    return zip(super.getById(id), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
      return match;
    }));
  }

  add(match: Match): Observable<Match> {
    return zip(super.add(match), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
      return match;
    }));
  }

  updateById(id: number, match: Match, patch: boolean = true): Observable<Match> {
    return zip(super.updateById(id, match, patch), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
      return match;
    }));
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}

export const matchService = new MatchService();