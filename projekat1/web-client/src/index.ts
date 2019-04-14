import { Start } from "./public/start/start";
import { User } from "./public/user/user";
import { Partial } from '../framework/partial';


(async function () {
  let t = new Start();
  let startTag = document.querySelector('start-region');
  let template = await t.getTemplate();
  startTag.innerHTML = template;
  if (document.location.pathname == '/') {
    
  }
  else {
    let t = new User();
    let startTag = document.querySelector('partial-region');
    let template = await t.getTemplate();
    startTag.innerHTML = template;
  }
})();

