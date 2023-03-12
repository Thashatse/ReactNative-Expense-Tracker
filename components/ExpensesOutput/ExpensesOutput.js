import { StyleSheet, View } from "react-native";
//Components
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
//constatnst 
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSE = [
  {
    id: 'e1',
    description: 'Groceries',
    amount: 750.59,
    date: new Date('2023-02-19')
  },
  {
    id: 'e2',
    description: 'Take Out',
    amount: 101.01,
    date: new Date('2023-03-09')
  },
  {
    id: 'e3',
    description: 'Bike Repair',
    amount: 1989,
    date: new Date('2023-03-07')
  },
  {
    id: 'e4',
    description: 'Drinks',
    amount: 205,
    date: new Date('2023-03-00')
  },
  {
    id: 'e5',
    description: 'Groceries',
    amount: 750.59,
    date: new Date('2023-02-19')
  },
  {
    id: 'e6',
    description: 'Take Out',
    amount: 101.01,
    date: new Date('2023-03-09')
  },
  {
    id: 'e7',
    description: 'Bike Repair',
    amount: 1989,
    date: new Date('2023-03-07')
  },
  {
    id: 'e8',
    description: 'Drinks',
    amount: 205,
    date: new Date('2023-03-00')
  },
  {
    id: 'e9',
    description: 'Groceries',
    amount: 750.59,
    date: new Date('2023-02-19')
  },
  {
    id: 'e10',
    description: 'Take Out',
    amount: 101,
    date: new Date('2023-03-09')
  },
  {
    id: 'e11',
    description: 'Bike Repair',
    amount: 1989,
    date: new Date('2023-03-07')
  },
  {
    id: 'e12',
    description: 'Drinks',
    amount: 205,
    date: new Date('2023-03-00')
  }
]

function ExpensesOutput({ expensesPeriodName, expenses }) {

  return (
    <View style={Styles.container}>
      {/* SUMMARY */}
      <ExpensesSummary periodName={expensesPeriodName} expenses={DUMMY_EXPENSE}/>
      {/* LIST OF Expenses */}
      <ExpensesList expenses={DUMMY_EXPENSE} />
    </View>
  );
}

export default ExpensesOutput;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },

});