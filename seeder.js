import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import Product from './models/productmodel.js'
import User from './models/usermodel.js'
import user from './data/user.js'
import product from './data/product.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()   
        
        await User.insertMany(user)
        await Product.insertMany(product)

        console.log('Data Imported!'.green.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

importData()