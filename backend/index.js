import dotenv from 'dotenv'
dotenv.config({})
import express from 'express'
import cors from 'cors'
import {connection} from './database/db.connection.js'
import transactionRouter from './src/modules/transaction/transaction.routes.js'
import userRouter from './src/modules/user/user.routes.js'
const app = express()
app.use(cors())
connection()
app.use(express.json())
app.use('/api/v1/transaction' , transactionRouter)
app.use('/api/v1/user' , userRouter )


app.listen(process.env.PORT, () => {
    console.log(`server listen in port ${process.env.PORT}`);
})


