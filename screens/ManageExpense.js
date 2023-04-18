import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpens/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
//Components
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
//consts
import { GlobalStyles } from "../constants/styles";
//store
import { AuthContext } from "../store/auth-context";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsLoading(true);
    try{
      await deleteExpense(editedExpenseId, authCtx.getUserID(), authCtx.getToken());
      expensesCtx.deleteExpense(editedExpenseId);
      closeModal();
    }
    catch{
      setError('The expense could not be deleted');
    }
    setIsLoading(false);
  }

  async function saveHandler(expenseData) {
    setIsLoading(true);
    if (isEditing) {
      try{
        await updateExpense(editedExpenseId, expenseData, authCtx.getUserID(), authCtx.getToken());
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        closeModal();
      }
      catch{
        setError('The expense could not be updated');
      }
    } else {
      try{
        const id = await storeExpense(expenseData, authCtx.getUserID(), authCtx.getToken());
        expensesCtx.addExpense({ ...expenseData, id: id });
        closeModal();
      }
      catch{
        setError('The expense could not be added');
      }
    }
    setIsLoading(false);
  }

  function cancelHandler() {
    closeModal();
  }

  function closeModal() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if(error && !isLoading){
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={saveHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    PaddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
