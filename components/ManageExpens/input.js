import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig, isValid }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }

  if (!isValid) {
    inputStyles.push(styles.invalidInputStyle);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabelStyle]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabelStyle: {
    color: GlobalStyles.colors.error500,
  },
  invalidInputStyle: {
    color: GlobalStyles.colors.error50,
  },
});
