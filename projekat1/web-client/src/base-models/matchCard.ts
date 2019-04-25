// import { Team } from "../models/team";
// import { Tournament } from "./tournamentCard";
// import { Partial } from "../../framework/partial";
// import { LeagueCard } from "./leagueCard";
// import { tournamentService } from "../services/tournamentService";
// import { Observable } from "rxjs";

// export class MatchCard extends Partial {
//   id: number;
//   matchId: string;
//   subNumber: number;
//   team1: Team;
//   team2: Team;
//   startTime: Date;
//   finalFraction: number;
//   ended: boolean;
//   team1Score: number[];
//   team2Score: number[];
//   tournamentId: number;
//   tournament: Tournament;
//   leagueId: number;
//   league: LeagueCard;


//   constructor(match: MatchCard) {
//     super(MatchCard._template.cloneNode(true) as HTMLElement);
//     this.id = match.id;
//     this.matchId = match.matchId;
//     this.subNumber = match.subNumber;
//     this.team1 = match.team1;
//     this.team2 = match.team2;
//     this.startTime = new Date(match.startTime);
//     this.finalFraction = match.finalFraction;
//     this.ended = match.ended;
//     this.team1Score = match.team1Score;
//     this.team2Score = match.team2Score;
//     this.tournamentId = match.tournamentId;
//     this.tournament = match.tournament;
//   }

//   populateTournament() {
//     return new Promise(res=>{
//       tournamentService.getById(this.tournamentId, false).subscribe(t => {
//         this.tournament = t;
//         res();
//       });
//     })
    
//   }

//   events = {
//     openMatch: (event) => {
//       event.target.innerHTML = this.id;
//       console.log(this.id);
//     }
//   }

// }