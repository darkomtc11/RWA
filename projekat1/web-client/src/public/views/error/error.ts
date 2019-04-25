import { Partial } from '../../../../framework/partial';

export class Error extends Partial {


  constructor(private errorMessage:string='Unknown error.') {
    super(Error._template.cloneNode(true) as HTMLElement, '/error');
    this.errorMessage = errorMessage;
  }
  
}