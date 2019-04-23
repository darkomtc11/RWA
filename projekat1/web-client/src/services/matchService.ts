import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
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
      return x.filter(m => m.tournamentId == tournament.id).map(m => {
        m.tournament = tournament;
        return m;
      })
    }));
  }

  getByLeague(league: League): Observable<Match[]> {
    return super.get().pipe(map<Match[], Match[]>(x => {
      return x.filter(m => m.leagueId == league.id).map(m => {
        m.league = league;
        return m;
      })
    }));
  }

  get(init: boolean = true): Observable<Match[]> {
    return zip(super.get(), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      return m.map(x => {
        let match = new Match(x as Match);
        match.populateTournament(t as Tournament[]);
        match.populateLeague(l as League[]);
        if (init)
          match.init();
        return match;
      });
    }));
  }

  getById(id: number, init: boolean = true): Observable<Match> {
    return zip(super.getById(id), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
      if (init)
        match.init();
      return match;
    }));
  }

  add(match: Match, init: boolean = true): Observable<Match> {
    return zip(super.add(match), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
      if (init)
        match.init();
      return match;
    }));
  }

  updateById(id: number, match: Match, init: boolean = true, patch: boolean = true): Observable<Match> {
    return zip(super.updateById(id, match, patch), tournamentService.get(), leagueService.get()).pipe(map(([m, t, l]) => {
      let match = new Match(m as Match);
      match.populateTournament(t as Tournament[]);
      match.populateLeague(l as League[]);
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