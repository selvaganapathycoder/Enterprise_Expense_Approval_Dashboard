export type ExpenseStatus =
  | 'Draft'
  | 'Submitted'
  | 'Approved'
  | 'Rejected'

export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  status: ExpenseStatus
  date: string
}
