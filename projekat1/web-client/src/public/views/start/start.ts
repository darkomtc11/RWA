import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { delay } from 'rxjs/operators';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';


export class Start extends Partial {

  constructor() {
    super(Start._template.cloneNode(true) as HTMLElement, '/');
    this.load();
  }

  load() {
    leagueService.get().pipe(delay(100)).subscribe(x => {
      let divLeagues = document.querySelector("#leagues");
      x.map(l => {
          l.template.childNodes.forEach(el => {
            divLeagues.appendChild(el);
          });
      })
    });

    tournamentService.get().pipe(delay(100)).subscribe(x => {
      let divTournaments = document.querySelector("#tournaments")
      x.map(t => {
          t.template.childNodes.forEach(el => {
            divTournaments.appendChild(el);
          });
      })
    });

    matchService.get().pipe(delay(100)).subscribe(x => {
      let divMatches = document.querySelector("#matches");
      x.map(m => {        
          m.template.childNodes.forEach(el => {
            divMatches.appendChild(el);
          });
      });
    });
  }
}