import { router } from "./router";
import { auth } from "./services/authService";
import { templateCache } from "../framework/cachedTemplate";


(function () {
  templateCache.cache().then(() =>
    auth.setCurrentUser(() =>
        router.navigateTo(document.location.pathname, true)));

})();

window.onpopstate = function (e) {
  if (e.state) {
    document.querySelector("partial-region").innerHTML = e.state.html;
    document.title = e.state.pageTitle;
    router.alterOnly(document.location.pathname);
  }
};