import { NavigationContainer } from "@react-navigation/native";
//Consts
import { GlobalStyles } from "../../constants/styles";
//screens
import LoginScreen from "../Authentication/LoginScreen";
import SignupScreen from "../Authentication/SignupScreen";

/*START: Unauthenticated*/
export function AuthStack(Stack) {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
  );
}
/*END: Unauthenticated*/
