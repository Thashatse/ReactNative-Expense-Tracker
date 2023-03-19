import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriodName={"Total"}
      fallbackText={'No expenses'}
    />
  );
}

export default AllExpenses;
