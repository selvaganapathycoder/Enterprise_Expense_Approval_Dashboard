import { useExpenses } from '../../hooks/useExpenses'
import Card from '../../components/ui/Card'
import RoleSwitcher from '../../components/layout/RoleSwitcher'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'

const FinanceDashboard = () => {
  const { expenses } = useExpenses()

  // Status distribution data
  const statusData = [
    { name: 'Approved', value: expenses.filter(e => e.status === 'Approved').length, amount: expenses.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Rejected', value: expenses.filter(e => e.status === 'Rejected').length, amount: expenses.filter(e => e.status === 'Rejected').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Pending', value: expenses.filter(e => e.status === 'Submitted').length, amount: expenses.filter(e => e.status === 'Submitted').reduce((sum, e) => sum + e.amount, 0) },
  ]

  // Category breakdown data
  const categoryData = [
    { name: 'Travel', value: expenses.filter(e => e.category === 'Travel').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Meals', value: expenses.filter(e => e.category === 'Meals').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Office Supplies', value: expenses.filter(e => e.category === 'Office Supplies').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Software', value: expenses.filter(e => e.category === 'Software').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Other', value: expenses.filter(e => e.category === 'Other').reduce((sum, e) => sum + e.amount, 0) },
  ].filter(item => item.value > 0)

  // Monthly trend data (last 6 months)
  const monthlyData = []
  const currentDate = new Date()
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    const monthExpenses = expenses.filter(e => {
      const expenseDate = new Date(e.date)
      return expenseDate.getMonth() === date.getMonth() && expenseDate.getFullYear() === date.getFullYear()
    })
    monthlyData.push({
      month: monthName,
      amount: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
      count: monthExpenses.length
    })
  }

  const COLORS = ['#16A34A', '#DC2626', '#2563EB']
  const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <RoleSwitcher />

      <h1 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Finance Analytics Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₹{expenses.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              ₹{expenses.filter(e => e.status === 'Submitted').reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {expenses.filter(e => e.status === 'Rejected').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Expense Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} expenses`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Expense Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
              <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Count */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Expense Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} expenses`, 'Count']} />
              <Bar dataKey="count" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default FinanceDashboard
