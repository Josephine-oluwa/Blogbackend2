import {Request, Response} from "express"
import { HTTP } from "../errors/mainError"
import authModel from "../model/AuthModel"
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary"

export const createAuth = async (req: any, res: Response)=> {
    try {
        const {name, email, password} = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hashed(password, salt)

        const {secure_url, public_id} = await cloudinary.uploader.upload(
            req.file.path
        )

        const auth = await authModel.create({name, email, password: hashed, image: secure_url, imageID: public_id});

        
        res.status(HTTP.OK).json({
            message: "found all user",
            data: auth
        })
    } catch(error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Request was not created"
        })
    }
}



export const signInAuth = async(req: Request, res: Response)=> {
    try {
         const {email, password} = req.body

         const auth = await authModel.findOne({email, password})

         res.status(HTTP.OK).json({
            message: "found one user",
            data: auth
        })
    } catch(error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Request was not created"
        })
    }
}


export const getAuth = async (req:Request, res: Response)=> {
    try {
        const auth = await authModel.find()

     res.status(HTTP.OK).json({
            message: "found one user",
            data: auth
        })
    } catch(error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Request was not created"
        })
    }
}


export const getOneAuth = async (req: Request, res: Response) => {
    try {
        const {authID} = req.params;

        const auth = await authModel.findById(authID);

        res.status(HTTP.OK).json({
            message: "found one user",
            data: auth
        })
    } catch(error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Request was not created"
        })
    }
}