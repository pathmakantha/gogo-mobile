import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BudgetStackParamList } from './types';
import { BudgetPlannerScreen } from '../screens/budget/BudgetPlannerScreen';
import { CostSplitScreen } from '../screens/budget/CostSplitScreen';
import { AddExpenseScreen } from '../screens/budget/AddExpenseScreen';
import { CashPlannerScreen } from '../screens/tools/CashPlannerScreen';

const Stack = createNativeStackNavigator<BudgetStackParamList>();

export function BudgetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
      <Stack.Screen name="CostSplit" component={CostSplitScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="CashPlanner" component={CashPlannerScreen} />
    </Stack.Navigator>
  );
}
