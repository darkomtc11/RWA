import { tournamentService, tournamentCardService } from "../services/tournamentService";
import { Partial } from "../../framework/partial";
import { matchService, matchCardService } from "../services/matchService";
import { League } from "../base-models/league";
import { TournamentCard } from "./tournamentCard";
import { map } from "rxjs/operators";
import { MatchCard } from "./matchCard";

export class LeagueCard extends League {
  constructor(league: League) {
    super(league, LeagueCard._template.cloneNode(true) as HTMLElement);
  }

  events = {
    loadTournaments: undefined
  }

  getTournaments() {
    return tournamentCardService.getByLeague(this);
  }

  getMatches() {
    return matchCardService.getByLeague(this);
  }
}