import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import { config } from '../config/config.js'

export const authenticateAdmin = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        res.status(401).json({message: "unauthorised"})
    }

    try {
        const decoded = jwt.verify(token,config.JWT_SECRET)

       const user = await userModel.findById(decoded.id)
        
       if(!user){
        res.status(401).json({message: "unauthorised"})
       }

       if(decoded.role !== 'admin'){
            res.status(403).json({message: 'forbidden'})
       }

       req.user = user
       next()
       
    } catch (error) {
        console.error(error)
        return res.status(401).json({message: 'unauthorised'})
    }
}
