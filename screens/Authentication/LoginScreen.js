import { useContext, useState } from "react";
import { Alert } from "react-native";
//components
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
//utils
import { signInUser } from "../../util/Auth";
//stores
import { AuthContext } from "../../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signInHandler({ email, password }) {
    setIsAuthentication(true);
    try {
      const token = await signInUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication Failed", "Invalid email or password");
      setIsAuthentication(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing In..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
