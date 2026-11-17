export const errorHandler = (err, req, res, __next) => {
  console.error('Error:', err.message)
  res.status(500).json({
    error: 'Internal server error',
  })
}

export default errorHandler
