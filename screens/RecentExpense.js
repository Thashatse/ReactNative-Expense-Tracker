import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
//stores
import { AuthContext } from "../store/auth-context";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  
  const expenseCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try
      {
        const expenses = await fetchExpenses(authCtx.getUserID(), authCtx.getToken());
        expenseCtx.setExpenses(expenses);
      }
      catch (error)
      {
        setError('Unable to load expenses');
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function errorHandler() {
    setError(null);
  }

  if(error && !isLoading){
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
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
