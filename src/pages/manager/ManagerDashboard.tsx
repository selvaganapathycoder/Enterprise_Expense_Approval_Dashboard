import { useExpenses } from '../../hooks/useExpenses'
import Card from '../../components/ui/Card'
import StatusBadge from '../../components/tables/StatusBadge'
import RoleSwitcher from '../../components/layout/RoleSwitcher'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ManagerDashboard = () => {
  const { expenses, updateStatus, loading, error } = useExpenses()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const pending = expenses.filter(e => e.status === 'Submitted')

  const handleStatusUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      setUpdatingId(id)
      await updateStatus(id, status)
      toast.success(`Expense ${status.toLowerCase()} successfully!`)
    } catch (err) {
      toast.error('Failed to update expense status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <RoleSwitcher />

      <h1 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Manager Approval
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : pending.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No pending expenses to review
          </div>
        ) : (
          pending.map(exp => (
            <div
              key={exp.id}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{exp.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{exp.amount.toLocaleString()} • {exp.category} • {exp.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={exp.status} />
                <button
                  onClick={() => handleStatusUpdate(exp.id, 'Approved')}
                  disabled={updatingId === exp.id}
                  className="text-green-600 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updatingId === exp.id ? '...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleStatusUpdate(exp.id, 'Rejected')}
                  disabled={updatingId === exp.id}
                  className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updatingId === exp.id ? '...' : 'Reject'}
                </button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}

export default ManagerDashboard
