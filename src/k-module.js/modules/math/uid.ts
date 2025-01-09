import { generatePassword } from './random'

var idList: string[] = [];
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";

/** uid string */
export function createUID() {
  var length = 6;
  var uid = generatePassword(length, chars);
  while (idList.includes(uid)) {
    uid = generatePassword(length, chars);
  }
  return uid;
}


