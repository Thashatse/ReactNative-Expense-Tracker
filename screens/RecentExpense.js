import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
    const expenseCtx = useContext(ExpensesContext);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    // console.log(today.toString());
    // console.log(date7DaysAgo.toString());
    // console.log(expense.id.toString());
    // console.log(expense.date.toString());
    var result = expense.date > date7DaysAgo;
    console.log(result.toString());
    return result;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriodName={"Last 7 days"}
    />
  );
}

export default RecentExpenses;
