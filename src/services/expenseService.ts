import type { Expense } from '../types/expense'

const API_BASE_URL = 'http://localhost:3001/api'

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`)
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching expenses:', error)
      return []
    }
  },

  async save(expenses: Expense[]): Promise<void> {
    // In API mode, we don't need to save locally
    // Data is persisted on the server
    console.log('Expenses saved to server:', expenses.length)
  },

  async create(expense: Omit<Expense, 'id' | 'status' | 'date'>): Promise<Expense> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      })
      if (!response.ok) {
        throw new Error('Failed to create expense')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating expense:', error)
      throw error
    }
  },

  async updateStatus(id: string, status: Expense['status']): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error('Failed to update expense')
      }
    } catch (error) {
      console.error('Error updating expense:', error)
      throw error
    }
  },

  async updateDetails(id: string, expenseData: { title: string; amount: number; category: string }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      })
      if (!response.ok) {
        throw new Error('Failed to update expense details')
      }
    } catch (error) {
      console.error('Error updating expense details:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete expense')
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
      throw error
    }
  }
}
