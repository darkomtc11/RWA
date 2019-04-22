import { Team } from "./team";
import { Tournament } from "./tournament";
import { Partial } from "../../framework/partial";
import { tournamentService } from "../services/tournamentService";
import { League } from "./league";

export class Match extends Partial {
  id: number;
  matchId: string;
  subNumber: number;
  team1: Team;
  team2: Team;
  startTime: Date;
  finalFraction: number;
  ended: boolean;
  team1Score: number[];
  team2Score: number[];
  tournamentId: number;
  tournament: Tournament;
  leagueId: number;
  league: League;


  constructor(match: Match) {
    super("match.html");
    this.id = match.id;
    this.matchId = match.matchId;
    this.subNumber = match.subNumber;
    this.team1 = match.team1;
    this.team2 = match.team2;
    this.startTime = new Date(match.startTime);
    this.finalFraction = match.finalFraction;
    this.ended = match.ended;
    this.team1Score = match.team1Score;
    this.team2Score = match.team2Score;
    this.tournamentId = match.tournamentId;
    this.tournament = match.tournament;
    this.leagueId = match.leagueId;
    this.league = match.league;
  }

  populateTournament(torunaments: Tournament[]) {
    this.tournament = torunaments.filter(x => x.id == this.tournamentId)[0];
  }

  populateLeague(leagues: League[]) {
    this.league = leagues.filter(x => x.id == this.leagueId)[0];
  }

  events={
    openMatch: (event)=>{
      event.target.innerHTML = this.id;
      console.log(this.id);
    }
  }

}