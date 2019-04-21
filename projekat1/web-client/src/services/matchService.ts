import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, combineLatest } from 'rxjs';
import { User } from '../models/user';
import { filter, map, flatMap, toArray, last, finalize, mergeMap, switchMap, switchAll, combineAll, withLatestFrom, delay } from 'rxjs/operators';
import { Match } from '../models/match';
import { Tournament } from '../models/tournament';
import { tournamentService } from './tournamentService';

class MatchService extends dbService<Match> {

  constructor() {
    super(environments.matchesResourceUrl);
  }

  getByTournament(tournament: Tournament): Observable<Match> {
    return super.get().pipe(filter<Match>(x => x.tournamentId === tournament.id), map<Match,Match>(y => { y.tournament = tournament; return new Match(y); }));
  }

  // get(): Observable<Match> {
  //   return Observable.create(obs => {
  //     tournamentService.get().pipe(toArray()).subscribe(tournaments => {//tournaments = [torunament1, tournament2]
  //       super.get().pipe(map(x => new Match(x))).subscribe((x) => {
  //         x.populateTournament(tournaments);
  //         obs.next(x);
  //         if (x.lastObservable) {
  //           obs.complete();
  //         }
  //       });
  //       //obs.complete();
  //     });
  //   });
  // }

  get(): Observable<Match> {
    return super.get().pipe(
      withLatestFrom(tournamentService.get().pipe(toArray())),
      map(([m, t]) => {
        let match = new Match(m as Match);
        match.populateTournament(t as Tournament[]);
        return match;
      })
    );
  }

  // get(): Observable<Match> {

  //   return combineLatest([super.get(), tournamentService.get()/*.pipe(toArray())*/]) // Combine both Observables when both emit
  //     .pipe(map(([m, t]) => { // Destructuring array of emitted values
  //       console.log(m, t);
  //       let populatedMatch = new Match(m as Match);
  //       populatedMatch.populateTournament(t as Tournament);
  //       return populatedMatch; // Return match combined with tournaments
  //     }))
  // }

  // get3(): Observable<Match> {

  //   // let matchesObs = super.get();
  //   // let tournamentsArrayObs = tournamentService.get().pipe(toArray());

  //   // let obs = tournamentsArrayObs.pipe(map(t => {
  //   //   return matchesObs.pipe(map(m => {
  //   //     console.log(m, t);
  //   //     let populatedMatch = new Match(m as Match);
  //   //     populatedMatch.populateTournament(t as Tournament[]);
  //   //     return populatedMatch;
  //   //   }))
  //   // }));

  //   // return obs.combineAll();

  //   return combineLatest([super.get(), tournamentService.get().pipe(toArray())]) // Combine both Observables when both emit
  //     .pipe(map(([m, t]) => { // Destructuring array of emitted values
  //       console.log(m, t);
  //       let populatedMatch = new Match(m as Match);
  //       populatedMatch.populateTournament(t as Tournament[]);
  //       return populatedMatch; // Return match combined with tournaments
  //     }))
  // }

  getById(id: number): Observable<Match> {
    return super.getById(id).pipe(
      withLatestFrom(tournamentService.get().pipe(toArray())),
      map(([m, t]) => {
        let match = new Match(m as Match);
        match.populateTournament(t as Tournament[]);
        return match;
      })
    );
  }

  add(match: Match): Observable<Match> {
    return super.add(match).pipe(
      withLatestFrom(tournamentService.get().pipe(toArray())),
      map(([m, t]) => {
        let match = new Match(m as Match);
        match.populateTournament(t as Tournament[]);
        return match;
      })
    );
  }

  updateById(id: number, match: Match, patch: boolean = true): Observable<Match> {
    return super.updateById(id, match, patch).pipe(
      withLatestFrom(tournamentService.get().pipe(toArray())),
      map(([m, t]) => {
        let match = new Match(m as Match);
        match.populateTournament(t as Tournament[]);
        return match;
      })
    );
  }

  removeById(id: number): Observable<any> {
    return super.removeById(id);
  }
}

export const matchService = new MatchService();