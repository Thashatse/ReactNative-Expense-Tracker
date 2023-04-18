import axios from "axios";
import { baseURLSecret } from "./appSecrets";

baseURL = baseURLSecret; //[YOUR Base firebase database uri here e.g: https://react-expensetracker.europe-west1.firebasedatabase.app/]
const expenseEndpoint = "expenses";
const expenseDataFormat = ".json";

export async function fetchExpenses(userID, token) {
  console.log("fetchExpenses: " + token);

  const response = await axios.get(
    baseURL + expenseEndpoint + "/" + userID + expenseDataFormat + "?auth=" + token
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

export async function storeExpense(expenseData, userID, token) {
  console.log("storeExpense: " + token);

  const response = await axios.post(
    baseURL + expenseEndpoint + "/" + userID + expenseDataFormat + "?auth=" + token,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export function updateExpense(id, expenseData, userID, token) {
  console.log("updateExpense: " + token);

  return axios.put(
    baseURL + expenseEndpoint + "/" + userID + `/${id}` + expenseDataFormat + "?auth=" + token,
    expenseData
  );
}

export function deleteExpense(id, userID, token) {
  console.log("deleteExpense: " + token);
  
  return axios.delete(baseURL + expenseEndpoint + "/" + userID + `/${id}` + expenseDataFormat + "?auth=" + token);
}
