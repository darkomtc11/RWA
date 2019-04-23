import { Partial } from "../../framework/partial";
import { League } from "./league";
import { matchService } from "../services/matchService";


export class Tournament extends Partial {
  constructor(tournament: Tournament) {
    super(Tournament._template.cloneNode(true) as HTMLElement);
    this.id = tournament.id;
    this.name = tournament.name;
    this.qualifier = tournament.qualifier;
    this.format = tournament.format;
    this.leagueId = tournament.leagueId;
    this.league = tournament.league;
  }

  id: number;
  name: string;
  qualifier: boolean;
  format: number;
  leagueId: number;
  league: League;

  getMatches() {
    return matchService.getByTournament(this);
  }

  populateLeague(leagues: League[]) {
    this.league = leagues.filter(x => x.id == this.leagueId)[0];
  }
}