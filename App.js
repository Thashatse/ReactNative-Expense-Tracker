//Imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
//Screens
import { AuthStack } from "./screens/StartUp/AuthStack";
import { AuthenticatedStack } from "./screens/StartUp/AuthenticatedStack";
//Store
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
//React
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

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

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  
  useEffect(() => {
    async function fetchAuthentication() {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedAuthID = await AsyncStorage.getItem('userID');
      
      if(storedAuthID && storedToken){
        authCtx.authenticate(storedAuthID, storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchAuthentication();
  }, []);

  if(isTryingLogin){
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>);
}

export default function App() {


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
