import mongoose from "mongoose";

export interface iPost {
    title?: string;
    content?: string;
    comment?: string;
    user?: string;
    userID?: string
    image?: string;
    imageID?: string
}

interface iPostData extends iPost, mongoose.Document{}

const postModel = new mongoose.Schema<iPost> (
    {
        title: {
            type: String
        },
        comment: [
           {
            type: mongoose.Types.ObjectId,
            ref: "comments"
           }
        ],
        content: {
            type: String
        },
        image:{ 
            type: String
        },
        imageID: {
            type: String
        },
        user: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            }
        ],
        userID: {
            type: String
        }
    }
)
{timestamps: true}

export default mongoose.model<iPostData>("posts", postModel);