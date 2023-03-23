import axios from "axios";

const baseURL =
  "https://react-expensetracker-5ab8a-default-rtdb.europe-west1.firebasedatabase.app/";
const expenseEndpoint = "expenses";
const expenseDataFormat = ".json";

export async function fetchExpenses() {
  const response = await axios.get(
    baseURL + expenseEndpoint + expenseDataFormat
  );

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function storeExpense(expenseData) {
  const response = await axios.post(
    baseURL + expenseEndpoint + expenseDataFormat,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export function updateExpense(id, expenseData) {
  return axios.put(
    baseURL + expenseEndpoint + `/${id}` + expenseDataFormat,
    expenseData
  );
}

export function deleteExpense(id) {
  return axios.delete(baseURL + expenseEndpoint + `/${id}` + expenseDataFormat);
}
