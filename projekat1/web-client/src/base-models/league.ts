import { tournamentService } from "../services/tournamentService";
import { Partial } from "../../framework/partial";
import { matchService } from "../services/matchService";
import { iLeague } from "../interfaces/iLeague";

export class League extends Partial implements iLeague {
  id: number;
  name: string;
  host: string;

  constructor(league: League, template: HTMLElement) {
    super(template)
    this.id = league.id;
    this.name = league.name;
    this.host = league.host;
  }

  getTournaments() {
    return tournamentService.getByLeague(this);
  }

  getMatches() {
    return matchService.getByLeague(this);
  }
}