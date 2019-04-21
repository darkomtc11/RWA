import { getPartial } from "./partialsMap";

class Router {
  public async navigateTo(path: string, reload: boolean = false) {
    if (reload)
      this.loadIndex(() => this.loadPage(path));
    else
      this.loadPage(path);
  }

  public async loadIndex(next: Function) {
    const r = getPartial('root');
    const template = await r.getTemplate();
    
    document.documentElement.innerHTML = template;
    r.alterTemplate(document);
    next();
  }

  private async loadPage(path) {
    console.log('loadovanje straniceeee');
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