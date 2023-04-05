import axios from "axios";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const signInEndPoint = "signInWithPassword?key=";
const signUpEndPoint = "signUp?key=";
const key = "AIzaSyBMUz8zqJmquKdVWgctAS7zvrBW2uGlic4";

async function authenticate(mode, email, password)
{
  const url = baseURL + (mode == "signIn" ? signInEndPoint : (mode == "signUp" ? signUpEndPoint : "" )) + key;
  
  var response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log(response.data);
  const token = response.data.idToken;
  return token;
}

export function signInUser(email, password) {
  return authenticate("signIn", email, password);
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}