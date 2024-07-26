import { Router } from "express";
import { userModel } from '../../../database/models/user.model.js'
import jwt from 'jsonwebtoken'
const router = Router()

router.post("/register", async (req, res, next) => {
    try {
        const {name , email , password} = req.body
        const isFound = await userModel.findOne({ email })

        if (isFound) {
            return res.status(400).json({message:"Email is Already Exist"})
        }

        const addUser = new userModel({name , email , password , role:"user"})
        const result = await addUser.save()
        res.status(201).json({message:"registerd" , result})
    } catch (error) {
        res.status(500).json({message:"internal Error Server "})
    }
})


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const isFound = await userModel.findOne({ email })
        
        if (!isFound) {
            return res.status(400).json({message:"Email Is Not Exist"})
        }

        if (isFound.password !== password) {
            return res.status(400).json({ message: "Wrong passwored" })
        }

        const token = jwt.sign({
            _id: isFound._id,
            email: isFound.email,
            name: isFound.name,
            role:isFound.role
        }, process.env.SECRET_KEY)

        res.status(200).json({token})
    } catch (error) {
        
    }
})




export default router