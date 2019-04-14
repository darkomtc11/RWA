import { loader } from './loader';

export class Partial {
  protected _references: Partial[];
  constructor(protected _tag: string, protected _template: string) {
  }

  getTag() {
    return this._tag;
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


}