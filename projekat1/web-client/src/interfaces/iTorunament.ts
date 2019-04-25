import { Team } from "./team";
import { iLeague } from "./iLeague";

export interface iTournament{
  id: number;
  name: string;
  qualifier: boolean;
  format: number;
  leagueId: number;
  league: iLeague;
}