import { Index } from ".";
import { Start } from "./public/start/start";
import { User } from "./public/user/user";
import { Error as err } from "./public/error/error";
import { Login } from "./public/login/login";
import { Register } from "./public/register/register";


export const partialsMap = {
  'root': Index,
  '/':Start,
  '/user':User,
  '/login':Login,
  '/register':Register,
  'error':err
}