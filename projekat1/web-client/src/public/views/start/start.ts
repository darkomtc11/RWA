import { Partial } from '../../../../framework/partial';
import { leagueService } from '../../../services/leagueService';
import { delay, map, toArray } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { matchService } from '../../../services/matchService';
import { tournamentService } from '../../../services/tournamentService';
import { League } from '../../../models/league';
import { zip } from 'rxjs';


export class Start extends Partial {

  divMatches;
  divLeagues;
  divTournaments;

  constructor() {
    super(Start._template.cloneNode(true) as HTMLElement, '/');
    this.load();
  }

  load() {
    zip(leagueService.get().pipe(toArray()), tournamentService.get().pipe(toArray()), matchService.get().pipe(toArray())).subscribe(([L, T, M]) => {

      this.divMatches = this.$("#matches");
      this.divLeagues = this.$("#leagues");
      this.divTournaments = this.$("#tournaments");

      L.forEach(x => {
        for (let i = 0; i < x.template.children.length; i++)
          this.divLeagues.append(x.template.children[i]);

        setTimeout(() => {//testing
          x.host = "valve sucks";
          x.refreshMoustache();
        }, 3000);

      });

      T.forEach(x => {
        x.events.loadMatches = (event) => {
          event.target.innerHTML = x.id;
          this.loadMatches(x);
        }
        x.loadAttrEvClick();
        for (let i = 0; i < x.template.children.length; i++)
          this.divTournaments.append(x.template.children[i]);
      });

      M.forEach(x => {
        for (let i = 0; i < x.template.children.length; i++)
          this.divMatches.append(x.template.children[i]);
      });
    })

    // leagueService.get().subscribe(x => {
    //   let divLeagues = document.querySelector("#leagues");
    //   for (let i = 0; i < x.template.children.length; i++)
    //     divLeagues.append(x.template.children[i]);

    //   setTimeout(()=>{
    //     x.host="valve sucks";
    //     x.refreshMoustache();
    //   }, 3000);

    // });

    // tournamentService.get().subscribe(x => {
    //   let divTournaments = document.querySelector("#tournaments")
    //   for (let i = 0; i < x.template.children.length; i++)
    //     divTournaments.append(x.template.children[i]);
    // });

    // matchService.get().subscribe(x => {
    //   let divMatches = document.querySelector("#matches");
    //   for (let i = 0; i < x.template.children.length; i++)
    //     divMatches.append(x.template.children[i]);
    // });
  }

  loadMatches(tournament) {

    this.divMatches.innerHTML = "";
    matchService.getByTournament(tournament).subscribe(x => {
      for (let i = 0; i < x.template.children.length; i++)
        this.divMatches.append(x.template.children[i]);
    })
  }
}