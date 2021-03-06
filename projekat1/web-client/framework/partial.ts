import { Helper, helper } from './helper';
import { router } from './router';
import { fromEvent } from 'rxjs';
//import { PARTIALS } from '../src/PARTIALS';

const saferEval = require('safer-eval');

export class Partial {
  helper: Helper = helper;
  static _template: HTMLElement;
  moustaches: NodeListOf<Element>;

  constructor(public _template: HTMLElement, private _path: string = '') {

  }

  async load(){

  }

  init() {
    this.loadMustache();
    this.loadAttrIf();
    this.loadAttrNavigateTo();
    this.loadAttrEvSubmit();
    this.loadAttrEvClick();
    //this.loadChildPartials();
  }

  get template() {
    return this._template;
  }

  loadMustache() {
    let html = this._template.innerHTML;

    //let reg = /\{(.*?)\}/;//
    //let reg = /(?<=% \{\{\{ )(.*)(?= \}\}\} )/
    let reg = /{{{?\s*.*?\s*}}}///{{{xx.yyyy.z}}}
    let m;
    do {
      m = reg.exec(html);
      if (m) {
        let prop = m[0].slice(3, -3).trim();//.replace(/\s/g, '');

        let val = `<ex-moustache for="${prop}">${saferEval(prop, this)}</ex-moustache>`;
        html = html.replace(m[0], val);
      }
    }
    while (m);


    reg = /{{?\s*.*?\s*}}///{{ asd }}
    do {
      m = reg.exec(html);

     
      if (m) {
        let prop = m[0].slice(3, -3).trim();//.replace(/\s/g, '');

        let x = saferEval(prop, this);
        html = html.replace(m[0], saferEval(prop, this));
      }
    }
    while (m);


    this._template.innerHTML = html;
    this.moustaches = this._template.querySelectorAll("ex-moustache");
  }

  refreshMoustache() {
    this.moustaches.forEach(m => {
      const prop = m.getAttribute('for');
      m.innerHTML = saferEval(prop, this);
    })
  }

  loadAttrIf() {
    let elems: NodeListOf<HTMLElement> = this._template.querySelectorAll('[if]');

    for (let i = 0; i < elems.length; i++) {
      let cond = elems[i].attributes.getNamedItem('if').value;
      let b = saferEval(cond, this);
      if (b) {
        elems[i].classList.add('d-block');
        elems[i].classList.remove('d-none');
      }
      else {
        elems[i].classList.add('d-none');
        elems[i].classList.remove('d-block');
      }
    }
  }

  loadAttrNavigateTo() {
    let elems: NodeListOf<HTMLElement> = this._template.querySelectorAll('[navigate-to]');

    elems.forEach(el => {
      let urlPath = el.attributes.getNamedItem('navigate-to').value;
      el.style.cursor = 'pointer';

      fromEvent(el, 'click').subscribe(()=>{
        router.navigateTo(urlPath);
      })
    });
  }

  loadAttrEvSubmit() {
    let elems: NodeListOf<HTMLElement> = this._template.querySelectorAll('[ev-submit]')
    elems.forEach(el => {
      let handler = el.attributes.getNamedItem('ev-submit').value;
      el.addEventListener('submit',
        saferEval(handler, this)
      );
    });
  }

  loadAttrEvClick() {
    let elems: NodeListOf<HTMLElement> = this._template.querySelectorAll('[ev-click]')
    elems.forEach(el => {
      let handler = el.attributes.getNamedItem('ev-click').value;
      el.addEventListener('click',
        saferEval(handler, this)
      );
    });
  }

  // loadChildPartials() {
  //   let children = this._template.querySelectorAll('partial');
  //   children.forEach(c => {
  //     let partialTag = c.getAttribute('tag');
  //     let partial = PARTIALS.filter(p => p.tag == partialTag)[0].item;
  //     let p = new partial();
  //     p.init();
  //   });
  // }

  getPath() {
    return this._path;
  }

  $(query) {
    return document.querySelector(query);
  }

  render(container) {
    for (let i = 0; i < this.template.children.length; i++)
      container.append(this.template.children[i]);
  }
}