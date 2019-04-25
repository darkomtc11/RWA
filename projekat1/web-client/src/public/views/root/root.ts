import { Partial } from '../../../../framework/partial';
import { auth } from '../../../services/authService';

export class Root extends Partial {
  constructor() {
    super(Root._template.cloneNode(true) as HTMLElement);
  }
  siteName = 'eSport Events';
  private authenticated: boolean = auth.isAuthenticated();
  logout = {
    click: () => auth.logout()
  }
  private currentUser = auth.currentUser;
}