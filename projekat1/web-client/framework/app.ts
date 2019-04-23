import { Root } from "../src/public/views/root/root";
import { Error } from "../src/public/views/error/error";
import { Login } from "../src/public/views/login/login";
import { Register } from "../src/public/views/register/register";
import { Start } from "../src/public/views/start/start";
import { User } from "../src/public/views/user/user";
import { League } from "../src/models/league";
import { Tournament } from "../src/models/tournament";
import { Match } from "../src/models/match";

//import { PARTIALS } from '../src/PARTIALS';

 const PARTIALS = [
  { item: Root, tag: "root", url: "./root.html" },
  { item: Error, tag: "error", url: "./error.html" },
  { item: Login, tag: "login", url: "./login.html" },
  { item: Register, tag: "register", url: "./register.html" },
  { item: Start, tag: "start", url: "./start.html" },
  { item: User, tag: "user", url: "./user.html" },
  { item: League, url: "./league.html" },
  { item: Tournament, url: "./tournament.html" },
  { item: Match, url: "./match.html" }
]

class AppInit {

  private parser = new DOMParser();

  fetchPartials() {
    let promisses = [];

    PARTIALS.map(p => {
      promisses.push(fetch(p.url).then(res => res.text()).then(html => {
        p.item._template = document.createElement('partial');
        let doc = this.parser.parseFromString(html, "text/html");
        doc.body.childNodes.forEach(cn => {
          p.item._template.appendChild(cn);
        });
      }));
    })

    return Promise.all(promisses);
  }
}

export const appInit = new AppInit();