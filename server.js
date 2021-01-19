import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import colors from 'colors'

//Routes
import userRoutes from './routers/userRoutes.js'
import productRoutes from './routers/productRoutes.js'

dotenv.config()

connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Api is running")
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)

//Error
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))