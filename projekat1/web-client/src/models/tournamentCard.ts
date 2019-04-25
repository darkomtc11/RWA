import { Partial } from "../../framework/partial";
import { matchService, matchCardService } from "../services/matchService";
import { leagueService } from "../services/leagueService";
import { Tournament } from "../base-models/tournament";
import { League } from "../base-models/league";
import { MatchCard } from "./matchCard";
import { map } from "rxjs/operators";


export class TournamentCard extends Tournament {
  constructor(tournament: Tournament) {
    super(tournament, TournamentCard._template.cloneNode(true) as HTMLElement);
  }

  events = {
    loadMatches: undefined
  }

  getMatches() {
    return matchCardService.getByTournament(this);
  }

}