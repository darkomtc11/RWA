import { getPartial } from "./partialsMap";
import { Partial } from "../framework/partial";
import { Root } from "./public/views/root/root";

class Router {
  public navigateTo(path: string, reload: boolean = false) {
    if (reload)
      this.loadRoot(() => this.loadPage(path));
    else
      this.loadPage(path);
  }

  public async loadRoot(next: Function) {
    const r = new Root();
    const template = await r.getTemplate();
    
    document.querySelector('root').innerHTML = template;
    r.alterTemplate(document.querySelector('root'));
    next();
  }

  private async loadPage(path) {
    const p = getPartial(path);
    const template = await p.getTemplate();

    document.querySelector('partial-region').innerHTML = template;
    p.alterTemplate(document.querySelector('partial-region'));
    window.history.pushState({ "html": template, "pageTitle": document.title }, document.title, p.getPath());
  }

  public alterOnly(path) {
    const r = getPartial('root');
    const p = getPartial(path);

    //r.alterTemplate(document);
    p.alterTemplate(document.querySelector('partial-region'));
  }
}

export const router = new Router();