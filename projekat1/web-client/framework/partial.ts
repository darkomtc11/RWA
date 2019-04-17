import { loader } from './loader';

export class Partial {
  constructor(protected _templateURI: string, private _path: string) {
  }

  getBaseTemplate() {
    return fetch('http://localhost:8080/' + this._templateURI).then(res => {
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

  getPath(){
    return this._path;
  }

  alterTemplate(doc){
    loader.execAfterLoad(this, doc);
  }


}