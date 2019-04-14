const safeEval = require('safe-eval');

class Loader {
  _scope = null;
  _template = null;

  public exec(scope, template) {
    this._scope = scope;
    this._template = template;
    template = loader.loadEvals();
    template = loader.loadAttrIf();
    return template;
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
      else
        break;
    }
    while (m);
    return this._template;
  }

  private loadAttrIf(): string {
    const parser = new DOMParser();
    let doc = parser.parseFromString(this._template, "text/html");

    doc.querySelectorAll('[if]').forEach(el => {
      let cond = el.attributes.getNamedItem('if').value;
      let text = el.innerHTML;
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
}

export const loader = new Loader();