import { createContext, useReducer } from "react";

const DUMMY_EXPENSE = [
  {
    id: "e1",
    description: "Groceries",
    amount: 750.59,
    date: new Date("2023-02-13"),
  },
  {
    id: "e2",
    description: "Take Out",
    amount: 101.01,
    date: new Date("2023-03-13"),
  },
  {
    id: "e3",
    description: "Bike Repair",
    amount: 1989,
    date: new Date("2023-03-08"),
  },
  {
    id: "e4",
    description: "Drinks",
    amount: 205,
    date: new Date("2023-03-00"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id) => {},
  deleteExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[UpdatedExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.fillter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
