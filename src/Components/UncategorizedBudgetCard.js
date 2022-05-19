import React from 'react'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext";
import Budget from "./Budget"

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudgets();

    const amount =  getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0)
        if(amount === 0) return null

  return (
    <Budget amount={amount} name="Uncategorized" gray {...props} />
  )
}
