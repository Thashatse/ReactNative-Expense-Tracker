import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay({message}) {
  return (
    <View style={styles.viewStyle}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  message: {
    marginTop: 15,
    color: "white",
  },

  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  }
});
