import { StyleSheet, Text, View } from "react-native";
import Input from "./input";

function ExpenseForm() {
  function onAmountChangeHandler() {}
  function onDateChangeHandler() {}

  return (
    <View style={styles.forms}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Date"
          style={styles.rowInputStyle}
          textInputConfig={{
            KeyboardType: "default",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onDateChangeHandler,
          }}
        />
        <Input
          label="Amount"
          style={styles.rowInputStyle}
          textInputConfig={{
            inputMode: "decimal",
            keyboardType: "decimal-pad",
            onChangeText: onAmountChangeHandler,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          KeyboardType: "default",
          multiline: true,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  forms: {
    // marginTop: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInputStyle: {
    flex: 1,
  },
});
