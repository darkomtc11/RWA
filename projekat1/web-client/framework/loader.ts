import { router } from "../src/router";

const safeEval = require('safer-eval');

class Loader {
  _scope = null;
  _template = null;
  _document = null;
  parser = new DOMParser();

  public exec(scope, template) {
    this._scope = scope;
    this._template = template;

    template = this.loadEvals();
    template = this.loadAttrIf();

    return template;
  }

  public execAfterLoad(scope, document) {
    this._scope = scope;
    this._document = document;
    this.loadAttrNavigateTo();
    this.loadAttrEvSubmit();
    this.loadAttrEvClick();
  }

  private loadEvals(): string {
    let reg = /\{(.*?)\}/;//{ xxxxxx.yy.z }
    let m;
    do {
      m = reg.exec(this._template);
      if (m) {
        let prop = m[1].replace(/\s/g, '');
        this._template = this._template.replace(m[0], safeEval(prop, this._scope));
      }
    }
    while (m);
    return this._template;
  }

  private loadAttrIf(): string {
    let doc = this.parser.parseFromString(this._template, "text/html");

    let elems: NodeListOf<HTMLElement> = doc.querySelectorAll('[if]');
    elems.forEach(el => {
      let cond = el.attributes.getNamedItem('if').value;
      let b = safeEval(cond, this._scope);
      if (b) {
        el.classList.add('d-block');
        el.classList.remove('d-none');
      }
      else {
        el.classList.add('d-none');
        el.classList.remove('d-block');
      }
    });

    return doc.documentElement.innerHTML;
  }

  private loadAttrNavigateTo() {
    let elems: NodeListOf<HTMLElement> = this._document.querySelectorAll('[navigate-to]');
    elems.forEach(el => {
      let urlPath = el.attributes.getNamedItem('navigate-to').value;
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        router.navigateTo(urlPath);
      });
    });
  }

  private loadAttrEvSubmit() {
    let elems: NodeListOf<HTMLElement> = this._document.querySelectorAll('[ev-submit]')
    elems.forEach(el => {
      let handler = el.attributes.getNamedItem('ev-submit').value;
      el.addEventListener('submit',
        safeEval(handler, this._scope)
      );
    });
  }

  private loadAttrEvClick() {
    let elems: NodeListOf<HTMLElement> =this._document.querySelectorAll('[ev-click]')
    elems.forEach(el => {
      let handler = el.attributes.getNamedItem('ev-click').value;
      el.addEventListener('click',
        safeEval(handler, this._scope)
      );
    });
  }
}

export const loader = new Loader();