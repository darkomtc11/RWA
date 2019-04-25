import { Partial } from "../../framework/partial";
import { League } from "./league";
import { matchService } from "../services/matchService";
import { leagueService } from "../services/leagueService";


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

  events={
    loadMatches:undefined
  }

  getMatches() {
    return matchService.getByTournament(this);
  }

  populateLeague() {
    return new Promise(res=>{
      leagueService.getById(this.leagueId, false).subscribe(l => {
        this.league = l;
        res();
      });
    })
      
  }
}