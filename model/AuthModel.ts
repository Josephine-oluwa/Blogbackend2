import mongoose from "mongoose"

export interface iAuth {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    imageID?: string;
    // post?: {}[];
}

interface iAuthData extends iAuth, mongoose.Document{}

const authModel = new mongoose.Schema<iAuth>(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        image: {
            type: String
        },
        imageID: {
            type: String
        },
        // post: [
        //     {
        //         type: mongoose.Types.ObjectId,
        //         ref: "posts"
        //     }
        // ]
    },
    {timestamps: true}
)

export default mongoose.model<iAuthData>("auths", authModel)