import { createContext, useState } from "react";

export const AuthContext = createContext({
  userID: '',
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  getToken: () => {},
  getUserID: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userAuthID, setUserAuthID] = useState();

  function authenticate(userDetails) {
    setUserAuthID(userDetails[0]);
    setAuthToken(userDetails[1]);
  }

  function getToken() {
    console.log("AuthContext, Get Token " + AuthContext);
    return authToken;
  }

  function getUserID() {
    console.log("AuthContext, Get Auth User ID " + AuthContext);
    return userAuthID;
  }

  function logout() {
    setAuthToken(null);
    setUserAuthID(null);
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