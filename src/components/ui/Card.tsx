import { motion } from 'framer-motion'

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-100 dark:border-gray-700"
    >
      {children}
    </motion.div>
  )
}

export default Card
