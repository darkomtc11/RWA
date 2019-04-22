import { Partial } from '../../../../framework/partial';
import { auth } from '../../../services/authService';

export class Root extends Partial {
  constructor() {
    super('root.html');
  }
  private siteName = 'Projekat 1';
  private authenticated: boolean = auth.isAuthenticated();
  logout = {
    click: () => auth.logout()
  }
  private currentUser = auth.currentUser;
}