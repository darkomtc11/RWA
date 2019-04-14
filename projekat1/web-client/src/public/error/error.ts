import { Partial } from '../../../framework/partial';

export class Error extends Partial {

  errorMessage;
  constructor(errorMessage:string) {
    super('error.html');
    this.errorMessage = errorMessage;
  }
  
}