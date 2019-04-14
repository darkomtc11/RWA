import { router } from "./router";
import { userService } from "./services/userService";
import { map, filter } from "rxjs/operators";
import { User } from "./models/user";
import { auth } from "./services/authService";


(function () {
  if (auth.isAuthenticated())
    auth.setCurrentUser(() => {
      router.loadIndex();
      router.navigateTo(document.location.pathname);
    });
  else {
    router.loadIndex();
    router.navigateTo(document.location.pathname);
  }

})();

window.onpopstate = function (e) {
  if (e.state) {
    document.querySelector("partial-region").innerHTML = e.state.html;
    document.title = e.state.pageTitle;
    console.log(document.location.pathname);
    router.alterOnly(document.location.pathname);
  }
};