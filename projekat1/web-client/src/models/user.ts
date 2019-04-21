export interface RegisterUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  loginToken: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  loginToken: string;
}