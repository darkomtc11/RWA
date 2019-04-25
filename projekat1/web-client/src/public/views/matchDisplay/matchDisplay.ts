import { Partial } from '../../../../framework/partial';
import { auth } from '../../../services/authService';
import { Match } from '../../../base-models/match';
import { matchService } from '../../../services/matchService';
import { iMatch } from '../../../interfaces/iMatch';
import { router } from '../../../../framework/router';

export class MatchDisplay extends Partial {
  match: iMatch = {
    id: -1,
    subNumber: 1,
    team1: { name: '', players: [], shortName: '', image: '' },
    team2: { name: '', players: [], shortName: '', image: '' },
    startTime: new Date(),
    finalFraction: 1,
    ended: true,
    team1Score: 1,
    team2Score: 2,
    tournamentId: 0,
    tournament: undefined,
    leagueId: 0,
    league: undefined
  };
  constructor() {
    super(MatchDisplay._template.cloneNode(true) as HTMLElement);
    this.load();
  }

  load() {

    let id = document.location.pathname.split('/')[2];
    console.log(id);
    if (id) {

      matchService.getById(parseInt(id), false).subscribe(x => {
        this.match = x;
        this.refreshMoustache();
      }, err=>{
        router.navigateTo('/', true, true);
      })
    }


  }
}