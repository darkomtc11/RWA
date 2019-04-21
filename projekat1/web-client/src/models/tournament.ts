import { League } from "./league";
import { matchService } from "../services/matchService";
import { leagueService } from "../services/leagueService";
import { Partial } from "../../framework/partial";

export class Tournament extends Partial {
  constructor(tournament: Tournament) {
    super("tournament.html");
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