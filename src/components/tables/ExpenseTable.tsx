import type { Expense } from '../../types/expense'
import StatusBadge from './StatusBadge'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'

interface ExpenseTableProps {
  data: Expense[]
  searchQuery?: string
  statusFilter?: string
  onEdit?: (expense: Expense) => void
  onDelete?: (expense: Expense) => void
}

const ExpenseTable = ({ data, searchQuery = '', statusFilter = 'all', onEdit, onDelete }: ExpenseTableProps) => {
  const filteredData = data.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || exp.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
          <th className="py-2 text-gray-900 dark:text-gray-100">Date</th>
          <th className="py-2 flex items-center gap-1 text-gray-900 dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            Title
          </th>
          <th className="py-2 text-gray-900 dark:text-gray-100">Amount</th>
          <th className="py-2 text-gray-900 dark:text-gray-100">Status</th>
          <th className="py-2 text-gray-900 dark:text-gray-100">Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredData.map((exp, index) => (
          <motion.tr
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-blue-900 transition-colors"
          >
            <td className="py-2 text-gray-700 dark:text-gray-300">{exp.date}</td>
            <td className="text-gray-700 dark:text-gray-300">{exp.title}</td>
            <td className="py-2 text-gray-700 dark:text-gray-300">₹{exp.amount.toLocaleString()}</td>
            <td>
              <StatusBadge status={exp.status} />
            </td>
            <td className="py-2">
              <div className="flex gap-2">
                {onEdit && (
                  <motion.button
                    onClick={() => onEdit(exp)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    title="Edit expense"
                  >
                    <Edit size={16} />
                  </motion.button>
                )}
                {onDelete && (
                  <motion.button
                    onClick={() => onDelete(exp)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    title="Delete expense"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  )
}

export default ExpenseTable
