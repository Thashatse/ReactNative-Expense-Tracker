import axios from "axios";
import { authKeySecret } from "./appSecrets";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const signInEndPoint = "signInWithPassword?key=";
const signUpEndPoint = "signUp?key=";
key = authKeySecret; //[YOUR Base firebase database key here]

async function authenticate(mode, email, password) {
  const url =
    baseURL +
    (mode == "signIn"
      ? signInEndPoint
      : mode == "signUp"
      ? signUpEndPoint
      : "") +
    key;

  var response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const localId = response.data.localId;
  var dataToReturn = [localId, token];
  return dataToReturn;
}

export function signInUser(email, password) {
  return authenticate("signIn", email, password);
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
