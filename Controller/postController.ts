import express,{Request, Response} from "express"
import {HTTP, mainError} from "../errors/mainError"
import postModel from "../model/postModel";
import AuthModel from "../model/AuthModel";
import cloudinary from "../utils/cloudinary"
import mongoose from "mongoose";

const createPost = async (req: any, res: Response) => {
    try {
       const {userID} = req.params

       const {title, content} = req.body

       const user: any = await AuthModel.findById(userID)

       if (user) {
        const {secure_url, public_id} = await cloudinary.uploader.upload(
            req?.file.path
        )

        const post = await postModel.create({
            title, content, image: secure_url, image_id: public_id, userID, user
        })

        user.post.push(new mongoose.Types.ObjectId(post._id));
        user.save();

        return res.status(HTTP.OK).json({
            message: "you have successfully created a post",
            
           })
       } else {
        new mainError({
            name: "Create Error",
            message: `This Error came as a result of creating this user`,
            status: HTTP.BAD_REQUEST,
            success: false
        })
        return res.status(HTTP.BAD_REQUEST).json({message: "Error"})
       }

        
         
       
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "sorry no post was created"
        })
    }
}