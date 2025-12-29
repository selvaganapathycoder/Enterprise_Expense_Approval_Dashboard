const express = require('express')
const { v4: uuidv4 } = require('uuid')
const db = require('../database')

const router = express.Router()

// GET /api/expenses - Get all expenses
router.get('/', (req, res) => {
  db.all('SELECT * FROM expenses ORDER BY date DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching expenses:', err.message)
      return res.status(500).json({ error: 'Failed to fetch expenses' })
    }
    res.json(rows)
  })
})

// POST /api/expenses - Create new expense
router.post('/', (req, res) => {
  const { title, amount, category } = req.body

  if (!title || !amount || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' })
  }

  const id = uuidv4()
  const status = 'Submitted'
  const date = new Date().toLocaleDateString()

  const sql = 'INSERT INTO expenses (id, title, amount, category, status, date) VALUES (?, ?, ?, ?, ?, ?)'
  db.run(sql, [id, title, amount, category, status, date], function(err) {
    if (err) {
      console.error('Error creating expense:', err.message)
      return res.status(500).json({ error: 'Failed to create expense' })
    }

    const newExpense = { id, title, amount, category, status, date }
    res.status(201).json(newExpense)
  })
})

// PUT /api/expenses/:id - Update expense status
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ error: 'Status is required' })
  }

  const validStatuses = ['Draft', 'Submitted', 'Approved', 'Rejected']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const sql = 'UPDATE expenses SET status = ? WHERE id = ?'
  db.run(sql, [status, id], function(err) {
    if (err) {
      console.error('Error updating expense:', err.message)
      return res.status(500).json({ error: 'Failed to update expense' })
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    res.json({ message: 'Expense updated successfully' })
  })
})

// PUT /api/expenses/:id/details - Update expense details (title, amount, category)
router.put('/:id/details', (req, res) => {
  const { id } = req.params
  const { title, amount, category } = req.body

  if (!title || !amount || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' })
  }

  const sql = 'UPDATE expenses SET title = ?, amount = ?, category = ? WHERE id = ?'
  db.run(sql, [title, amount, category, id], function(err) {
    if (err) {
      console.error('Error updating expense details:', err.message)
      return res.status(500).json({ error: 'Failed to update expense' })
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    res.json({ message: 'Expense details updated successfully' })
  })
})

// DELETE /api/expenses/:id - Delete expense (optional)
router.delete('/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM expenses WHERE id = ?'
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting expense:', err.message)
      return res.status(500).json({ error: 'Failed to delete expense' })
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    res.json({ message: 'Expense deleted successfully' })
  })
})

module.exports = router