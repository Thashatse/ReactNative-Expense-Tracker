import axios from "axios";

const baseURL =
  "https://react-expensetracker-5ab8a-default-rtdb.europe-west1.firebasedatabase.app/";
const expenseEndpoint = "expenses.json";

export function storeExpense(expenseData) {
  axios.post(baseURL + expenseEndpoint, expenseData);
}

export async function fetchExpenses() {
    const response = await axios.get(baseURL + expenseEndpoint);

    const expenses = []

    for (const key in response.data){
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