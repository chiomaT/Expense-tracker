import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Budget from "./Components/Budget";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import AddBudgetModel from "./Components/AddBudgetModel";
import AddExpensetModal from "../src/Components/AddExpenseModal";
import ViewExpensesModal from "../src/Components/ViewExpensesModal";
import { useState } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID} from "./context/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add expense
          </Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1 rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const{id,name, max} = budget;
            const amount = getBudgetExpenses(id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <Budget
                key={id}
                name={name}
                amount={amount}
                max={max}
                onAddExpenseClick={() => openAddExpenseModal(id)}
                onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard 
          onAddExpenseClick = {openAddExpenseModal}
          onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
          <TotalBudgetCard />
        </div>
      </Container>

      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpensetModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId = {viewExpensesModalBudgetId}
       handleClose={() =>setViewExpensesModalBudgetId()}
     />

    </>
  );
}

export default App;
