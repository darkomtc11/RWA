import { tournamentService } from "../services/tournamentService";
import { Partial } from "../../framework/partial";
import { matchService } from "../services/matchService";

export class League extends Partial {
  id: number;
  name: string;
  host: string;

  constructor(league: League) {
    super(League._template.cloneNode(true) as HTMLElement)
    this.id = league.id;
    this.name = league.name;
    this.host = league.host;
  }

  events = {
    loadTournaments: undefined
  }

  getTournaments() {
    return tournamentService.getByLeague(this);
  }

  getMatches() {
    return matchService.getByLeague(this);
  }
}