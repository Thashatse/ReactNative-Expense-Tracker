//Impoorts
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "react-native-format-currency";
//
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    print(sum);
    return sum + expense.amount;
  }, 0);
  
  print('expensesSum: ' + expensesSum);

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({ amount: expensesSum, code: "ZAR" });

  return (
    <View  style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{valueFormattedWithSymbol}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,

  }

});
