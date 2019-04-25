import { Partial } from '../../../../framework/partial';
import { userService } from '../../../services/userService';

export class User extends Partial {

  private username: string = ' ';
  private firstName: string = ' ';
  private lastName: string = ' ';

  constructor() {
    super(User._template.cloneNode(true) as HTMLElement, '/user');
    this.load();
  }

  load() {
    userService.getByToken(localStorage.getItem('token')).then(user => {
      
      this.username = user[0].username;
      this.firstName = user[0].firstName;
      this.lastName = user[0].lastName;
      this.refreshMoustache();
    })
  }

}