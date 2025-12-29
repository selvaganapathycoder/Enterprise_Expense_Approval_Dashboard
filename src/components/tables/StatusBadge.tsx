import type { ExpenseStatus } from '../../types/expense'

const styles: Record<ExpenseStatus, string> = {
  Draft: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 dark:from-gray-600 dark:to-gray-700 dark:text-gray-200',
  Submitted: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 dark:from-blue-900 dark:to-blue-800 dark:text-blue-300',
  Approved: 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 dark:from-green-900 dark:to-green-800 dark:text-green-300',
  Rejected: 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 dark:from-red-900 dark:to-red-800 dark:text-red-300',
}

const StatusBadge = ({ status }: { status: ExpenseStatus }) => {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge
