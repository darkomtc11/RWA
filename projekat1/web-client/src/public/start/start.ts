import { Partial } from '../../../framework/partial';

export class Start extends Partial {

  private title = {text: 'test'};
  private asd:string = 'AAAAAA';
  private currentUser={
    username: "darkomtc"
  }

  constructor() {
    super('start', 'start.html');
  }
  
}