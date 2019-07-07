import { Partial } from '../../../../framework/partial';
import { userService } from '../../../services/userService';

export class User extends Partial {

  private username: string = ' ';
  private firstName: string = ' ';
  private lastName: string = ' ';

  constructor() {
    super(User._template.cloneNode(true) as HTMLElement, '/user');
    //this.load();
  }

  async load() {
    let users = await userService.getByToken(localStorage.getItem('token'));
    this.username = users[0].username;
    this.firstName = users[0].firstName;
    this.lastName = users[0].lastName;
  }

}