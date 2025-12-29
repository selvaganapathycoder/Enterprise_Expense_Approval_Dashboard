import Card from '../../components/ui/Card'
import ExpenseTable from '../../components/tables/ExpenseTable'
import ExpenseForm from '../../components/ExpenseForm'
import EditExpenseForm from '../../components/EditExpenseForm'
import DeleteConfirmation from '../../components/DeleteConfirmation'
import SearchAndFilter from '../../components/SearchAndFilter'
import { useExpenses } from '../../hooks/useExpenses'
import { useState } from 'react'
import toast from 'react-hot-toast'

const EmployeeDashboard = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, loading, error } = useExpenses()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null)

  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'status' | 'date'>) => {
    try {
      await addExpense(expenseData)
    } catch (err) {
      toast.error('Failed to add expense. Please try again.')
    }
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleUpdateExpense = async (id: string, expenseData: { title: string; amount: number; category: string }) => {
    try {
      await updateExpense(id, expenseData)
      setEditingExpense(null)
    } catch (err) {
      toast.error('Failed to update expense. Please try again.')
    }
  }

  const handleDeleteExpense = (expense: Expense) => {
    setDeletingExpense(expense)
  }

  const confirmDeleteExpense = async () => {
    if (!deletingExpense) return
    try {
      await deleteExpense(deletingExpense.id)
      setDeletingExpense(null)
      toast.success('Expense deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete expense. Please try again.')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Employee Dashboard
        </h1>

        <ExpenseForm onAdd={handleAddExpense} />
      </div>

      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          onUpdate={handleUpdateExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}

      <DeleteConfirmation
        isOpen={!!deletingExpense}
        onConfirm={confirmDeleteExpense}
        onCancel={() => setDeletingExpense(null)}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deletingExpense?.title}"? This action cannot be undone.`}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <Card>
        <SearchAndFilter
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
        />
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ExpenseTable
            data={expenses}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}
      </Card>

      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        © 2025 ExpenseFlow - Enterprise Expense Management System
      </footer>
    </div>
  )
}

export default EmployeeDashboard
