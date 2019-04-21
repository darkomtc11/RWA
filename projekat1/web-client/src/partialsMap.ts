import { Index } from "./public/views/index/index";
import { Start } from "./public/views/start/start";
import { User } from "./public/views/user/user";
import { Login } from "./public/views/login/login";
import { Register } from "./public/views/register/register";
import { Error as err } from "./public/views/error/error";
import { auth } from "./services/authService";
import { router } from "./router";

const partialsMap = {
  'root': { partial: Index, allowAuth: true, allowUnauth: true },
  '/': { partial: Start, allowAuth: true, allowUnauth: false },
  '/user': { partial: User, allowAuth: true, allowUnauth: false },
  '/login': { partial: Login, allowAuth: false, allowUnauth: true },
  '/register': { partial: Register, allowAuth: false, allowUnauth: true },
  'error': { partial: err, allowAuth: true, allowUnauth: true },
}

export function getPartial(path) {
  let page = partialsMap[path];

  if (!page)
    return new err('404 Page not found');
  else
    if ((page.allowAuth && auth.isAuthenticated()) || (page.allowUnauth && !auth.isAuthenticated()))
      return new page.partial();
    else
      if (auth.isAuthenticated())
        return new err('401 Unauthorized');
      else
        return new Login();
}