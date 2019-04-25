
import { Partial } from "../../framework/partial";

import { tournamentService } from "../services/tournamentService";
import { Observable } from "rxjs";
import { Team } from "../interfaces/team";
import { Match } from "../base-models/match";
import { Tournament } from "../base-models/tournament";
import { League } from "../base-models/league";

export class MatchCard extends Match {
  constructor(match: Match) {
    super(match, MatchCard._template.cloneNode(true) as HTMLElement);
  }

  events = {
    openMatch: (event) => {
      event.target.innerHTML = this.id;
      console.log(this.id);
    }
  }

}