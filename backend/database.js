const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join(__dirname, 'expenses.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message)
  } else {
    console.log('Connected to SQLite database')
    initDatabase()
  }
})

function initDatabase() {
  const sql = `
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating table:', err.message)
    } else {
      console.log('Expenses table ready')
      // Insert sample data if table is empty
      insertSampleData()
    }
  })
}

function insertSampleData() {
  const sampleData = [
    {
      id: '1',
      title: 'Business Lunch with Client',
      amount: 2500,
      category: 'Meals',
      status: 'Approved',
      date: '12/20/2025'
    },
    {
      id: '2',
      title: 'Flight to Mumbai',
      amount: 8500,
      category: 'Travel',
      status: 'Submitted',
      date: '12/22/2025'
    },
    {
      id: '3',
      title: 'Office Stationery',
      amount: 1200,
      category: 'Office Supplies',
      status: 'Approved',
      date: '12/18/2025'
    },
    {
      id: '4',
      title: 'Software License',
      amount: 5000,
      category: 'Software',
      status: 'Rejected',
      date: '12/15/2025'
    }
  ]

  // Check if data exists
  db.get('SELECT COUNT(*) as count FROM expenses', (err, row) => {
    if (err) {
      console.error('Error checking data:', err.message)
    } else if (row.count === 0) {
      // Insert sample data
      const stmt = db.prepare('INSERT INTO expenses VALUES (?, ?, ?, ?, ?, ?)')
      sampleData.forEach(expense => {
        stmt.run(expense.id, expense.title, expense.amount, expense.category, expense.status, expense.date)
      })
      stmt.finalize()
      console.log('Sample data inserted')
    }
  })
}

module.exports = db