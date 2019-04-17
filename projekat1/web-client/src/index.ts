import { Partial } from '../framework/partial';
import { auth } from './services/authService';

export class Index extends Partial {
  constructor() {
    super('index.html', '/');
  }
  private siteName = 'Projekat 1';
  private authenticated: boolean = auth.isAuthenticated();
  logout = {
    click: () => auth.logout()
  }
  private currentUser = auth.currentUser;
}