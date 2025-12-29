import { useEffect, useState } from 'react'
import type { Expense } from '../types/expense'
import { expenseService } from '../services/expenseService'

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await expenseService.getAll()
      setExpenses(data)
    } catch (err) {
      setError('Failed to load expenses')
      console.error('Error loading expenses:', err)
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'status' | 'date'>) => {
    try {
      const newExpense = await expenseService.create(expenseData)
      setExpenses(prev => [newExpense, ...prev])
    } catch (err) {
      console.error('Error adding expense:', err)
      throw err
    }
  }

  const updateStatus = async (id: string, status: Expense['status']) => {
    try {
      await expenseService.updateStatus(id, status)
      setExpenses(prev => prev.map(exp =>
        exp.id === id ? { ...exp, status } : exp
      ))
    } catch (err) {
      console.error('Error updating expense:', err)
      throw err
    }
  }

  const updateExpense = async (id: string, expenseData: { title: string; amount: number; category: string }) => {
    try {
      await expenseService.updateDetails(id, expenseData)
      setExpenses(prev => prev.map(exp =>
        exp.id === id ? { ...exp, ...expenseData } : exp
      ))
    } catch (err) {
      console.error('Error updating expense details:', err)
      throw err
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      await expenseService.delete(id)
      setExpenses(prev => prev.filter(exp => exp.id !== id))
    } catch (err) {
      console.error('Error deleting expense:', err)
      throw err
    }
  }

  return { expenses, addExpense, updateStatus, updateExpense, deleteExpense, loading, error, refetch: fetchExpenses }
}
