// import { Modal } from "bootstrap";
import { Button, Modal, Stack } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext";
import {currencyFormatter }  from '../utils'

export default function ViewExpensesModal({budgetId, handleClose}) {
  const {getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
const expenses = getBudgetExpenses(budgetId)
  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID} : budgets.find(a => a.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
            <Stack direction = "horizontal" gap="2">
            <div> Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button 
                onClick ={() => {
                    deleteBudget(budget) 
                    handleClose()}}
                    variant = "outline-danger"> Delete</Button>
            )}
            </Stack>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction ="vertical" gap ="3" >
               {expenses.map(expense => (
                   <Stack direction= "horizontal" gap ="2" key={expense.id}>
                       <div className ="me-auto fs-4">{expense.description}</div>
                       <div className ="fs-4">{currencyFormatter.format(expense.amount)}</div>
                       <Button size ="sm" variant = "outline-danger" onClick ={() => deleteExpense(expense.id)}>&times;</Button>
                   </Stack>
                   
               ))}
            </Stack>
        </Modal.Body>
    </Modal>
  );
}
