import { router } from "../framework/router";
import { auth } from "./services/authService";
import { appInit } from "../framework/app";

(async function () {
  await appInit.fetchPartials();

  auth.setCurrentUser(() => {
    router.navigateTo(document.location.pathname, true, true)
  });

})();

window.onpopstate = function (e) {
  if (e.state) {
    router.navigateTo(e.state.path, true);
  }
};