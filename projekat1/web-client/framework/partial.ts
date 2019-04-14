import { loader } from './loader';

export class Partial {
  protected _references: Partial[];
  constructor(protected _template: string) {
  }

  getBaseTemplate() {
    return fetch('http://localhost:8080/' + this._template).then(res => {
      return res.text();
    });
  }

  getTemplate() {
    return new Promise<string>(resolve => {
      this.getBaseTemplate().then(template => {
        template = loader.exec(this, template);
        resolve(template);
      });
    });
  }

  alterTemplate(doc){
    loader.execAfterLoad(this, doc);
  }


}