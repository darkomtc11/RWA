import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, zip } from 'rxjs';
import { filter, map, toArray, flatMap, withLatestFrom, delay } from 'rxjs/operators';
import { Tournament } from '../models/tournament';
import { League } from '../models/league';
import { leagueService } from './leagueService';

class TournamentService extends dbService<Tournament> {

  constructor() {
    super(environments.tournamentsResourceUrl)
  }

  getByLeague(league: League): Observable<Tournament[]> {
    return super.get().pipe(map<Tournament[], Tournament[]>(
      x => {
        return x.filter(l => l.leagueId === league.id).map(l => {
          l.league = league;
          return l;
        });
      }
    ));
  }

  get(init: boolean = true): Observable<Tournament[]> {
    return zip(super.get(), leagueService.get()).pipe(map(([t, l]) => {
      return t.map(x => {
        let tournament = new Tournament(x as Tournament);
        tournament.populateLeague(l as League[]);
        if (init)
          tournament.init();
        return tournament;
      });
    }));
  }

  getById(id: number, init: boolean = true): Observable<Tournament> {
    return zip(super.getById(id), leagueService.get()).pipe(map(([t, l]) => {
      let tournament = new Tournament(t as Tournament);
      tournament.populateLeague(l as League[]);
      if (init)
        tournament.init();
      return tournament;
    }));
  }

  add(tournament: Tournament, init: boolean = true): Observable<Tournament> {
    return zip(super.add(tournament), leagueService.get()).pipe(map(([t, l]) => {
      let tournament = new Tournament(t as Tournament);
      tournament.populateLeague(l as League[]);
      if (init)
        tournament.init();
      return tournament;
    }));
  }

  updateById(id: number, tournament: Tournament, init: boolean = true, patch: boolean = true): Observable<Tournament> {

    return zip(super.updateById(id, tournament, patch), leagueService.get()).pipe(map(([t, l]) => {
      let tournament = new Tournament(t as Tournament);
      tournament.populateLeague(l as League[]);
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