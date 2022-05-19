import React, { useContext} from "react";
import {v4 as uuidV4} from "uuid"
import useLocalStorage from '../hooks/useLocalStorage'


const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("Budgets",[]);
  const [expenses, setExpenses] = useLocalStorage("Expenses",[]);
//get budget expenses
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  //add budget
  const addBudget = ({name,max}) => {
      
    setBudgets((previousBudgets) => {
        if(previousBudgets.find(budget => budget.name === name)) {
            return previousBudgets;
        }
      return [...previousBudgets, { id: uuidV4(), name, max}];
    });
  };

//add expense
  const addExpense =({description, amount, budgetId}) => {
          
    setExpenses((previousExpense) => {
      return [...previousExpense, { id: uuidV4(), description, amount, budgetId}];
    });
  }

  //delete budget
  const deleteBudget = ({id}) => {
      setExpenses(previousExpense => {
          return previousExpense.map(expense => {
              if(expense.budgetId !== id)return expense
              return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
          })
      })
    setBudgets((previousBudgets) => {
        return previousBudgets.filter(budget => budget.id !== id)
    })
  };

  //delete expense
  const deleteExpense = (id) => {
    setExpenses((previousExpense) => {
        return previousExpense.filter(expense => expense.id !== id)
    })
      
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
