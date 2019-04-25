import { Root } from "../src/public/views/root/root";
import { Start } from "../src/public/views/start/start";
import { User } from "../src/public/views/user/user";
import { Login } from "../src/public/views/login/login";
import { Register } from "../src/public/views/register/register";
import { Error } from "../src/public/views/error/error";
import { Partial } from "./partial";
import { auth } from "../src/services/authService";
import { MatchDisplay } from "../src/public/views/matchDisplay/matchDisplay";

const navigationMap = [
  { path: '/user', partial: User, allowAuth: true, allowUnauth: false },
  { path: '/login', partial: Login, allowAuth: false, allowUnauth: true },
  { path: '/register', partial: Register, allowAuth: false, allowUnauth: true },
  { path: '/match', partial: MatchDisplay, allowAuth: true, allowUnauth: false },
  { path: 'error', partial: Error, allowAuth: true, allowUnauth: true },
  { path: '/', partial: Start, allowAuth: true, allowUnauth: false },
]



class Router {
  public navigateTo(path: string, reload: boolean = false, forceHistory: boolean = false) {
    if (reload)
      this.loadRoot();

    this.loadPage(path, !reload || forceHistory)
  }

  private loadRoot() {
    const r = new Root();
    r.init();



    document.querySelector('root').innerHTML = '';
    document.querySelector('root').appendChild(r.template);
  }

  private loadPage(path, forceHistory) {
    if (forceHistory)
      window.history.pushState({ path: path }, document.title, path);


    let newPath = path.split('?')[0];
    const p = this.routePartial(newPath);
    p.init();


    document.querySelector('partial-region').innerHTML = '';
    p.template.childNodes.forEach(el => {
      document.querySelector('partial-region').appendChild(el);
    });
  }

  private routePartial(path): Partial {

    let page = navigationMap.find(x=>path.startsWith(x.path));

    if (!page) {
      return new Error('404 Page not found');
    }
    else {
      if ((page.allowAuth && auth.isAuthenticated()) || (page.allowUnauth && !auth.isAuthenticated())) {
        return new page.partial();
      }
      else {
        if (auth.isAuthenticated()) {
          return new Error('401 Unauthorized');
        }
        else {
          return new Login();
        }
      }
    }

  }
}

export const router = new Router();