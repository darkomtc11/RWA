import { Team } from "./team";
import { iTournament } from "./iTorunament";
import { iLeague } from "./iLeague";

export interface iMatch{
  id?: number;
  subNumber?: number;
  team1?: Team;
  team2?: Team;
  startTime?: Date;
  finalFraction?: number;
  ended?: boolean;
  team1Score?: number;
  team2Score?: number;
  tournamentId?: number;
  tournament?: iTournament;
  leagueId?: number;
  league?: iLeague;
}