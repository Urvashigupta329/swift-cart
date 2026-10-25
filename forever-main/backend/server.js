import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import seedDatabase from './config/seed.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// App config
const app = express()
const port = process.env.PORT || 4000

// Connect to DB and Cloudinary
connectDB().then(() => {
    seedDatabase()
}).catch((err) => {
    console.error("Database connection failed:", err)
})
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// Static images route to serve bundled product assets
app.use('/images', express.static(path.join(__dirname, '../frontend/src/assets')))

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, () => console.log('Server started on port: ' + port))