import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpens/ExpenseForm";
import Button from "../components/UI/button";
//Components
import IconButton from "../components/UI/IconButton";
//consts
import { GlobalStyles } from "../constants/styles";
//store
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    closeModal();
  }
  
  function saveHandler() {
    var object = {
      description: 'TEST - ' + (isEditing ? 'EDIT' : 'ADD'),
      amount: 83.78,
      date: isEditing ? new Date('2023-03-21') : new Date(),
    };

    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId, object);
    }
    else {
      expensesCtx.addExpense(object);
    }

    closeModal();
  }

  function cancelHandler() {
    closeModal();
  }

  function closeModal() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm/>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={saveHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
