import { Injectable } from '@angular/core';
import {SessionAttribute} from "../constant/session-attribute";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor() { }

  public hasRole(roleUI: Array<String>) {
    let roleCheck = false;
    if (roleUI == null || roleUI.length == 0) {
      return false;
    }
    var roleSession = sessionStorage.getItem(SessionAttribute.ROLES);
    var roleUser = new Array<String>;
    if (roleSession != null) {
      roleUser = JSON.parse(roleSession);
      if (roleUser == null || roleUser.length == 0) {
        return false;
      }
    }
    roleUI.forEach(obj => {
      // @ts-ignore
      roleUser.forEach(obj1 => {
        if (obj1 === obj) {
          roleCheck = true;
        }
      });
    });
    return roleCheck;
  }
}
