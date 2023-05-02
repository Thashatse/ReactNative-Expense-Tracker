import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  userID: '',
  token: '',
  isAuthenticated: false,
  authenticate: (userID, userToken) => {},
  getToken: () => {},
  getUserID: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userAuthID, setUserAuthID] = useState();

  function authenticate(userID, userToken) {
    setAuthToken(userToken);
    AsyncStorage.setItem('userToken', userToken);

    setUserAuthID(userID);
    AsyncStorage.setItem('userID', userID);
  }

  function getToken() {
    return authToken;
  }

  function getUserID() {
    return userAuthID;
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('userToken');
    
    setUserAuthID(null);
    AsyncStorage.removeItem('userID');
  }

  const value = {
    token: authToken,
    userID: userAuthID,
    isAuthenticated: !!authToken && !!userAuthID,
    authenticate: authenticate,
    getToken: getToken,
    getUserID: getUserID,
    logout: logout,
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;