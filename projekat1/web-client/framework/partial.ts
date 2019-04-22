import { loader } from './loader';
import { Helper, helper } from './helper';
import { templateCache } from './cachedTemplate';


export class Partial {
  helper: Helper = helper;


  constructor(protected _templateURI: string, private _path: string = '') {
  }

  getBaseTemplate() {
    return fetch( this._templateURI).then(res => {
      return res.text();
    });
  }

  getTemplate(): Promise<string> {
    return new Promise<string>(resolve => {
      let cached = templateCache[this._templateURI];
      if (cached) {
        resolve(loader.execPartial(this, cached));
      }
      else {
        this.getBaseTemplate().then(template => {
          templateCache[this._templateURI] = template;
          resolve(loader.execPartial(this, template));
        });
      }
    });
  }

  getFraction(): Promise<ChildNode> {
    return new Promise<ChildNode>(resolve => {
      let cached = templateCache[this._templateURI];
      if (cached) {
        resolve(loader.execFraction(this, cached));
      }
      else {
        this.getBaseTemplate().then(template => {
          templateCache[this._templateURI] = template;
          resolve(loader.execFraction(this, template));
        });
      }
    });
  }

  

  getPath() {
    return this._path;
  }

  alterTemplate(doc) {
    loader.execAfterLoad(this, doc);
  }


}