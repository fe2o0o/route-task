import { Router } from "express";
import { userModel } from "../../../database/models/user.model.js";
import { transactionModel } from '../../../database/models/transaction.model.js'
import moment from "moment";
import { auth, isAdmin } from "../../middlewares/auth.js";
const router = Router()


router.route('/')
    .post(auth,async (req, res, next) => {
        try {
            const { amount ,description } = req.body;
            const { userId } = req;
            const dateObject = moment().toDate();
            const addTransaction = new transactionModel({ amount: amount, user: userId, date: dateObject, description: description })
            await addTransaction.save()
            const addToUser = await userModel.findByIdAndUpdate(userId, { $push: { transactions: addTransaction._id } }, { new: true })
            res.status(201).json({ addTransaction, addToUser })
        } catch (err) {
            res.status(500).json({message:"internal server Error"})
        }
    })

    .get(auth,isAdmin,async (req, res, next) => {
        try {
            const allUsers = await userModel.find({role:"user"}).populate({path:'transactions' , select:'-description -user'}).select('-password')

            const allUsersAduit = allUsers.map((e) => {
                const ele = e.toObject()
                
                let totalAmount = 0;
                ele.transactions.forEach((e) => {
                    totalAmount += e.amount;
                })
                ele.totalAmount = totalAmount;
                return ele
            })
            res.status(200).json(allUsersAduit)
        } catch (error) {
            res.status(500).json({error ,message: "internal server Error" })
        }
    })

    .put(auth,async (req, res, next) => {
        const { userId } = req;
        const { amount, description ,transactionId } = req.body;
        
        const isTransactionFound = await transactionModel.findById(transactionId)

        if (!isTransactionFound) {
            return  res.status(400).json({message:"Transaction not found"})
        }

        if (isTransactionFound.user != userId) {
            return res.status(400).json({ message: "You dont have a permission" })
        }

        const upDateTransaction = await transactionModel.findByIdAndUpdate(transactionId , {amount:amount , description:description},{new:true})

        res.status(200).json(upDateTransaction)

    })

    .delete(auth, async (req, res, next) => {
        const { userId } = req;
        const { transactionId } = req.body;
        const isTransactionFound = await transactionModel.findById(transactionId)
        if (!isTransactionFound) {
            return res.status(400).json({ message: "Transaction not found" })
        }

        if (isTransactionFound.user != userId) {
            return res.status(400).json({ message: "You dont have a permission" })
        }

        const deleteTransaction = await transactionModel.findByIdAndDelete(transactionId)
        res.status(200).json(deleteTransaction)
    })


router.get('/userTransaction', auth, async (req, res, next) => {
    const { userId } = req;
    const userInfo = await userModel.findById(userId).populate('transactions').select('-password');
    if (!userInfo) {
        return res.status(404).json({message:"User Not Found"})
    }
    const userTransaction = userInfo.toObject();
    let totalAmount = 0;
    userTransaction.transactions.forEach((e) => {
        totalAmount += e.amount;
    })
    userTransaction.totalAmount = totalAmount;
    res.json(userTransaction)
})
router.get('/:id', auth, async (req,res,next) => {
    const { userId } = req;
    const { id } = req.params;

    const isTransactionFound = await transactionModel.findById(id)



    if (!isTransactionFound) {
        return res.status(404).json({message:"Transaction Not Found"})
    }

    if (isTransactionFound.user != userId ) {
        return res.status(401).json({message:"Dont Have Permission For This Data"})
    }

   

    res.status(200).json({transaction:isTransactionFound}) 

})
router.get('/userTransaction/:id', auth, isAdmin, async (req, res, next) => {
    const { id } = req.params;
    const userInfo = await userModel.findById(id).populate('transactions').select('-password');
    if (!userInfo) {
        return res.status(404).json({ message: "User Not Found" })
    }
    const userTransaction = userInfo.toObject();
    let totalAmount = 0;
    userTransaction.transactions.forEach((e) => {
        totalAmount += e.amount;
    })
    userTransaction.totalAmount = totalAmount;
    res.json(userTransaction)
})
export default router