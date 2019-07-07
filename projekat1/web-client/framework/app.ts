import { Root } from "../src/public/views/root/root";
import { Error } from "../src/public/views/error/error";
import { Login } from "../src/public/views/login/login";
import { Register } from "../src/public/views/register/register";
import { Start } from "../src/public/views/start/start";
import { User } from "../src/public/views/user/user";
import { League } from "../src/base-models/league";
import { Tournament } from "../src/base-models/tournament";
import { Match } from "../src/base-models/match";
import { LeagueCard } from "../src/models/leagueCard";
import { TournamentCard } from "../src/models/tournamentCard";
import { MatchCard } from "../src/models/matchCard";
import { MatchDisplay } from "../src/public/views/matchDisplay/matchDisplay";

//import { PARTIALS } from '../src/PARTIALS';

 const PARTIALS = [
  { item: Root, url: "/root.html" },
  { item: Error, url: "/error.html" },
  { item: Login, url: "/login.html" },
  { item: Register, url: "/register.html" },
  { item: Start, url: "/start.html" },
  { item: User, url: "/user.html" },
  { item: League, url: "/league.html" },
  { item: Tournament, url: "/tournament.html" },
  { item: Match, url: "/match.html" },
  { item: LeagueCard, url: "/leagueCard.html" },
  { item: TournamentCard, url: "/tournamentCard.html" },
  { item: MatchCard, url: "/matchCard.html" },
  { item: MatchDisplay, url: "/matchDisplay.html" },

]

class AppInit {
  fetchPartials() {
    let promisses = [];

    PARTIALS.map(p => {
      promisses.push(fetch(p.url).then(res => res.text()).then(html => {
        p.item._template = document.createElement('partial');
        // let doc = this.parser.parseFromString(html, "text/html");
        // doc.body.childNodes.forEach(cn => {
        //   p.item._template.appendChild(cn);
        // });
        p.item._template.innerHTML = html;
      }));
    })

    Promise.all(promisses);
  }
}

export const appInit = new AppInit();