import { Root } from "../src/public/views/root/root";
import { Start } from "../src/public/views/start/start";
import { User } from "../src/public/views/user/user";
import { Login } from "../src/public/views/login/login";
import { Register } from "../src/public/views/register/register";
import { Error } from "../src/public/views/error/error";
import { Partial } from "./partial";
import { auth } from "../src/services/authService";

const navigationMap = {
  '/': { partial: Start, allowAuth: true, allowUnauth: false },
  '/user': { partial: User, allowAuth: true, allowUnauth: false },
  '/login': { partial: Login, allowAuth: false, allowUnauth: true },
  '/register': { partial: Register, allowAuth: false, allowUnauth: true },
  'error': { partial: Error, allowAuth: true, allowUnauth: true },
}



class Router {
  public navigateTo(path: string, reload: boolean = false) {
    if (reload)
      this.loadRoot();

    this.loadPage(path, reload)
  }

  private loadRoot() {
    const r = new Root();
    r.init();

    document.querySelector('root').innerHTML = '';
    document.querySelector('root').appendChild(r.template);
  }

  private loadPage(path, reload) {
    const p = this.routePartial(path);
    p.init();

    document.querySelector('partial-region').innerHTML = '';
    p.template.childNodes.forEach(el => {
      document.querySelector('partial-region').appendChild(el);
    });

    if (!reload)
      window.history.pushState({ path: p.getPath() }, document.title, p.getPath());
  }

  private routePartial(path): Partial {
    let page = navigationMap[path];
  
    if (!page)
      return new Error('404 Page not found');
    else
      if ((page.allowAuth && auth.isAuthenticated()) || (page.allowUnauth && !auth.isAuthenticated()))
        return new page.partial();
      else
        if (auth.isAuthenticated())
          return new Error('401 Unauthorized');
        else
          return new Login();
  }
}

export const router = new Router();