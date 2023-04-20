import { FlatList, Text } from "react-native";
//components
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(ItemData) {
  var expense = ItemData.item;

  return <ExpenseItem {...expense} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(ItemData) => ItemData.id}
    />
  );
}

export default ExpensesList;