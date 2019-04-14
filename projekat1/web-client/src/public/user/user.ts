import { Partial } from '../../../framework/partial';

export class User extends Partial {

  private username: string = 'darkomtc';
  private firstName:string = 'Darko';
  private lastName:string = 'Mitic';

  constructor() {
    super('user', 'user.html');
  }
  
}