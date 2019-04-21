import { tournamentService } from "../services/tournamentService";
import { Partial } from "../../framework/partial";

export class League extends Partial {
  id: number;
  name: string;
  host: string;

  constructor(league: League) {
    super("league.html")
    this.id = league.id;
    this.name = league.name;
    this.host = league.host;
  }


  getTournaments() {
    return tournamentService.getByLeague(this);
  }
}