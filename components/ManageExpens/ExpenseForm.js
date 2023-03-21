import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../UI/button";
import Input from "./input";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
      //isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
      //isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
      //isValid: !!defaultValues,
    },
  });

  function onInputChangeHandler(inputID, enteredValue) {
    setInput((currentValue) => {
      return {
        ...currentValue,
        [inputID]: { value: enteredValue, isValid: true },
      };
    });
  }

  function saveHandler() {
    const ExpenseData = {
      amount: +input.amount.value.replace(",", "."),
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(ExpenseData.amount) && ExpenseData.amount > 0;
    const dateIsValid = ExpenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = ExpenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(ExpenseData);
    } else {
      setInput((currentInput) => {
        return {
          amount: {
            value: currentInput.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currentInput.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      // Alert.alert("Invalid Input", "Please complete the for with valid inputs");

      return;
    }
  }

  const formIsInvalid =
    !input.amount.isValid || !input.description.isValid || !input.date.isValid;

  return (
    <View style={styles.forms}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Date"
          style={styles.rowInputStyle}
          isValid = {input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onInputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
        <Input
          label="Amount"
          style={styles.rowInputStyle}
          isValid = {input.amount.isValid}
          textInputConfig={{
            inputMode: "decimal",
            keyboardType: "decimal-pad",
            onChangeText: onInputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
      </View>
      <Input
        label="Description"
        isValid = {input.description.isValid}
        textInputConfig={{
          KeyboardType: "default",
          multiline: true,
          onChangeText: onInputChangeHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Please complete the for with valid inputs</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={saveHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
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
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },

  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowInputStyle: {
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 18,
    textAlign: "center",
  },
});
