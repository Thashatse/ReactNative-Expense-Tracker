import { StyleSheet, Text, View } from "react-native";
//Components
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
//constatnst
import { GlobalStyles } from "../../constants/styles";

function ExpensesOutput({ expensesPeriodName, expenses, fallbackText }) {
  let content = <Text style={Styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={Styles.container}>
      {/* SUMMARY */}
      <ExpensesSummary periodName={expensesPeriodName} expenses={expenses} />
      {/* LIST OF Expenses */}
      {content}
    </View>
  );
}

export default ExpensesOutput;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
});
