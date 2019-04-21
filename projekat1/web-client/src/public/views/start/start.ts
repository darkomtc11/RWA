import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { map, flatMap, toArray, delay } from 'rxjs/operators';
import { combineLatest, forkJoin } from 'rxjs';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';
import { Match } from '../../../models/match';
import { Tournament } from '../../../models/tournament';
import { League } from '../../../models/league';

export class Start extends Partial {

  constructor() {
    super('start.html', '/');

    this.load();

  }

  async load() {
    // leagueService.getById(1).subscribe(l => {
    //   l.getTournaments().subscribe(t => {
    //     t.getMatches().pipe(map(m => { return m.getTemplate() })).subscribe(async x => {
    //       x.then(html => {
    //         document.querySelector("div#matches").innerHTML += html;
    //       })
    //     });
    //   })
    // });


    // matchService.get().subscribe(m=>{
    //    m.getTemplate().then(html=>{
    //     document.querySelector("div#matches").innerHTML += html;
    //   })
    // });

    //console.log('aaa');

    // let leagueObs = leagueService.get().pipe( toArray());
    // let tournamentObs = tournamentService.get().pipe(toArray());
    // let matchObs = matchService.get().pipe( toArray());

    // let leagueObs = leagueService.get();
    // let tournamentObs = tournamentService.get();
    // let matchObs = matchService.get();

    // console.log('x');
    leagueService.get().pipe(toArray()).subscribe(x => {
      x.forEach(l => {
        l.getFraction().then(html => {
          document.querySelector("#leagues").appendChild(html);
        });
      });
    });

    tournamentService.get().pipe( toArray(),delay(2000)).subscribe(x => {
      x.forEach(t => {
        t.getFraction().then(html => {
          document.querySelector("#tournaments").appendChild(html);
        })
      })
    });

    matchService.get().pipe(toArray(),delay(4000)).subscribe(x => {
      x.forEach(m => {
        m.getFraction().then(html => {
          document.querySelector("#matches").appendChild(html);
        });
      });
    });

    // forkJoin(leagueObs, tournamentObs, matchObs).subscribe(obs => {

    //   console.log(obs[0]);
    // })



    // let fullObs = combineLatest([leagueObs, tournamentObs, matchObs]).subscribe(([league, tournament, match]) => {
    //   console.log('aaa');
    //   league.getFraction().then(html => {
    //     document.querySelector("#leagues").appendChild(html);
    //   });
    //   tournament.getFraction().then(html => {
    //     document.querySelector("#tournaments").appendChild(html);
    //   });
    //   match.getFraction().then(html => {
    //     document.querySelector("#matches").appendChild(html);
    //   });
    // });

    // fullObs.subscribe(([league, tournament, match]) => {
    //   league.forEach(x => x.getFraction().then(html => {
    //     document.querySelector("#leagues").appendChild(html);
    //   }));

    //   tournament.forEach(x => x.getFraction().then(html => {
    //     document.querySelector("#tournaments").appendChild(html);
    //   }));

    //   match.forEach(x => x.getFraction().then(html => {
    //     document.querySelector("#matches").appendChild(html);
    //   }));
    // });
  }



}