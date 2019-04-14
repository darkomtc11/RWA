import { partialsMap } from "./partialsMap";
import { loader } from "../framework/loader";
import { Partial } from "../framework/partial";

class Router {
  public async navigateTo(path: string, reload:boolean = false) {
    if(reload)
      this.loadIndex().then(()=>this.loadPage(path));
    else
      this.loadPage(path);
      
  }

  public async loadIndex() {
    const i = new partialsMap.root();
    const template = await i.getTemplate();
    document.documentElement.innerHTML = template;
    i.alterTemplate(document);
  }

  private async loadPage(path){
    const foundPartial = partialsMap[path];
    const p = foundPartial?new foundPartial(): new partialsMap.error('404 Page not found');
    const template = await p.getTemplate();
    document.querySelector('partial-region').innerHTML = template;
    p.alterTemplate(document.querySelector('partial-region'));
    window.history.pushState({ "html": template, "pageTitle": document.title }, document.title, path);
  }

  public alterOnly(path){
    const i = new partialsMap.root();
    const foundPartial = partialsMap[path];
    const p = foundPartial?new foundPartial(): new partialsMap.error('404 Page not found');

    i.alterTemplate(document);
    p.alterTemplate(document.querySelector('partial-region'));
  }
}

export const router = new Router();