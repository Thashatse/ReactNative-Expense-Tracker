import { useContext, useState } from "react";
//helpers
import { createUser } from "../../util/Auth";
//components
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
//stores
import { AuthContext } from "../../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthentication(true);
    try {
      const userAuthDetails = await createUser(email, password);
      authCtx.authenticate(userAuthDetails[0], userAuthDetails[1]);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Unable to create new user. Please try again later."
      );
      setIsAuthentication(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating your account..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
