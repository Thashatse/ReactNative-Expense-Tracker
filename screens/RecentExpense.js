import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      expenseCtx.setExpenses(expenses);
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  console.log(new Date() + " - " + expenseCtx.expenses);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    var result = expense.date > date7DaysAgo;
    return result;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriodName={"Last 7 days"}
      fallbackText={"No expenses in the past 7 days"}
    />
  );
}

export default RecentExpenses;
