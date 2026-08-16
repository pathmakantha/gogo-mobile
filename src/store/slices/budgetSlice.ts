import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BudgetCategory, Expense, Payer, Settlement } from '../../types/models';

interface BudgetState {
  plannedTotal: number;
  cap: number;
  categories: BudgetCategory[];
  travelerCount: number;
  totalSpent: number;
  payers: Payer[];
  settlements: Settlement[];
  expenses: Expense[];
}

const initialState: BudgetState = {
  plannedTotal: 1045,
  cap: 1200,
  categories: [
    { id: 'stays', label: 'Stays', spent: 380, percentOfCap: 76, tone: 'good' },
    { id: 'transport', label: 'Transport', spent: 210, percentOfCap: 52, tone: 'good' },
    { id: 'food', label: 'Food', spent: 195, percentOfCap: 49, tone: 'good' },
    {
      id: 'activities',
      label: 'Activities',
      spent: 260,
      percentOfCap: 100,
      tone: 'over',
      overNote: '12% over plan',
      tip: 'Tip: shared jeep at Yala saves $38',
    },
  ],
  travelerCount: 3,
  totalSpent: 1140,
  payers: [
    { id: 'p1', name: 'You paid', initial: 'N', colorToken: 'darkGreen', amountPaid: 512, paidForLabel: 'safari, 2 stays' },
    { id: 'p2', name: 'Amara paid', initial: 'A', colorToken: 'teal', amountPaid: 389, paidForLabel: 'trains, food kitty' },
    { id: 'p3', name: 'Josh paid', initial: 'J', colorToken: 'primary', amountPaid: 239, paidForLabel: 'surf lessons, tuk-tuks' },
  ],
  settlements: [
    { id: 'st1', fromName: 'Josh', toName: 'You', amount: 141 },
    { id: 'st2', fromName: 'Amara', toName: 'You', amount: 9 },
  ],
  expenses: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    expenseAdded(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
      state.totalSpent += action.payload.amount;
      state.plannedTotal += action.payload.amount;
    },
  },
});

export const { expenseAdded } = budgetSlice.actions;
export default budgetSlice.reducer;
