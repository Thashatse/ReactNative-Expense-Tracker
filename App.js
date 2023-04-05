//IMports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
//Screens
import { AuthStack } from "./screens/StartUp/AuthStack";
import { AuthenticatedStack } from "./screens/StartUp/AuthenticatedStack";
//Store
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

export const Stack = createNativeStackNavigator();

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {!authCtx.isAuthenticated
        ? AuthStack(Stack)
        : AuthenticatedStack(Stack)}
    </>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthContextProvider>
    </>
  );
}
